import jwt from "jsonwebtoken"
import { env } from "../config/env.js";

export const generateToken = (payload) => {
    const { JWT_SECRET } = env();
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h"});
};

export const verifyToken = (token) => {
    const { JWT_SECRET } = env();
    return jwt.verify(token, JWT_SECRET);
};

