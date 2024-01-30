const express = require('express'); // app.js와 같은 scope를 사용 X // .listen()이 없음, 별도 실행 불가!
const router = express.Router();

// '/user' 하위 경로 -> 공통 '/user'(app.js에 있음) 생략함
// user/
router.get('/', (req, res) => {
  res.send('회원정보조회');
})

// user/insert
router.post('/insert', (req, res) => {
  res.send('회원 등록');
})

// user/update
router.put('/update', (req, res) => {
  res.send('회원 수정');
})

// user/delete
router.delete('/delete', (req, res) => {
  res.send('회원 삭제');
})

// CRUD 기능 내보내기
module.exports = router;