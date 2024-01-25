console.log('parameter');

// Default Function Parameter (매개변수의 기본값)
function getComment(user = 'Anony', msg = 'no comment') {
  let result = `${msg}, from ${user}`;
  console.log(result);
};

getComment('Han', 'Today is ...');
getComment('Adward');
getComment(undefined, 'Hello World');
getComment(); // 매개변수가 없어도 기본값의 매개변수의 설정된 값이 나옴


// Rest Parameter(나머지 파라미터)
function plus(x = 0, y = 0, ...args) { // args는 반.드.시 가장 마지막 매개변수로 들어가야함!
  let result = x + y;
  for(let num of args) {
    result += num;
  }
  return result;
}

console.log(plus(9));
console.log(plus(10, 50, 90, 1245));

let ary = [1, 2, 3, 4, 5, 6, 7];
console.log(plus(...ary)); // Spread Operator