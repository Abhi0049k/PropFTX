const { Router } = require("express");
const { allMovies, newMovie, updateMovie, deleteMovie } = require("../controller/movie.controllers");
const authorization = require("../middlewares/authorized.middleware");

const movieRouter = Router();

movieRouter.use(authorization);

movieRouter.get('/', allMovies);

movieRouter.post('/', newMovie);

movieRouter.put('/:id', updateMovie);

movieRouter.delete('/:id', deleteMovie)

module.exports = movieRouter;