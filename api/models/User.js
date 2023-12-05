//Wong Tsz Fung,20017593D
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bookedMovie: [
      {
        number: Number,
        unavailableDates: { type: [Date] },
        cinema: { type: String },
        movieTitle: { type: String },
        seatNum: { type: String },
        price:Number
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
