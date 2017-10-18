var mongoose = require('mongoose');

//configure mongoose
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://khlokesh:khlokesh184@ds121665.mlab.com:21665/todo-app' || 'mongodb://localhost:27017/TodoApp');

//|| 

module.exports={
	mongoose: mongoose
};