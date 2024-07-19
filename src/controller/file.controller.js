import { ResponseHelper } from "../helper/response.helper.js";
import { API_STATUS_CODE } from "../helper/status-code.helper.js";

export class FileController {
  static async getProfile(req, res, next) {
    try {
      const files = req.files;

      console.log(files);

      return res.status(API_STATUS_CODE.OK).json(ResponseHelper.toJson("Hello from API!"));
    } catch (error) {
      next(error);
    }
  }
}
