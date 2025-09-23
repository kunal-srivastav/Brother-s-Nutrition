import express from "express";
import { createReview, deleteReview, getProductReviews, updateReview } from "../controllers/reviewController.js";
import { isLoggedIn } from "../middleWare/isLoggedIn.js"
const router = express.Router();

router.get("/:productId", isLoggedIn, getProductReviews);

router.post("/:productId/create", isLoggedIn, createReview);

router.patch("/update/:reviewId", isLoggedIn, updateReview);

router.get("/delete/:reviewId", isLoggedIn, deleteReview);

export default router;