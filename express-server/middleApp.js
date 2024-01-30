const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

// app.use(cors());

// 1) body-parser : 내장 모듈 사용
// application/x-www-form-urlencoded
const defaultParser = express.urlencoded({extended : false}); // 확장은 X

// application/json
const jsonParser = express.json();

// 모든(전역) routing에 대한 middleware 적용
// app.use(defaultParser);
app.use(jsonParser);

// 특정 method에 대한 middleware 적용
app.get('/search', defaultParser, (req, res) => {
  let data = req.query.keyword; // GET -> req.query : query인지 body인지는 method에 따라 결정됨
  res.send(data + ', 검색결과');
})
// /search?keyword=${value}

app.post('/info', defaultParser, (req, res) => {
  let data = req.body.name; // POST -> req.body
  res.send('welcome, ' + data);
});
// /info => method:post, body:name=${value}

app.post('/message', (req, res) => { // jsonParser
  let data = req.body.param; // param -> obj {}
  res.send(data.title + ', ' + data.content);
})
// /message => method:post, body:{"param":{"titel" :"${value}", "content":"${value}"}}

app.listen(5000, () => {
  console.log('Server Start');
})

let sessionSetting = session({
  secret : 'Hav@ea#Go!odDa5Y', // 하드코딩 X -> 임시로 넘기도록함 env(환경변수)
  resave : false, // 세션에 변경사항이 없어도 항상 다시 저장할지 여부
  saveUninitialized : true, // 초기화 되지 않은 세션을 스토어(저장소)에 강제로 저장할지 여부
  cookie : { // 세션 쿠키설정
    httpOnly : true, // 자바스크립트를 통해서 쿠키정보를 볼 수 없음(document.cookie 불가)
    secure : false, // protocol이 https에서만 되도록 설정할지 여부
    maxAge : 60000 // msec
  }

});

// session : 필요한 정보만!(비밀번호 X)
app.use(sessionSetting);

// app.get('/', (req, res) => {
//   res.json(req.session);
// });

// 로그인
app.post('/login', (req, res) => {
  const { id, pwd } = req.body;
  if(!req.session.isLogin) {
    req.session.user = id;
    req.session.isLogin = true;
  }
  req.session.save((err) => { // session에 실제로 저장해서 값을 가지고 있도록 함.
    if(err) throw err;
    res.redirect('/');
  });
});

// 로그아웃
app.get('/logout', (req, res) => {
  req.session.destroy(); // 세션 파괴
  res.redirect('/');
})

// cors
const corsOptions = {
  origin : 'http://127.0.0.1:5500', // 허용할 도메인 ('*' 금지)
  optionsSuccessStatus : 200 // legacy browser 고려
};

app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.json(req.session);
});