const fs = require('fs');

const data = 'Hello, Node.js World';

// write
// fs.writeFile('./sample.txt', data, 'utf-8', (err) => { // 인코딩★
//   if(err) throw err;
//   console.log('job completed');
// });

// read
fs.readFile('./sample.txt', 'utf-8', (err, datas) => {
  if(err) throw err;
  console.log(datas);
})