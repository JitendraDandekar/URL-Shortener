import { nanoid } from "nanoid";
import User from "../models/User.js";
import { generateToken } from "../utilities/jwt.js";

export const login = async (req, res) => {
    const { email, password } = req.body || {};

    if (!email) return res.status(400).json({ message: "email is required" });
    if (!password) return res.status(400).json({ message: "password is required" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Please enter the correct credentials" });
    if (! await user.matchPassword(password)) return res.status(400).json({ message: "Please enter the correct credentials" });

    const userObj = user.toObject();
    delete userObj.password;

    res.json({ token: generateToken({ user: { _id: userObj._id } }), user: userObj });
}

export const register = async (req, res) => {
    const { name, email, password } = req.body || {};

    if (await User.exists({ email })) return res.status(400).json({ message: "Email is already exists." });

    const user = new User({ name, email, password });
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({ token: generateToken({ user: { _id: userObj._id } }), user: userObj });
}