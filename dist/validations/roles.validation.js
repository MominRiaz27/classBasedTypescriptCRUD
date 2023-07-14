"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRole = exports.createRole = void 0;
const zod_1 = require("zod");
exports.createRole = zod_1.z.object({
    body: zod_1.z.object({
        type: zod_1.z.string(),
    }),
});
exports.updateRole = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.number(),
        type: zod_1.z.string()
    }),
});
