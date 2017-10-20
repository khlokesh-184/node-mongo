const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');

var pass = '123abc!';

// bcrypt.genSalt(10, (err,salt)=>{
// 	bcrypt.hash(pass, salt, (err,hash)=>{
// 		console.log(hash);
// 	});
// });

var hashedPass ='$2a$10$a8MPfdlfgg9c9bNcOKkkuu/ZXmnmg6XQYnNhnCATMjpRE43P.Ld7i';
bcrypt.compare(pass,hashedPass, (err,result)=>{
	console.log(result);
});

//  
// var message = 'I am user no. 3';
// var hash = SHA256(message).toString();

// console.log('Message: '+message);
// console.log('Hash: '+hash)

// var data={
// 	id: 4
// };
// var token={
// 	data:data,
// 	hash: SHA256(JSON.stringify(data)+'somesecret').toString()
// }

// var resultHash= SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(resultHash===token.hash){
// 	console.log('Data was not changed');
// }
// else{
// 	console.log('Data was changed');
// }