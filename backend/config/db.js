import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://p021097:021097@cluster0.ccl9bjc.mongodb.net/cred')
    .then(() => console.log("DB connected Sucessfully"))
}