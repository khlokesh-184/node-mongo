const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required:true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {

			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	tokens: [{
		access:{
			type: String,
			required:true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON=function(){
	var user=this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id','email']);
}

// Schema allows us to add custon methods for User instances
// Here arrow function is not used so that we can use this keyword clearly
UserSchema.methods.generateAuthToken = function (){
	var user=this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, '1234').toString();
	user.tokens.push({
		access: access,
		token: token
	});
	var ret= user.save().then(()=>{
		return token;
	});

	//console.log(ret);
	return ret;
};

UserSchema.statics.findByCredentials= function(email,password){
	var User=this;
	return User.findOne({email}).then((user)=>{
		if(!user){
			return Promise.reject();
		}
		return new Promise((resolve,reject)=>{
			bcrypt.compare(password, user.password, (err,result)=>{
				if(result){
					resolve(user);
				}else{
					reject();
				}
			})
		})
	});
};

//every method to statics(here findByToken) is a model method
UserSchema.statics.findByToken = function (token){
	var User=this;
	var decoded;

	try{
		decoded= jwt.verify(token, '1234');
	}catch(e){
		// return new Promise((resolve,reject)=>{
		// 	reject();
		// });
		//This above code can be written as following
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.methods.removeToken = function(token){
	var user=this;
	return user.update({
		$pull: {
			tokens: {
				token: token
			}
		}
	});
};

UserSchema.pre('save', function(next){
	var user = this;

	if(user.isModified('password')){
		bcrypt.genSalt(10, (err,salt)=>{
		bcrypt.hash(user.password, salt, (err,hash)=>{
			user.password=hash;
			next();
		});
	});
	}else{
		next();
	}

});

var User=mongoose.model('User',UserSchema);

module.exports={
	User:User
};