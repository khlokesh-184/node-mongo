var mongoose = require('mongoose');

//configure mongoose
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://khlokesh:khlokesh184@ds121665.mlab.com:21665/todo-app');

//|| 

module.exports={
	mongoose: mongoose
};