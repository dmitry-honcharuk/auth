/* eslint-disable @typescript-eslint/no-var-requires,no-undef*/

require('dotenv').config();
const Joi = require('joi');

const { error } = Joi.object({
  JWT_COOKIE_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  MONGO_DB_USER: Joi.string().required(),
  MONGO_DB_PASSWORD: Joi.string().required(),
  MONGO_DB_NAME: Joi.string().required(),
  PASSWORD_SECRET: Joi.string().required(),
}).validate(process.env, { allowUnknown: true });

if (error) {
  throw error.message;
}
