import mongoose from "mongoose";
import cartModel from "../models/cartModel.js";

//worked
export const toggleProductInCart = async (req, res) => {
    const { quantity } = req.body;
    const { productId } = req.params;
    const userId = req.user._id;
    try {
        const existProductInCart = await cartModel.findOne({
            user: new mongoose.Types.ObjectId(userId),
            "items.product": new mongoose.Types.ObjectId(productId)
            });

        let updatedCart;
        if(existProductInCart) {
            updatedCart = await cartModel.findOneAndUpdate({user: userId}, {$pull: {items: {product: productId} }}, {new: true});
            return res
            .status(200)
            .json({
                added: false,
                message: "Product removed from cart!",
                cart: updatedCart?.items,
            });
        } else {
            updatedCart = await cartModel.findOneAndUpdate({user: userId}, {$addToSet: {items: {product: productId, quantity}}}, {new: true, upsert: true});
            return res
            .status(200)
            .json({
                added: true,
                message: "Product added to cart!",
                cart: updatedCart?.items,
            });
        };
    } catch (err) {
        return res.status(500).json({message: "Failed to add cart"});
    }
};

//worked
export const getProductsInCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({user: req?.user._id}).populate("items.product", "images name category price discount");
        if(cart?.items?.length === 0) return res.status(404).json({message: "Not product found", cart: {items: []}});
        return res.
        status(200)
        .json({
            message: "user carts",
            cart: cart?.items,
        })
    } catch (err) {
        return res.status(500).json({message: "Failed to add cart"});
    }
};