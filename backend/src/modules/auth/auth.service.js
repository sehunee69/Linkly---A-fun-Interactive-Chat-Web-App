import { createUser, findUserByEmail} from "./auth.repository.js"
import { hashPassword, comparePassword } from "../../utils/hash.js"
import { generateToken } from "../../utils/jwt.js"

export const registerUser = async (email, password) => {
    const existing = await findUserByEmail(email);
    if(existing) throw { status: 400, message: "User exists"};

    const hashed = await hashPassword(password);
    return createUser(email, hashed);
};

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if(!user) throw { status: 400, message: "Invalid credentials"};

    const valid = await comparePassword(password, user.password);
    if(!valid) throw { status: 400, message: "Invalid credentials"};

    return generateToken({ id: user.id, email: user.email });
};

