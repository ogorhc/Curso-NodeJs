import { Router } from "express";
import { ProductsController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductsService } from "../services/product.service";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();
    const productsService = new ProductsService();
    const controller = new ProductsController(productsService);
    router.get("/", [AuthMiddleware.validateJWT], controller.getProducts);
    router.post("/", [AuthMiddleware.validateJWT], controller.createProduct);
    return router;
  }
}
