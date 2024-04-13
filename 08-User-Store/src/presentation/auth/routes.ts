import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";

export class AuthRoutes {
  static get routes(): Router {
    const authService = new AuthService();
    const authController = new AuthController(authService);
    const router = Router();
    router.post("/login", authController.loginUser);
    router.post("/register", authController.registerUser);
    router.get("/validate-email/token", authController.validateEmail);
    return router;
  }
}
