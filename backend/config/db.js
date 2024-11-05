import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connection has been establised: ${(await connection).connection.host}`
    );
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
