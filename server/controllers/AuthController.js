import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function signup(req, res, next) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    return res.status(200).send("User created Successfully.");
  } catch (err) {
    if (err.code === 11000) {
      return res.status(503).send("User already exists.");
    } else {
      return res.status(503).send(err);
    }
  }
}

export async function signin(req, res, next) {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(404).send("User not Found!");
    }
    const correctPass = await bcrypt.compare(req.body.password, user.password);
    if (!correctPass) {
      return res.status(404).send("Wrong username/password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN);
    const { password, ...filteredUser } = user._doc;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(filteredUser);
  } catch (e) {
    return res.status(503).send(e);
  }
}
