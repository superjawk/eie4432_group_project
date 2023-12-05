//Wong Tsz Fung,20017593D
import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  getMoviesAll,
  updateMovie,
  updateMovieAvailabilities,
  updateMovieAvailability,
} from "../controllers/movie.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:cinemaid", verifyAdmin, createMovie);

//UPDATE
router.put("/availabilities", updateMovieAvailabilities);
router.put("/availability/:id", updateMovieAvailability);
router.put("/:id", verifyAdmin, updateMovie);
//DELETE
router.delete("/:id/:cinemaid", verifyAdmin, deleteMovie);
//GET
router.get("/countAll", getMoviesAll); //three types home pages
router.get("/:id", getMovie);
//GET ALL

router.get("/", getMovies);

export default router;
