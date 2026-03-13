import pg from 'pg';

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true },
    max: 5,
});

export async function initDB() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_views (
      slug TEXT PRIMARY KEY,
      count INTEGER DEFAULT 0
    )
  `);
    console.log('Database initialized');
}

export default pool;
