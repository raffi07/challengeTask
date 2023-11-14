//@ts-nocheck
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const UnauthorizedUser = require("../models/UnauthorizedUser");
const User = require("../models/User");

// @desc get all users
// @route GET /api/v1/users
// @access Public
const getUnauthorizedUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc get user by ID
// @route GET /api/v1/users/:id
// @access Private
const getUnauthorizedUser = asyncHandler(async (req, res, next) => {
    const user = await UnauthorizedUser.findById(req.params.id);
    if (!user) {
        return next(new ErrorResponse(`UnauthorizedUser not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: user });
});
// @desc update a book
// @route UPDATE /api/v1/books
// @access Private
const updateUnauthorizedUser = asyncHandler(async (req, res, next) => {
    // ################################################################
    // #### NEED TO MATCH USER TO USER MAKING THE REQUEST or ADMIN ####
    // ################################################################

    const user = await UnauthorizedUser.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: user });
});

// @desc get all books
// @route DELETE /api/v1/books
// @access Private
const deleteUnauthorizedUser = asyncHandler(async (req, res, next) => {
    // ################################################################
    // #### NEED TO MATCH USER TO USER MAKING THE REQUEST or ADMIN ####
    // ################################################################

    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    await user.deleteOne();

    res.status(200).json({});
});

const  createUnauthorizedUser = async (id) => {
    return await UnauthorizedUser.create({_id: id});
}

module.exports = {
    getUnauthorizedUsers,
    getUnauthorizedUser,
    createUnauthorizedUser,
    updateUnauthorizedUser,
    deleteUnauthorizedUser,
};
