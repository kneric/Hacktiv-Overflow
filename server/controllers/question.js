const Question = require('../models/question');

const addQuestion = (req, res) => {
  Question.create({
    questioner: req.user._id,
    title: req.body.title,
    desc: req.body.desc,
    upCounter: 0,
    downCounter: 0
  })
  .then(newQ => {
    res.status(201).json(newQ)
  })
  .catch(err => {
    res.status(500).json(err)
  })
}

const allQuestions = (req, res) => {
  Question.find({})
  .then(allQ => {
    res.status(200).json(allQ)
  })
  .catch(err => {
    res.status(500).json(err)
  })
}


module.exports = {
  addQuestion,
  allQuestions
};
