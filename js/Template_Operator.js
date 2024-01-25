console.log('Template Literals');

let subject = 'Javascript';
let tool = 'VS code';

// 현재 수업은 "Javascript"를 진행하고
// 사용하는 툴은 "VS Code" 입니다.

let msg = '현재 수업은 "' + subject + '"를 진행하고';
// console.log(msg);
msg = '사용하는 툴은 "' + tool + '" 입니다.';
// console.log(msg);

msg =
`현재 수업은 "${subject}"를 진행하고
사용하는 툴은 "${tool}" 입니다.`;
console.log(msg);

// Spread Operator(펼침연산자)
console.log('Spread Operator');

// 배열
let arr1 = [4, 5, 6];
let arr2 = [1, 2, 3];

let arr3 = [arr1, arr2]; // 2차원배열
console.log(arr3);
// console.log(arr3[0][0]);

arr3 = [...arr1, ...arr2];
console.log(arr3);

// 문자열
let word = "Hello";
// H o l l o
let alphabet = [...word, "J", "S"];
console.log(alphabet);
console.log(typeof(arr3)); // object : 배열도 객체
console.log(Array.isArray(arr3)); // 배열인지 확인 typeOf() 사용 X

let user = {
            id : 100,
            name : "Hong",
            age : 20,
            address : "Daegu"
           };

let info = [];
for (let field in user) {
  // user.field -> {field : "js"} 사용불가
  console.log(field, user[field]);
  // 객체 -> 배열
  info.push(field);
}
console.log(info);



