const fs = require('fs');
const express = require('express');
const app = express(); // 서버관리 객체
const userRouter = require('./user.js'); // router불러옴 : 파일로 인식시켜야함

// 미들웨어
// -- Request Data Process
// (1) application/json
app.use(express.json({ // 들어오는(from client) data format 을 자동으로 json으로 인식함
  limit : '50mb' // 크기제한 50MB
}))

// (2) application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}));

// -- Error
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).json({statusCode : res.statusCode,
                        errMessage : res.errMessage});
});

// (1) 기본 에러
app.get('/defaultErr', (req, res) => {
  throw new Error('기본 핸들러 동작!'); // 500번 에러(interner server error), 404(없는 경로)
});

// (2) 커스텀 에러
app.get('/customErr', (req, res, next) => {
  next(new Error('Process Fail! Check Data!'));
})

// -- Static
app.use(express.static('./files'));
app.use('/public', express.static('./files'));

// Data Loding
const jsonFile = fs.readFileSync('./db.json') // 동기식으로 파일 읽기
const jsonData = JSON.parse(jsonFile); // 문자열 -> 객체, 배열로 인식 vs 객체,배열 -> 문자열 : JSON.stringify()

// SELECT : db.json 파일에 쿼리(검색)하는 기능
const getData = (target, where) => {
  let data = jsonData[target];
  if(Array.isArray(data)) {
    let list = data;
    for(let obj of list) {
      if(obj.id == where) {
        data = obj;
      }
    }
  }
  return data;
}

//
app.use('/user', userRouter); // user.js의 Router

// 기능과 라우팅은 분리!
// 라우팅은 심플하고 명확하게!, 기능(함수)을 라우팅에서 호출해서 사용!
app.listen(3000, () => { // 서버실행(포트번호) -> .listen()은 기본적으로 1개만 실행
  console.log('Server Start');
  console.log('http://localhost:3000');
});


app.get('/', (req, res) => { // 라우팅정보 .get('경로구분(endPoint)', ('From client','To client') => {})
  res.send('Hello, Express.js World');
});

// 전체조회
app.get('/posts', (req, res) => {
  let data = getData('posts');
  res.json(data); // client에세 json타입으로 보냄
});

// 단건조회
app.get('/posts/:id', (req, res) => { // :id 경로에 변수를 선언  : -> params로 들어가서 id로 접근 할 수 있게됨
  let userId = req.params.id;
  let data = getData('posts', userId);
  res.json(data);
})

// 전체조회 - comments
app.get('/comments', (req, res) => {
  let data = getData('comments');
  res.json(data);
})

// 단건조회 - comments
app.get('/comments/:id', (req, res) => {
  let postId = req.params.id;
  let data = getData('comments', postId);
  res.json(data);
})

// 조회 - profile
app.get('/profile', (req, res) => {
  let data = getData('profile');
  res.json(data);
})

// 등록
app.post('/posts', (req, res) => {
  let data = req.body; // POST는 body에 값을 넣음
  console.log('등록', data);
  res.json(data);
})

// 수정
app.put('/posts/:id', (req, res) => {
  let postId = req.params.id; // 경로의 값
  let data = req.body; // 수정하고자 하는 값
  console.log('수정', postId, data);
  res.json({id: postId, data});
})

// 삭제
app.delete('/posts/:id', (req, res) => {
  let postId = req.params.id;
  console.log('삭제', postId);
  res.sendStatus(203); // 돌아오는 response 값이 존재하지 않아서 1.삭제여부, 2. 상태코드 보내기
})

// 검색을 포함하는 경우 - QueryString : 유연하게 대응이 가능
// list[0].id=100&list[0].name=hong&...
app.get('/search', (req, res) => {
  let keywords = req.query;
  console.log('검색 조건 구성', keywords);
  res.json(keywords);
})