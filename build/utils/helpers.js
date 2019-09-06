"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = (func) => func && func instanceof Function;
exports.deepClone = (obj) => JSON.parse(JSON.stringify(obj));
