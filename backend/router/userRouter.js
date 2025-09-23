import express from "express";
import { changePassword, currentUser, loginUser, logOut, registredUser, updateAccountInfo, updateProfilePic } from "../controllers/userController.js";
import { isLoggedIn } from "../middleWare/isLoggedIn.js"
import upload from "../middleWare/multer.js";
const router = express.Router();

router.post("/register", upload.single("avatar"), registredUser);

router.post("/login", loginUser);

router.get("/current-user", isLoggedIn, currentUser);

router.patch("/change-password", isLoggedIn, changePassword);

router.patch("/update-profile", upload.single("newAvatar"), isLoggedIn, updateProfilePic);

router.patch("/update-account", isLoggedIn, updateAccountInfo);

router.get("/log-out", isLoggedIn, logOut);

export default router;