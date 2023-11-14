const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const session = require('./session');
const connectDB = require("./config/db");
const cors = require("cors");
const {createUnauthorizedUser} = require("./controllers/unauthorizedUser")

colors;

dotenv.config();

connectDB();

const allowedOrigins = [
  "http://localhost:3000"
    // todo maybe add frontend:3000 and backend:8080
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin.includes("https://next-danube-webshop") || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

const app = express();
app.get('/api/v1', async (req, res) => {
  const sessionToken = session.generateSessionToken();
  //expires in 2 hours
  const expiratonTime = 2 * 60 * 60;

  // Set the session token as a cookie in the response
  res.cookie('sessionKey', sessionToken);
  try {
    const unauthorizedUser = await createUnauthorizedUser(sessionToken);
    console.log("Created unauthorized user with id: ", sessionToken);
    await unauthorizedUser.save();
  } catch (e) {
    console.log("Not able to create unauthorized user: ", e);
  }

  res.status(200).json({success: true, token: sessionToken, expiresIn: expiratonTime});
});

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

const NODE_ENV = process.env.NODE_ENV || "development";


const books = require("./routes/books");
const users = require("./routes/users");
const auth = require("./routes/auth");
const cart = require("./routes/cart")
const rateLimitMiddleware = require("./middleware/rateLimiter");


//limit API calls per minute
app.use(rateLimitMiddleware);

app.use("/api/v1/books", books);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);
app.use("/api/v1/cart", cart);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold.inverse);
  server.close(() => process.exit());
});
