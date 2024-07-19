import multer from "multer";
import path from "path";
import { ResponseHelper } from "../helper/response.helper.js";
import { API_STATUS_CODE } from "../helper/status-code.helper.js";
import { APIError } from "../error/api.error.js";

const FILE_LIMIT = 2 * 1024 * 1024;

export const fileUploader = multer({
  limits: {
    fileSize: FILE_LIMIT,
  },
  fileFilter: function (req, file, cb) {
    let extFile = path.extname(file.originalname);
    if (extFile === ".png" || extFile === ".jpg" || extFile === ".jpeg") return cb(null, true);

    // A Multer error occurred when uploading.
    cb(null, false);
    cb(new APIError(400, "Filetype must be PNG/JPG/JPEG"));
  },
  storage: multer.diskStorage({}),
});

const profileUpload = fileUploader.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 2 },
]);

export class FileUploadMiddleware {
  static async uploadProfile(req, res, next) {
    try {
      profileUpload(req, res, (err) => {
        if (err) {
          next(err);
        }
        next();
      });
    } catch (error) {
      next(error);
    }
  }
}
