const {Pool} = require('pg');
const Joi = require('joi');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "sendit_parcel",
    password: "1122",
    port: 5432
  });

  function validateParcelInfo(parcelInfo) {
    const schema = {
      parcelName: Joi.string().min(1).max(50).required(),
      status: Joi.string().min(1).max(50).required(),
      presentLocation: Joi.string().min(1).max(50).required(),
      destination: Joi.string().min(1).max(50).required(),
      userID: Joi.number().required()
    };
    return Joi.validate(parcelInfo, schema);
  }
  module.exports.pool = pool;
  module.exports.validateParcelInfo = validateParcelInfo;