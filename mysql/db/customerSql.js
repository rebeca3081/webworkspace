// customerSql.js
// 쿼리문은 별도 파일로 보관 -> export하여 외부에서 사용함

// 1.전체조회
let customerList = 
`select id
        , name
        , email
        , phone
        , address
from customers`;

// 2.단건조회
let customerInfo = 
`select id
        , name
        , email
        , phone
        , address
from customers
where id = ?`;
/*  1) 배열의 여부 : '?'의 갯수가 2개 이상이면 반드시 배열을 사용 (왼쪽 -> 오른쪽 : array destrucuring)
    2) '?'별로 객체 VS 단일값 구분 : 어느 컬럼에 들어가는 값인지 구분 가능여부 (조건절에 컬럼명이 명확하면 단일, 모르면 객체)
*/

// 3.등록
let customerInsert = 
`insert into customers
set ?`; // 객체 {필드명 == 컬럼명 : values}

// 4.수정_1
let customerUpdateAll =
`update customers
set ?
where id = ?`; // 배열[ 객체, 단일값 ] ?가 2개->2개 값
// 4.수정_2
let customerUpdateInfo =
`update customers
set email = ?, phone = ?, address = ?
where id = ?`; // 배열[ 단일값email, 단일값phone, 단일값address, 단일값id ] ?가 4개->4개 값


module.exports = {
  customerList,
  customerInfo,
  customerInsert,
  customerUpdateAll,
  customerUpdateInfo
}