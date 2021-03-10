const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const celebrateError = require('./middlewares/celebrateError');

const auth = require('./middlewares/auth');
const { createUser, signIn } = require('./controllers/users');
const { createUserValidation, signInValidation } = require('./middlewares/validators');

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const NotFound = require('./errors/NotFound');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect(`${process.env.MONGO_SERVER}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(helmet());

app.disable('x-powered-by');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', signInValidation, signIn);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/', usersRouter);
app.use('/', moviesRouter);

app.use('*', () => {
  throw new NotFound('Данный эндпоинт не найден');
});

app.use(errorLogger);

app.use(celebrateError);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} `);
});
