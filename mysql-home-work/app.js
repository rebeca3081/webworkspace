// app.js
const express = require('express');
const app = express();
const mysql = require('./db.js');

/** Middlware */
app.use(express.json()); // appication/json
app.use(express.urlencoded({ extended: false })); // application/x-www-form-urlencoded

/** Listen */
app.listen(4000, () => {
  console.log('Sever Start!, http://localhost:4000');
})

/** Routing */
// 기본경로
app.get('/', (req, res) => {
  res.send('This is a HomeWork, t_user DB Connection Practice~~');
});

// 1.전체조회
app.get('/users', async (req, res) => {
  let list = await mysql.executeQuery('userList');
  res.json(list);
});

// 2.단건조회
app.get('/users/:no', async (req, res) => {
  let userNo = req.params.no;
  let info = (await mysql.executeQuery('userInfo', userNo))[0];
  res.json(info);
});

// 3.등록
app.post('/users', async (req, res) => {
  let data = req.body.userInfo;
  let result = await mysql.executeQuery('userInsert', data);
  res.json(result);
});

// 4.수정
app.put('/users/:no', async (req, res) => {
  // let result = await updateAll(req); // 수정_ver.1
  let result = await updateInfo(req); // 수정_ver.2
  res.json(result);
});

// 수정_ver.1
async function updateAll(req) { // 수정_ver.1
  let data = [selectedInfo(req.body.userInfo), req.params.no]; // [객체, 단일값u_id]
  let result = await mysql.executeQuery('userUpdateAll', data);
  return result;
};

// client가 보내는 데이터 중에 "user_no" 필드 제외 하는 기능의 함수 (수정_ver.1)
function selectedInfo(obj) {
  let delData = ["user_no"]
  let newObj = {};
  let isTargeted = null;
  for (let field in obj) {
    isTargeted = false;
    for (let target of delData) {
      if (field == target) {
        isTargeted = true;
        break;
      };
    };
    if (!isTargeted) {
      newObj[field] = obj[field];
    };
  };
  return newObj;
};

// 수정_ver.2
async function updateInfo(req) {
  let data = [...getInfo(req.body.userInfo), req.params.no]; // 단일값 5개 : user_pw, user_name, user_age, join_date, user_no
  let result = await mysql.executeQuery('userUpdateInfo', data);
  return result;
}

// client가 보내는 데이터 해체 후 새 배열에 담는 함수 (수정_ver.2)
function getInfo(obj) {
  let getData = ["user_pwd", "user_name", "user_age", "join_date"]; // set절 컬럼명
  let newAry = [];
  for (let target of getData) {
    for (let field in obj) {
      if (field == target) {
        newAry.push(obj[field]);
        break;
      }
    }
  }
  return newAry;
};

// 5.삭제
app.delete('/users/:no', async (req, res) => {
  let userNo = req.params.no;
  let result = await mysql.executeQuery('userDelete', userNo);
  // res.json(result);
  res.sendStatus(203);
})