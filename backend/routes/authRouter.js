const router = require('express').Router();
const jwt = require('jsonwebtoken');
const generateJWTToken = require('../services/signToken');
const bcrypt = require('bcrypt');

const QuestionUserSchema = require('../models/UserModel');

router.post('/register', async(req, res) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.json({
      msg: 'All fields is required'
    })
    return
  }

  const existsUser = await QuestionUserSchema.findOne({
    email
  });
  if (existsUser) {
    res.json({
      msg: 'Exists Email'
    })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const data = await QuestionUserSchema.create({
    ...req.body,
    password: hashedPassword
  });

  const token = generateJWTToken(data._id);
  res.json({
    data,
    token
  })
})

router.post('/login', async(req, res) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    res.json({
      msg: 'All fields is required'
    })
    return
  }

  const data = await QuestionUserSchema.findOne({
    email
  });
  if (!data) {
    res.json({
      msg: 'User Not Found'
    })
    return
  }

  const comPass = await bcrypt.compare(password, data.password);
  if (!comPass) {
    res.json({
      msg: 'Password Wrong'
    })
    return
  }

  const token = generateJWTToken(data._id);
  res.json({
    data,
    token
  })
})

module.exports = router
