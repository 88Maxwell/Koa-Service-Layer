"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = __importDefault(require("json-pointer"));
const rename_keys_1 = __importDefault(require("rename-keys"));
class Exception extends Error {
    constructor(data) {
        super();
        if (!data.fields)
            throw new Error("FIELDS_REQUIRED");
        if (!data.code)
            throw new Error("MESSAGE_REQUIRED");
        const fields = json_pointer_1.default.dict(data.fields);
        this.fields = rename_keys_1.default(fields, (str) => str.substr(1));
        this.code = data.code;
        this.message = data.message;
    }
    toHash() {
        return {
            fields: this.fields,
            code: this.code
        };
    }
}
exports.default = Exception;
