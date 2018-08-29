const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  addQuestion,
  
} = require('../controllers/question');

router
  .post('/ask', auth, addQuestion)
  .get('/')

module.exports = router;
