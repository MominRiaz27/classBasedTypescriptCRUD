"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePermission = exports.createPermission = void 0;
const zod_1 = require("zod");
exports.createPermission = zod_1.z.object({
    body: zod_1.z.object({
        permission_name: zod_1.z.string(),
    }),
});
exports.updatePermission = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.number(),
        permission_name: zod_1.z.string()
    }),
});
