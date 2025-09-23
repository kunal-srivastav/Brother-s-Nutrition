import express from "express";
import { createProduct, deleteProduct, getAdminProducts, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js";
import upload from "../middleWare/multer.js";
import { isAdmin, isLoggedIn } from "../middleWare/isLoggedIn.js";
const router = express.Router();

router.get("/", getAllProducts);

router.get("/product/:productId", isLoggedIn, getProductById);

router.get("/admin", isLoggedIn, isAdmin, getAdminProducts);

router.post("/create", upload.array("images") , isLoggedIn, isAdmin, createProduct);

router.patch("/update/:productId", upload.array("images"), isLoggedIn, isAdmin, updateProduct);

router.get("/delete/:productId", isLoggedIn, isAdmin, deleteProduct);

export default router;