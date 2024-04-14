import { Router } from "express";
import { ProductsController } from "./controller";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ProductsController();
    router.get("/", controller.getProducts);
    router.post("/", controller.createProduct);
    return router;
  }
}
