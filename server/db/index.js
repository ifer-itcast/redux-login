const mysql = require('mysql');
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'react_redux'
});
module.exports = (sql, arr, callback) => {
  db.query(sql, arr, function (error, result) {
    if (error) {
      return console.log(new Error(error));
    }
    callback(result);
  });
};