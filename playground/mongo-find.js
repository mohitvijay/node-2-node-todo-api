const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to the momgodb server');
    }
    console.log('Successfully connected to the mongodb server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b670aacba2af3199430d84d')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
        
    // }, (error) => {
    //     console.log('Unable to fetch todos', error)
    // });

    db.collection('Users').find({
        name: 'Mayank Tiwari'
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));   
    }, (error) => {
        console.log('Unable to fetch user details')
    });
    client.close();
});