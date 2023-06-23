const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questionuser"
  },
  answers: [{
      text: String,
      is_correct: Boolean
    }
  ],
  correctAnswer: [
		{
      type: mongoose.Schema.Types.ObjectId,
      ref: "questionuser"
    }
  ],
  wrongAnswer: [
		{
      type: mongoose.Schema.Types.ObjectId,
      ref: "questionuser"
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model("questions", QuestionSchema);
