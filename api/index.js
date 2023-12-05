import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import cinemasRoute from "./routes/cinemas.js";
import moviesRoute from "./routes/movies.js";
import usersRoute from "./routes/users.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
/*
const PREAUTH_KEY = "eie4432lab6";
app.use((req, res, next) => {
  if (!req.session?.allow_access) {
    if (req.query?.authkey === PREAUTH_KEY) {
      req.session.allow_access = true;
    } else {
      res.status(401).json({
        status: "failed",
        message: "Unauthorized",
      });
    }
  }
  next();
});
*/
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/cinemas", cinemasRoute);
app.use("/api/movies", moviesRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
