import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import AppError from '../utils/appError';

const authenticateJWT = (req: any, res: any, next: NextFunction) => {
    // Get the token from cookies
    const token = req.cookies.auth_token;  // Assuming you stored it as 'token' in the cookie

    // If no token is provided, send an error
    if (!token) {
        return next(new AppError('Authentication failed. Token missing.', 401));
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_TOKEN_STRING || '', (err: any, decoded: any,) => {
        if (err) {
            return next(new AppError('Authentication failed. Invalid token.', 401));
        }

        // Attach the decoded user information to the request object (user ID, etc.)
        req.user = decoded;  // decoded contains the user info encoded in the token (like userId)
        next();  // Continue to the next middleware/route handler
    });
};

export default authenticateJWT;
