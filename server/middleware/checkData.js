const joi = require('@hapi/joi');
module.exports = schemas => (req, res, next) => {
  ['body', 'query', 'params'].forEach(item => {
    // 如果当前循环的这一项 schema 没有提供，则不执行对应的校验
    if (!schemas[item]) return;
    // 执行校验，规则，数据
    // const { error } = joi.object(data.body).validate(req.body);
    const schema = joi.object(schemas[item]);
    const {
      error
    } = schema.validate(req[item]);
    if (error) {
      throw error;
    }
  });
  next();
};