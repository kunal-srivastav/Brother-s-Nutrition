import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"
import { generateTokens } from "./generateTokens.js";
import { accessTokenCookieOption, refreshTokenCookieOption } from "../utils/cookieOption.js";

export const isLoggedIn = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;
    if(!accessToken || !refreshToken) return res.status(401).json({message: "Unauthorized request"});
    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await userModel.findOne({email: decodedToken.email}).select("-password -refreshToken");
        req.user = user;
        next();
    } catch (err) {
        if (!refreshToken) return res.status(401).json({message: "Session expired. Please Logged in.."});
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await userModel.findOne({email: decodedToken.email});
        if(!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({message: "Unauthorized request"});
        }
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(user);
        const newUser = await userModel.findById(user?._id).select("-password -refreshToken");
        res
        .cookie("accessToken", newAccessToken, accessTokenCookieOption)
        .cookie("refreshToken", newRefreshToken, refreshTokenCookieOption);
        req.user = newUser;
        next();
    }
};

export const isAdmin = async (req, res, next) => {
    if(!req.user) return res.status(401).json({message: "Unautorized request"});
    
    if(req.user.role !== "admin") return res.status(403).json({message: "Admin only"})

    next();
};