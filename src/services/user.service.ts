import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/user.model";
import AppError from "../utils/appError";
import logger from "../utils/logger";




// Function to generate JWT token
export const generateToken = (userId: string) => {
    const JWT_TOKEN_STRING = process.env.JWT_TOKEN_STRING;
    if (!JWT_TOKEN_STRING) {
        throw new Error("JWT secret is not defined. Check your environment variables.");
    }

    const payload = { id: userId };
    const options = { expiresIn: "1d" }; // Token expires in 1 hour

    return jwt.sign(payload, JWT_TOKEN_STRING, options);
};



// Helper function to hash the password
export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Service function to create a user
export const createUser = async (userData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    profileImage: string;
}) => {
    try {

        // First, hash the password
        const hashedPassword = await hashPassword(userData.password);

        // Create the user with hashed password
        const newUser = await User.create({
            ...userData,
            password: hashedPassword,
        });

        if (!newUser) {
            throw new AppError("Failed to create the user", 400);
        }
        // Generate JWT token using Sequelize's id field
        const token = generateToken(newUser.getDataValue("id"));

        // Remove password before sending response
        const userWithoutPassword = { ...newUser.get(), password: undefined };

        return { user: userWithoutPassword, token };

    } catch (error: any) {
        logger.error("Error creating user: ", error);
        throw error; // Rethrow to be handled by the controller
    }
};

// Service function to check if the email already exists in the database
export const checkIfEmailExists = async (email: string) => {
    try {
        const existingUser = await User.findOne({ where: { email } });
        return existingUser; // Returns the user if exists, else null
    } catch (error: any) {
        logger.error("Error checking email existence: ", error?.message);
        throw new AppError(error?.message, 500); // Handle DB errors properly
    }
};
