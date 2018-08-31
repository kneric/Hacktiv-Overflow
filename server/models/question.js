const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema ({
  questioner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'input your question']
  },
  desc: String,
  upVoters: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  downVoters: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  }]
}, {timestamps:true})

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
