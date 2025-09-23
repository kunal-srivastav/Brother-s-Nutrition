import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    images: {
        type: [String],
        required: true,
        index: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Protein",
        "Pre-Workout",
        "Creatine",
        "BCAA",
        "Multivitamins",
        "Omega-3",
        "Weight Gainer",
        "Fat Burner",
        "Other",
      ],
      required: true,
    },
    brand: { 
      type: String, 
      required: true
    },
    weight: {
      type: String, // e.g., "1kg", "500g"
      required: true,
    },
    servingSize: {
      type: String, // e.g., "30g scoop"
    },
    price: {
      type: Number, // keep it numeric
      required: true,
    },
    discount: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    numberOfReviews: {
      type: Number,
      default: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

productSchema.virtual("finalPrice").get(function() {
  if (this.price) {
    const discountedPrice = this.price - (this.price * ((this.discount || 0) / 100));
    return Math.round(discountedPrice > 0 ? discountedPrice : 0);
  }
  return 0;
});

productSchema.index({ name: "text", description: "text", category: "text" });

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

const productModel = mongoose.model("Product", productSchema);

export default productModel;
