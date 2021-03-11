const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const celebrateError = require('./middlewares/celebrateError');

const appRouter = require('./routes/index');

const app = express();

const { PORT = 3000 } = process.env;

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/defaultdb';

mongoose.connect(`${mongoUrl}`, {
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

app.use('/', appRouter);

app.use(errorLogger);

app.use(celebrateError);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} `);
});
