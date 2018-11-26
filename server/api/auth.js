const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userData = {
  username: '',
  password: '',
};

router.post('/reg', async (req, res) => {
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

  const hash = await bcrypt.hash(req.body.password, 10);
  const token = await jwt.sign({ foo: 'bar' }, 'shhhhh');

  if (hash && token) {
    userData.password = hash;
    req.session.userId = 'IVAN_ID';
    return res.json({ error: 0, token });
  }
  return res.json({ error: 1000 });
});

router.post('/login', async (req, res) => {
  console.log('post', req.body);
  console.log('req.session-reg', req.session);

  if (!req.body.name && !req.body.password) {
    return res.json({ error: 1000, message: 'bad data' });
  }

  const checkSesion = await bcrypt.compare(req.body.password, userData.password);
  const token = await jwt.sign({ foo: 'bar' }, 'shhhhh');
  if (checkSesion && token) {
    req.session.userId = 'IVAN_ID';
    return res.json({ error: 0, token });
  }
  return res.json({ error: 1000, message: 'password or login is wrong' });
});

router.get('/check', (req, res) => {
  console.log('req', req.body);
  if (req.session && req.session.userId === 'IVAN_ID') {
    return res.status(200).json({ error: 0 });
  }
  return res.status(401).json({ error: 1000 });
});

router.post('/check', async (req, res) => {
  console.log('check-post', req.body.token);
  if (req.body.token) {
    try {
      const token = await jwt.verify(req.body.token, 'shhhhh');
      if (token && req.session && req.session.userId === 'IVAN_ID') {
        return res.status(200).json({ error: 0 });
      }
      return res.status(401).json({ error: 1000 });
    } catch (err) {
      console.log('err', err);
      return res.status(401).json({ error: 1000 });
    }
  }
});

router.get('/logout', (req, res) => {
  if (req.session && req.session.userId === 'IVAN_ID') {
    req.session.destroy();
    return res.json({ error: 0 });
  }
  return res.status(401).json({ error: 1000 });
});

module.exports = router;
