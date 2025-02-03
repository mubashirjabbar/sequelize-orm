import jwt from "jsonwebtoken";

const generateAccessToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.JWT_TOKEN_STRING as string, {
        expiresIn: "1m", // Short lifespan
    });
};

const generateRefreshToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.JWT_TOKEN_STRING as string, {
        expiresIn: "1d", // Longer lifespan
    });
};

export { generateAccessToken, generateRefreshToken };
