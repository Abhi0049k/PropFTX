const movieModel = require("../models/movie.model");
const { movieValidation } = require("../validations");

const allMovies = async (req, res, next) => {
    try {
        const allMovies = await movieModel.find();
        res.status(200).send(allMovies);
    } catch (err) {
        next(err)
    }
}

const newMovie = async (req, res, next) => {
    const { title, genre, releaseDate, director } = req.body;
    try {
        const check = movieValidation.safeParse({ title, genre, releaseDate, director })
        if (!check.success) return next({ status: 422, message: 'Invalid Input' });
        const newMovie = new movieModel({ title, genre, releaseDate, director });
        await newMovie.save();
        res.status(201).send({ message: 'New Movie Added' })
    } catch (err) {
        next(err);
    }
}

const updateMovie = async (req, res, next) => {
    const { id } = req.params;
    const { title, genre, releaseDate, director } = req.body;
    try {
        const check = movieValidation.safeParse({ title, genre, releaseDate, director })
        if (!check.success) return next({ status: 422, message: 'Invalid Input' });
        const movie = await movieModel.findOne({ _id: id });
        if (!movie) return next({ status: 403, message: 'Movie not found' });
        await movieModel.findByIdAndUpdate(id , { title, genre, releaseDate, director });
        res.status(200).send({message: 'Movie Details Updated'})
    } catch (err) {
        next(err);
    }
}

const deleteMovie = async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await movieModel.findOne({ _id: id });
        if (!movie) return next({ message: 'Movie not found', status: 404 })
        await movieModel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Movie Deleted' });
    } catch (err) {
        next(err);
    }
}

module.exports = { allMovies, newMovie, updateMovie, deleteMovie }