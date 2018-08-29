var express = require('express');
var router = express.Router();
const {
  signup,
  signin,
  loginFB
} = require('../controllers/index');

router
  .post('/signup', signup)
  .post('/signin', signin)
  .post('/loginFB', loginFB)

module.exports = router;
