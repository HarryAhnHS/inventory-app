const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
    throw new Error("Environment variable missing")
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

module.exports = pool;