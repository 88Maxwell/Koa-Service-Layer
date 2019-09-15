import Exception from "../Exception";

export const unexistedRuleTypeException = (type: string): Exception =>
    new Exception({
        code   : "UNEXISTED_RULE_TYPE",
        fields : { type }
    });

export const ruleIsRequiredException = (name: string): Exception =>
    new Exception({
        code   : "RULE_IS_REQUIRED",
        fields : { rule: name }
    });

export const rulesException = (): Exception =>
    new Exception({
        code   : "RULES_EXCEPTION",
        fields : {}
    });

export const invalidArgumentException = (argName: string): Exception =>
    new Exception({
        code   : "INVALID_ARGUMENTS",
        fields : {
            [argName] : "IS_INVALID"
        }
    });
