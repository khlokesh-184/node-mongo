var express=require('express');
var bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose');
var{Todo}=require('./models/todos');
var{User}=require('./models/user');

var app=express();

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

app.listen(3000, () => {
	console.log('Started on port 3000');
});