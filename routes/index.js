const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, signIn } = require('../controllers/users');
const { createUserValidation, signInValidation } = require('../middlewares/validators');
const NotFound = require('../errors/NotFound');
const messages = require('../middlewares/messages');

router.post('/signin', signInValidation, signIn);
router.post('/signup', createUserValidation, createUser);
router.use(auth);
router.use('/', usersRouter);
router.use('/', moviesRouter);
router.use('*', () => {
  throw new NotFound(messages.noEndPoint);
});

module.exports = router;
