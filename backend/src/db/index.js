import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      "DATABASE CONNECTIED SUCCESSFULLY, DB HOSTNAME : ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Connection failed :", error);
  }
};

export default connectDB
