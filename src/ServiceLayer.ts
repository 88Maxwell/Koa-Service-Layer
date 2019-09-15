import { ruleIsRequiredException } from "./utils/exeptions";
import { Rule, RuleObject } from "./interfaces";
import Exception from "./Exception";
import { deepClone } from "./utils/helpers";

export default class ServiceLayer {
    constructor(
        private _resolver: Function,
        private _argsBuilder: Function,
        private _rules: RuleObject = { before: [], after: [] }
    ) {}

    useService(Service: any): Function {
        return async (...middlewareArgs: any[]): Promise<any> => {
            let result;

            const ctx = this._argsBuilder(middlewareArgs);

            try {
                const serviceInstance = new Service();
                const slData = {
                    startTime   : Date.now(),
                    serviceName : Service.name
                };

                const updatedCtx = await this.executeRules(this._rules.before || [], Service, ctx, slData);

                let data = serviceInstance.execute(updatedCtx);

                if (typeof data === "object") {
                    data = Array.isArray(data) ? [ ...data ] : { ...data };
                }

                result = { status: 200, data };

                await this.executeRules(this._rules.after || [], Service, ctx, {
                    ...slData,
                    result : deepClone(result)
                });
            } catch (error) {
                result = this._handleCatch(error);
            }

            return this._resolver(result);
        };
    }

    private async executeRules(rules: Rule[], Service: any, ctx: any, slData: object): Promise<any> {
        let updatedCtx = ctx;

        for (const { name, type, execute } of rules) {
            const ruleArgs = Service[name];

            switch (type) {
                case "custom":
                    if (!ruleArgs) break;

                    updatedCtx = await execute(updatedCtx, ruleArgs, slData);
                    break;

                case "hidden":
                    updatedCtx = await execute(updatedCtx, null, slData);
                    break;

                case "required":
                    if (!ruleArgs) throw ruleIsRequiredException(name);

                    updatedCtx = await execute(updatedCtx, ruleArgs, slData);
                    break;
                default:
                    break;
            }
        }

        return updatedCtx;
    }

    private _handleCatch(error: Error | Exception): object {
        if (error instanceof Exception) {
            return { status: 500, error: error.toHash() };
        }

        console.error("SERVICE LAYER: \n\t", error);

        return { status: 500, error: { code: "UNKNOWN_ERROR" } };
    }
}
