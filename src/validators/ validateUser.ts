import Joi from "joi";

// Define the validation schema using Joi
export const registerUserSchema = Joi.object({
    name: Joi.string()
        .trim()
        .required()
        .pattern(/^[a-zA-Z\s]+$/)
        .messages({
            "string.base": `Name should be a type of 'text'`,
            "string.empty": `Name cannot be an empty field`,
            "string.pattern.base": `Name should contain only alphabetic characters`,
            "any.required": `Name is a required field`,
        }),

    email: Joi.string().email().required().messages({
        "string.base": `Email should be a type of 'text'`,
        "string.empty": `Email cannot be an empty field`,
        "any.required": `Email is a required field`,
        "string.email": `Email must be a valid email`,
    }),
    password: Joi.string().min(8).required().messages({
        "string.base": `"password" should be a type of 'text'`,
        "string.empty": `"password" cannot be an empty field`,
        "any.required": `"password" is a required field`,
        "string.min": `"password" should be at least 8 characters`,
    }),
    profileImage: Joi.string().required().uri().messages({
        "any.required": `ProfileImage is a required field`,
        "string.empty": `Phone number cannot be an empty field`,
        "string.base": `ProfileImage should be a type of text`,
        "string.uri": `ProfileImage must be a valid URI`,
    }),
    phoneNumber: Joi.string()
        .required() // Ensure the phone field is not empty
        .pattern(/^\d{10,15}$/) // Ensure it's a valid phone number with 10 to 15 digits
        .messages({
            "string.base": `Phone number should be a type of text`,
            "string.empty": `Phone number cannot be an empty field`, // Custom message for empty input
            "string.pattern.base": `Phone number must be a valid phone number with 10 to 15 digits`, // Custom message for invalid format
            "any.required": `Phone number is a required field`, // Custom message for missing field
        }),

});
