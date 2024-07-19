import express from "express";
import { HelloController } from "../controller/hello.controller.js";
import { FileUploadMiddleware } from "../middleware/file-upload.middleware.js";
import { FileController } from "../controller/file.controller.js";

const publicRouter = express.Router();

publicRouter.get("/", HelloController.sayHello);

publicRouter.post("/file", FileUploadMiddleware.uploadProfile, FileController.getProfile);

export { publicRouter };
