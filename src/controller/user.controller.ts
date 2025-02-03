import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


import User from "../models/user.model";
import AppError from "../utils/appError";
import { asyncHandler } from "../utils/asyncHandler";
import logger from '../utils/logger';
import { loginUserSchema, registerUserSchema } from "../validators/ validateUser";
import { checkIfEmailExists, createUser, generateToken } from "../services/user.service";


const registerUser = asyncHandler(async (req: any, res: any, next: any) => {
    const { name, email, password, phoneNumber, profileImage } = req.body;

    logger.info("Received registration request", req.body);

    try {
        // Validate the incoming data using Joi
        const { error } = registerUserSchema.validate(req.body);

        if (error) {
            return next(new AppError(error.details[0].message, 400));
        }

        // Check if email already exists in the database
        const existingUser = await checkIfEmailExists(email);
        if (existingUser) {
            return next(new AppError("Email already exists", 400));
        }

        // Call the service to create the user
        const newUser = await createUser({
            name,
            email,
            password,
            phoneNumber,
            profileImage,
        });

        // Send success response
        res.status(201).json({
            status: "success",
            message: "User successfully registered",
            newUser,
        });

    } catch (error: any) {
        // Log the error and send a user-friendly message
        logger.error("Registration error", error?.message || error);
        return next(new AppError(`Registration failed: ${error?.message || error}`, 500));
    }
});


const loginUser = asyncHandler(async (req: any, res: any, next: any) => {
    const { email, password, } = req.body;

    logger.info("Received login request", req.body);

    try {
        // Validate the incoming data using Joi
        const { error } = loginUserSchema.validate(req.body);

        if (error) {
            return next(new AppError(error.details[0].message, 400));
        }

        // Check if email already exists in the database
        const existingUser = await checkIfEmailExists(email);
        if (!existingUser) {
            return next(new AppError("Incorrect authentication", 400));
        }

        // Compare the provided password with the hashed password
        // @ts-ignore
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return next(new AppError("Incorrect authentication", 401));
        }

        // Generate JWT token
        // @ts-ignore
        const token = generateToken(existingUser?.id);

        // Remove password from user object before sending it to the client
        const userWithoutPassword = { ...existingUser.get(), password: undefined };

        // Set the token in HttpOnly cookie
        res.cookie("auth_token", token, {
            httpOnly: true,  // Can't be accessed via JavaScript
            secure: process.env.NODE_ENV === "production", // Only use on HTTPS in production
            maxAge: 86400000, // 1 day
        });

        // Send success response with the user and token
        res.status(200).json({
            status: "success",
            message: "Login successful",
            user: userWithoutPassword,
            token,
        });
    } catch (error: any) {
        // Log the error and send a user-friendly message
        logger.error("Login error", error?.message || error);
        return next(new AppError(`Login failed: ${error?.message || error}`, 500));
    }
});

const getCurrentUser = async (req: any, res: any, next: any) => {
    try {
        const currentUserId = req.user?.id

        if (!currentUserId) {
            return next(new AppError('User ID is not valid', 400));
        }

        const user = await User.findByPk(currentUserId); // Using Sequelize's findByPk method

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        // Attach the user data to the request object
        const userWithoutPassword = { ...user.get(), password: undefined };
        // Send success response with the user and token
        res.status(200).json({
            status: "success",
            message: "User fetched successful",
            user: userWithoutPassword,
        });

    } catch (error) {
        return next(new AppError('Failed to retrieve user', 500)); // Internal Server Error
    }
};


const getUserById = async (req: any, res: any, next: any) => {
    try {
        // Extract user ID from URL params, query, or body
        const userId = req.params.id || req.query.id || req.body.id;

        if (!userId) {
            return next(new AppError('User ID must be provided', 400));
        }

        // Optional: Validate if the ID is a valid format (e.g., a number or a string)
        if (isNaN(Number(userId))) {
            return next(new AppError('Invalid user ID format', 400));
        }

        // Query the database for the user by ID
        const user = await User.findByPk(userId); // Using Sequelize's findByPk method

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        // Attach the user data to the request object
        const userWithoutPassword = { ...user.get(), password: undefined };
        // Send success response with the user and token
        res.status(200).json({
            status: "success",
            message: "User fetched successful",
            user: userWithoutPassword,
        });

    } catch (error) {
        return next(new AppError('Failed to retrieve user', 500)); // Internal Server Error
    }
};

export {
    registerUser,
    loginUser,
    getUserById,
    getCurrentUser
};