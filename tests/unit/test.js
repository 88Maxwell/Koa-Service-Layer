import { equal, deepEqual } from "assert";
import {
    emptySL,
    EmptyService,
    UnknownErrorService,
    ExeptionService,
    hiddenRulesSL,
    requiredRulesSL,
    RequiredRuleService,
    ExeptionRequiredRuleService,
    CustomRuleService,
    customRulesSL,
    unexistRuleTypeSL,
    ruleWithMissedFieldSL
} from "../mocks";

suite("Service Layer tests");

test("Positive : Is middleware ?", () => {
    const constructorName = emptySL.useService(EmptyService).constructor.name;

    equal(constructorName, "Function");
});

test("Positive : Run service", async () => {
    const res = await emptySL.useService(EmptyService)({});

    deepEqual(res, { status: 200, data: {} });
});

test("Positive : Run service, with hidden rule ", async () => {
    const res = await hiddenRulesSL.useService(EmptyService)({});

    deepEqual(res, { status: 200, data: { testHidden: true } });
});

test("Positive : Run service, with required rule ", async () => {
    const res = await requiredRulesSL.useService(RequiredRuleService)({});

    deepEqual(res, { status: 200, data: { testRequired: true } });
});

test("Positive : Run service, with execution of custom rule ", async () => {
    const res = await customRulesSL.useService(CustomRuleService)({});

    deepEqual(res, { status: 200, data: { testCustom: true } });
});

test("Positive : Run service, without execution of custom rule ", async () => {
    const res = await customRulesSL.useService(EmptyService)({});

    deepEqual(res, { status: 200, data: {} });
});

test("Negative : Run service, without some field in rule defining", async () => {
    const res = await ruleWithMissedFieldSL.useService(EmptyService)({});

    deepEqual(res, {
        status : 500,
        error  : {
            code   : "RULES_EXEPTION",
            fields : {}
        }
    });
});

test("Negative : Run service, with unexisted rule type ", async () => {
    const res = await unexistRuleTypeSL.useService(EmptyService)({});

    deepEqual(res, {
        status : 500,
        error  : {
            code   : "UNEXISTED_RULE_TYPE",
            fields : { type: "wrongType" }
        }
    });
});

test("Negative : Run service, with required rule ", async () => {
    const res = await requiredRulesSL.useService(ExeptionRequiredRuleService)(
        {}
    );

    deepEqual(res, {
        status : 500,
        error  : {
            code   : "RULE_IS_REQUIRED",
            fields : { rule: "test" }
        }
    });
});

test("Negative : Run service, UNKNOWN_ERROR", async () => {
    const res = await emptySL.useService(UnknownErrorService)({});

    deepEqual(res, { status: 500, error: { code: "UNKNOWN_ERROR" } });
});

test("Negative : Run service, SL Exception", async () => {
    const res = await emptySL.useService(ExeptionService)({});

    deepEqual(res, {
        status : 500,
        error  : {
            code   : "TEST",
            fields : { test: "TEST" }
        }
    });
});
