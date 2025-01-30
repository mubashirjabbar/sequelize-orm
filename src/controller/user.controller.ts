import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


import User from "../models/user.model";
import AppError from "../utils/appError";
import { asyncHandler } from "../utils/asyncHandler";
import logger from '../utils/logger';
import { registerUserSchema } from "../validators/ validateUser";
import { checkIfEmailExists, createUser } from "../services/user.service";


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

export {
    registerUser,
};