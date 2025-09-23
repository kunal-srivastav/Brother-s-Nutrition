import userModel from "../models/userModel.js"
import productModel from "../models/productModel.js";
import { deleteImgOnCloudinary, uploadImgOnCloudinary } from "../utils/cloudinary.js";

//worked
export const getAllProducts = async (req, res) => {
  const { query, category, brand, price, rating, limit = 20, page = 1 } = req.query;
  const skip = (page - 1 ) * limit;
  try {
    let filter = {};
    
  if (query) {
    filter.name = { $regex: query, $options: "i" }; // search by name
  }

  if (category) filter.category = category;
  if (price) {
    const [min, max] = price.split("-").map(Number);
    filter.price = { $gte: min, $lte: max };
  }
  if (brand) filter.brand = brand;
  if (rating) filter.averageRating = { $gte: Number(rating) };
  const products = await productModel.find(filter).select("name images price discount averageRating category").limit(limit).skip(skip).sort({createdAt: -1});
  const totalProducts = await productModel.countDocuments(filter);
  return res.status(200).json({
    message: "Successfully fetched products",
    products,
    totalProducts,
    totalPages: Math.ceil(totalProducts/limit)
  });

  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch products" });
  }
};

//worked
export const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.productId);
        if(!product) return res.status(404).json({message: "Product not found"});
        const relatedProducts = await productModel.find({category: product?.category, _id: {$ne: product?._id}}).limit(10).select("images name price");
        return res
        .status(200)
        .json({
            message: "Product fetched",
            product,
            relatedProducts
        })
    } catch (err) {
        return res.status(500).json({message: "Failed to fetch Product"});
    }
} 

//worked
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, weight, brand, servingSize, price, discount, isAvailable } = req.body;

    const imageLocalPaths = req.files?.map(file => file.path) || [];
    if (!name || !description || !category || !price || !weight || !brand) return res.status(400).json({ message: "All fields are required" });
    if (imageLocalPaths.length === 0) return res.status(400).json({ message: "At least one image is required" });

    const imageUrls = [];
    for (let path of imageLocalPaths) {
      const uploaded = await uploadImgOnCloudinary(path);
      if (uploaded?.secure_url) {
        imageUrls.push(uploaded.secure_url);
      }
    };

    if (imageUrls.length === 0) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    // Create product
    const newProduct = await productModel.create({
        owner: req?.user._id,
        images: imageUrls,
        name,
        description,
        category,
        price,
        weight,
        servingSize,
        discount,
        isAvailable,
        brand
    });

    return res.status(201).json({
      message: "Product created successfully",
      newProduct,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to create product" });
  }
};

//worked
export const getAdminProducts = async (req, res) => {
    try {
        const adminProducts = await productModel.find({owner: req?.user._id});
        return res
        .status(200)
        .json({
            message: "User products",
            adminProducts
        })
    } catch (err) {
        return res.status(500).json({message: "Unable to fetch user products"});
    }
};

//worked
export const updateProduct = async (req, res) => {
  const { name, description, category, weight, brand, servingSize, price, discount, isAvailable, stock } = req.body;
  const imageLocalPaths = req.files?.map(file => file.path) || [];
  const bodyImages = Array.isArray(req.body.images) ? req.body.images : req.body.images ? [req.body.images] : [];

  try {
    const product = await productModel.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (!product.owner.equals(req.user._id)) return res.status(403).json({ message: "No permission to update" });

    // Find missing images and their indexes
    const missingImages = product.images
      .map((img, idx) => ({ img, idx }))
      .filter(({ img }) => !bodyImages.includes(img));

    // Upload new images to Cloudinary
    const uploadedImages = await Promise.all(
      imageLocalPaths.map(path => uploadImgOnCloudinary(path))
    );
    const imageUrls = uploadedImages.map(img => img.secure_url);

    // Replace missing images at correct indexes
    missingImages.forEach(({ idx, img }, i) => {
      product.images[idx] = imageUrls[i] || null; // replace missing image
      if (img) {
        deleteImgOnCloudinary(img); // delete the old image
      }
    });

    // Update other fields
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.category = category ?? product.category;
    product.weight = weight ?? product.weight;
    product.brand = brand ?? product.brand;
    product.servingSize = servingSize ?? product.servingSize;
    product.price = price ?? product.price;
    product.discount = discount ?? product.discount;
    product.isAvailable = isAvailable ?? product.isAvailable;
    product.stock = stock ?? product.stock;

    await product.save();

    return res.status(200).json({
      message: "Successfully updated product",
      updatedProduct: product
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update product" });
  }
};

//worked
export const deleteProduct = async (req, res) => {
    try {
        const user = await userModel.findById(req.user?._id);
        if(!user && user.role !== "admin") return res.status(401).json({message: "Unauthorized request"});
        const product = await productModel.findById(req.params.productId);
        if(!product) return res.status(404).json({message: "Product not found"});
        if(!product.owner.equals(req?.user._id)) return res.status(403).json({message: "You don't have any permission to delete"});
        await productModel.findByIdAndDelete(product?._id);
        return res
        .status(200)
        .json({
            message: "Successfully product deleted",
            deletedProductId: product?._id
        })
    } catch (err) {
        return res.status(500).json({message: "Failed to delete product"});
    }
};