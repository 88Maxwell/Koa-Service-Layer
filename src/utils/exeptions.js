import Exception from "../Exception";

export const unexistedRuleTypeExeption = type => new Exception({
    code   : "UNEXISTED_RULE_TYPE",
    fields : { type }
});

export const ruleIsRequiredExetion = name => new Exception({
    code   : "RULE_IS_REQUIRED",
    fields : { rule: name }
});

export const rulesExeption = () =>  new Exception({
    code   : "RULES_EXEPTION",
    fields : {}
});

export const invalidArgumentExeption = argName => new Exception({
    code   : "INVALID_ARGUMENTS",
    fields : {
        [argName] : "IS_INVALID"
    }
});
