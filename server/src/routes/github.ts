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

        const data = await githubGraphQL(`
      query {
        user(login: "${USERNAME}") {
          contributionsCollection {
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

        const repos = await githubREST(`/users/${USERNAME}/repos?sort=pushed&per_page=10`);

        if (!Array.isArray(repos)) {
            throw new Error(`Expected array of repos, got ${typeof repos}`);
        }

        const publicRepos = repos
            .filter((r: { private: boolean; name: string }) => !r.private)
            .slice(0, 3);

        const commitPromises = publicRepos.map(async (repo: { name: string }) => {
            try {
                const commits = await githubREST(
                    `/repos/${USERNAME}/${repo.name}/commits?per_page=5`,
                );

                if (!Array.isArray(commits)) {
                    return [];
                }

                return commits.map(
                    (c: {
                        sha: string;
                        commit: { message: string; author: { date: string } };
                        html_url: string;
                    }) => ({
                        sha: c.sha,
                        message: c.commit.message,
                        repo: repo.name,
                        date: c.commit.author.date,
                        url: c.html_url,
                    }),
                );
            } catch {
                return [];
            }
        });

        const allCommits = (await Promise.all(commitPromises))
            .flat()
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);

        setCache('github:commits', allCommits, CACHE_TTL);
        res.json(allCommits);
    } catch (err) {
        console.error('GitHub commits error:', err);
        res.status(500).json({ error: 'Failed to fetch commits' });
    }
});

export default router;
