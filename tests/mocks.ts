/* eslint-disable no-param-reassign */
import { Service, ServiceLayer, Exception } from "../src";

const testResolver = result => result;
const koaArgumentBuilder = arrArgs => arrArgs[0];

export const emptySL = new ServiceLayer(testResolver, koaArgumentBuilder);

export const requiredRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    before: [
        {
            name: "test",
            type: "required",
            execute: (ctx, args) => ({ ...ctx, ...args })
        }
    ]
});

export const hiddenRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    before: [
        {
            name: "test",
            type: "hidden",
            execute: ctx => ({ ...ctx, testHidden: true })
        }
    ]
});

export const hiddenRulesWithServiceDataSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    before: [
        {
            name: "test",
            type: "hidden",
            execute: (ctx, _, serviceData) => ({
                responceData: { ...ctx, testHidden: true },
                serviceData
            })
        }
    ]
});

export const customRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    before: [
        {
            name: "test",
            type: "custom",
            execute: (ctx, args) => ({ ...ctx, ...args })
        }
    ]
});

export const unexistRuleTypeSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    before: [
        {
            name: "test",
            type: "wrongType",
            execute: ctx => ctx
        }
    ]
});

export const ruleWithMissedFieldSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    before: [
        {
            execute: ctx => ctx
        }
    ]
});

export const customAfterRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    after: [
        {
            name: "test",
            type: "custom",
            execute: (ctx, args, serviceData) => ({
                ...ctx,
                ...args,
                ...serviceData
            })
        }
    ]
});

export const customAfterRulesWithMutateResultSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    after: [
        {
            name: "test",
            type: "custom",
            execute: (ctx, args, serviceData) => {
                serviceData.result.data.some = "some";

                return { ...ctx, ...args };
            }
        }
    ]
});

export const hiddenAfterRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    after: [
        {
            name: "test",
            type: "hidden",
            execute: (ctx, args, serviceData) => ({
                ...ctx,
                ...args,
                ...serviceData
            })
        }
    ]
});

export const requiredAfterRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    after: [
        {
            name: "test",
            type: "required",
            execute: (ctx, args, serviceData) => ({
                ...ctx,
                ...args,
                ...serviceData
            })
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
            code: "TEST",
            fields: {
                test: "TEST"
            }
        });
    }
}
