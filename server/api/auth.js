const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user');
const SETTINGS = require('../consts');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


passport.use(new FacebookStrategy({
  clientID: SETTINGS.CLIENT_ID,
  clientSecret: SETTINGS.CLIENT_SECRET,
  callbackURL: SETTINGS.REDIRECT_URL,
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    let user = await User.findOne({ facebookId: profile.id });
    console.log('user', user);
    if (!user) {
      const data = {
        name: profile.displayName,
        facebookId: profile.id,
        facebookToken: accessToken,
      };
      const newUser = new User(data);
      user = await newUser.save();
      console.log('save', user);
    }
    return cb(null, user);
  } catch (err) {
    console.log('facebook-err', err);
    return cb(err);
  }
}));

router.post('/reg', async (req, res) => {
  if (!req.body.name && !req.body.password && !req.body.passwordConf) {
    return res.send({ error: 1000, message: 'bad data' });
  }

  if (req.body.password !== req.body.passwordConf) {
    return res.send({ error: 1000, message: 'passwords are not same' });
  }

  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const token = await jwt.sign({ foo: 'bar' }, SETTINGS.JWT_SECRET);

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
    const token = await jwt.sign({ foo: 'bar' }, SETTINGS.JWT_SECRET);
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
  if (req.session.passport && req.session.passport.user) {
    const findUser = await User.findById(req.session.userId);
    if (findUser) {
      return res.send({ error: 0 });
    }
  }
  if (!req.body.token) {
    return res.status(401).send({ error: 1000 });
  }

  try {
    const checkToken = await jwt.verify(req.body.token, SETTINGS.JWT_SECRET);
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

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook',
    { successRedirect: '/main', failureRedirect: '/login' }));

module.exports = router;
