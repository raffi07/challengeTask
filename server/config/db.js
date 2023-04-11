//@ts-nocheck
const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`mongoDB connected ${conn.connection.host}`.green.bold.inverse);
};

module.exports = connectDB;