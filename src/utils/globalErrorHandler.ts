import { Request, Response, NextFunction } from 'express';
import AppError from './appError';

const GlobalErrorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Set default status and message
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    // Send JSON response
    res.status(statusCode).json({
        status,
        message: err.message,
    });
};

export default GlobalErrorHandler;
