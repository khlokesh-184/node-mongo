var mongoose = require('mongoose');

//configure mongoose
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI , {useMongoClient: true});

//|| 'mongodb://localhost:27017/TodoApp'

module.exports={
	mongoose: mongoose
};