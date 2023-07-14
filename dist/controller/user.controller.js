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
const validate_middleware_1 = require("../middleware/validate.middleware");
const user_validations_1 = require("../validations/user.validations");
const sendEmail_decorator_1 = require("../decorator/sendEmail.decorator");
const users_1 = __importDefault(require("./users"));
class UserController {
    constructor() {
        this.userRoutes = '/users';
        this.permissionRoutes = '/permissions';
        this.rolePermissionRoutes = '/rolePermissions';
        this.roleRoutes = '/roles';
        this.router = (0, express_1.Router)();
        this.initializeUsersRoutes();
        this.initializePermissionRoutes();
    }
    initializeUsersRoutes() {
        this.router.get(`${this.userRoutes}/get`, this.getAllUsers);
        this.router.get(`${this.userRoutes}/getById`, this.getUserById);
        this.router.post(`${this.userRoutes}/create`, (0, validate_middleware_1.validate)(user_validations_1.createUser), this.createUser);
        this.router.patch(`${this.userRoutes}/update`, (0, validate_middleware_1.validate)(user_validations_1.updateUser), this.updateUser);
        this.router.delete(`${this.userRoutes}/delete`, this.deleteUser);
    }
    initializePermissionRoutes() {
        this.router.get(`${this.permissionRoutes}/get`, this.getAllUsers);
        this.router.get(`${this.permissionRoutes}/:id`, this.getUserById);
        this.router.post(`${this.permissionRoutes}/create`, (0, validate_middleware_1.validate)(user_validations_1.createUser), this.createUser);
        this.router.patch(`${this.permissionRoutes}/update`, (0, validate_middleware_1.validate)(user_validations_1.updateUser), this.updateUser);
        this.router.delete(`${this.permissionRoutes}/delete`, this.deleteUser);
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield users_1.default.createuser(req, res, next);
            return result;
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield users_1.default.getuserbyid(req, res, next);
            return result;
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield users_1.default.getallusers(req, res, next);
            return result;
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield users_1.default.updateuser(req, res, next);
            return result;
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield users_1.default.deleteuser(req, res, next);
            return result;
        });
    }
}
exports.default = UserController;
__decorate([
    (0, sendEmail_decorator_1.SendEmail)()
], UserController.prototype, "createUser", null);
