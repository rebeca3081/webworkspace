// db.js
const mysql = require('mysql'); // 모듈
const sql = require('./db/t_userSql.js'); // 쿼리문

console.dir(process.env);

// Connection Pool 생성
const connectionPool = mysql.createPool({
  // 민감한 DB정보는 하드코딩X, 동적으로 가져올 수 있도록 함.
  host: process.env.MYSQL_HOST, // DB의 IP
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB, // mysql은 어떤 database를 사용할지 적어야함
  connectionLimit: process.env.MYSQL_CONNECT_LIMIT,
  debug: true
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