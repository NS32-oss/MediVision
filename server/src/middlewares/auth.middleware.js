import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new apiError(401, "Unauthorized request. No token provided.");
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new apiError(404, "User not found");
        }

        // Attach user to the request object (without password)
        req.user = user;
        next();
    } catch (error) {
        console.error(error);

        // Handle token expiration separately
        if (error instanceof jwt.TokenExpiredError) {
            throw new apiError(401, "Token expired. Please log in again.");
        }

        // Handle invalid token
        if (error instanceof jwt.JsonWebTokenError) {
            throw new apiError(401, "Invalid token. Please log in again.");
        }

        // General unauthorized error
        throw new apiError(401, "Unauthorized request");
    }
});
