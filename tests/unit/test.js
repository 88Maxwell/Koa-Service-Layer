import {
    emptySL,
    EmptyService,
    UnknownErrorService,
    slExeptionService
} from "../mocks";
import { equal, deepEqual } from "assert";

suite("Service Layer tests");

test("Positive : Is middleware ?", () => {
    const constructorName = emptySL.useService(EmptyService).constructor.name;

    equal(constructorName, "Function");
});

test("Positive : Run service", async () => {
    const res = await emptySL.useService(EmptyService)({ body: null });

    deepEqual(res, {
        status: 200,
        data: "test"
    });
});

test("Negative : Run service, UNKNOWN_ERROR", async () => {
    const res = await emptySL.useService(UnknownErrorService)({ body: null });

    deepEqual(res, {
        status: 500,
        error: { code: "UNKNOWN_ERROR" }
    });
});

test("Negative : Run service, SL Exception", async () => {
    const res = await emptySL.useService(slExeptionService)({ body: null });

    deepEqual(res, {
        status: 500,
        error: {
            code: "TEST",
            fields: { test: "TEST" }
        }
    });
});
