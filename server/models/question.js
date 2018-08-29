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
  upCounter: {
    type: Number,
  },
  downCounter: {
    type: Number,
  },
  upVoters: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: undefined
  }],
  downVoters: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: undefined
  }]
}, {timestamps:true})

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
