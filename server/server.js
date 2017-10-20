const {ObjectID}=require('mongodb');

const _ = require('lodash');

const express=require('express');
const bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose');
var{Todo}=require('./models/todos');
var{User}=require('./models/user');
var {authenticate}=require('./middleware/authenticate');

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
});

app.delete('/todos/:id',(req,res)=>{
	var id=req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((todo)=>{
		if(todo){
			res.status(200).send({todo:todo});
		}
		else{
			res.status(404).send();
		}
	}).catch((e)=>{
		res.status(400).send();
	});
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

app.patch('/todos/:id',(req,res)=>{
	var id=req.params.id;
	// _.pick is important
	var body = _.pick(req.body, ['text','completed']);

	if(!ObjectID.isValid(id)){
		//console.log('ID is not valid');
		res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	}
	else{
		body.completed=false;
		body.completedAt=null;
	}

	Todo.findByIdAndUpdate(id,{
		$set:body
	},{new: true}).then((todo)=>{
		if(!todo){
			return res.status(404).send();
		}
		res.send({todo});

	}).catch((e)=>{
		return res.status(400).send();
	});
});

app.post('/users', (req,res)=>{
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	user.save().then(()=>{
		//console.log(user);
		return user.generateAuthToken();
	}).then((token)=>{
		//console.log('lp');
		// Header with 'x-' means we are creating a custom header
		res.header('x-auth', token).send(user);
	}).catch((e)=>{
		//console.log('lk');
		res.status(400).send(e);
	})
});



app.get('/users/me', authenticate, (req,res)=>{
	res.send(req.user);
});

app.listen(port, () => {
	console.log('Started on port: '+port);
});

module.exports = {
	app: app
};