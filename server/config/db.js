//@ts-nocheck
const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("trying to connect to mongo db")
    await mongoose.connect(
      "mongodb://mymongodb:27017/",
      {
        auth: {
          username: "anas",
          password: "12345",
        },
        authSource: "admin",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(() => console.log("connection established successfully"))
        .catch((err) => console.log("connection attempt failed:", err))
};

module.exports = connectDB;
