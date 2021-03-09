const { celebrate, Joi } = require('celebrate');
const { default: validator } = require('validator');

const emailCheck = (value, helpers) => {
    if (!validator.isEmail(value)) {
        return helpers.error('Invalid email');
    }

    return value;
}

const signInValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().min(3).custom(emailCheck),
        password: Joi.string().min(8)
    })
})

const createUserValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().min(3).custom(emailCheck),
        password: Joi.string().min(8),
        name: Joi.string().min(2),
    })
})

const updateUserValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().min(3).custom(emailCheck),
        name: Joi.string().min(2),
    })
})

module.exports = {
    createUserValidation,
    signInValidation,
    updateUserValidation
}