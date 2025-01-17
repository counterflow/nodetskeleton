// For KoaJs
// import BaseController from "../../adapters/controllers/base/BaseController";
// import resources from "../../application/shared/locals/index";
// import { Server, BodyParser, cors } from "./CoreModules";
// import localization from "../middleware/localization";
// import handleError from "../middleware/handleError";
// import config from "../config";

// const bodyParser = BodyParser;

// export default class App {
//   public app: Server;

//   constructor(controllers: BaseController[]) {
//     this.app = new Server();
//     this.loadMiddleware();
//     this.loadControllers(controllers);
//     this.loadHandleError();
//     this.setup();
//   }

//   public loadMiddleware(): void {
//     this.app.use(bodyParser());
//     this.app.use(localization());
//   }

//   private loadControllers(controllers: BaseController[]) {
//     controllers.forEach((controller) => {
//       controller.router.prefix(config.server.root);
//       this.app.use(controller.router.routes());
//       this.app.use(controller.router.allowedMethods());
//     });
//   }

//   private loadHandleError(): void {
//     this.app.on("error", handleError());
//   }

//   private setup(): void {
//     resources.SetDefaultLanguage(config.params.defaultLang);
//   }

//   private listen(): void {
//     this.app.listen(config.server.port, () => {
//       console.log(
//         `Server running on ${config.server.root}${config.server.host}:${config.server.port}`,
//       );
//     });
//   }

//   private runServices(): void {
//     // Initialize db and other services here and once started run Listen
//     this.listen();
//   }

//   public start(): void {
//     this.runServices();
//   }
// }

// For ExpressJs
import { Server, Application, BodyParser } from "../server/CoreModules";
import BaseController from "../../adapters/controllers/base/BaseController";
import resources from "../../application/shared/locals/index";
import LocalizationMiddleware from "../middleware/localization";
import handlerErrorMiddleware from "../middleware/handleError";
import * as helmet from "helmet";
import config from "../config";

export default class App {
  public app: Application;

  constructor(controllers: BaseController[]) {
    this.app = Server();
    this.app.set("trust proxy", true);
    this.loadMiddleware();
    this.loadControllers(controllers);
    this.loadHandleError();
    this.setup();
  }

  public loadMiddleware(): void {
    this.app.use(helmet());
    this.app.use(BodyParser());
    this.app.use(LocalizationMiddleware.handler);
  }

  private loadControllers(controllers: BaseController[]): void {
    controllers.forEach((controller) => {
      this.app.use(config.server.Root, controller.router);
    });
  }

  private loadHandleError(): void {
    this.app.use(handlerErrorMiddleware.handler);
  }

  private setup(): void {
    resources.setDefaultLanguage(config.params.defaultLang);
  }

  public listen(): void {
    this.app.listen(config.server.Port, () => {
      console.log(
        `Server running on ${config.server.Host}:${config.server.Port}${config.server.Root}`,
      );
    });
  }

  private runServices(): void {
    // Initialize db and other services here and once started run Listen
    this.listen();
  }

  public start(): void {
    this.runServices();
  }
}
