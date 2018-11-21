const router = require('express').Router();
const bcrypt = require('bcrypt');

const userData = {
  username: '',
  password: '',
};

router.post('/reg', (req, res) => {
  console.log('post', req.body);
  console.log('req.session-reg', req.session);

  userData.username = req.body.name;
  userData.password = req.body.password;

  // console.log('Cookies: ', req.cookies.SESSIONID)
  // Cookies that have been signed
  // console.log('Signed Cookies: ', req.signedCookies)

  bcrypt.hash(req.body.password, 10).then(hash => {
    userData.password = hash;
    req.session.userId = 'user._id';
    return res.json({'m': 'you was registration, thanks'});
  });
  // if (typeof req.session.user === 'undefined') {
  //   req.session.user = 'dima';
  //   return res.send('registr' + req.session.user);
  // }

  // if (typeof req.session.user !== 'undefined') {
  //   return res.send('again' +  req.session.user);
  // }


  // return res.json({'m': 'POST request to homepage'});

  // bcrypt.compare(userData.passwordConf, userData.password).then(function(res) { 
  //   console.log('lala', res)
  //   return res.status(200).send('OK')
  // });

});


router.post('/login', (req, res) => {
  console.log('post', req.body);
  console.log('req.session-login', req.session);
  // console.log('req.cookie', req.headers.cookie);
  // console.log('Cookies:-2 ', req.cookies.SESSIONID)

  // Cookies that have been signed
  // console.log('Signed Cookies:-2 ', req.signedCookies)
  return res.json({'m': 'POST request to homepage' + req.session.user});
  // bcrypt.hash(userData.password, 10).then(hash => {
  //   userData.password = hash;
  //   console.log('hash', hash);
  //   console.log('userData', userData)
  //   req.session.userId = 'user._id';
  //   res.cookie('SESSIONID', 'hash');
  //   // console.log('req.session', req.headers.cookie)
  //   return res.json({'m': 'POST request to homepage', 'token': hash});
  // });

  bcrypt.compare(req.body.password, userData.password).then(resp => {
    console.log('lala', resp)
    return res.status(200).send('OK');
  });


});

router.get('/check', (req, res) => {
  if (req.session && req.session.userId) {
    return res.json({'m': 'hello' + req.session.userId});
  } else {
    return res.status(401).send('OK');
  }

});

module.exports = router;
