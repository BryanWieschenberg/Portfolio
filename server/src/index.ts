import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initDB } from './lib/db.js';
import githubRoutes from './routes/github.js';
import blogRoutes from './routes/blog.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100, // per IP
});

const app = express();
const PORT = process.env.PORT || 3001;

app.set('trust proxy', 1);
app.use(helmet());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(limiter);

app.use('/api/github', githubRoutes);
app.use('/api/blog', blogRoutes);

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function start() {
    await initDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

start().catch(console.error);
