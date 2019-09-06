"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = __importDefault(require("../Exception"));
exports.unexistedRuleTypeExeption = (type) => new Exception_1.default({
    code: "UNEXISTED_RULE_TYPE",
    fields: { type }
});
exports.ruleIsRequiredExetion = (name) => new Exception_1.default({
    code: "RULE_IS_REQUIRED",
    fields: { rule: name }
});
exports.rulesExeption = () => new Exception_1.default({
    code: "RULES_EXEPTION",
    fields: {}
});
exports.invalidArgumentExeption = (argName) => new Exception_1.default({
    code: "INVALID_ARGUMENTS",
    fields: {
        [argName]: "IS_INVALID"
    }
});
