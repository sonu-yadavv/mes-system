const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'backend',
  database: 'mes_db',
  password: 'aditya',
  port: 5432,
});

module.exports = pool;