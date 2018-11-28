const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoExpress = require('mongo-express/lib/middleware');

const mongoExpressConfig = require('../mongo_express.config');

const app = express();

app.use('/mongo_express', mongoExpress(mongoExpressConfig));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

// api
const api = require('./api');

app.use('/api', api);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', ((req, res) => {
  res.render('index');
}));

app.listen(3005, () => console.log('Example app listening on port 3005!'));
