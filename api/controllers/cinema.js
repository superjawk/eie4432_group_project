//Wong Tsz Fung,20017593D
import Cinema from "../models/Cinema.js";
import Movie from "../models/Movie.js";

export const createCinema = async (req, res, next) => {
  const newCinema = new Cinema(req.body);

  try {
    const savedCinema = await newCinema.save();
    res.status(200).json(savedCinema);
  } catch (err) {
    next(err);
  }
};
export const updateCinema = async (req, res, next) => {
  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCinema);
  } catch (err) {
    next(err);
  }
};
export const deleteCinema = async (req, res, next) => {
  try {
    await Cinema.findByIdAndDelete(req.params.id);
    res.status(200).json("Cinema has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getCinema = async (req, res, next) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    res.status(200).json(cinema);
  } catch (err) {
    next(err);
  }
};
export const getCinemas = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const cinemas = await Cinema.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(cinemas);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Cinema.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const cinemaCount = await Cinema.countDocuments({ type: "cinema" });
    const apartmentCount = await Cinema.countDocuments({ type: "apartment" });
    const resortCount = await Cinema.countDocuments({ type: "resort" });
    const villaCount = await Cinema.countDocuments({ type: "villa" });
    const cabinCount = await Cinema.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "cinema", count: cinemaCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getCinemaMovies = async (req, res, next) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    const list = await Promise.all(
      cinema.movies.map((movie) => {
        return Movie.findById(movie);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
