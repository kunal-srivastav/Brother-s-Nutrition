import mongoose from "mongoose";
import productModel from "./productModel.js";

const reviewSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0,
        required: true
    },
    comment: {
        type: String,
        maxlength: 500,
        trim: true
    }
}, { timestamps: true }
);

// After creating a review
reviewSchema.post("save", async function () {
  await this.constructor.recalculateStats({
    productId: this.product,
    newRating: this.rating,
    action: "add"
  });
});

// After deleting a review
reviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await doc.constructor.recalculateStats({
      productId: doc.product,
      oldRating: doc.rating,
      action: "delete"
    });
  }
});

// After updating a review
reviewSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc) return;
  const oldRating = doc.rating;
  const newRating = this.getUpdate().rating;
  if (newRating != null && newRating !== oldRating) {
    await doc.constructor.recalculateStats({
      productId: doc.product,
      oldRating,
      newRating,
      action: "update"
    });
  }
});


reviewSchema.statics.recalculateStats = async function ({
  productId,
  oldRating = null,
  newRating = null,
  action
}) {
  const product = await productModel.findById(productId);
  if (!product) return;

  let count = product.numberOfReviews || 0;
  let avg = product.averageRating || 0;

  if (action === "add") {
    count += 1;
    avg = ((avg * (count - 1)) + newRating) / count;
  }

  if (action === "delete") {
    count = Math.max(count - 1, 0); // prevent negative
    avg = count > 0 ? ((avg * (count + 1)) - oldRating) / count : 0;
  }

  if (action === "update") {
    avg = ((avg * count) - oldRating + newRating) / count;
  }

  await productModel.findByIdAndUpdate(productId, {
    numberOfReviews: count,
    averageRating: avg
  });
};



reviewSchema.index({ author: 1, product: 1 }, { unique: true });

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;