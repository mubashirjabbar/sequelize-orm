import { Router } from "express";

import { loginLimiter } from "../utils/rateLimit";
import { upload } from "../middleware/multer.middleware";
import { getCurrentUser, getUserById, loginUser, registerUser } from "../controller/user.controller";
import authenticateJWT from "../middleware/authentication.middleware";


const router = Router();

//upload.fields is the middleware
router.route("/register").post(loginLimiter, upload.fields([{ name: "profileImage", maxCount: 1 }]), registerUser)
router.route("/login").post(loginLimiter, loginUser)
router.route("/:id").get(loginLimiter, getUserById)
router.route("/currentUser").post(loginLimiter, authenticateJWT, getCurrentUser)


export default router