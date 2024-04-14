import { Router } from "express";
import { CategoriesController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";

export class CategoriesRoutes {
  static get routes(): Router {
    console.log("hola");
    const router = Router();

    const CategoryServices = new CategoryService();
    const controller = new CategoriesController(CategoryServices);
    router.get("/", [AuthMiddleware.validateJWT], controller.getCategories);
    router.post("/", [AuthMiddleware.validateJWT], controller.createCategory);
    return router;
  }
}
