import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true
})

export const uploadImgOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const result = await cloudinary.uploader.upload(localFilePath, {resource_type: "image"});
        fs.unlinkSync(localFilePath);
        return result;
    } catch (err) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export const deleteImgOnCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return null;

    // Extract public ID from URL
    const urlParts = imageUrl.split("/"); 
    const lastIndex = urlParts.findIndex(part => part.startsWith("v")); // version index
    let publicIdParts = urlParts.slice(lastIndex + 1); // everything after version
    let publicId = publicIdParts.join("/"); // join path
    publicId = publicId.substring(0, publicId.lastIndexOf(".")); // remove extension

    const response = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    return response;
  } catch (err) {
    return err;
  }
};