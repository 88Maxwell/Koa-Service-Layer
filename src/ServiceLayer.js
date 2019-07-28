import Exception from "./Exception";
import {
    unexistedRuleTypeExeption,
    ruleIsRequiredExetion,
    rulesExeption,
    invalidArgumentExeption
} from "./utils/exeptions";
import { isFunction, deepClone } from "./utils/helpers";

export default class ServiceLayer {
    constructor(resolver, argumentBuilder, rules = { before: [], after: [] }) {
        if (!isFunction(resolver)) throw invalidArgumentExeption("resolver");
        if (!isFunction(argumentBuilder)) throw invalidArgumentExeption("argumentBuilder");

        this.resolver =  resolver;
        this.argumentBuilder = argumentBuilder;
        this.beforeRules = rules.before;
        this.afterRules = rules.after;
    }

    useService(ServiceClass) {
    // eslint-disable-next-line func-names
        return async function () {
            const ctx = this.argumentBuilder([ ...arguments ]);

            let result;
            const serviceData = {
                startTime   : Date.now(),
                serviceName : ServiceClass.name
            };
            const executeRulesArgs = {
                rules : this.beforeRules,
                ServiceClass,
                ctx,
                serviceData
            };

            try {
                const updatedContext = await this._executeRules(executeRulesArgs);
                const service = new ServiceClass();

                let data = await service.runExecutor.call(ctx, updatedContext);

                if (typeof data === "object") {
                    data = Array.isArray(data) ? [ ...data ] : { ...data };
                }

                result = { status: 200, data };

                await this._executeRules({
                    rules       : this.afterRules,
                    ServiceClass,
                    ctx         : updatedContext,
                    serviceData : { ...serviceData, result: deepClone(result) }
                });
            } catch (error) {
                result = this._errorCatchHandler(error);
            }

            return this.resolver.call(ctx, result);
        }.bind(this);
    }

    async _executeRules({ rules, ServiceClass, ctx, serviceData }) {
        let changedCtx = ctx;

        // rules type can be required, custom, hidden
        if (rules) {
            for (const rule of rules) {
                const ruleArgs = ServiceClass[rule.name];
                const executeArgs = [ changedCtx, ruleArgs, serviceData ];

                changedCtx = await this._executeRule(rule, executeArgs);
            }
        }

        return changedCtx;
    }

    _executeRule = ({ name, execute, type }, executeArgs) => {
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
    }

    _errorCatchHandler(error) {
        if (error instanceof Exception) {
            return { status: 500, error: error.toHash() };
        }
        console.log("SERVICE LAYER: \n\t", error);

        return { status: 500, error: { code: "UNKNOWN_ERROR" } };
    }
}
