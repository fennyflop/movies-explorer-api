const { isCelebrateError } = require('celebrate');
const BadRequestError = require('../errors/BadRequest');
const messages = require('../middlewares/messages');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    throw new BadRequestError(messages.invalidData);
  }

  return next(err);
};
