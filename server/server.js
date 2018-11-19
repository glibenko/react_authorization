const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/login', ((req, res) => {
  res.render('index');
}));

let userData = {
  username: req.body.username,
  password: req.body.password,
};


app.post('/api/reg', (req, res) => {
  console.log('post', req.body);
  userData.username = req.body.username;
  userData.password = req.body.password;

  bcrypt.hash(userData.password, 10).then(hash => {
    userData.password = hash;
    console.log('hash', hash);
    console.log('userData', userData)
    req.session.userId = 'user._id';
    res.cookie('SESSIONID', 'hash');
    // console.log('req.session', req.headers.cookie)
    return res.json({'m': 'POST request to homepage', 'token': hash});
  });

  bcrypt.compare(userData.passwordConf, userData.password).then(function(res) { 
    console.log('lala', res)
  });

});

app.use(express.static(path.join(__dirname, '../public')));
app.listen(4000, () => console.log('Example app listening on port 4000!'));
