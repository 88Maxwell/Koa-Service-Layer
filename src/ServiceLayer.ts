import Exception from "./Exception";
import {
    unexistedRuleTypeExeption,
    ruleIsRequiredExetion,
    rulesExeption,
    invalidArgumentExeption
} from "./utils/exeptions";
import { isFunction, deepClone } from "./utils/helpers";
import Service from "./Service";


export default class ServiceLayer {
    private resolver: Function;
    private argumentBuilder: Function;
    private beforeRules: Array<Rule>;
    private afterRules: Array<Rule>;

    constructor(resolver: Function, argumentBuilder: Function, rules = { before: [], after: [] }) {
        if (!isFunction(resolver)) throw invalidArgumentExeption("resolver");
        if (!isFunction(argumentBuilder)) throw invalidArgumentExeption("argumentBuilder");

        this.resolver = resolver;
        this.argumentBuilder = argumentBuilder;
        this.beforeRules = rules.before;
        this.afterRules = rules.after;
    }

    public useService(ServiceClass: Service) {
        // eslint-disable-next-line func-names
        return async function() {
            const ctx = this.argumentBuilder([...arguments]);

            let result;
            const serviceData = {
                startTime: Date.now(),
                serviceName: ServiceClass.name
            };
            const executeRulesArgs = {
                rules: this.beforeRules,
                ServiceClass,
                ctx,
                serviceData
            };

            try {
                const updatedContext = await this.executeRules(executeRulesArgs);
                const service = new ServiceClass();

                let data = await service.runExecutor.call(ctx, updatedContext);

                if (typeof data === "object") {
                    data = Array.isArray(data) ? [...data] : { ...data };
                }

                result = { status: 200, data };

                await this.executeRules({
                    rules: this.afterRules,
                    ServiceClass,
                    ctx: updatedContext,
                    serviceData: { ...serviceData, result: deepClone(result) }
                });
            } catch (error) {
                result = this.errorCatchHandler(error);
            }

            return this.resolver.call(ctx, result);
        }.bind(this);
    }

    private async executeRules(argumens: { rules: Array<Rule>; ServiceClass: Service; ctx: any; serviceData: any }) {
        let changedCtx = ctx;

        // rules type can be required, custom, hidden
        if (rules) {
            for (const rule of rules) {
                const ruleArgs = ServiceClass[rule.name];
                const executeArgs = [changedCtx, ruleArgs, serviceData];

                changedCtx = await this.executeRule(rule, executeArgs);
            }
        }
    }

    private executeRule = ({ name, execute, type }, executeArgs: any) => {
        if (!name || !execute || !type) {
            throw rulesExeption();
        }

        switch (type) {
            case "hidden":
                return execute(...executeArgs);

            case "required":
                if (!executeArgs[1]) {
                    throw ruleIsRequiredExetion(name);
                }

                return execute(...executeArgs);

            case "custom":
                if (executeArgs[1]) {
                    return execute(...executeArgs);
                }

                return executeArgs[0];

            default:
                throw unexistedRuleTypeExeption(type);
        }
    };

    private errorCatchHandler(error: Error | Exception) {
        if (error instanceof Exception) {
            return { status: 500, error: error.toHash() };
        }
        console.log("SERVICE LAYER: \n\t", error);

        return { status: 500, error: { code: "UNKNOWN_ERROR" } };
    }
}
