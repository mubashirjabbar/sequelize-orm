import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import AppError from '../utils/appError';

const authenticateJWT = (req: any, res: any, next: NextFunction) => {
    let token;

    // Get token from cookies (Web) or Authorization header (Mobile)
    if (req.cookies?.refresh_token) {
        token = req.cookies.refresh_token; // Web
    } else if (req.headers["authorization"]) {
        const authHeader = req.headers["authorization"];
        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]; // Mobile (Sent in header)
        }
    }

    // Check if token exists
    if (!token) {
        return next(new AppError('Authentication failed. Token missing.', 401));
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_TOKEN_STRING as string, (err: any, decoded: any) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return next(new AppError("Access token expired, please refresh", 401));
            }
            return next(new AppError("Authentication failed. Invalid token.", 401));
        }

        req.user = decoded;
        next();
    });
};

export default authenticateJWT;
