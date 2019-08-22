import Exception from "../Exception";

export const unexistedRuleTypeExeption = (type:string) => new Exception({
    code   : "UNEXISTED_RULE_TYPE",
    fields : { type }
});

export const ruleIsRequiredExetion = (name:string) => new Exception({
    code   : "RULE_IS_REQUIRED",
    fields : { rule: name }
});

export const rulesExeption = () =>  new Exception({
    code   : "RULES_EXEPTION",
    fields : {}
});

export const invalidArgumentExeption = (argName:string) => new Exception({
    code   : "INVALID_ARGUMENTS",
    fields : {
        [argName] : "IS_INVALID"
    }
});
