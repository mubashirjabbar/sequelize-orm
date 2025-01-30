// utils/logger.js
import winston from 'winston';

// Create a logger instance
const logger = winston.createLogger({
    level: 'info',  // Minimum level of logs to show
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),  // Adds color to log messages
                winston.format.simple()     // Simplified log format
            ),
        }),
        // Optionally add File transport to log into a file
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

export default logger;
