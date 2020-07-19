const dbFn = require('../db');

module.exports = (req, res) => {
  const sql = 'insert into user values (null, ?, ?, ?, ?)';
  // 注意数组中的顺序要和数据库对应
  const arr = [req.body.email, req.body.username, req.body.password, req.body.passwordConfirm];
  dbFn(sql, arr, data => {
    if (data.affectedRows === 1) {
      res.send({
        status: 0,
        msg: '注册成功'
      });
    } else {
      res.send({
        status: 1,
        msg: '注册失败'
      });
    }
  });
};