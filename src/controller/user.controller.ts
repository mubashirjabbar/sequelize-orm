import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


import User from "../models/user.model";
import AppError from "../utils/appError";
import { asyncHandler } from "../utils/asyncHandler";
import logger from '../utils/logger';
import { registerUserSchema } from "../validators/ validateUser";



const registerUser = asyncHandler(async (req: any, res: any, next: any) => {
    const { name, email, password, phoneNumber, profileImage } = req.body;


    logger.info('Received login request', req.body);

    try {
        // Validate the incoming data using Joi
        const { error } = registerUserSchema.validate(req.body);

        if (error) {
            return next(new AppError(error.details[0].message, 400));
        }


        const newUser = await User.create({
            name,
            email,
            password,
            phoneNumber,
            profileImage,
        })

        if (!newUser) {
            return next(new AppError('Failed to create the user', 400));
        }

        res.status(201).json({
            status: 'success',
            message: 'User successfully registered',
            newUser
        });

    } catch (error) {
        logger.error('Registration error', error);
        return next(new AppError('Internal server error', 500));
    }
});



export {
    registerUser,
}