//Wong Tsz Fung,20017593D
import Cinema from "../models/Cinema.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";
export const createMovie = async (req, res, next) => {
  const cinemaId = req.params.cinemaid;
  const newMovie = new Movie(req.body);

  try {
    const savedMovie = await newMovie.save();
    try {
      await Cinema.findByIdAndUpdate(cinemaId, {
        $push: { movies: savedMovie._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedMovie);
  } catch (err) {
    next(err);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (err) {
    next(err);
  }
};
//movieNumbers are :id, dates:unavailable date
export const updateMovieAvailability = async (req, res, next) => {
  try {
    await Movie.updateOne(
      { "movieNumbers._id": req.params.id },
      {
        $push: {
          "movieNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    /*
    await User.updateOne(
      { username: req.body.user },
      { $set: { "bookedMovie.$.number": req.body.seat } },
      { multi: false, upsert: true }
    );
    await User.updateOne(
      { username: req.body.user, "bookedMovie.$.number": req.body.seat },
      { $push: { "bookedMovie.$.unavailableDates": req.body.dates } }
    );
      */
    await User.updateOne(
      { username: req.body.user },
      {
        $push: {
          bookedMovie: {
            movieTitle: req.body.title,
            unavailableDates: req.body.dates,
            seatNum: req.body.seat,
            price: req.body.price,
          },
        },
      }
    );
    res.status(200).json("Movie status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const updateMovieAvailabilities = async (req, res, next) => {
  try {
    const result = await User.updateOne(
      { username: req.body.user },
      { $set: { "bookedMovie.$.number": req.body.seat[0] } },
      { multi: true, upsert: true }
    );

    res.status(200).json("good");
  } catch (err) {
    next(err);
  }
};

export const deleteMovie = async (req, res, next) => {
  const cinemaId = req.params.cinemaid;
  try {
    await Movie.findByIdAndDelete(req.params.id);
    try {
      await Cinema.findByIdAndUpdate(cinemaId, {
        $pull: { movies: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Movie has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};
export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};
/*
export const getMoviesAll = async (req, res, next) => {
  try {
    const type = req.query.titles.split(",");
    const list = await Promise.all(
      type.map((title) => {
        return Movie.countDocuments({ title: title });
      })
    );
    //const movies = await Movie.find();
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
*/
export const getMoviesAll = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const movies = await Movie.find({
      ...others,
      price: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};
