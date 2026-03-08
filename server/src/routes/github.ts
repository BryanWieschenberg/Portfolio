import { Router, type Router as RouterType } from 'express';
import { getCache, setCache } from '../cache.js';
import { GitHubPushEvent } from '../types/github.js';

const router: RouterType = Router();
const GITHUB_API = 'https://api.github.com/graphql';
const GITHUB_REST = 'https://api.github.com';
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
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

// GET /api/github/contributions
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

// GET /api/github/commits
router.get('/commits', async (_req, res) => {
    try {
        const cached = getCache('github:commits');
        if (cached) {
            return res.json(cached);
        }

        // Fetch recent events (pushes) for the user
        const events = await githubREST(`/users/${USERNAME}/events/public?per_page=100`);

        const pushEvents = (events as GitHubPushEvent[])
            .filter((e) => e.type === 'PushEvent')
            .flatMap((e) =>
                e.payload.commits.map((c) => ({
                    sha: c.sha,
                    message: c.message,
                    repo: e.repo.name,
                    date: e.created_at,
                    url: `https://github.com/${e.repo.name}/commit/${c.sha}`,
                })),
            )
            .slice(0, 30);

        setCache('github:commits', pushEvents, CACHE_TTL);
        res.json(pushEvents);
    } catch (err) {
        console.error('GitHub commits error:', err);
        res.status(500).json({ error: 'Failed to fetch commits' });
    }
});

export default router;
