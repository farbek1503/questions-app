const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const questionRouter = require('./routes/questionRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

app.use(questionRouter)
app.use(authRouter)
app.use(userRouter)

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
}, () =>
  console.log("Mongo DB connected"));

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
