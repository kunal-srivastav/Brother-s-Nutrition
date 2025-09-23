import { generateTokens } from "../middleWare/generateTokens.js";
import userModel from "../models/userModel.js";
import { deleteImgOnCloudinary, uploadImgOnCloudinary } from "../utils/cloudinary.js";
import { accessTokenCookieOption, refreshTokenCookieOption } from "../utils/cookieOption.js";

//worked
export const registredUser = async (req, res) => {
    const { name, email, password } = req.body;
    const avatarLocalPath = req.file?.path;
    try {
        if(!name || !email || !password) return res.status(400).json({message: "All Fields are required"});
        if(!avatarLocalPath) return res.status(400).json({message: "Avatar is required"});
        const userExists = await userModel.findOne({email});
        if(userExists) return res.status(403).json({message: "You already have an account. Please Logged In.."});
        const avatar = await uploadImgOnCloudinary(avatarLocalPath);
        const newUser = await userModel.create({ name, email, password, avatar: avatar.secure_url });
        const { accessToken, refreshToken } = await generateTokens(newUser);
        const user = await userModel.findById(newUser?._id).select("-password -refreshToken");
        return res
        .status(201)
        .cookie("accessToken", accessToken, accessTokenCookieOption)
        .cookie("refreshToken", refreshToken, refreshTokenCookieOption)
        .json({
            message: "Account created",
            user
        });
    } catch (err) {
        return res.status(500).json({message: "Registration failed"})
    }
};

//worked
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email) return res.status(400).json({message: "Email is required"});
        if(!password) return res.status(400).json({message: "Password is required"});
        const user = await userModel.findOne({email});
        if(!user) return res.status(404).json({message: "Email or Password is incorrect"});
        const isCorrect = await user.isPasswordCorrect(password);
        if(!isCorrect) return res.status(404).json({message: "Email or Password is incorrect"});
        const { accessToken, refreshToken } = await generateTokens(user);
        const loggedInUser = await userModel.findById(user?._id).select("-password -refreshToken");
        return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenCookieOption)
        .cookie("refreshToken", refreshToken, refreshTokenCookieOption)
        .json({
            message: "Successfully Login",
            user: loggedInUser
        });
    } catch (err) {
        return res.status(500).json({message: "Login failed"});
    }
};

//worked
export const currentUser = async (req, res) => {
    return res
    .status(200)
    .json({
        message: "Successfully fetch current user",
        currentUser: req.user
    })
};
//worked
export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        if(!oldPassword) return res.status(400).json({message: "Old password is required"});
        if(!newPassword) return res.status(400).json({message: "New password is required"});
        if(oldPassword === newPassword) return res.status(400).json({message: "Old password and New password must be different"});
        const user = await userModel.findById(req?.user._id);
        if(!user) return res.status(401).json({message: "Unauthorized request"});
        const isCorrect = await user.isPasswordCorrect(oldPassword);
        if(!isCorrect) return res.status(403).json({message: "Password is incorrect"});
        user.password = newPassword;
        await user.save();
        return res.status(200).json({message: "Successfully password changed"});
    } catch (err) {
        return res.status(500).json({message: "Password unchanged"});
    }
};
//worked
export const updateProfilePic = async (req, res) => {
    const newAvatarLocalPath = req.file?.path;
    try {
        if(!newAvatarLocalPath) return res.status(400).json({message: "Avatar image is required"});
        const user = await userModel.findById(req.user?._id);
        if(!user) return res.status(401).json({message: "Unauthorized request"});
        const oldAvatar = user.avatar;
        const newAvatar = await uploadImgOnCloudinary(newAvatarLocalPath);
        if(!newAvatar?.secure_url) return res.status(500).json({message: "Failed to upload new avatar"});
        const updatedUser = await userModel.findByIdAndUpdate(user?._id, {$set: {avatar: newAvatar.secure_url}}, {new: true}).select("-password -refreshToken");
        if(updatedUser && newAvatar){
            await deleteImgOnCloudinary(oldAvatar);
        };
        return res
        .status(200)
        .json({
            message: "Successfully updated",
            updatedUser
        });
    } catch (err) {
        return res.status(500).json({message: "Failed to update avatar"});
    }
};

//worked
export const updateAccountInfo = async (req, res) => {
    const { name, email, role } = req.body;
    try {
        if(!name && !email && !role) return res.status(400).json({message: "Name or Email is required"});
        const user = await userModel.findById(req.user?._id);
        if(!user) return res.status(401).json({message: "Unauthorized request"});
        const updatedUser = await userModel.findByIdAndUpdate(user?._id, {name: name || user.name, email: email || user.email, role: role || user.role}, {new: true});
        const { accessToken, refreshToken } = await generateTokens(updatedUser);
        const userWithoutPassword = await userModel.findById(updatedUser?._id).select("-password -refreshToken");
        return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenCookieOption)
        .cookie("refreshToken", refreshToken, refreshTokenCookieOption)
        .json({
            message: "Successfully account updated",
            user: userWithoutPassword
        })
    } catch (err) {
        return res.status(500).json({message: "Failed to update account"});
    }
};

//worked
export const logOut = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req?.user._id, {$unset: {refreshToken: 1}}, {new: true});
        return res
        .status(200)
        .clearCookie("accessToken", accessTokenCookieOption)
        .clearCookie("refreshToken", refreshTokenCookieOption)
        .json({
            message: "Succesfully logout"
        });
    } catch (err) {
        return res.status(500).json({message: "Logout failed"})
    }
};