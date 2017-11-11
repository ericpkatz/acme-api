const express = require('express');
const jwt = require('jwt-simple');

const SECRET = process.env.SECRET || 'foobar';

const app = express();

const users = [
  {
    id: 1,
    username: 'Moe',
    password: 'moe',
    favorite: 'foo'
  },
  {
    id: 2,
    username: 'Larry',
    password: 'larry',
    favorite: 'bar'
  }
];

const products = [
  {
    id: 1,
    name: 'foo'
  },
  {
    id: 2,
    name: 'bar'
  },
  {
    id: 3,
    name: 'bazz'
  }
];
app.use(require('cors')());

app.use(require('body-parser').json());

app.post('/api/tokens', (req, res, next)=> {
  const credentials = req.body;
  const { username, password } = credentials;
  const user = users.find( user => user.username === username && user.password === password);
  if(user){
    return res.send({ token: jwt.encode({ id: user.id }, SECRET) });
  }
  return res.sendStatus(401);
});

app.get('/api/me', ( req, res, next)=> {
  const token = req.headers.auth;
  try {
    const id = jwt.decode(token, SECRET).id;
    const user = users.find( user => user.id === id );
    res.send(user);
  }
  catch(ex){
    res.sendStatus(401);
  }
});

app.get('/api/products', ( req, res, next)=> {
  res.send(products);
});

module.exports = app;
