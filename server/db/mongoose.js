var mongoose = require('mongoose');

//configure mongoose
mongoose.Promise=global.Promise;

if(process.env.PORT){
mongoose.connect('mongodb://khlokesh:khlokesh184@ds121665.mlab.com:21665/todo-app');
}
//|| 
else{
	mongoose.connect('mongodb://localhost:27017/TodoApp');
}
module.exports={
	mongoose: mongoose
};