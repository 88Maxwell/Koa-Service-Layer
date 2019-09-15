import chai from "chai";

import {
    emptySL,
    customRulesSL,
    hiddenRulesWithServiceDataSL,
    customAfterRulesSL,
    customAfterRulesWithMutateResultSL,
    requiredAfterRulesSL,
    hiddenAfterRulesSL,
    requiredRulesSL,
    hiddenRulesSL
} from "../mocks/instances";
import {
    EmptyService,
    UnknownErrorService,
    ExeptionService,
    RequiredRuleService,
    ExeptionRequiredRuleService,
    CustomRuleService
} from "../mocks/services";

const { deepEqual, equal, isAtLeast } = chai.assert;

suite("Service Layer Tests");

test("Positive : Is middleware ?", () => {
    const constructorName = emptySL.useService(EmptyService).constructor.name;

    equal(constructorName, "Function");
});

test("Positive : Run service", async () => {
    const res = await emptySL.useService(EmptyService)({});

    deepEqual(res, { status: 200, data: {} });
});

test("Positive : Run service with result array=[] ", async () => {
    const res = await emptySL.useService(EmptyService)([]);

    deepEqual(res, { status: 200, data: [] });
});

test("Positive : Run service, with hidden before rule ", async () => {
    const res = await hiddenRulesSL.useService(EmptyService)({});

    deepEqual(res, { status: 200, data: { testHidden: true } });
});

test("Positive : Run service, with hidden before rule that have service data object ", async () => {
    const res = await hiddenRulesWithServiceDataSL.useService(EmptyService)({});

    equal(res.status, 200);
    deepEqual(res.data.responceData, { testHidden: true });
    const { startTime, serviceName } = res.data.serviceData;

    equal(serviceName, EmptyService.name);
    isAtLeast(Date.now(), startTime);
    isAtLeast(startTime + 100, Date.now());
});

test("Positive : Run service, with required before rule ", async () => {
    const res = await requiredRulesSL.useService(RequiredRuleService)({});

    deepEqual(res, { status: 200, data: { testRequired: true } });
});

test("Positive : Run service, with execution of custom before rule ", async () => {
    const res = await customRulesSL.useService(CustomRuleService)({});

    deepEqual(res, { status: 200, data: { testCustom: true } });
});

test("Positive : Run service, without execution of custom before rule ", async () => {
    const res = await customRulesSL.useService(EmptyService)({});

    deepEqual(res, { status: 200, data: {} });
});

test("Positive : Run service, with execution of custom after before rule ", async () => {
    const res = await customAfterRulesSL.useService(CustomRuleService)({});

    deepEqual(res, { status: 200, data: {} });
});

test("Positive : Run service, with execution of custom after rule and with mutate result ", async () => {
    const res = await customAfterRulesWithMutateResultSL.useService(CustomRuleService)({});

    deepEqual(res, { status: 200, data: {} });
});

test("Positive : Run service, with hidden after rule ", async () => {
    const res = await hiddenAfterRulesSL.useService(EmptyService)({});

    deepEqual(res, { status: 200, data: {} });
});

test("Positive : Run service, with required after rule ", async () => {
    const res = await requiredAfterRulesSL.useService(RequiredRuleService)({});

    deepEqual(res, { status: 200, data: {} });
});

test("Negative : Run service, with required rule ", async () => {
    const res = await requiredRulesSL.useService(ExeptionRequiredRuleService)({});

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
