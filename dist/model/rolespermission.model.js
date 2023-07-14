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
const db_provider_1 = __importDefault(require("../provider/db.provider"));
//import { EncryptPass } from '../decorator/encryptPass.decorator';
class RolesPermissionModel {
    //@EncryptPass()
    createRolesPermission(rolepermission) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`INSERT into roles_permission (${Object.keys(rolepermission).join(',')}) values(${Array.from({ length: Object.keys(rolepermission).length }).map(() => '?')})`, [...Object.values(rolepermission)]);
            return yield (0, db_provider_1.default)(`INSERT into roles_permission (${Object.keys(rolepermission).join(',')}) values(${Array.from({ length: Object.keys(rolepermission).length }).map(() => '?')})`, [...Object.values(rolepermission)]);
        });
    }
    updateRolesPermission(rolepermission, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `Update roles_permission set ${Object.entries(rolepermission).map(([key, val]) => key + '=' + `"${val}"`)} where id = ?`;
            return yield (0, db_provider_1.default)(query, [id]);
        });
    }
    getRolesPermission(rolepermissionid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside get model");
            return (0, db_provider_1.default)('Select * from roles_permission where id = ?', [rolepermissionid]);
        });
    }
    getAllRolesPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside get all role permission");
            return (0, db_provider_1.default)('Select * from roles_permission');
        });
    }
    deleteRolesPermission(rolepermissionid) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, db_provider_1.default)('Delete from roles_permission where id = ?', [rolepermissionid]);
        });
    }
}
exports.default = new RolesPermissionModel();
