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
class RolesModel {
    //@EncryptPass()
    createRoles(role) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`INSERT into user_types (${Object.keys(role).join(',')}) values(${Array.from({ length: Object.keys(role).length }).map(() => '?')})`, [...Object.values(role)]);
            return yield (0, db_provider_1.default)(`INSERT into user_types (${Object.keys(role).join(',')}) values(${Array.from({ length: Object.keys(role).length }).map(() => '?')})`, [...Object.values(role)]);
        });
    }
    updateRoles(role, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `Update user_types set ${Object.entries(role).map(([key, val]) => key + '=' + `"${val}"`)} where id = ?`;
            return yield (0, db_provider_1.default)(query, [id]);
        });
    }
    getRoles(rolesid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside get model");
            return (0, db_provider_1.default)('Select * from user_types where id = ?', [rolesid]);
        });
    }
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, db_provider_1.default)('Select * from user_types');
        });
    }
    deleteRoles(rolesid) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, db_provider_1.default)('Delete from user_types where id = ?', [rolesid]);
        });
    }
}
exports.default = new RolesModel();
