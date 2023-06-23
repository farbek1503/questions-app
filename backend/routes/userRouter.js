const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const QuestionUserSchema = require('../models/UserModel');
const QuestionSchema = require('../models/QuestionModel');

router.get('/my-answers', verifyToken, async(req, res) => {
  const _id = req.userId;
  const data = await QuestionUserSchema.find({
    _id
  }).populate('questions.question');

  res.json({
    data
  })
})

router.get('/my-questions', verifyToken, async(req,res) => {
	const _id = req.userId;
  const data = await QuestionSchema.find({
    user: _id
  }).populate('correctAnswer').populate('wrongAnswer');

  res.json({
    data
  })
})

router.get('/info-user/:id', async(req, res) => {
  const id = req.params.id;

  const data = await QuestionUserSchema.findById(id).populate('questions.question');

  res.json({
    data
  })
})

module.exports = router
