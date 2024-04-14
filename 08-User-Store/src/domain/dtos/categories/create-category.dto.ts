export class CreateCategoryDto {
  constructor(public name: string, public available: boolean) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available } = object;
    let availableBoolean = available;
    if (!name) return ["Name is missing", undefined];
    if (typeof available !== "boolean") {
      availableBoolean = available === true;
    }
    const createCategoryDto = new CreateCategoryDto(name, available);
    return [undefined, createCategoryDto];
  }
}
