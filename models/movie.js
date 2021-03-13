const mongoose = require('mongoose');
const validator = require('validator');

const requiredString = {
  required: true,
  type: String,
};

const requiredLink = {
  required: true,
  type: String,
  validate: {
    validator: (v) => validator.isURL(v),
    message: 'Неправильный формат ссылки',
  },
};

const requiredNumber = {
  required: true,
  type: Number,
};

// Dry code =)

const movieSchema = new mongoose.Schema({
  nameRU: requiredString,
  nameEN: requiredString,
  country: requiredString,
  year: requiredString,
  description: requiredString,
  director: requiredString,
  image: requiredLink,
  trailer: requiredLink,
  thumbnail: requiredLink,
  duration: requiredNumber,
  movieId: requiredNumber,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
});

module.exports = mongoose.model('movie', movieSchema);
