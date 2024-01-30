const multer = require('multer');
const express = require('express');
const app = express();

const storage = multer.diskStorage({
  destination : function(req, file, cb) {
    cb(null, 'files/'); // 콜백함수를 통해 전송된 파일 저장 디렉터리 설정
  },
  filename : function(req, file, cb) { // file : 넘어온 파일에 대한 정보가 있음
    let rename = (new Date()).getMilliseconds() + file.originalname;
    cb(null, rename); // 밀리초+파일이름으로 파일이름 재설정(파일 이름 충돌방지)
  }
});

const upload = multer({ storage : storage });
const staticUrl = '/images';

app.use(staticUrl, express.static('files'));

// 싱글
app.post('/profile', upload.single('avatar'), (req, res) => {
  // 업로드 시 이미지 미리보기 -> <img src=""> src속성이 가져야하는 경로 반환
  let imgUrl = `${staticUrl}/${req.file.filename}`;
  res.send(imgUrl);
});

// 멀티
app.post('/photos', upload.array('list'), (req, res) => {
  // ★ multer가 인식할 수 있도록 array('이름과') <input name="이름"> 이 같게 ★
  let imgUrlList = [];
  for(let file of req.files){
    let imgUrl = `${staticUrl}/${file.filename}`;
    imgUrlList.push(imgUrl);
  }
  res.send(imgUrlList);
});

app.listen(4000, () => {
  console.log('Server Start : multer');
});