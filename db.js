const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'db', // Change 'localhost' to 'db' (Docker service name)
  database: process.env.PGDATABASE || 'mes_db',
  password: process.env.PGPASSWORD || 'aditya',
  port: process.env.PGPORT || 5432,
});

module.exports = pool;