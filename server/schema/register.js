const Joi = require('@hapi/joi');

const registerSchema = {
  body: {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.ref('password')
  }
};
module.exports = {
  registerSchema
};