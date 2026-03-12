import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';

const router: Router = express.Router();

// Strict rate limiter for contact form: max 2 requests per hour per IP
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 2,
    message: { error: 'Too many requests. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/', contactLimiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Forward safely to formspree securely from the backend
        const formspreeUrl = process.env.FORMSPREE_URL || 'https://formspree.io/f/xrbenbye';

        const response = await fetch(formspreeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
            console.error('Formspree returned error:', response.statusText);
            return res.status(500).json({ error: 'Failed to send message.' });
        }

        res.json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Contact route error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default router;
