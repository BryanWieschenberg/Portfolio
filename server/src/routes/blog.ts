import { Router, Request, Response, type Router as RouterType } from 'express';
import pool from '../lib/db.js';

const router: RouterType = Router();

// POST /api/blog/:slug/view — increment view count (deduplicated by cookie)
router.post('/:slug/view', async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug as string;
        const viewed: string[] = req.cookies?.viewed ? JSON.parse(req.cookies.viewed) : [];

        // Already viewed this post in this session
        if (viewed.includes(slug)) {
            const result = await pool.query('SELECT count FROM blog_views WHERE slug = $1', [slug]);
            return res.json({ views: result.rows[0]?.count ?? 0 });
        }

        // Increment and return new count
        const result = await pool.query(
            `INSERT INTO blog_views (slug, count) VALUES ($1, 1)
       ON CONFLICT (slug) DO UPDATE SET count = blog_views.count + 1
       RETURNING count`,
            [slug],
        );

        viewed.push(slug);
        res.cookie('viewed', JSON.stringify(viewed), {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });

        res.json({ views: result.rows[0].count });
    } catch (err) {
        console.error('Blog view error:', err);
        res.status(500).json({ error: 'Failed to track view' });
    }
});

// GET /api/blog/:slug/views — get view count for a single post
router.get('/:slug/views', async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const result = await pool.query('SELECT count FROM blog_views WHERE slug = $1', [slug]);
        res.json({ views: result.rows[0]?.count ?? 0 });
    } catch (err) {
        console.error('Blog views error:', err);
        res.status(500).json({ error: 'Failed to fetch views' });
    }
});

// GET /api/blog/views — get view counts for all posts
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
