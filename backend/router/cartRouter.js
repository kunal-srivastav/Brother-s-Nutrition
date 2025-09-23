import express from "express";
import { getProductsInCart, toggleProductInCart } from "../controllers/cartController.js";
import { isLoggedIn } from "../middleWare/isLoggedIn.js";
const router = express.Router();

router.post("/toggle/:productId", isLoggedIn, toggleProductInCart);

router.get("/", isLoggedIn, getProductsInCart);

export default router;