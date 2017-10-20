const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _=require('lodash');

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
	return user.save().then(()=>{
		return token;
	});
};




var User=mongoose.model('User',UserSchema);

module.exports={
	User:User
};