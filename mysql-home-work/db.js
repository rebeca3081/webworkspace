// db.js
const mysql = require('mysql');
const sql = require('./db/t_userSql.js');

// Connection Pool 생성
const connectionPool = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'dev01',
  password: '1234',
  database: 'dev',
  connectionLimit: 10,
  debug: true,
  dateStrings: "date" // boolean | ("TIMESTAMP" | "DATETIME" | "DATE")
  // Connection options 중에 Date type -> String으로 반환하도록 함
});

// 쿼리문을 실행하고 결과를 반환하는 함수
const executeQuery = async (alias, values) => {
  return new Promise((resolve, reject) => {
    let executeSql = sql[alias];
    connectionPool.query(executeSql, values, (err, results) => {
      if (err) {
        console.log(err);
        reject({ err });
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
};

module.exports = {
  executeQuery
}