const {SHA256} = require ('crypto-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var password = '124abx!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt , (err,hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$iaV77EHWSbLVqkKSWh80iu3B0U4SDa2E24Dscnw3W7LSns1aIS9/O';
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
})
// let data ={ 
//     id: 10
// }

// let token = jwt.sign(data, '123abc');
// console.log(token); 

// let decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// let message = "I am message 3";
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//     id:  4
// }

// let token = {
//     data,
//     hashed: SHA256(JSON.stringify(data) + 'somesecret').toString()
// } 
// // token.data.id = 5;
// // token.hashed = SHA256(JSON.stringify(data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();


// if(resultHash === token.hashed) {
//     console.log('Data is not changed');
// }
// else {
//     console.log('Data is changed, Do not trust');
// }