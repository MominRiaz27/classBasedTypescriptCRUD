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
const permission_validation_1 = require("../validations/permission.validation");
const roles_validation_1 = require("../validations/roles.validation");
const rolepermission_validation_1 = require("../validations/rolepermission.validation");
const sendEmail_decorator_1 = require("../decorator/sendEmail.decorator");
const users_1 = __importDefault(require("./users"));
const permissions_1 = __importDefault(require("./permissions"));
const roles_1 = __importDefault(require("./roles"));
const rolesPermission_1 = __importDefault(require("./rolesPermission"));
class UserController {
    constructor() {
        this.userRoutes = '/users';
        this.permissionRoutes = '/permissions';
        this.rolePermissionRoutes = '/rolePermissions';
        this.roleRoutes = '/roles';
        this.router = (0, express_1.Router)();
        this.initializeUsersRoutes();
        this.initializePermissionsRoutes();
        this.initializeRolesRoutes();
        this.initializeRolesPermissionsRoutes();
    }
    initializeUsersRoutes() {
        this.router.get(`${this.userRoutes}/get`, this.getAllUsers);
        this.router.get(`${this.userRoutes}/getById`, this.getUserById);
        this.router.post(`${this.userRoutes}/create`, (0, validate_middleware_1.validate)(user_validations_1.createUser), this.createUser);
        this.router.patch(`${this.userRoutes}/update`, (0, validate_middleware_1.validate)(user_validations_1.updateUser), this.updateUser);
        this.router.delete(`${this.userRoutes}/delete`, this.deleteUser);
    }
    initializePermissionsRoutes() {
        this.router.get(`${this.permissionRoutes}/get`, this.getAllPermission);
        this.router.get(`${this.permissionRoutes}/:id`, this.getPermissionById);
        this.router.post(`${this.permissionRoutes}/create`, (0, validate_middleware_1.validate)(permission_validation_1.createPermission), this.createPermission);
        this.router.patch(`${this.permissionRoutes}/update`, (0, validate_middleware_1.validate)(permission_validation_1.updatePermission), this.updatePermission);
        this.router.delete(`${this.permissionRoutes}/delete`, this.deletePermission);
    }
    initializeRolesPermissionsRoutes() {
        this.router.get(`${this.rolePermissionRoutes}/get`, this.getAllRolesPermission);
        this.router.get(`${this.rolePermissionRoutes}/:id`, this.getRolesPermissionById);
        this.router.post(`${this.rolePermissionRoutes}/create`, (0, validate_middleware_1.validate)(rolepermission_validation_1.createRolePermission), this.createRolesPermission);
        this.router.patch(`${this.rolePermissionRoutes}/update`, (0, validate_middleware_1.validate)(rolepermission_validation_1.updateRolePermission), this.updateRolesPermission);
        this.router.delete(`${this.rolePermissionRoutes}/delete`, this.deleteRolesPermission);
    }
    initializeRolesRoutes() {
        this.router.get(`${this.roleRoutes}/get`, this.getAllRoles);
        this.router.get(`${this.roleRoutes}/:id`, this.getRolesById);
        this.router.post(`${this.roleRoutes}/create`, (0, validate_middleware_1.validate)(roles_validation_1.createRole), this.createRoles);
        this.router.patch(`${this.roleRoutes}/update`, (0, validate_middleware_1.validate)(roles_validation_1.updateRole), this.updateRoles);
        this.router.delete(`${this.roleRoutes}/delete`, this.deleteRoles);
    }
    //users routes
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
            console.log("route is : ", req.originalUrl);
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
    // permissions routes
    createPermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield permissions_1.default.createpermission(req, res, next);
            return result;
        });
    }
    getPermissionById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield permissions_1.default.getpermissionbyid(req, res, next);
            return result;
        });
    }
    getAllPermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield permissions_1.default.getallpermission(req, res, next);
            return result;
        });
    }
    updatePermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield permissions_1.default.updatepermission(req, res, next);
            return result;
        });
    }
    deletePermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield permissions_1.default.deletepermission(req, res, next);
            return result;
        });
    }
    // roles routes
    createRoles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside create roles");
            const result = yield roles_1.default.createroles(req, res, next);
            return result;
        });
    }
    getRolesById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield roles_1.default.getrolesbyid(req, res, next);
            return result;
        });
    }
    getAllRoles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield roles_1.default.getallroles(req, res, next);
            return result;
        });
    }
    updateRoles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield roles_1.default.updateroles(req, res, next);
            return result;
        });
    }
    deleteRoles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield roles_1.default.deleteroles(req, res, next);
            return result;
        });
    }
    // rolesPermission routes
    createRolesPermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield rolesPermission_1.default.createrolespermissions(req, res, next);
            return result;
        });
    }
    getRolesPermissionById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield rolesPermission_1.default.getrolespermissionsbyid(req, res, next);
            return result;
        });
    }
    getAllRolesPermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield rolesPermission_1.default.getallrolespermissions(req, res, next);
            return result;
        });
    }
    updateRolesPermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield rolesPermission_1.default.updaterolespermissions(req, res, next);
            return result;
        });
    }
    deleteRolesPermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield rolesPermission_1.default.deleterolespermissions(req, res, next);
            return result;
        });
    }
}
exports.default = UserController;
__decorate([
    (0, sendEmail_decorator_1.SendEmail)()
], UserController.prototype, "createUser", null);
