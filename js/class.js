console.log('Class');
// 1. ES6 이전
// 재생산을 위한 객체 -> 생성자 함수 + 즉시실행 함수

// 정의 하자마자 즉시 실행되어 내부에 정의된 객체의 정보를 var Person에 담음
// var Person = (function () {

//   // 객체가 가질 필드
//   function Person(name) { // 함수명이 대문자일 경우, 생성자함수(객체 정의용도)
//     this._name = name; // _ 는 직접 접근을 제한(숨겨진 필드임을 알림, 실제 접근은 가능하지만 약속.)
//   }
  
//   // 객체가 가질 메소드
//   Person.prototype.sayHi = function () {
//     console.log('Hi ' + this._name);
//   }
  
//   // 필드에 접근할 Setter, Getter
//   Person.prototype.setName = function (name) {
//     this._name = name;
//   }
  
//   Person.prototype.getName = function () {
//     return this._name;
//   }

//   return Person;
// })();

// let userA = new Person('Hong');
// userA.sayHi();
// userA.setName('Adward');
// userA.sayHi();
// console.log(userA._name);


// 2.ES6 class는 - let, const
class Person {
  // 생성자
  constructor(name) {
    this._name = name;
  }

  // 메소드
  sayHi() {
    console.log('Hi, new ' + this._name);
  }

  // Setter, Getter
  set name(name) { // class의 set메서드: 명시적 setter 필드를 생성한것!
    this._name = name;
  }

  get name() { // getter가 없으면 ReadOnly!
    return this._name;
  }
}

let userB = new Person('Hong');
userB.sayHi();
userB.name = 'Lee'; // name이라는 필드는 선언하지 않았지만 setter를 통해 값 입력 가능
console.log(userB.name); // _name이 가지고 있는 값이 return 됨
userB.name = 'Jang';
userB.sayHi();
