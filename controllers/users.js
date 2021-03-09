const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

const Conflict = require('../errors/Conflict');
const Unauthorized = require('../errors/Unauthorized');
const NotFound = require('../errors/NotFound');

dotenv.config();

const { NODE_ENV, JWT_KEY } = process.env;

module.exports.createUser = (req, res, next) => {
    const { email, password, name } = req.body;

    bcrypt.hash(password, 10)
        .then((hash) => {
            User.create({
                email,
                name,
                password: hash,
            })
                .then((user) => {
                    res.status(201).send({
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                    })
                })
                .catch((err) => {
                    if (err.name.toString() === 'MongoError' && +err.code === 11000) {
                        throw new Conflict('Пользователь с таким email уже зарегестрирован');
                    }
                })
                .catch(next);
        })
}

module.exports.signIn = (req, res, next) => {
    const { email, password } = req.body;

    return User.findUserByCredentials(email, password)
        .then((user) => {
            res.send({
                token: jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_KEY : 'oleg3000'}`, { expiresIn: '7d' })
            });
        })
        .catch((err) => {
            throw new Unauthorized(err.message);
        })
        .catch(next);
}

module.exports.getUser = (req, res, next) => {
    return User.findById(req.user._id)
        .then((user) => {
            if (!user) {
                throw new NotFound('Нет такого пользователя')
            }
            return res.status(200).send({
                email: user.email,
                name: user.name,
            })
        })
        .catch((err) => {
            throw new Error(err);
        })
        .catch(next);
}

module.exports.updateUser = (req, res, next) => {
    const { email, name } = req.body;

    return User.findByIdAndUpdate(req.user._id, { email, name }, {
        new: true,
        runValidators: true,
    })
        .then((user) => {
            res.status(200).send({
                email: user.email,
                name: user.name,
            })
        })
        .catch((err) => {
            throw new Error(err);
        })
        .catch(next);
}