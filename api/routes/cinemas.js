//Wong Tsz Fung,20017593D
import express from "express";
import {
  countByCity,
  countByType,
  createCinema,
  deleteCinema,
  getCinema,
  getCinemaMovies,
  getCinemas,
  updateCinema,
} from "../controllers/cinema.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createCinema);

//UPDATE
router.put("/:id", verifyAdmin, updateCinema);
//DELETE
router.delete("/:id", verifyAdmin, deleteCinema);
//GET

router.get("/find/:id", getCinema);
//GET ALL

router.get("/", getCinemas);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/movie/:id", getCinemaMovies);

export default router;
