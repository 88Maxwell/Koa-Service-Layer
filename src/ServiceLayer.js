import Exception from "./Exception";
import {
    unexistedRuleTypeExeption,
    ruleIsRequiredExetion,
    rulesExeption,
    invalidArgumentExeption
} from "./utils/exeptions";

export default class ServiceLayer {
    constructor(resolver, argumentBuilder, rules = { before: [], after: [] }) {
        if (!this._isFunction(resolver)) throw invalidArgumentExeption("resolver");
        if (!this._isFunction(argumentBuilder)) throw invalidArgumentExeption("argumentBuilder");

        this.resolver =  resolver;
        this.argumentBuilder = argumentBuilder;
        this.beforeRules = rules.before;
        this.afterRules = rules.after;

        this.useService = this.useService.bind(this);
    }

    useService = ServiceClass =>
    // eslint-disable-next-line func-names
        async function () {
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
                const updatedArgs = await this._executeRules(executeRulesArgs);
                const service = new ServiceClass();

                let data = await service.runExecutor(updatedArgs);

                if (typeof data === "object") {
                    data = Array.isArray(data) ? [ ...data ] : { ...data };
                }

                result = { status: 200, data };
                serviceData.result = result;
                await this._executeRules({
                    ...executeRulesArgs,
                    rules : this.afterRules
                });
            } catch (error) {
                result = this._errorCatchHandler(error);
            }

            return this.resolver.call(ctx, result);
        };

    async _executeRules({ rules, ServiceClass, ctx, serviceData }) {
        let changedCtx = ctx;

        // rules type can be required, custom, hidden
        if (rules) {
            for (const rule of rules) {
                const ruleArgs = ServiceClass[name];
                const executeArgs = [ changedCtx, ruleArgs, serviceData ];

                changedCtx = await this._executeRule(rule, executeArgs);
            }

            return changedCtx;
        }
    }

    _executeRule = (rule, executeArgs) => {
        const { name, execute, type } = rule;

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
                break;
            default:
                throw unexistedRuleTypeExeption(type);
        }
    }

    _isFunction = func => func && func instanceof Function;

    _errorCatchHandler(error) {
        if (error instanceof Exception) {
            return { status: 500, error: error.toHash() };
        }
        console.log("SERVICE LAYER: \n\t", error);

        return { status: 500, error: { code: "UNKNOWN_ERROR" } };
    }
}
