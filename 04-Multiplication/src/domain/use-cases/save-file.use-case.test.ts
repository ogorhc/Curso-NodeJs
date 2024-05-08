import fs from "fs";
import { SaveFile } from "./save-file.use-case";

describe("SaveFileUseCase", () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs",
    fileName: "custom-table-name",
  };

  const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    const exist = fs.existsSync("outputs");
    if (exist) fs.rmSync("outputs", { recursive: true });
    const customExist = fs.existsSync(customOptions.fileDestination);
    if (customExist)
      fs.rmSync(customOptions.fileDestination, { recursive: true });
  });

  test("should save file with default values", () => {
    const save = new SaveFile();
    const filePath = "outputs/table.txt";

    const options = {
      fileContent: "test content",
    };

    const result = save.execute(options);

    expect(result).toBeTruthy();
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test("should save file with custom vales", () => {
    const save = new SaveFile();

    const result = save.execute(customOptions);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBeTruthy();
  });

  test("should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom error message from testing");
    });

    const result = saveFile.execute(customOptions);

    expect(result).toBeFalsy();
    mkdirSpy.mockRestore();
  });

  test("should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("This is a custom writing error message");
      });

    const result = saveFile.execute({ fileContent: "hola" });

    expect(result).toBeFalsy();
    writeFileSpy.mockRestore();
  });
});
