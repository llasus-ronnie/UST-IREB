import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "UST-IREB"
        });
        console.log(`MongoDB connection is a success`);
    }
    catch (error) {
        console.log("Error connecting to database", error);
    }
}

