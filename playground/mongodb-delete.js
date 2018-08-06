const {MongoClient, ObjectID}  = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
       return console.log('Unable to connect to the server');
    }
     console.log('Connected to the server successfully');
     const db = client.db('TodoApp');

     //deleteMany
    //  db.collection('Todos').deleteMany({
    //      text: 'Eat lunch'
    //  }).then((result) => {
    //      console.log(result);
    //  });

    //deleteOne 
    // db.collection('Todos').deleteOne({
    //     text: 'Eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete the data');
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({
    //     name: 'Mohit Vijayvargiya'
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b67158390b23a045c686c9b')
    }).then((result) => {
        console.log(result);
    }, (error) => {
        console.log(error);
    });
});
