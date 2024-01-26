// 모듈을 받아오는 코드는 맨위에 모아놓기!

// 1. 개별로 받아오기
// const { defaultNum, add } = require('./calculator');
// console.log(defaultNum, add(1, 2));
// console.log(typeof(defaultNum));

// 2. 객체로 받아오기
const cal = require('./calculator.js');
console.log(cal.defaultNum, cal.add(1, 2));
console.log(typeof(cal));
console.log(typeof(cal.defaultNum));

// 3. 방식변경
// import cal from './calculator.js'
// console.log(cal.add(1, 2));