import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    //Get the token from the HTTP requests
    token = req.cookies.jwt;

    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedToken.userId).select(
                '-password'
            ); //Injects a new JSON field in the request, containig the user's details without the hashed password
            next();
        } catch (err) {
            console.log(err);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

//Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
};

export { protect, admin };
