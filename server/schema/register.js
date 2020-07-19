const Joi = require('@hapi/joi');

const registerSchema = {
  body: {
    username: Joi.string().required().error(new Error('用户名不符合规范')),
    email: Joi.string().email().required().error(new Error('邮箱不符合规范')),
    password: Joi.string().required().error(new Error('密码不符合规范')),
    passwordConfirm: Joi.ref('password')
  }
};
module.exports = {
  registerSchema
};