//HAS NOTHING TO DO WITH THE CODE

const express = require("express");
const { Pool } = require("pg");
const app = express();

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "sendit_parcel",
  password: "1122",
  port: 5432
});
app.get("/", (req, res) => {
  pool.query("SELECT * FROM userInfo ORDER BY id ASC", (error, result)=> {
      if(error) console.log(error)
    res.send(result.rows);
  })
});

app.listen(3000, ()=>console.log('Server Started on port 3000'));