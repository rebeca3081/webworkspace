const defaultNum = 1;

function add(num1, num2) {
  return num1 + num2;
}

function minus(num1, num2) {
  return num1 - num2;
}

function multi(num1, num2) {
  return num1 * num2
}

function divide(num1, num2) {
  return num1 / num2;
}

// node.js 기반
// 외부로 함수에 대해서 정의를 함 (외부에 노출 시킬 함수를 지정: 보안 + 자원을 효율적으로 사용)
// ★ 반드시 마지막에 적기!! ★
module.exports = { // 객체
// export default {  // html + js (웹브라우저)기반 - 객체
  defaultNum : defaultNum,
  add, // "add"(변수명) : add(함수이름)
  minus, // "minus" : minus
  multi,
  divide
}