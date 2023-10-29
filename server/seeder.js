//@ts-nocheck
const fs = require("fs")
const mongoose = require("mongoose")
const colors = require("colors")
const dotenv = require("dotenv")

// Load env vars
require('dotenv').config({ path: "./config/config.env" });

// Load models 
const Book = require("./models/Book.js")
const User = require("./models/User.js")
const UnauthorizedUser = require("./models/UnauthorizedUser.js")
const Cart = require("./models/Cart.js")
const connectDB = require("./config/db");

// Read JSON files
const books = JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8"));

// import into db
const importData = async () => {
  await connectDB();

  try {
    console.log("start importing data");
    await Book.create(books);
    await User.create(users);

    console.log("Data imported...".blue.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// delete data
const deleteData = async () => {
  await connectDB();

  try {
    console.log("start destroying data")
    await Book.deleteMany();
    await User.deleteMany();
    //delete all session users
    await UnauthorizedUser.deleteMany();

    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--v") {
  deleteData();
}

if (process.argv[2] === "--i") {
  importData();
}
