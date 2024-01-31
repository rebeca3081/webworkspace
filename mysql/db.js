// db.js
const mysql = require('mysql');
const sql = require('./db/customerSql.js'); // sql.customerList

// Connection Pool 생성
const connectionPool = mysql.createPool({ // 기본 AutoCommit , Transactions제어시 메소드로 따로 설정이 필요(npm mysql문서에서 확인하기!)
  host : '127.0.0.1', // IP(localhost)
  port : '3306',
  user : 'dev01',
  password : '1234',
  database : 'dev',
  connectionLimit : 10, // DB가 허용하는 범위내 최대 connection 수
  debug : true // connection pool에 대한 log를 볼 수 있음 (sql문 보기위함)
});

// 쿼리문을 실행하고 결과를 반환하는 함수 ★★★★★
const executeQuery = async (alias, vaules) => { // Promise에 대한 결과를 기다리겠다
  return new Promise((resolve, reject) => { // 비동기작업 : DB와의 통신 / 서버통신(API) / 파일 읽고쓰기
    // Promise객체 자체를 return 하는 것은 promise의 처리가 비동기적으로 일어나기 때문에 언제 결과가 return 될지 모름
    let executeSql = sql[alias] // 객체의 필드(메서드)를 불러옴 (sql.customerList)
    connectionPool.query(executeSql, vaules, (err, results) => { // select문 -> 배열, DML -> 객체 : 후처리가 필요함
      if(err) {
        console.log(err);
        reject({err});
      } else {
        console.log(results)
        resolve(results);
      }
    })
  })
}

module.exports = {
  executeQuery
}