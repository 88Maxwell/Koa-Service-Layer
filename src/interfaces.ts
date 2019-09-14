export interface Rule {
    name: string;
    type: "required" | "hidden" | "custom";
    execute: (ctx: any, ruleArgs?: any, slData?: any) => any;
}

export interface Service {
    // new (): Service;
    execute: (...args: any) => any;
    // [key: string]: Function;
}

export interface RuleObject {
    before?: Rule[];
    after?: Rule[];
}
