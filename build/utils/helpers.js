"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepClone = exports.isFunction = void 0;

var isFunction = function isFunction(func) {
  return func && func instanceof Function;
};

exports.isFunction = isFunction;

var deepClone = function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
};

exports.deepClone = deepClone;