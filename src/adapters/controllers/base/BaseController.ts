// For KoaJs
// import { Router, Context } from "../../../infrastructure/server/CoreModules";
// export { Context } from "../../../infrastructure/server/CoreModules";
// import { IResult } from "result-tsk";
// import { HttpStatusResolver } from "./httpResponse/HttpStatusResolver";

// export default class BaseController {
//   constructor() {
//     this.router = new Router();
//   }
//   router: Router;
//   HandleResult(ctx: Context, result: IResult): void {
//     ctx.status = HttpStatusResolver.getCode(result.statusCode.toString());
//     if (result.success) {
//       ctx.body = result.message ? result.toResultDto() : result.toResultDto().data;
//     } else {
//       ctx.body = result.toResultDto();
//     }
//   }
// }

// For ExpressJs
export { Request, Response, NextFunction } from "../../../infrastructure/server/CoreModules";
import { Router, Response, RouterType } from "../../../infrastructure/server/CoreModules";
import { HttpStatusResolver } from "./httpResponse/HttpStatusResolver";
import { IResult } from "result-tsk";

export default class BaseController {
  router: RouterType;

  constructor() {
    this.router = Router();
  }

  handleResult(res: Response, result: IResult): void {
    if (result.success) {
      res
        .status(HttpStatusResolver.getCode(result.statusCode.toString()))
        .json(result.message ? result.toResultDto() : result.toResultDto().data);
    } else {
      res
        .status(HttpStatusResolver.getCode(result.statusCode.toString()))
        .json(result.toResultDto());
    }
  }
}
