import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const { verify } = jwt;

export const verifyToken = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      console.log("cookies:", req.cookies);

      const token = req.cookies?.token;

      console.log("token:", token);

      if (!token) {
        return res.status(401).json({
          message: "Please login first",
        });
      }

      const decodedToken = verify(
        token,
        process.env.SECRET_KEY
      );

      console.log("decodedToken:", decodedToken);

      console.log("allowedRoles:", allowedRoles);

      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({
          message: "You are not authorized",
        });
      }

      req.user = decodedToken;

      next();
    } catch (err) {
      console.log(err);

      return res.status(401).json({
        message: "Invalid token",
      });
    }
  };
};
