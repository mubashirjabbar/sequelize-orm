import { Router } from "express";

import { loginLimiter } from "../utils/rateLimit";
import { upload } from "../middleware/multer.middleware";
import { getCurrentUser, getUserById, loginUser, logoutUser, refreshToken, registerUser } from "../controller/user.controller";
import authenticateJWT from "../middleware/authentication.middleware";


const router = Router();

//upload.fields is the middleware
router.route("/register").post(loginLimiter, upload.fields([{ name: "profileImage", maxCount: 1 }]), registerUser)
router.route("/login").post(loginLimiter, loginUser)
router.route("/:id").get(loginLimiter, authenticateJWT, getUserById)
router.route("/currentUser").post(loginLimiter, authenticateJWT, getCurrentUser)
router.route("/refreshToken").post(loginLimiter, refreshToken)
router.route("/logout").post(loginLimiter, logoutUser)



export default router