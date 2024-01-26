const path = require('path');

console.log('==절대경로==')
console.log(__filename);
console.log(__dirname);

console.log('실제 파일명 : ', path.basename(__filename));
console.log('확장자 ', path.extname(__filename));

let pathList = process.env.PATH.split(path.delimiter);
console.log(path.delimiter);
console.table(pathList);

console.log(path.sep); // '\' 한 개
console.table(pathList[2].split(path.sep)); // 눈으로 보이는건  '\\' 두 개 : 보이는데로 자르지말고 .sep 사용하기!