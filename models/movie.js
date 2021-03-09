const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
    nameRU: { // Dry code сделать!!!
        required: true,
        type: String,
    },
    nameEN: {
        required: true,
        type: String,
    },
    country: {
        required: true,
        type: String,
    },
    director: {
        required: true,
        type: String,
    },
    duration: {
        required: true,
        type: Number,
    },
    year: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    image: {
        required: true,
        type: String,
        validate: {
            validator: (v) => validator.isUrl(v),
            message: "Неправильный формат ссылки",
        }
    },
    trailer: {
        required: true,
        type: String,
        validate: {
            validator: (v) => validator.isUrl(v),
            message: "Неправильный формат ссылки",
        }
    },
    thumbnail: {
        required: true,
        type: String,
        validate: {
            validator: (v) => validator.isUrl(v),
            message: "Неправильный формат ссылки",
        }
    },
    owner: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    movieId: {
        required: true,
    }
});

module.exports = mongoose.model('movie', movieSchema);