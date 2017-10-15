// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').findOneAndDelete({
    _id: new ObjectID("59e398a9f1014e2b96834e61")
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  });


  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('59e3b5a0f1014e2b9683566f')
  // },{
  //   $set:{
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false
  // }).then((result)=>{
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59e37ab1a709552b9c0d2aab')
  },{
    $set:{
      name: 'Sunny'
    },
    $inc:{
      age: +2
    }
  },{
    returnOriginal: false
  }).then((result)=>{
    console.log(result);
  })
  // mjf
  // db.close();
});
