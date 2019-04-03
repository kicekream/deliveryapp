const {Pool} = require('pg');
const Joi = require('joi');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "sendit_parcel",
    password: "1122",
    port: 5432
  });

  function validateUser(userInfo) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(1).max(50).email().required(),
        password: Joi.string().min(8).max(50).required()
    }
    return Joi.validate(userInfo, schema);
}

module.exports.pool = pool;
module.exports.validateUser = validateUser;