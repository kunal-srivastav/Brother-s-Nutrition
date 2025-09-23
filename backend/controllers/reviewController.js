import productModel from "../models/productModel.js";
import reviewModel from "../models/reviewModel.js";

//worked
export const createReview = async (req, res) => {
    const { rating, comment } = req.body;
    const { productId } = req.params;
    const userId = req.user._id;
    try {
        if(!comment) return res.status(400).json({message: "Comment is required"});
        const product = await productModel.findById(productId);
        if(!product) return res.status(404).json({message: "Product not found"});
        if((product.owner).equals(userId)) return res.status(403).json({message: "Admin cannot review on own products"});
        const reviewExist = await reviewModel.findOne({author: userId, product: product._id});
        if(reviewExist) return res.status(403).json({message: "You have already reviewed this product"});
        let newReview = new reviewModel({ author: userId, product: product._id, comment, rating });
        await newReview.save();
        newReview = await reviewModel.findById(newReview?._id).populate("author", "name avatar");
        return res
        .status(201)
        .json({
            message: "Successfully reviewed",
            newReview
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Failed to create review"});
    }
};

//worked
export const getProductReviews = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const { productId } = req.params;
    const skip = (page - 1) * limit;
    try {
        const totalReviews = await reviewModel.countDocuments({product: productId});
        const totalPages = Math.ceil(totalReviews / limit);
        const reviews = await reviewModel.find({product: productId})
        .populate("author", "name avatar")
        .limit(limit)
        .sort({createdAt: -1})
        .skip(skip);

        if(reviews?.length === 0) return res.status(200).json({ message: "No reviews yet", reviews: [], totalPages: 1, totalReviews: 0 });
        return res
        .status(200)
        .json({
            message: "All Reviews on Product",
            reviews,
            totalPages,
            totalReviews
        });
    } catch (err) {
        return res.status(500).json({message: "Failed to fetch reviews"});
    }
};

//worked
export const updateReview = async (req, res) => {
    const { comment, rating } = req.body;
    const { reviewId } = req.params;
    try {
        if(!comment && !rating) return res.status(400).json({message: "Comment or rating is required"});
        const review = await reviewModel.findById(reviewId).populate("author", "avatar name");
        if(!review) return res.status(404).json({message: "Review not found"});
        if(!review.author.equals(req?.user._id)) return res.status(403).json({message: "You can't update this review"});
        if(comment) review.comment = comment;
        if(rating) review.rating = rating;
        const updatedReview = await review.save();
        return res
        .status(200)
        .json({
            message: "Successfully updated",
            updatedReview
        });
    } catch (err) {
        return res.status(500).json({message: "Failed to update review"});
    }
};

//worked
export const deleteReview = async (req, res) => {
    try {
        const review = await reviewModel.findById(req.params.reviewId);
        if(!review) return res.status(404).json({message: "Review not found"});
        if(!review.author.equals(req?.user._id)) return res.status(403).json({message: "You don't have permission to delete this review"});
        const deletedReview = await reviewModel.findByIdAndDelete(review?._id);
        return res
        .status(200)
        .json({
            message: "Review deleted",
            deletedReviewId: deletedReview?._id
        })
    } catch (err) {
        return res.status(500).json({message: "Failed to delete review"});
    }
};