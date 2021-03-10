const Movie = require('../models/movie');

const Forbidden = require('../errors/Forbidden');

module.exports.createMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    description,
    country,
    duration,
    year,
    image,
    trailer,
    thumbnail,
    movieId,
    director,
  } = req.body;

  return Movie.create({
    nameRU,
    nameEN,
    description,
    country,
    duration,
    year,
    image,
    trailer,
    thumbnail,
    movieId,
    director,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(200).send({
        movie,
      });
    })
    .catch((err) => {
      throw new Error(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  return Movie.findById(movieId.toString())
    .then((movie) => {
      if (movie.owner.toString() === req.user._id.toString()) {
        Movie.findByIdAndRemove(movieId.toString())
          .then((deletedMovie) => res.status(200).send(deletedMovie))
          .catch(() => { throw new Error('Не удалось удалить карточку.'); })
          .catch(next);
      } else {
        throw new Forbidden('Дання карточка вам не принадлежит');
      }
    })
    .catch(next);
};

module.exports.getMovies = (req, res, next) => Movie.find({})
  .then((movies) => {
    res.status(200).send(movies);
  })
  .catch((err) => {
    throw new Error(err);
  })
  .catch(next);
