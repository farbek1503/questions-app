const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    next()
    return
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decode.userId;
  next()
}

module.exports = verifyToken
