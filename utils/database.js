import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "UST-IREB",
    });
    console.log(`MongoDB connection is a success`);
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

export default connectDB;

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGO_URI;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env"
//   );
// }

// let cached = global.mongo;

// if (!cached) {
//   cached = global.mongo = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectDB;
