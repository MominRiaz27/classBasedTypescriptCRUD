"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const express_1 = require("express");
const user_model_1 = __importDefault(require("../model/user.model"));
const response_1 = __importDefault(require("../responses/response"));
const validate_middleware_1 = require("../middleware/validate.middleware");
const user_validations_1 = require("../validations/user.validations");
const sendEmail_decorator_1 = require("../decorator/sendEmail.decorator");
class UserController {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/get`, this.getAllUsers);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.post(`${this.path}/create`, (0, validate_middleware_1.validate)(user_validations_1.createUser), this.createUser);
        this.router.patch(`${this.path}/update`, (0, validate_middleware_1.validate)(user_validations_1.updateUser), this.updateUser);
        this.router.delete(`${this.path}/delete`, this.deleteUser);
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.getUser(req.params.id);
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
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside get all");
                const users = yield user_model_1.default.getAllUsers();
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
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside create");
                const user = req.body;
                const result = yield user_model_1.default.createUser(user);
                const [getUser] = yield user_model_1.default.getUser(result === null || result === void 0 ? void 0 : result.insertId);
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
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside update");
                const user = req.body;
                const result = yield user_model_1.default.updateUser(user, user.id);
                console.log('result', result);
                const [getUser] = yield user_model_1.default.getUser(user.id);
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
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("inside delete");
                const result = yield user_model_1.default.deleteUser(req.body.id);
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
exports.default = UserController;
__decorate([
    (0, sendEmail_decorator_1.SendEmail)()
], UserController.prototype, "createUser", null);
