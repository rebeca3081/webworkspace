console.log('Promise');

let test = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('비동기 작업 실행');
    // resolve('작업성공');
    reject('작업실패') // .catch()에 결과가 전달됨.
    }  
  , 1000);
})

// test; // .then().catch() 없이도 실행가능

test
.then(data => console.log('then', data))
.catch(err => console.log('catch', err))
.finally(() => console.log('작업 끝!'));