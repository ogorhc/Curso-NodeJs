import { ProductModel } from "../../data";
import { CreateProductsDto, CustomError, PaginationDto } from "../../domain";

export class ProductsService {
  constructor() {}

  createProduct = async (createProductsDto: CreateProductsDto) => {
    const productExist = await ProductModel.findOne({
      name: createProductsDto.name,
    });

    if (productExist) throw CustomError.badRequest("Category already exist");

    try {
      const product = new ProductModel({
        ...createProductsDto,
      });
      await product.save();

      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  };

  getProducts = async (paginationDto: PaginationDto) => {
    const { page, limit } = paginationDto;

    try {
      //   const total = await ProductModel.countDocuments();
      //   const product = await ProductModel.find()
      //     .skip((page - 1) * limit)
      //     .limit(limit);

      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit),

        //todo populate
      ]);

      if (products.length === 0)
        throw CustomError.notFound("Empty list of categories");
      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/products?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products: products,
      };
    } catch (error) {
      throw CustomError.internalServer("Internal Server Error");
    }
  };
}
