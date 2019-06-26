"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { dialect } = process.env;
const getIdName_1 = __importDefault(require("./../../../framework/helpers/getIdName"));
exports.default = {
    createRolePermission: {
        role: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
        permission: (dialect == "MONGO_DB") ? "string|required" : "integer|required"
    },
    deleteRolePermission: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    },
    updateRolePermission: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
        role: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
        permission: (dialect == "MONGO_DB") ? "string|required" : "integer|required"
    },
    rolePermission: {
        [getIdName_1.default]: (dialect == "MONGO_DB") ? "string|required" : "integer|required",
    }
};
//# sourceMappingURL=validations.js.map