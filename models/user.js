const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "sendit_parcel",
    password: "1122",
    port: 5432
  });

  module.exports.pool = pool;