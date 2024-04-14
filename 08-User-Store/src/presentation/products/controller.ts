import { Request, Response } from "express";
import { CustomError } from "../../domain";

export class ProductsController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  public createProduct(req: Request, res: Response) {
    res.json("Create product");
  }

  public getProducts(req: Request, res: Response) {
    res.json("Geet products");
  }
}
