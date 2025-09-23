import jwt from "jsonwebtoken";

export const generateTokens = async (user) => {
    try {
        const accessToken = await jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRYIN} );
        const refreshToken = await jwt.sign({email: user.email}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRYIN});
        user.refreshToken = refreshToken;
        await user.save();
        return {accessToken, refreshToken};
    } catch (err) {
        return("generating tokens failed");
    }
}