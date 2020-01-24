const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// Model
const User = require('../models/User');

// [POST] Register
router.post('/register', (req, res, next) => {
  const { username, name, surname, password, age } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      name,
      age,
      surname,
      password: hash
    });
    const promise = user.save();
    promise.then((data) => {
      res.json(data)
    }).catch((err) => {
      res.json(err)
    });
  });
});

// [POST] Check Authentication
router.post('/authenticate', (req, res) => {
  const { username, password } = req.body
  User.findOne({ username }, (err, user) => {
    if (err)
      throw err;
    if (!user) {
      res.json({
        status: false,
        message: "Authentication failed, user not found"
      });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: 'Authenticaion failed, wrong password'
          })
        } else {
          const payload = {
            username
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 200
          });
          res.json({
            status: true,
            token
          })
        }
      })
    }
  });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
