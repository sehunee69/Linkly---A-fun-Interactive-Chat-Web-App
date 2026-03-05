import * as service from "./auth.service.js"

export const register = async (req, res, next) => {
    try {
        const user = await service.registerUser(req.body.email, req.body.password);
        res.status(201).json(user);
    } catch(err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const token = await service.loginUser(req.body.email, req.body.password);
        res.status(201).json({ token });
    } catch (err){
        next(err);
    }
};