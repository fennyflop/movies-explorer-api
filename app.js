const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const mongoose = require('mongoose');

const auth = require('./middlewares/auth');
const { createUser, signIn } = require('./controllers/users');
const { createUserValidation, signInValidation } = require('./middlewares/validators');

const usersRouter = require('./routes/users');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/signin', signInValidation, signIn);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/', usersRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} `)
})