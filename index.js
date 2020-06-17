const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017';
const express = require('express');
const app = express();
const Todo = require('./models/Todo');

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('MongoDB connected...'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.render('index', { todos });
});

app.post('/', async (req, res) => {
    const newTodo = new Todo({
        name: req.body.name
    });
    await newTodo.save();
    res.redirect('/');
});

app.listen(3000, () => console.log('Server on port 3000'));
