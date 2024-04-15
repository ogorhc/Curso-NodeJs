import { Validators } from "../../../config";

export class CreateProductsDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductsDto?] {
    const { name, available, price, description, user, category } = object;

    if (!name) return ["Missing name"];

    if (!user) return ["Missing user"];

    if (!Validators.isMongoId(user)) return ["Invalid user ID"];

    if (!category) return ["Missing category"];

    if (!Validators.isMongoId(category)) return ["Invalid category ID"];

    return [
      undefined,
      new CreateProductsDto(
        name,
        !!available,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
