const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: 'Неправильный формат почты',
        }
    },
    password: { // Добавить select 
        required: true,
        type: String,
        minlength: 6,
        select: false,
    },
    name: {
        required: true,
        type: String,
        minlength: 2,
        maxlength: 30,
    }
});

userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email }).select('+password')
        .then((user) => {
            if (!user) {
                return Promise.reject(new Error('Неправильный логин/пароль'));
            }

            return bcrypt.compare(password, user.password)
                .then((matched) => {
                    if (!matched) {
                        return Promise.reject(new Error('Неправильный логин/пароль'));
                    }

                    return user;
                });
        });
};

module.exports = mongoose.model('user', userSchema);