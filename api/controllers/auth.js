//Wong Tsz Fung,20017593D
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
var errState;
var errMessage;
var error;
export const register = async (req, res, next) => {
  try {
    if (req.body) {
    } else {
      res.status(499).send("bad");
    }
    checkInput(req, res, next);
    if (error == true) {
      return next(createError(errState, errMessage));
    }

    const user = await User.findOne({ username: req.body.username });
    if (user) return next(createError(404, "User exist already!"));
    const email = await User.findOne({ email: req.body.email });
    if (email) return next(createError(404, "This mail is used by other"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    console.log("tryupdate");
    checkInput(req, res, next);
    if (error == true) {
      return next(createError(errState, errMessage));
    }
    await User.deleteOne({ username: req.body.username });
    //const user = await User.find({ username: req.body.username });
    //if (!user) return next(createError(404, "internal error"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    /*
    await newUser.save();
    res.status(200).send("User has been created.");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    user.password = hash;
    user.email = req.body.email;
    user.country = req.body.country;
    user.img = req.body.img;
    user.city = req.body.city;
    user.phone = req.body.phone;
    */
    /*
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    */
    await newUser.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
  /*
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "internal error"));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const olduser = new User({
      ...req.body,
      password: hash,
    });

    await olduser.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
  */
};

const checkInput = async (req, res, next) => {
  error = true;
  if (req.body.username == "" || req.body.username == null) {
    errState = 499;
    errMessage = "username cannot be null";
    return;
  } else if (req.body.email == "" || req.body.email == null) {
    errState = 499;
    errMessage = "email cannot be null";
    return;
  } else if (req.body.password == "" || req.body.password == null) {
    errState = 499;
    errMessage = "password cannot be null";
    return;
  } else if (req.body.country == "" || req.body.country == null) {
    errState = 499;
    errMessage = "country cannot be null";
    return;
  } else if (req.body.city == "" || req.body.city == null) {
    errState = 499;
    errMessage = "city cannot be null";
    return;
  } else if (req.body.phone == "" || req.body.phone == null) {
    errState = 499;
    errMessage = "phone cannot be null";
    return;
  } else {
    error = false;
  }
};
