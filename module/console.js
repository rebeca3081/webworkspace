// 모듈을 받아오는 코드는 맨위에 모아놓기!
const fs = require('fs');
const { Console } = require('console');

// 각 파일에 로그 담기게 스트림을 열어줌
const output = fs.createWriteStream('./stdout.log'); // './' node.js에서 같은경로 알려주기 위함
const errorOutput = fs.createWriteStream('./stderr.log');

// log를 남기는 주체 : logger
const logger = new Console({ stdout : output, stderr : errorOutput });

const msg = 'Log Writing';

logger.log('Result : %s', msg); // stdout
logger.error(`Result : ${msg}`); // stderr