const router = require('express').Router();
// Добавить celebrate validation
const { updateUserValidation } = require('../middlewares/validators');
const { getUser, updateUser } = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', updateUserValidation, updateUser);

module.exports = router;
