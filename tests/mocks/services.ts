import { Service } from "../../src/interfaces";
import Exception from "../../src/Exception";

export class EmptyService implements Service {
    execute(ctx: any): any {
        return ctx;
    }
}

export class RequiredRuleService implements Service {
    static test = { testRequired: true };

    execute(ctx: any): any {
        return ctx;
    }
}

export class CustomRuleService implements Service {
    static test = { testCustom: true };

    execute(ctx: any): any {
        return ctx;
    }
}

export class ExeptionRequiredRuleService implements Service {
    execute(ctx: any): any {
        return ctx;
    }
}

export class UnknownErrorService implements Service {
    execute(): any {
        // eslint-disable-next-line no-throw-literal
        throw "";
    }
}

export class ExeptionService implements Service {
    execute(): any {
        throw new Exception({
            code: "TEST",
            fields: {
                test: "TEST"
            }
        });
    }
}
