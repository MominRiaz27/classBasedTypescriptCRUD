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
const permission_model_1 = __importDefault(require("../model/permission.model"));
class Permissions {
    //@EncryptPass()
    createpermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside create");
                const permission = req.body;
                const result = yield permission_model_1.default.createPermission(permission);
                const [getUser] = yield permission_model_1.default.getPermission(result === null || result === void 0 ? void 0 : result.insertId);
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
    getpermissionbyid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield permission_model_1.default.getPermission(req.body.id);
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
    getallpermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside get all");
                const users = yield permission_model_1.default.getAllPermission();
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
    updatepermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside update");
                const permission = req.body;
                const result = yield permission_model_1.default.updatePermission(permission, permission.id);
                console.log('result', result);
                const [getUser] = yield permission_model_1.default.getPermission(permission.id);
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
    deletepermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside delete");
                const result = yield permission_model_1.default.deletePermission(req.body.id);
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
exports.default = new Permissions();
