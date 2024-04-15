import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { FileValidTypesMiddleware } from "../middlewares/file-valid-types.middleware";
import { envs } from "../../config";

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    router.use(FileUploadMiddleware.containFiles);
    const fileUploadService = new FileUploadService();
    const controller = new FileUploadController(fileUploadService);
    router.post(
      "/single/:type",
      [FileValidTypesMiddleware.validType(envs.UPLOAD_FOLDERS)],
      controller.uploadFile
    );
    router.post(
      "/multiple/:type",
      [FileValidTypesMiddleware.validType(envs.UPLOAD_FOLDERS)],
      controller.uploadMultipleFiles
    );
    return router;
  }
}
