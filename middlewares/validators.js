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
    email: Joi.string().required().min(3).custom(emailCheck),
    password: Joi.string().required().min(8),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(1),
    email: Joi.string().required().min(3).custom(emailCheck),
    password: Joi.string().required().min(8),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(3).custom(emailCheck),
    name: Joi.string().required().min(2),
  }),
});

const movieIdValidtaion = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required().min(1),
    nameEN: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    country: Joi.string().required().min(1),
    director: Joi.string().required().min(1),
    duration: Joi.number().required().min(1),
    year: Joi.string().required().min(1).max(4),
    image: Joi.string().required().custom(urlCheck),
    trailer: Joi.string().required().custom(urlCheck),
    thumbnail: Joi.string().required().custom(urlCheck),
    movieId: Joi.number().required().min(1),
  }),
});

module.exports = {
  createUserValidation,
  signInValidation,
  updateUserValidation,
  createMovieValidation,
  movieIdValidtaion,
};
