import User from "../../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import client from "../../Redis/redis-client.js";

export async function refresh(req, res, next) {
  const { refresh_token: token } = req.cookies;
  if (!token) {
    return res.status(401).send("Invalid Token");
  }
  const isPresent = await client.get(String(token));
  if (!isPresent) {
    return res.status(401).send("Invalid Token");
  }
  jwt.verify(token, process.env.REFRESH_JWT_SECRET_TOKEN, (err, user) => {
    // removing iat, as it is creating the same access_token everytime
    delete user.iat;
    if (err) {
      return res.sendStatus(401);
    }
    let newAccessToken = generateAccessToken(user);
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
    });
    res.sendStatus(200);
  });
}
export async function signout(req, res, next) {
  const { refresh_token: token } = req.cookies;
  if (!token) {
    return res.sendStatus(403);
  }
  await client.del(String(token));
  res.cookie("access_token", "", {
    httpOnly: true,
  });
  res.cookie("refresh_token", "", {
    httpOnly: true,
  });
  return res.sendStatus("200");
}

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
  console.log("signin");
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(404).send("User not Found!");
    }
    const correctPass = await bcrypt.compare(req.body.password, user.password);
    if (!correctPass) {
      return res.status(404).send("Wrong username/password");
    }
    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_JWT_SECRET_TOKEN
    );
    refreshTokensDb.push(refreshToken);
    console.log(refreshToken);
    try {
      await client.set(String(refreshToken), String(user._id), {
        EX: 60 * 15,
      });
    } catch (e) {
      console.log(e);
      return res.sendStatus(501).send(e);
    }
    const { password, ...filteredUser } = user._doc;
    res.cookie("access_token", accessToken, {
      httpOnly: true,
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
    });
    return res.status(200).json(filteredUser);
  } catch (e) {
    return res.status(503).send(e);
  }
}
function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, { expiresIn: "15s" });
}
