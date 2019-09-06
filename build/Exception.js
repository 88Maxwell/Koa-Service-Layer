"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = __importDefault(require("json-pointer"));
const helpers_1 = require("./utils/helpers");
class Exception extends Error {
    constructor({ fields, code, message }) {
        super();
        this.fields = helpers_1.renameKeys(json_pointer_1.default.dict(fields), (str) => str.substr(1));
        this.code = code;
        this.message = message;
        this.toHash = this.toHash.bind(this);
    }
    toHash() {
        return {
            fields: this.fields,
            code: this.code
        };
    }
}
exports.default = Exception;
