import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function verifyJWT(req, res, next) {
  const { access_token: token } = req.cookies;
  if (!token) {
    return res.send(401).status("User is not authenticated");
  }
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.send(403).status("Token is invalid");
    }
    req.user = user;
    next();
  });
}
