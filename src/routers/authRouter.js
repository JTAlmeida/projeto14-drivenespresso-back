import express from "express";
import { signInValidation } from "../middlewares/schemasValidationMiddleware.js";
import {userSignIn} from "../controllers/authController.js"

const router = express.Router();

router.post("/sign-in", signInValidation, userSignIn);

export default router;
