console.log('arrow.js');

// 함수 선언식 => var 선언자 (전역함수)
function hello(name) {
  console.log(name);
}

function hello(msg) {
  console.log('출력 : ' + msg);
}

// hello2() // error (Cannot access 'hello2' before initialization)

// 함수 표현식 => const 선언자와 같은 level로 사용 : 함수 중복선언을 방지 + 추적성이 있음
const hello2 = function (name) {
  console.log('hello, ' + name);
}

// 함수표현식을 화살표 함수로 표현 
const hello3 = (name) => console.log('hello, ' + name);

hello3('Javascript'); // ★ 호출전에 함수표현식이 선언되어있어야 함


// 화살표 함수 문법
let msg = msg => console.log('result, ' + msg); // 매개변수가 1개이면 매개변수의 () 생략가능
msg = () => console.log('Hello, World'); // () 빠지면 명확하지 않게 되기 때문에 매개변수가 없으면 꼭 ()써야함
msg = (x, y) => console.log(x + y);

msg = (x, y) => {
  let result = x + y;
  console.log(result);
};
console.clear();

// 화살표 함수와 this의 연관성
let array = [1, 3, 5, 7];

array.forEach(function(value, idx) {
  console.log(value, this);
});

array.forEach((value, idx) => {
  console.log(value, this); // this가 출력되지 않음
})