import pg from 'pg';

import "./../setup.js";

const user = 'postgres';
const password = process.env.PASSWORD;
const host = 'localhost';
const port = 5432;
const database = 'starfighters';

const { Pool } = pg;
const connection = new Pool({
    user,
    password,
    host,
    port,
    database
});

export default connection;