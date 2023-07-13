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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptPass = void 0;
function EncryptPass() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                // Access req data and modify it
                console.log('Data before modofocation :', req.body);
                const modifiedReqData = Object.assign(Object.assign({}, req.body), { name: 'Jahazz' });
                console.log('Modified req data:', modifiedReqData);
                // Call the original method with the modified req data
                const result = yield originalMethod.call(this, modifiedReqData, res, next);
                return result;
            });
        };
        return descriptor;
    };
}
exports.EncryptPass = EncryptPass;
