import { Router } from "express";

import { loginLimiter } from "../utils/rateLimit";
import { upload } from "../middleware/multer.middleware";
import { registerUser } from "../controller/user.controller";


const router = Router();

//upload.fields is the middleware
router.route("/register").post(loginLimiter, upload.fields([{ name: "profileImage", maxCount: 1 }]), registerUser)

export default router