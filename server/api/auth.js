const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwsSecret = 'dfsffJGHGJ!jjd';

router.post('/reg', async (req, res) => {
  if (!req.body.name && !req.body.password && !req.body.passwordConf) {
    return res.send({ error: 1000, message: 'bad data' });
  }

  if (req.body.password !== req.body.passwordConf) {
    return res.send({ error: 1000, message: 'passwords are not same' });
  }

  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const token = await jwt.sign({ foo: 'bar' }, jwsSecret);

    if (hash && token) {
      const data = {
        name: req.body.name,
        hash,
      };

      const newUser = new User(data);

      const save = await newUser.save();
      console.log('save', save);
      if (save) {
        req.session.userId = save._id;
        return res.send({ error: 0, token });
      }
    }
    return res.send({ error: 1000 });
  } catch (err) {
    console.log('save err', err);
    return res.send({ error: 1000 });
  }
});

router.post('/login', async (req, res) => {
  if (!req.body.name && !req.body.password) {
    return res.send({ error: 1000, message: 'bad data' });
  }

  try {
    const user = await User.findOne({ name: req.body.name });
    const checkPassword = await bcrypt.compare(req.body.password, user.hash);
    const token = await jwt.sign({ foo: 'bar' }, jwsSecret);
    if (checkPassword && token) {
      req.session.userId = user._id;
      return res.send({ error: 0, token });
    }
    return res.send({ error: 1000, message: 'password or login is wrong' });
  } catch (err) {
    console.log('login-err', err);
    return res.send({ error: 1000, message: 'password or login is wrong' });
  }
});

router.post('/check', async (req, res) => {
  if (!req.body.token) {
    return res.status(401).send({ error: 1000 });
  }

  try {
    const checkToken = await jwt.verify(req.body.token, jwsSecret);
    const findUser = await User.findById(req.session.userId);
    if (checkToken && findUser) {
      return res.send({ error: 0 });
    }
    return res.status(401).send({ error: 1000 });
  } catch (err) {
    console.log('check-err', err);
    return res.status(401).send({ error: 1000 });
  }
});

router.get('/logout', (req, res) => {
  if (!req.body.token && !req.session.userId) {
    return res.status(401).send({ error: 1000 });
  }
  req.session.destroy();
  return res.send({ error: 0 });
});

module.exports = router;
