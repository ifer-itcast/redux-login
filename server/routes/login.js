const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbFn = require('../db');
const config = require('../config');

router.post('/login', (req, res) => {
  const sql = 'select * from user where username=? and password=?';
  dbFn(sql, [req.body.username, req.body.password], data => {
    if (data.length) {
      const token = jwt.sign({
        id: data[0].id,
        username: data[0].username
      }, config.jwtSecret);
      // 直接返回 token
      return res.send(token);
    }
    res.send({
      status: 1,
      msg: '登录失败'
    });
  });
});

module.exports = router;