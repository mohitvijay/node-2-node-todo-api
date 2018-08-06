const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to the server');
    }
    console.log('Successfully connected to the server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b67df1ed1a1850320fabfbe')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').findOneAndUpdate({
    //     _id: new ObjectID('5b671593739f7922146e9240')
    // }, {
    //     $set: {
    //         name: 'Mohit Vijayvargiya'
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2));
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b671593739f7922146e9240')
    }, {
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    },(error) => {
        console.log(error);
    })
});