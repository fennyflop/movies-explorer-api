const dotenv = require('dotenv');

dotenv.config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'oleg3000';
const Unauthorized = require('../errors/Unauthorized');

const handleAuthError = () => {
  throw new Unauthorized('Необходима авторизация');
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, `${secret}`);
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;

  return next();
};
