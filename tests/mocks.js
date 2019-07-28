import { Service, ServiceLayer, Exception } from "../src";

export const emptySL = new ServiceLayer();

export const requiredRulesSL = new ServiceLayer({
    rules : [
        {
            name    : "test",
            type    : "required",
            execute : (ctx, args) => ({ ...ctx, ...args })
        }
    ]
});

export const hiddenRulesSL = new ServiceLayer({
    rules : [
        {
            name    : "test",
            type    : "hidden",
            execute : ctx => ({ ...ctx, testHidden: true })
        }
    ]
});

export const hiddenRulesWithServiceDataSL = new ServiceLayer({
    rules : [
        {
            name    : "test",
            type    : "hidden",
            execute : (ctx, _, serviceData) => ({
                responceData : { ...ctx, testHidden: true },
                serviceData
            })
        }
    ]
});

export const customRulesSL = new ServiceLayer({
    rules : [
        {
            name    : "test",
            type    : "custom",
            execute : (ctx, args) => ({ ...ctx, ...args })
        }
    ]
});

export const unexistRuleTypeSL = new ServiceLayer({
    rules : [
        {
            name    : "test",
            type    : "wrongType",
            execute : ctx => ctx
        }
    ]
});

export const ruleWithMissedFieldSL = new ServiceLayer({
    rules : [
        {
            execute : ctx => ctx
        }
    ]
});

export class EmptyService extends Service {
    execute(ctx) {
        return ctx;
    }
}

export class RequiredRuleService extends Service {
    static test = { testRequired: true };

    execute(ctx) {
        return ctx;
    }
}

export class CustomRuleService extends Service {
    static test = { testCustom: true };

    execute(ctx) {
        return ctx;
    }
}

export class ExeptionRequiredRuleService extends Service {
    execute(ctx) {
        return ctx;
    }
}

export class UnknownErrorService extends Service {
    execute() {
        // eslint-disable-next-line no-throw-literal
        throw "";
    }
}

export class ExeptionService extends Service {
    execute() {
        throw new Exception({
            code   : "TEST",
            fields : {
                test : "TEST"
            }
        });
    }
}
