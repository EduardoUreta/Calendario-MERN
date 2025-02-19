import { Router } from "express";
import { AuthController } from "../controllers/index.js";
import { validateCreateUser, validLogin } from "../middlewares/validators/user.validators.js";
import { validTokenJWT } from "../utils/jwt.js";

export const authRoutes = Router();

authRoutes.post("/new", validateCreateUser, AuthController.createUser);
authRoutes.post("/login", validLogin, AuthController.loginUser);
authRoutes.get("/renew-token", validTokenJWT, AuthController.reValidToken);