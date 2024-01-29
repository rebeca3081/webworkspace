const crypto = require('crypto');
const data = 'pw1234'; // 비밀번호

let encData = crypto.createHash('sha512') // Hash 알고리즘(SHA512)
                    .update(data)
                    .digest('base64'); // 몇자리로 표시할지 .digest('base64'), .digest('hex')

console.log(data, encData);

encData = crypto.createHash('sha512')
                .update(data)
                .digest('hex');

console.log(data, encData);

// salting 암호화 기법
const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if(err) reject(err);
      resolve(buf.toString('base64'));
    });
  })
};

const createCryptoPassword = 
  async(plainPssword) => {
    const salt = await createSalt();

    return new Promise((reslove, reject) => {
      // pbkdf2(원데이터:비밀번호, salt, 반복횟수, 출력될 바이트 수, 해시알고리즘)
      crypto.pbkdf2(plainPssword,
                    salt,
                    9999,
                    64,
                    'sha512',
                    (err, key) => {
                      if(err) reject(err);
                      reslove({ password: key.toString('base64'), salt })
                    })
    })
  };

const cryptoPassword = async () => {
  encData = await createCryptoPassword(data);
  console.log(encData);
}

cryptoPassword();


createCryptoPassword(data)
.then(result => console.log(result)) // 비동기가 끝나고 실행.
.then(err => console.log(err));