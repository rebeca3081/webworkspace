console.log('Destructuring');

// Object (객체 구조 분해 할당)
function getUserInfo() {
  return {
    firstName: 'John',
    lastName: 'Doe',
    age: 37,
    email: 'john@gmail.con',
    city: 'New York',
    country: 'USA',
    info: function () {
      return 'My Name is ' + this.lastName;
    }
  };
}

let user = getUserInfo();
console.log(user);
console.log(user.info());
let { firstName, lastName, info } = getUserInfo();
console.log(firstName, lastName);
console.log(info());

// Array Destructuring (배열의 구조 분해 할당)
let ary = [1, 2, 3];

let [x, y, z] = ary;
console.log(x, y, z);

let [a, b] = ary;
console.log(a, b);

let [e, f, g, h] = ary;
console.log(e, f, g, h);
