import { verifyToken } from "../utilities/jwt.js";

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Not authorized" });

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ message: "Invalid token" });
  
  req.user = decoded.user;
  next();
};

export default protect;
