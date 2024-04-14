import { CategoryModel } from "../../data";
import {
  CreateCategoryDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from "../../domain";

export class CategoryService {
  constructor() {}

  createCategory = async (
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ) => {
    const categoryExist = await CategoryModel.findOne({
      name: createCategoryDto.name,
    });

    if (categoryExist) throw CustomError.badRequest("Category already exist");

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });
      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  };

  getCategories = async (paginationDto: PaginationDto) => {
    const { page, limit } = paginationDto;

    try {
      //   const total = await CategoryModel.countDocuments();
      //   const categories = await CategoryModel.find()
      //     .skip((page - 1) * limit)
      //     .limit(limit);

      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      if (categories.length === 0)
        throw CustomError.notFound("Empty list of categories");
      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0
            ? `/api/categories?page=${page - 1}&limit=${limit}`
            : null,
        categories: categories.map((category) => {
          return {
            id: category.id,
            name: category.name,
            available: category.available,
          };
        }),
      };
    } catch (error) {
      throw CustomError.internalServer("Internal Server Error");
    }
  };
}
