import ServiceLayer from "../../src/ServiceLayer";

const testResolver = (result: any): any => result;
const koaArgumentBuilder = (args: any[]): any => args[0];


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

// export const unexistRuleTypeSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
//     before: [
//         {
//             name: "test",
//             type: "wrongType",
//             execute: ctx => ctx
//         }
//     ]
// });

// export const ruleWithMissedFieldSL = new ServiceLayer(testResolver, koaArgumentBuilder, {
//     before: [
//         {
//             execute: ctx => ctx
//         }
//     ]
// });

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