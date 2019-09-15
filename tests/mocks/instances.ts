import ServiceLayer from "../../src/ServiceLayer";

const testResolver = (result: object): object => result;
const koaArgumentBuilder = (args: object[]): object => args[0];

export const emptySL = new ServiceLayer(testResolver, koaArgumentBuilder);

export const requiredRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    before : [
        {
            name    : "test",
            type    : "required",
            execute : (ctx: object, args): object => ({ ...ctx, ...args })
        }
    ]
});

export const hiddenRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    before : [
        {
            name    : "test",
            type    : "hidden",
            execute : (ctx: object): object => ({ ...ctx, testHidden: true })
        }
    ]
});

export const hiddenRulesWithServiceDataSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    before : [
        {
            name    : "test",
            type    : "hidden",
            execute : (ctx, _, serviceData): object => ({
                responceData : { ...ctx, testHidden: true },
                serviceData
            })
        }
    ]
});

export const customRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    before : [
        {
            name    : "test",
            type    : "custom",
            execute : (ctx, args): object => ({ ...ctx, ...args })
        }
    ]
});

export const customAfterRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    after : [
        {
            name    : "test",
            type    : "custom",
            execute : (ctx, args, serviceData): object => ({
                ...ctx,
                ...args,
                ...serviceData
            })
        }
    ]
});

export const customAfterRulesWithMutateResultSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    after : [
        {
            name    : "test",
            type    : "custom",
            execute : (ctx, args, serviceData): object => {
                // eslint-disable-next-line no-param-reassign
                serviceData.result.data.some = "some";

                return { ...ctx, ...args };
            }
        }
    ]
});

export const hiddenAfterRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    after : [
        {
            name    : "test",
            type    : "hidden",
            execute : (ctx, args, serviceData): object => ({
                ...ctx,
                ...args,
                ...serviceData
            })
        }
    ]
});

export const requiredAfterRulesSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
    after : [
        {
            name    : "test",
            type    : "required",
            execute : (ctx, args, serviceData): object => ({
                ...ctx,
                ...args,
                ...serviceData
            })
        }
    ]
});
