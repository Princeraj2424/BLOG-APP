import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const createTokenAndSaveCookies = async (userId, res) => {
    // 10 minutes in ms
    const tenMinutes = 10 * 60 * 1000;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10m",
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "lax", 
        maxAge: tenMinutes, 
    });

    await User.findByIdAndUpdate(userId, { token });
    return token;
}
export {createTokenAndSaveCookies};
