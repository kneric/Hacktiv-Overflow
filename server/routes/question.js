const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  addQuestion,
  allQuestions
  
} = require('../controllers/question');

router
  .post('/ask', auth, addQuestion)
  .get('/', allQuestions)

module.exports = router;
