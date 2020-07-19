const express = require('express');
const app = express();

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use('/api', require('./routes/register'));

app.use((err, req, res, next) => {
  res.send({
    status: 1,
    msg: err.message || err
  });
});

app.listen(8888, () => console.log('Server running on http://localhost:8888'));