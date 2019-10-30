'use strict';

const express = require('express');
const app = express();

let db = require('../__data__/db.js');

app.use(express.json());

/**
 * Get a list of records for a given model
 * Model must be a proper model, located within the ../models folder
 * @route GET /api/v1/{model}
 * @param {model} model.path - Model Name
 * @security basicAuth
 * @returns {object} 200 { count: 2, results: [ {}, {} ] }
 * @returns {Error}  500 - Server error
 */

// Default Route
app.get('/', (req, res, next) => {
  res.send('Hello honey, I\'m HOME!');
});

// Route to Get all People
app.get('/people', (req, res, next) => {
  let count = db.people.length;
  let results = db.people;
  res.json({ count, results }); // res.send + convert the contents of send to json
});

// Route to Get all Teams
app.get('/teams', (req, res, next) => {
  let count = db.teams.length;
  let results = db.teams;
  res.json({ count, results }); 
});

// Route to Get a person
app.get('/people/:id', (req, res, next) => {
  // the colon (:key) is what tells us to store this key in
  // req.params.key
  let id = req.params.id;
  let record = db.people.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

// Route to Create a person
app.post('/people', (req, res, next) => {
  let record = req.body;
  record.id = db.teams.length+=100;
  db.people.push(record);
  res.json(record);
});

// Route to Update a person
app.put('/people/:id', (req, res, next) => {
  let id = parseInt(req.params.id);
  let record = db.people.filter(record => record.id === id);
  record[0].firstName = req.body.firstName;
  record[0].lastName = req.body.lastName;
  record[0].birthday = req.body.birthday;
  record[0].team = req.body.team;   
  record[0].likes = req.body.likes;
  
  res.json(record);
});

// Route to Delete a person
app.delete('/people/:id', (req, res, next) => {
  let id = req.params.id;
  db.people = db.people.filter(record => record.id !== parseInt(id));
  res.json(db.people);
});


// Route to Get a team
app.get('/teams/:id', (req, res, next) => {
  let id = req.params.id;
  let record = db.teams.filter(record => record.id === parseInt(id));
  res.json(record[0]);
});

// Route to Create a team
app.post('/teams', (req, res, next) => {
  let record = req.body;
  // what can you do to ensure there are no
  // duplicate ids?
  record.id = db.teams.length+=100;
  db.teams.push(record);
  res.json(record);
});

// Route to Update a team
app.put('/teams/:id', (req, res, next) => {
  let id = parseInt(req.params.id);
  let record = db.teams.filter(record => record.id === id);
  record[0].fname = req.body.name;
  record[0].color = req.body.color;
  res.json(record);
});

// Route to Delete a team
app.delete('/teams/:id', (req, res, next) => {
  let id = req.params.id;
  db.teams = db.teams.filter(record => record.id !== parseInt(id));
  res.json(db.teams);
});


const start = port => {
  let PORT = port || process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};

module.exports = {
  server: app,
  start: start,
};
