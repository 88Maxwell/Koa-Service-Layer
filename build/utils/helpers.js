"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = (func) => func && func instanceof Function;
exports.deepClone = (obj) => JSON.parse(JSON.stringify(obj));
exports.renameKeys = (obj, fn) => {
    const keys = Object.keys(obj);
    const result = {};
    keys.forEach((key) => {
        const val = obj[key];
        const str = fn(key, val);
        if (str !== "")
            key = str;
        result[key] = val;
    });
    return result;
};
