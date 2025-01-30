class AppError extends Error {
    status: 'fail' | 'error';  // Ensure the status is either 'fail' or 'error'
    statusCode: number;         // statusCode should be a number
    isOperational: boolean;     // isOperational should be a boolean

    constructor(message: string, statusCode: number) {
        super(message);

        // Ensure `status` is set based on `statusCode`
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.statusCode = statusCode;
        this.isOperational = true;

        // Capture stack trace (use `this.constructor` to maintain the correct stack trace in subclasses)
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
