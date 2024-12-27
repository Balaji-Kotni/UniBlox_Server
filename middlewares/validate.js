import JWT from "jsonwebtoken";
import Users from "../models/users.js";

export const verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(404).json({ success: false, message: "Token missing" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    if (decoded.exp) {
      const dateNow = new Date();
      if (decoded.exp * 1000 < dateNow.getTime()) {
        return res
          .status(401)
          .json({ success: false, message: "Token expired" });
      }
    }
    if (decoded.employeeId) {
      Users.findOne({
        where: {
          employeeId: decoded.employeeId,
        },
      })
        .then(user => {
          if (!user) {
            return res
              .status(404)
              .json({ success: false, message: "Invalid token" });
          }
          req.employeeId = decoded.employeeId;
          req.role = decoded.role;
          next();
        })
        .catch(error => {
          return res.status(500).json({
            success: false,
            message: "Something went wrong at verify token",
            error,
          });
        });
    } else {
      return res.status(404).json({ success: false, message: "Invalid token" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong at verify token",
    });
  }
};
