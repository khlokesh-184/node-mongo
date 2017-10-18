const {ObjectID}=require('mongodb');

var express=require('express');
var bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose');
var{Todo}=require('./models/todos');
var{User}=require('./models/user');

var app=express();

const port=process.env.PORT || 3000;

console.log(process.env.PORT);

//bpdy-parser is a middleware for express
//bodyParser.json() returns a function which express can use
app.use(bodyParser.json());

//"/todos" is used to create a new todo
app.post('/todos', (req,res)=> {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e);
	})
});

app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
		res.send({
			todos: todos
		});
		},(e)=>{
			res.status(400).send(e);
		});
})

app.listen(port, () => {
	console.log('Started on port: '+port);
});

app.get('/todos/:id',(req,res)=>{
	var id=req.params.id;

	if(!ObjectID.isValid(id)){
		//console.log('ID is not valid');
		res.status(404).send();
	}

	Todo.findById(id).then((todo)=>{
		if(todo){
			res.send({todo});
		}
		else{
			res.status(404).send();
		}
	}).catch((e)=>{
		res.status(400).send();
	});

});

module.exports = {
	app: app
};