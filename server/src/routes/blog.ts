import { Router, Request, Response, type Router as RouterType } from 'express';
import pool from '../lib/db.js';
import { validSlugs } from '../constants.js';

const router: RouterType = Router();

router.get('/latest', async (_req: Request, res: Response) => {
    try {
        const latestSlug = validSlugs[0];
        if (!latestSlug) {
            return res.status(404).json({ error: 'No posts found' });
        }
        const result = await pool.query('SELECT count FROM blog_views WHERE slug = $1', [
            latestSlug,
        ]);
        res.json({ slug: latestSlug, views: result.rows[0]?.count ?? 0 });
    } catch (err) {
        console.error('Blog latest view error:', err);
        res.status(500).json({ error: 'Failed to fetch latest post views' });
    }
});

router.post('/:slug/view', async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug as string;

        if (!validSlugs.includes(slug)) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const viewed: string[] = req.signedCookies?.viewed
            ? JSON.parse(req.signedCookies.viewed)
            : [];

        if (viewed.includes(slug)) {
            const result = await pool.query('SELECT count FROM blog_views WHERE slug = $1', [slug]);
            return res.json({ views: result.rows[0]?.count ?? 0 });
        }

        const result = await pool.query(
            `INSERT INTO blog_views (slug, count) VALUES ($1, 1)
            ON CONFLICT (slug) DO UPDATE SET count = blog_views.count + 1
            RETURNING count`,
            [slug],
        );

        viewed.push(slug);
        res.cookie('viewed', JSON.stringify(viewed), {
            maxAge: 10 * 60 * 1000, // 10 mins
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            signed: true,
        });

        res.json({ views: result.rows[0].count });
    } catch (err) {
        console.error('Blog view error:', err);
        res.status(500).json({ error: 'Failed to track view' });
    }
});

router.get('/:slug/views', async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug as string;

        if (!validSlugs.includes(slug)) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const result = await pool.query('SELECT count FROM blog_views WHERE slug = $1', [slug]);
        res.json({ views: result.rows[0]?.count ?? 0 });
    } catch (err) {
        console.error('Blog views error:', err);
        res.status(500).json({ error: 'Failed to fetch views' });
    }
});

router.get('/views', async (_req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT slug, count FROM blog_views ORDER BY count DESC');
        const views: Record<string, number> = {};
        result.rows.forEach((row) => {
            views[row.slug] = row.count;
        });
        res.json(views);
    } catch (err) {
        console.error('Blog all views error:', err);
        res.status(500).json({ error: 'Failed to fetch views' });
    }
});

export default router;
