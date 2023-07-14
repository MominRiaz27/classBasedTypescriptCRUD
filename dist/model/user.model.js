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
const bcrypt_1 = __importDefault(require("bcrypt"));
//import { EncryptPass } from '../decorator/encryptPass.decorator';
class UserModel {
    //@EncryptPass()
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = yield bcrypt_1.default.hash(user.password, 13);
            console.log(`INSERT into users (${Object.keys(user).join(',')}) values(${Array.from({ length: Object.keys(user).length }).map(() => '?')})`, [...Object.values(user)]);
            return yield (0, db_provider_1.default)(`INSERT into users (${Object.keys(user).join(',')}) values(${Array.from({ length: Object.keys(user).length }).map(() => '?')})`, [...Object.values(user)]);
        });
    }
    updateUser(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `Update users set ${Object.entries(user).map(([key, val]) => key + '=' + `"${val}"`)} where id = ?`;
            return yield (0, db_provider_1.default)(query, [id]);
        });
    }
    getUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside get model");
            return (0, db_provider_1.default)('Select * from users where id = ?', [userid]);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, db_provider_1.default)('Select * from users');
        });
    }
    deleteUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, db_provider_1.default)('Delete from users where id = ?', [userid]);
        });
    }
}
exports.default = new UserModel();
