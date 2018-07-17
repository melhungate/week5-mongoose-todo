const express = require("express");
const mongoose = require("mongoose");
const PORT = 8080;
const Todo = require('../models/todo');

const uri = "mongodb://localhost:27017/todoApp";

mongoose.connect(uri);

const app = express();

const todos = [];

app.get("/todos", (req, res) => {
  // get all todos
  Todo.find({})
    .then(docs => {
      //send back a list of all todos
      res.status(200).send({ message: "Success", payload: docs });
    })
    .catch(err => {
      // if can't find todos for some reason, send error
      res.status(500).send({ message: err.message });
    });
});

app.post("/todos/:todo", (req, res) => {
  // instantiate new todo model
  const todo = new Todo({
    description: req.params.todo
  });
  // save new todo model
  todo
    .save()
    .then(doc => {
      // send back successful todo saved into db
      res.status(201).json({ message: "Success", payload: doc });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

app.put("/todos/:index/:nextTodo", (req, res) => {
  const { index, nextTodo } = req.params;
  let todo = todos[index];

  if (todo) {
    todos[index] = nextTodo;
    res.status(200).json({ todo: todos[index] });
  } else {
    res.status(404).json({
      message: "The todo does not exist."
    });
  }
});

  //1. chance :index to :id 
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  //2. find the matching todo from DB and remove it
  Todo
    .findByIdAndRemove( id ) 
    .then(doc => {
      res.status(200).json({
        message: 'success',
        paylod: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
  //3. if we find a match, remove and send success message
  //4. if no match, send an error
});

app.patch('/todos/:id/complete', (req, res) => {
  const id = req.params.id;
  //1. find the todo with the id matching the param
  Todo.findByIdAndUpdate(id, {
  //2. Update the found todo with the new completed value
    completed: true
  })
  .then(doc => {
    res.status(200).json({
  //3. If successful, send back the successful todo
      message: 'updated', 
      paylod: doc
    })
  })
  .catch(err => {
  //4. if there's an error, send back the error message
    res.status(500).json({ message: err.message });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
