console.log('array.js');

// sort()   : 정렬함수 - 기본(오름차순)
// revers() : 정렬함수 - 기본(내림차순)

let fruits = ["Banana", "Orange", "Apple", "Mango"];

fruits.sort();
console.log(fruits);

fruits.reverse();
console.log(fruits);

let points = [40, 100, 1, 5, 25, 10];
// 1, 5, 10, 23, 40, 100
points.sort();
console.log(points);

points.sort(function (a, b) {
  // 오름차순
  return a - b;
});
console.log(points);

console.clear();

// filter(): 기존배열(기준) -> 새로운배열(참이되는 조건을 return) <객체는 원본데이터에 영향이 감>
let words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

let result = words.filter((value, idx) => {
  // console.log(value, idx);
  // return 데이터타입 boolean
  // return value.length > 6;
  return value.indexOf('a') > - 1
});
console.log(result);

// 두 배열이 같은 객체를 가리키고 있음
let userList = [{ id: 100, name: 'Hong' },
                { id: 200, name: 'Jang' },
                { id: 300, name: 'Kim' },
               ];

let newList = userList.filter(obj => {
  return obj.name.indexOf('g') > - 1;
});

console.log(userList, newList);

newList.forEach(obj => {
  obj.age = 20;
});

console.log(userList, newList);


// map() : 기존배열(기준 + 데이터조작) -> 새로운배열(특정 조건을 return) <map은 배열의 길이를 줄일 수 없음>
userList = [{ id: 100, name: 'Hong' },
            { id: 200, name: 'Jang' },
            { id: 300, name: 'Kim' },
           ];

let = newArray = userList.map(function (obj) {
  // return 데이터 타입의 제한이 없음
  return obj.id < 300 ? obj.name : null;
});

console.log(userList, newArray);

console.clear();

newList = userList.map((obj) => { // 참조객체의 내부를 변화시키지 않고 map을 사용하여 새로운 객체를 반환 가능함
  return {
    id: obj.id,
    name: obj.name
  };
});

console.log(userList, newList);

newList.forEach(obj => {
  obj.age = 20;
});

console.log(userList, newList);

console.clear();

// reduce() : 누적합계
let nums = [50, 12, 999, 6, 100];
let sumRes = nums.reduce(function (total, value) {
  return total + value;
}, 0);

console.log(sumRes);
