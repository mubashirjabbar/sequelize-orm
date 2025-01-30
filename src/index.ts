import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { generalLimiter } from "./utils/rateLimit";
import sequelize from "./config/database";



// Initialize Express app
const app = express();

app.use(helmet()); // Use helmet for security

// Apply the general rate limiter to all routes
// app.use(generalLimiter);
// Use the custom error handler

// Middleware setup
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true, }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
sequelize

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on http:localhost:${port}`);
});

// Import routes
import userRoutes from "./routes/user.routes";
import GlobalErrorHandler from "./utils/globalErrorHandler";

// Use routes
app.use("/api/v1/users", userRoutes);

app.use(GlobalErrorHandler);


// app.use("/api/v1/videos", videoRouter);
// app.use("/api/v1/tweets", tweetsRouter);

// // Catch-all route for unhandled endpoints
// app.use((req: Request, res: Response, next: NextFunction) => {
//     next(new ApiError(404, "The requested resource was not found"));
// });

// // Error-handling middleware
// app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal Server Error";

//     // Log the error stack for debugging in non-production environments
//     if (process.env.NODE_ENV !== "production") {
//         console.error(err.stack);
//     }

//     // Send a JSON response for the error
//     res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//         errors: err.errors || [], // Add extra error details if available
//     });
// });

export { app };