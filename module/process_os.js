// 모듈을 받아오는 코드는 맨위에 모아놓기!
const process = require('process');
const os = require('os');

console.log(process.env); // 사용자 환경을 포함하는 객체
console.log('===================================================================================');
console.log(os.cpus()); // 컴퓨터의 CPU 코어 정보를 배열로 리턴
console.log(os.tmpdir()); // 임시 파일 저장경로
