"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invalidArgumentExeption = exports.rulesExeption = exports.ruleIsRequiredExetion = exports.unexistedRuleTypeExeption = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Exception = _interopRequireDefault(require("../Exception"));

var unexistedRuleTypeExeption = function unexistedRuleTypeExeption(type) {
  return new _Exception.default({
    code: "UNEXISTED_RULE_TYPE",
    fields: {
      type: type
    }
  });
};

exports.unexistedRuleTypeExeption = unexistedRuleTypeExeption;

var ruleIsRequiredExetion = function ruleIsRequiredExetion(name) {
  return new _Exception.default({
    code: "RULE_IS_REQUIRED",
    fields: {
      rule: name
    }
  });
};

exports.ruleIsRequiredExetion = ruleIsRequiredExetion;

var rulesExeption = function rulesExeption() {
  return new _Exception.default({
    code: "RULES_EXEPTION",
    fields: {}
  });
};

exports.rulesExeption = rulesExeption;

var invalidArgumentExeption = function invalidArgumentExeption(argName) {
  return new _Exception.default({
    code: "INVALID_ARGUMENTS",
    fields: (0, _defineProperty2.default)({}, argName, "IS_INVALID")
  });
};

exports.invalidArgumentExeption = invalidArgumentExeption;