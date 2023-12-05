//Wong Tsz Fung,20017593D
import mongoose from "mongoose";
const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },

    movieNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

export default mongoose.model("Movie", MovieSchema);
