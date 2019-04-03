const jwt = require('jsonwebtoken');
const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require('joi');
const config = require('config');

const { pool, validateUser } = require("../models/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  pool.query(
    "INSERT INTO userInfo (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password],
    (error, results) => {
      if (error) {
        return res.status(400).send(error.detail);
      }
      const token = jwt.sign({email: results.rows[0].email, isAdmin: results.rows[0].isAdmin}, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(`${name} \n${email} registered`)
    }
  );
});

router.post("/login", async(req, res)=>{
  const {error} = validateLogin(req.body);
  if(error) return res.status(400).send(error.details[0].message);
const {email, password} = req.body;
const checkmail = "SELECT * FROM userInfo where email = $1";
const getLogin = await pool.query(checkmail ,[email]);

try{
  if(email !== getLogin.rows[0].email) {return res.status(400).send('Invalid email provided')};
const compPassword = await bcrypt.compare(password, getLogin.rows[0].password);
 if(!compPassword) return res.status(400).send('Invalid Password');

const token = jwt.sign({email: getLogin.rows[0].email, isAdmin: results.rows[0].isAdmin}, config.get('jwtPrivateKey'));
 res.header('x-auth-token', token).send('logged in');
}
catch(error) {
  return res.status(400).send('Invalid email or Password');
}
});

function validateLogin(login) {
  const schema = {
    email: Joi.string().min(1).max(50).email().required(),
    password: Joi.string().min(8).required()
  }
  return Joi.validate(login, schema)
}

module.exports = router;