const router = require('express').Router();
const bcrypt = require('bcrypt');

const userData = {
  username: '',
  password: '',
};

router.post('/reg', (req, res) => {
  console.log('post', req.body);
  console.log('req.session-reg', req.session);

  if (!req.body.name && !req.body.password && !req.body.passwordConf) {
    return res.json({ error: 1000, message: 'bad data' });
  }

  if (req.body.password !== req.body.passwordConf) {
    return res.json({ error: 1000, message: 'passwords are not same' });
  }

  userData.username = req.body.name;
  userData.password = req.body.password;

  bcrypt.hash(req.body.password, 10).then(hash => {
    userData.password = hash;
    req.session.userId = 'IVAN_ID';
    return res.json({ error: 0 });
  });
});

router.post('/login', (req, res) => {
  console.log('post', req.body);
  console.log('req.session-reg', req.session);

  if (!req.body.name && !req.body.password) {
    return res.json({ error: 1000, message: 'bad data' });
  }

  bcrypt.compare(req.body.password, userData.password).then(resp => {
    console.log('lala', resp);
    if (resp) {
      req.session.userId = 'IVAN_ID';
      return res.json({ error: 0 });
    }
    return res.json({ error: 1000, message: 'password or login is wrong' });
  });
});

router.get('/check', (req, res) => {
  if (req.session && req.session.userId === 'IVAN_ID') {
    return res.status(200).json({ error: 0 });
  }
  return res.status(401).json({ error: 1000 });
});

router.get('/logout', (req, res) => {
  if (req.session && req.session.userId === 'IVAN_ID') {
    req.session.destroy();
    return res.json({ error: 0 });
  }
  return res.status(401).json({ error: 1000 });
});

module.exports = router;
