function format(value) {
  return ('0' + value).slice(-2); // 2자리로 출력
};

function getDateTime() {
  
  let today = new Date();

  let year = today.getFullYear();
  let month = format(today.getMonth() + 1);
  let day = format(today.getDate());
  let hour = format(today.getHours());
  let minute = format(today.getMinutes());
  let second = format(today.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
};

console.log(getDateTime());

//setTimeout() : return 콜백함수에 대해 넘버링이 됨
const timeout = setTimeout(() => {
  console.log(getDateTime());
}, 3000);

// clearTimeout(timeout); // 콜백함수 취소(잘 사용X)

// setInterval() -> 반복문안에 넣지말기
let count = 0;
const interval = setInterval(() => {
  console.log('count', ++count)
  if(count == 5) {
    clearInterval(interval);
  }
  console.log(getDateTime());
}, 2000)

// setImmedate()
setImmediate(() => {
  console.log('setImmediate', getDateTime());
});

console.log('마지막 코드');