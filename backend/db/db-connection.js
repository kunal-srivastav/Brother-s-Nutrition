import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/E-Commerce`);
        console.log("Databases connected");
    } catch (err) {
        console.log(err);
        console.log("Mongodb connection failed");
    }
}

export default connectDB;