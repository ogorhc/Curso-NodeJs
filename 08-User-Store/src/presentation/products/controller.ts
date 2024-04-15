import { Request, Response } from "express";
import { CreateProductsDto, CustomError, PaginationDto } from "../../domain";
import { ProductsService } from "../services/product.service";

export class ProductsController {
  constructor(private productsService: ProductsService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  public createProduct = async (req: Request, res: Response) => {
    const [error, createProductsDto] = CreateProductsDto.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (error) return res.status(400).json(error);
    this.productsService
      .createProduct(createProductsDto!)
      .then((product) => res.status(201).json(product))
      .catch((error) => this.handleError(error, res));
  };

  public getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    this.productsService
      .getProducts(paginationDto!)
      .then((products) => res.status(200).json(products))
      .catch((error) => this.handleError(error, res));
  };
}
