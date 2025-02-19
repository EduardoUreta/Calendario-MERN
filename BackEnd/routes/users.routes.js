import { Router } from "express";
import { AuthController } from "../controllers/index.js";
import { validateCreateUser, validLogin } from "../middlewares/validators/user.validators.js";
import { validTokenJWT } from "../utils/jwt.js";

export const usersRoutes = Router();

usersRoutes.post("/new", validateCreateUser, AuthController.createUser);
usersRoutes.post("/login", validLogin, AuthController.loginUser);
usersRoutes.get("/renew-token", validTokenJWT, AuthController.reValidToken);