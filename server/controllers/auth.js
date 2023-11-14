//@ts-nocheck
const ErrorResponse = require("../utils/errorResponse") ;
const asyncHandler = require("../middleware/async") ;
const User = require("../models/User") ;
const {MongooseError} = require("mongoose");
// @desc REGISTER USER
// @route POST /api/v1/auth/register
// @access Public
const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  let user;
  try {
    // Create user
     user = await User.create({
      username,
      email,
      password,
      role,
    });
  }catch(e){
    console.log(e);
    return next(new ErrorResponse ("Something went wrong when creating the user.", 400))
  }

  sendTokenResponse(user, 200, res);
});

// @desc Login User
// @route POST /api/v1/auth/register
// @access Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("please provide and email and password", 400));
  }

  // check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse(MongooseError.toString(), 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// FUNCTION get token from model, create cookie & send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    //If cookie should be accessible by frontend, the httpOnly must be false, because it runs in a different port
    httpOnly: false,
  };

  res.status(statusCode).cookie("token", token, options).json({ success: true, token });
};

// @desc Get current logged in user
// @route POST /api/v1/auth/me
// @access Public
const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if(!user){
    return new ErrorResponse(
        "Please log in to see your profile", 401
    )
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc Check if user is admin
// @route POST /api/v1/auth/admin
// @access Public
const isAdmin = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true
  });
});


module.exports = {
  getMe,
  login,
  register,
  isAdmin
};