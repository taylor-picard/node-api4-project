require('dotenv').config();
const express = require('express');
const cors = require('cors');

const server = express();

const PORT = process.env.PORT || 9000;

server.use(express.json());
server.use(cors());

const users= [{username: 'user1', password: 'pass1'},
  {username: 'user2', password: 'pass2'},
  {username: 'user3', password: 'pass3'}];

server.get('/api/users', (req, res) => {
  res.json(users);
});

server.post('/api/register', (req, res)=> {
  const {username, password}= req.body;
  const newUser = {username: username, password: password};
  res.status(201).json(newUser);
});

server.post('/api/login', (req, res)=> {
  const {username, password}= req.body;
  res.status(201).json({
    message: `Welcome, ${username}!`,
  });
});

server.use('*', (req, res) => {
  res.send(`<h1>Hello</h1>`);
});

server.use((err, req, res, next)=> {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

server.listen(PORT, ()=> {
  console.log('server running');
});
