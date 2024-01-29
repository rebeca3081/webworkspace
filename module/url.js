let data = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash';

// 레거시 API : parsing
const url = require('url');
let legercy = url.parse(data);
console.log(legercy);

// WHATWG(웹표준) API : 새로운 class를 생성 -> origin이 들어감
const whatwg = new URL(data);
console.log(whatwg); // searchParams: URLSearchParams { 'query' => 'string' } (fetch사용 시 필요, 'POST')
console.log(whatwg.searchParams instanceof URLSearchParams); // true
console.log(whatwg.searchParams.get('query')); // .get('key') -> value를 가져옴