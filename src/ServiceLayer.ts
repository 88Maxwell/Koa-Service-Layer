// import ServiceClass from "./Service";
import { rulesException } from "./utils/exeptions";
import { Rule, RuleObject } from "./interfaces";

export default class Sl {
    constructor(
        private resolver: Function,
        private argsBuilder: Function,
        private rules: RuleObject = { before: [], after: [] }
    ) {}

    useService(Service: any): Function {
        return async (...middlewareArgs: Array<any>): Promise<any> => {
            let result;
            const ctx = this.argsBuilder(middlewareArgs);
            try {
                const serviceInstance = new Service();
                const slData = {
                    startTime: Date.now(),
                    serviceName: Service.name
                };
                const updatedCtx = this.executeRules(this.rules.before || [], Service, ctx, slData);
                result = serviceInstance.execute(updatedCtx);
            } catch (error) {}

            return this.resolver(result);
        };
    }

    private async executeRules(rules: Rule[], Service: any, ctx: any, slData: object): Promise<any> {
        let updatedCtx = ctx;

        for (const rule of rules) {
            const ruleArgs = Service[rule.name];

            switch (rule.type) {
                case "custom":
                    if (ruleArgs) break;

                    updatedCtx = await rule.execute(updatedCtx, ruleArgs, slData);
                    break;

                case "hidden":
                    updatedCtx = await rule.execute(updatedCtx, null, slData);
                    break;

                case "required":
                    if (ruleArgs) throw rulesException();

                    updatedCtx = await rule.execute(updatedCtx, ruleArgs, slData);
                    break;
            }
        }
        return updatedCtx;
    }
}
