//Wong Tsz Fung,20017593D
import express from "express";
import { login, logout, register, update } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/updateUser", update);
export default router;
