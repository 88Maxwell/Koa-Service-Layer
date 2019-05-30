import { Service, ServiceLayer, Exception } from "../src";

export const emptySL = new ServiceLayer();
export const requiredRullesSL = new ServiceLayer();
export const withoutRullesSL = new ServiceLayer();

export class EmptyService extends Service {
    execute() {
        return "test";
    }
}

export class UnknownErrorService extends Service {
    execute() {
        throw "";
    }
}

export class slExeptionService extends Service {
    execute() {
        throw new Exception({
            code: "TEST",
            fields: {
                test: "TEST"
            }
        });
    }
}

