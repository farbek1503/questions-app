const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const QuestionUserSchema = require('../models/UserModel');
const QuestionSchema = require('../models/QuestionModel');

router.get('/all-question', verifyToken, async(req, res) => {
  const data = await QuestionSchema.find().populate('user');

  res.json({
    data: data.reverse(),
    userId: req.userId
  })
})

router.post('/create-question', verifyToken, async(req, res) => {
  const {
    question,
    answers
  } = req.body;
	
	const textValues = answers.map(answer => answer.text);
	if (new Set(textValues).size !== textValues.length) {
		res.json({
      msg: 'The Answers Should Not Be The Same'
    })
		return
	}

  const existsQuestion = await QuestionSchema.findOne({
    question
  });
  if (existsQuestion) {
    res.json({
      msg: 'Exists Question'
    })
		return
  }

  const data = await QuestionSchema.create({
    question,
    user: req.userId,
    answers
  });

  res.json({
    data
  })
})

router.get('/solve-question/:questionId/:answer', verifyToken, async(req, res) => {
  const questionId = req.params.questionId;
  const answer = req.params.answer;
  const newUserId = req.userId;

  const existsUser = await QuestionSchema.findById({
    _id: questionId
  });
  if (existsUser.correctAnswer.includes(newUserId) || existsUser.wrongAnswer.includes(newUserId)) {
    res.json({
      msg: 'You Have Already Answered This Question'
    })
    return
  }
  if (existsUser.user == newUserId) {
    res.json({
      msg: 'My Question'
    })
    return
  }

  if (answer == 'true') {
    const data = await QuestionSchema.findByIdAndUpdate(questionId, {
      $push: {
        correctAnswer: newUserId
      }
    }, {
      new: true
    }).exec((err, questionData) => {
      if (err) {
        res.json({
          err
        })
      } else {
        const userFunc = async() => {
          const questionUserData = {
            questions: [{
                question: questionId,
                is_correct: answer
              }
            ]
          };
          const userData = await QuestionUserSchema.updateOne({
            _id: newUserId
          }, {
            $push: {
              questions: questionUserData.questions
            }
          });

          res.json({
            questionData,
            userData
          })
        }
        userFunc()
      }
    });
  }
  if (answer == 'false') {
    const data = await QuestionSchema.findByIdAndUpdate(questionId, {
      $push: {
        wrongAnswer: newUserId
      }
    }, {
      new: true
    }).exec((err, questionData) => {
      if (err) {
        res.json({
          err
        })
      } else {
        const userFunc = async() => {
          const questionUserData = {
            questions: [{
                question: questionId,
                is_correct: answer
              }
            ]
          };
          const userData = await QuestionUserSchema.updateOne({
            _id: newUserId
          }, {
            $push: {
              questions: questionUserData.questions
            }
          });

          res.json({
            questionData,
            userData
          })
        }
        userFunc()
      }
    });
  }
})

router.get('/info-question/:id', verifyToken, async(req, res) => {
  const id = req.params.id;

  const data = await QuestionSchema.findById(id).populate('user').populate('correctAnswer').populate('wrongAnswer');

  res.json({
    data,
    userId: req.userId
  })
})

module.exports = router
