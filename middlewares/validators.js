const { celebrate, Joi } = require('celebrate');
const { default: validator } = require('validator');

const emailCheck = (value, helpers) => {
  if (!validator.isEmail(value)) {
    return helpers.error('Invalid email');
  }

  return value;
};

const urlCheck = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error('Invalid email');
  }

  return value;
};

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(3).custom(emailCheck),
    password: Joi.string().min(8),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(3).custom(emailCheck),
    password: Joi.string().min(8),
    name: Joi.string().min(2),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(3).custom(emailCheck),
    name: Joi.string().min(2),
  }),
});

const movieIdValidtaion = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().min(1),
    nameEN: Joi.string().min(1),
    description: Joi.string().min(1),
    country: Joi.string().min(1),
    director: Joi.string().min(1),
    duration: Joi.number().min(1),
    year: Joi.string().min(1).max(4),
    image: Joi.string().custom(urlCheck),
    trailer: Joi.string().custom(urlCheck),
    thumbnail: Joi.string().custom(urlCheck),
    movieId: Joi.number().min(1),
  }),
});

module.exports = {
  createUserValidation,
  signInValidation,
  updateUserValidation,
  createMovieValidation,
  movieIdValidtaion,
};
