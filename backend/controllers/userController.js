//Handels the logics
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc	Auth user & get connetion token
// @route	POST /api/users/login
// @access	Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc	Register user
// @route	POST /api/users
// @access	Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('register user');
});

// @desc	Logout user / clear cookie
// @route	POST /api/users/logout
// @access	Public
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user');
});

// @desc	Get user profile
// @route	GET /api/users/profile
// @access	Public
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('user profile ');
});

// @desc	Update user
// @route	PUT /api/users/profile
// @access	Privde
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user');
});

// @desc	Get all users
// @route	GET /api/users
// @access	Private/admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('all users');
});

// @desc	Get users by ID
// @route	GET /api/users/:id
// @access	Private/admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by ID');
});

// @desc	Delete user
// @route	DELETE /api/users/:id
// @access	Private/admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

// @desc	Update user
// @route	PUT /api/users/:id
// @access	Private/admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update users');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
};
