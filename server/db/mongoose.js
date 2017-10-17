var mongoose = require('mongoose');

//configure mongoose
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://khlokesh-184:khlokesh184@ds121945.mlab.com:21945/my-todos' || 'mongodb://localhost:27017/TodoApp');


module.exports={
	mongoose: mongoose
};