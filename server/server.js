require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { Users } = require('./models/user');
let {authenticate} = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT;
app.use(bodyParser.json());
app.post('/todos', authenticate, (req, res) => {
    // let todo = new Todo({
    //     text: req.body.text
    // });
    // todo.save().then((doc) => {
    //     res.send(doc);
    // }, (error) => {
    //     res.status(400).send(error);
    // })
    let newTodo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    newTodo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send(e);
    });

    // Todo.findById(id).then((todo) => {
    //     res.send(todo);
    // });
});

app.delete('/todos/:id',authenticate, (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(404).send();
    });
});

app.patch('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: _id,
        _creator: req.user._id
    }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new Users(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);

});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    res.send(body);

    Users.findByCredentials(body.email, body.password).then((user) => {
     return user.generateAuthToken().then((token) => {
          req.header('x-auth', token).send(user);
      });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    },() => {
        res.status(400).send();
    })
})
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})