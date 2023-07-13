"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
//import helmet from "helmet"
const debug_1 = __importDefault(require("debug"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const swaggerDocument = yamljs_1.default.load(`${__dirname.split(path_1.default.sep).pop()}/swagger/swagger.yaml`);
const debugLog = (0, debug_1.default)('app');
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    initializeMiddlewares() {
        //this.express.use(helmet());
        this.express.use((0, cors_1.default)());
        this.express.use(express_1.default.json());
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: true }));
        this.express.use(express_1.default.urlencoded({ extended: true }));
        this.express.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/api', controller.router);
        });
    }
    listen() {
        this.express.listen(this.port, () => console.log(`Server is running on port : ${this.port}`));
    }
}
exports.default = App;
