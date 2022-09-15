import express from "express";
import {
  signInValidation,
  signUpValidation,
} from "../middlewares/schemasValidationMiddleware.js";
import { userSignIn, createUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-in", signInValidation, userSignIn);
router.post("/sign-up", signUpValidation, createUser);
export default router;
