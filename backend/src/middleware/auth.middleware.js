import { verifyToken } from "../utils/jwt.js";

export const authentication = (req, res, next) => {
    const header = req.headers.authorization;
    if(!header) return res.status(401).json({ message : "Unauthorized!"});

    const token = header.split(" ")[1];
    try {
        req.user = verifyToken(token);
        next();
    } catch {
        return res.status(401).json({ message: "Invalid Token"});
    }
};