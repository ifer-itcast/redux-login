const express = require('express');
const app = express();
const Joi = require('@hapi/joi');

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use('/api', require('./routes/register'));
app.use('/api', require('./routes/login'));

app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) {
    err = [err.details[0].context.label, err.details[0].message];
  }
  res.send({
    status: 1,
    msg: err.message || err
  });
});

app.listen(8888, () => console.log('Server running on http://localhost:8888'));