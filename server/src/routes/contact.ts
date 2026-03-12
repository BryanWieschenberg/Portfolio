import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';

const router: Router = express.Router();

// Strict rate limiter for contact form: max 2 requests per hour per IP
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20,
    message: { error: 'Too many requests. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/', contactLimiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Type check
        if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
            return res.status(400).json({ error: 'Invalid field types.' });
        }

        // Trim and strip HTML tags
        const sanitize = (str: string) => str.trim().replace(/<[^>]*>/g, '');
        const cleanName = sanitize(name);
        const cleanEmail = email.trim();
        const cleanMessage = sanitize(message);

        // Presence check
        if (!cleanName || !cleanEmail || !cleanMessage) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        // Length limits
        if (cleanName.length > 100) {
            return res.status(400).json({ error: 'Name must be 100 characters or fewer.' });
        }
        if (cleanEmail.length > 254) {
            return res.status(400).json({ error: 'Email is too long.' });
        }
        if (cleanMessage.length > 5000) {
            return res.status(400).json({ error: 'Message must be 5,000 characters or fewer.' });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({ error: 'Invalid email address.' });
        }

        // Forward safely to formspree securely from the backend
        const formspreeUrl = process.env.FORMSPREE_URL;
        if (!formspreeUrl) {
            console.error('FORMSPREE_URL environment variable is not set');
            return res.status(500).json({ error: 'Server configuration error.' });
        }

        const response = await fetch(formspreeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ name: cleanName, email: cleanEmail, message: cleanMessage }),
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
