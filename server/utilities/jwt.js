import jwt from "jsonwebtoken";

export const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return null; // invalid or expired
  }
};
