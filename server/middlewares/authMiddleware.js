import User from "../models/User.js";
import { verifyToken } from "../utilities/jwt.js";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Not authorized" });

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ message: "Invalid token" });
  
  req.user = await User.findById(decoded?.payload?._id);
  next();
};

export default protect;
