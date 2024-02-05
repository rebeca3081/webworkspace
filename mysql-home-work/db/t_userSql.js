// t_userSql.js

// 1.전체 조회
let userList =
`select user_no
      , user_id
      , user_pwd
      , user_name
      , user_gender
      , user_age
      , join_date
from t_users`;

// 2.단건조회
let userInfo =
`select user_no
      , user_id
      , user_pwd
      , user_name
      , user_gender
      , user_age
      , join_date
from t_users
where user_id = ?`; // 배열 X, 단일값

// 3.등록
let userInsert =
`insert into t_users
set ?`; // 배열 X, 객체 O (set절은 mysql에서 사용하는 부분)
// user_no는 제외(컬럼을 명확하게 적어주는것이 좋음)

// 4.수정_ver.1
let userUpdateAll =
`update t_users
set ?
where user_id = ?`; // 배열O [객체, 단일값user_id]

// 4.수정_ver.2
let userUpdateInfo =
`update t_users
set user_pwd = ?, user_name = ?, user_age = ?, join_date = ?
where user_id = ?`; // 배열O [단일값 5개] // user_pwd, user_name, user_age, join_date, user_id

// 5.삭제
let userDelete =
`delete from t_users
where user_id = ?`; // 배열X, 단일값

module.exports = {
  userList,
  userInfo,
  userInsert,
  userUpdateAll,
  userUpdateInfo,
  userDelete
}