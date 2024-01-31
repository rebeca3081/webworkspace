// app.js
const express = require('express');
const app = express();
const mysql = require('./db.js');
// mysql.executeQuery(); // sql실행 메소드

/* 미들웨어 */
// application/json
app.use(express.json()); // express 내장 메소드

// application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}));

// 커스텀 미들웨어도 가능 // app.use(function(req, res, next) {})


// listen(3000)
app.listen(3000, () => {
  console.log('Server Start, http://localhost:3000');
});

/* 라우팅 */
// 1.전체조회
app.get('/customers', async (req, res) => {
  // 동기적(executeQuery 처리후 응답 보내기)으로 처리해야함
  let list = await mysql.executeQuery('customerList'); // Promise객체가 넘어오는데 순서가 언제일지 모름
  res.json(list);
});

// 2.단건조회
app.get('/customers/:id', async (req, res) => {
  let customerId = req.params.id;
  let info = (await mysql.executeQuery('customerInfo', customerId))[0]; // info = info[0];
  // select 문의 결과는 배열로 넘어옴 -> [0]번째 인덱스(딱 1건만)를 res에 넘김
  res.json(info); // 전체든 단건이든 똑같이 배열로 넘어옴 []
});

// 3.등록
app.post('/customers', async (req, res) => {
  let data = req.body.param; // body중에 param필드만 등록 => 객체로 넘겨야함
  let result = await mysql.executeQuery('customerInsert', data);
  res.json(result);
});

// 4.수정
app.put('/customers/:id' , async (req, res) => {
  // let result = await updateAll(req); // 수정_1
  let result = await updateInfo(req); // 수정_2
  res.json(result);
});

// 수정_1
async function updateAll(request) {
  let data = [ selectedInfo(request.body.param), request.params.id ]; // set잘?(객체), id=?(단일)
  let result = await mysql.executeQuery('customerUpdateAll', data);
  return result;
};
// 수정_2
async function updateInfo(request) {
  let data = [ ...getInfo(request.body.param), request.params.id ]; // 단일값 4개 : email, phone, address, id
  let result = await mysql.executeQuery('customerUpdateInfo', data);
  return result;
};

// id 필드 삭제하기 (수정_1에서 사용)
function selectedInfo(obj) {
  let delData = ["id", "email"]; // ["id", "email", ..] // 객체에서 제거되어야하는 필드명
  let newObj = {};
  let isTargeted = null;
  for( let field in obj ) { // field: id, name, email, phone, address
    isTargeted = false;
    for( let target of delData ) {
      // console.log(field, target);
      if(field == target) {
        isTargeted = true;
        break;
      }
    }
    if(!isTargeted) { // 삭제 대상이 아닐 경우에만 새객체에 값을 복사
      newObj[field] = obj[field];
    }
  }
  return newObj;
};

// 클라이언트의 값 해체 후 새 배열에 담기 (수정_2에서 사용)
function getInfo(obj) {
  let getData = ["email", "phone", "address"]; // set절의 순서와 같게!
  let newAry = [];
    for( let target of getData ) {
      for(let field in obj) {
        if(field == target) {
          newAry.push(obj[field]);
          break;
        }
      }
    }
    return newAry; // [ "seri@mail.com", "010-1234-0000", null]
};

// 5.삭제 ==> 단건조회랑 비슷함!