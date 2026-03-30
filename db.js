const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    database: 'project-name',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    max: 25,
});

module.exports = pool;