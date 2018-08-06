const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');

// var id =  '5b6825dcfd86441fd455d694';

// if(!ObjectID.isValid(id)) {
//   return console.log('Id is not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ', todo);
// });

// Todo.findById(id).then((todo)=> {
//     if(!todo) {
//         return console.log('Unable to find id');
//     }
//     console.log('Todo: ', todo);
// }).catch((e)=> {
//     console.log(e);
// });

let id = '6b68276bb08707313c6d4215'

if(!ObjectID.isValid(id)) {
    return console.log('Id is not valid');
}

Users.findById(id).then((users) => {
    if(!users) {
       return console.log('Unable to find the data for the given ID');
    }
    console.log(users);
}).catch((e) => {
    console.log('Unable to get the data');
});