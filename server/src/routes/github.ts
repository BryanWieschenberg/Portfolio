import { Router, type Router as RouterType } from 'express';
import { getCache, setCache } from '../cache.js';

const router: RouterType = Router();
const GITHUB_API = 'https://api.github.com/graphql';
const GITHUB_REST = 'https://api.github.com';
const CACHE_TTL = 15 * 60 * 1000; // 15 mins
const USERNAME = 'BryanWieschenberg';

async function githubGraphQL(query: string) {
    const res = await fetch(GITHUB_API, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    if (!res.ok) {
        throw new Error(`GitHub GraphQL error: ${res.status}`);
    }

    return res.json();
}

async function githubREST(path: string) {
    const res = await fetch(`${GITHUB_REST}${path}`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
        },
    });

    if (!res.ok) {
        throw new Error(`GitHub REST error: ${res.status}`);
    }

    return res.json();
}

router.get('/contributions', async (_req, res) => {
    try {
        const cached = getCache('github:contributions');
        if (cached) {
            return res.json(cached);
        }

        const to = new Date();
        const from = new Date();
        from.setDate(to.getDate() - 90);

        const data = await githubGraphQL(`
      query {
        user(login: "${USERNAME}") {
          contributionsCollection(from: "${from.toISOString()}", to: "${to.toISOString()}") {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `);

        const calendar = data.data.user.contributionsCollection.contributionCalendar;

        // Fetch recent events to capture activity on non-default branches
        try {
            const events = await githubREST(`/users/${USERNAME}/events?per_page=100`);
            const eventsMap: Record<string, number> = {};

            if (Array.isArray(events)) {
                for (const e of events) {
                    if (
                        [
                            'PushEvent',
                            'PullRequestEvent',
                            'IssuesEvent',
                            'PullRequestReviewEvent',
                        ].includes(e.type)
                    ) {
                        const date = e.created_at.split('T')[0];
                        let count = 1;
                        if (e.type === 'PushEvent') {
                            count = e.payload?.size || 1;
                        }
                        eventsMap[date] = (eventsMap[date] || 0) + count;
                    }
                }
            }

            let newTotal = 0;
            for (const week of calendar.weeks) {
                for (const day of week.contributionDays) {
                    const eventCount = eventsMap[day.date] || 0;

                    // Take the max to avoid double-counting default-branch commits
                    // that the GraphQL API already caught vs the raw Event stream
                    day.contributionCount = Math.max(day.contributionCount, eventCount);

                    // Recalculate the GitHub color scale based on the new count
                    if (day.contributionCount === 0) {
                        day.color = '#ebedf0';
                    } else if (day.contributionCount <= 3) {
                        day.color = '#9be9a8';
                    } else if (day.contributionCount <= 6) {
                        day.color = '#40c463';
                    } else if (day.contributionCount <= 9) {
                        day.color = '#30a14e';
                    } else {
                        day.color = '#216e39';
                    }

                    newTotal += day.contributionCount;
                }
            }

            calendar.totalContributions = newTotal;
        } catch (err) {
            console.error('Failed to overlay events onto heatmap:', err);
        }

        setCache('github:contributions', calendar, CACHE_TTL);
        res.json(calendar);
    } catch (err) {
        console.error('GitHub contributions error:', err);
        res.status(500).json({ error: 'Failed to fetch contributions' });
    }
});

router.get('/commits', async (_req, res) => {
    try {
        const cached = getCache('github:commits');
        if (cached) {
            return res.json(cached);
        }

        const events = await githubREST(`/users/${USERNAME}/events`);

        if (!Array.isArray(events)) {
            throw new Error(`Expected array of events, got ${typeof events}`);
        }

        const pushEvents = events.filter((e: any) => e.type === 'PushEvent').slice(0, 15);

        const commitPromises = pushEvents.map(async (e: any) => {
            // First try reading commits array out of payload (classic PAT or full-scope)
            if (e.payload?.commits && e.payload.commits.length > 0) {
                return e.payload.commits.map((c: any) => ({
                    sha: c.sha,
                    message: c.message,
                    repo: e.repo.name,
                    date: e.created_at,
                    url: `https://github.com/${e.repo.name}/commit/${c.sha}`,
                }));
            }

            // If commits are stripped due to scoped PATs, fallback to fetching the head SHA
            if (e.payload?.head) {
                try {
                    const commitData = await githubREST(
                        `/repos/${e.repo.name}/commits/${e.payload.head}`,
                    );
                    return [
                        {
                            sha: commitData.sha,
                            message: commitData.commit.message,
                            repo: e.repo.name,
                            date: commitData.commit.author.date, // Real commit date
                            url: commitData.html_url,
                        },
                    ];
                } catch {
                    return [];
                }
            }

            return [];
        });

        const allCommits = (await Promise.all(commitPromises)).flat().slice(0, 30);

        setCache('github:commits', allCommits, CACHE_TTL);
        res.json(allCommits);
    } catch (err) {
        console.error('GitHub commits error:', err);
        res.status(500).json({ error: 'Failed to fetch commits' });
    }
});

export default router;
