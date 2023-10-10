//@ts-nocheck
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb://host.docker.internal:27017/task-management",
      {
        auth: {
          username: "anas",
          password: "12345",
        },
        authSource: "admin",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })}
    catch (err) {
      if (err) {
        console.error("failed to connect to mongoDB");
        console.error(err);
      } else {
        console.log("mongodb is running and secured");
        app.listen(PORT);
      }
    }
};

module.exports = connectDB;
