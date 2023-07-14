"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../responses/response"));
const roles_model_1 = __importDefault(require("../model/roles.model"));
class Roles {
    //@EncryptPass()
    createroles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside create");
                const roles = req.body;
                const result = yield roles_model_1.default.createRoles(roles);
                const [getUser] = yield roles_model_1.default.getRoles(result === null || result === void 0 ? void 0 : result.insertId);
                console.log("before decorator");
                return res.status(response_1.default.CREATED).json({
                    status: 'success',
                    user: getUser,
                });
            }
            catch (er) {
                return res.status(response_1.default.SERVER_ERROR).json({
                    status: 'failed',
                    error: er.message,
                });
            }
        });
    }
    getrolesbyid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield roles_model_1.default.getRoles(req.body.id);
                console.log('user', user);
                if (!user || user.length === 0)
                    return res.status(response_1.default.NOT_FOUND).json({
                        status: 'not found',
                        message: 'User not found',
                    });
                return res.status(response_1.default.OK).json({
                    status: 'success',
                    user,
                });
            }
            catch (er) {
                return res.status(response_1.default.SERVER_ERROR).json({
                    status: 'failed',
                    error: er.message,
                });
            }
        });
    }
    getallroles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside get all");
                const users = yield roles_model_1.default.getAllRoles();
                return res.status(response_1.default.OK).json({
                    status: 'success',
                    users: users,
                });
            }
            catch (er) {
                return res.status(response_1.default.SERVER_ERROR).json({
                    status: 'failed',
                    error: er.message,
                });
            }
        });
    }
    updateroles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside update");
                const roles = req.body;
                const result = yield roles_model_1.default.updateRoles(roles, roles.id);
                console.log('result', result);
                const [getUser] = yield roles_model_1.default.getRoles(roles.id);
                return res.status(response_1.default.OK).json({
                    status: 'success',
                    user: getUser,
                });
            }
            catch (er) {
                return res.status(response_1.default.SERVER_ERROR).json({
                    status: 'failed',
                    error: er.message,
                });
            }
        });
    }
    deleteroles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside delete");
                const result = yield roles_model_1.default.deleteRoles(req.body.id);
                if (result.affectedRows > 0)
                    return res.status(response_1.default.OK).json({
                        status: 'success',
                        message: 'Record deleted successfully',
                    });
                return res.status(response_1.default.NOT_FOUND).json({
                    status: 'not found',
                    message: 'No User found against this id',
                });
            }
            catch (er) {
                return res.status(response_1.default.SERVER_ERROR).json({
                    status: 'failed',
                    error: er.message,
                });
            }
        });
    }
}
exports.default = new Roles();
