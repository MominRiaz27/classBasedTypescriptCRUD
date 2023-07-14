"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRolePermission = exports.createRolePermission = void 0;
const zod_1 = require("zod");
exports.createRolePermission = zod_1.z.object({
    body: zod_1.z.object({
        user_type_id: zod_1.z.number(),
        permission_id: zod_1.z.number(),
        route: zod_1.z.string()
    }),
});
exports.updateRolePermission = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.number(),
        user_type_id: zod_1.z.number().optional(),
        permission_id: zod_1.z.number().optional(),
        route: zod_1.z.string().optional()
    }),
});
