const router = require('express').Router();
// Добавить celebrate validation
const { createMovieValidation, movieIdValidtaion } = require('../middlewares/validators');
const { createMovie, deleteMovie, getMovies } = require('../controllers/movies');

router.post('/movies', createMovieValidation, createMovie); // Добавить celebrate
router.delete('/movies/:movieId', movieIdValidtaion, deleteMovie); // Добавить celebrate
router.get('/movies', getMovies);

module.exports = router;
