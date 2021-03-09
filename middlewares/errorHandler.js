function errorHandler(err, req, res, next) {
    const { statusCode = 500, message = 'На сервере произошла ошибка' } = err;

    res.status(statusCode).send({
        message: statusCode === 500 ? 'На сервере произошла ошибка ' + err : message,
    });

    return next();
}

module.exports = errorHandler;