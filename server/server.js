let express = require('express');
let bodyParser = require('body-parser')

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { Users } = require('./models/user');

var app = express();

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    // let todo = new Todo({
    //     text: req.body.text
    // });
    // todo.save().then((doc) => {
    //     res.send(doc);
    // }, (error) => {
    //     res.status(400).send(error);
    // })
    let newTodo = new Todo({
        text: req.body.text
    });

    newTodo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})