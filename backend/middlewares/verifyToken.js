import jwt from "jsonwebtoken";
import { config } from "dotenv";
const { verify } = jwt;
config();

export const verifyToken = (...allowedRoles) => {
  return (req, res, next) => {
    try {

      console.log("Cookies:", req.cookies);

      const token = req.cookies?.token;

      console.log("Token:", token);

      if (!token) {
        return res.status(401).json({
          message: "Please login first"
        });
      }

      let decodedToken = verify(
        token,
        process.env.SECRET_KEY
      );

      console.log("Decoded:", decodedToken);

      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({
          message: "You are not authorized"
        });
      }

      req.user = decodedToken;

      next();

    } catch (err) {

      console.log(err);

      res.status(401).json({
        message: "Invalid token"
      });
    }
  };
};






















