const mongoose = require('mongoose');

const QuestionUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  questions: [{
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
      },
      is_correct: Boolean
    }
  ],
}, {
  timestamps: true
});

module.exports = mongoose.model("questionuser", QuestionUserSchema);
