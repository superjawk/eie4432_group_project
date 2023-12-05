//Wong Tsz Fung,20017593D
import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserByName,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET BY NAME
router.get("/getByName", verifyUser, getUserByName);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
