import Exception from "./Exception";
import { unexistedRuleTypeExeption, ruleIsRequiredExetion, rulesExeption } from "./utils/exeptions";
import { deepClone } from "./utils/helpers";
import Service from "./Service";

type Dict = { [key: string]: Function };

type Type = "required" | "custom" | "hidden";

interface Constructable<T> {
    new (): T;
}
interface Rule {
    name: string;
    type: Type;
    execute: (ctx: object, args?: any, serviceData?: any) => any;
}
interface RulesObject {
    before?: Array<Rule>;
    after?: Array<Rule>;
}

interface ExecuteRuleAruments {
    rules: Array<Rule>;
    ServiceClass: Dict;
    ctx: object;
    serviceData: object;
}

export default class ServiceLayer {
    resolver: Function;
    argumentBuilder: Function;
    beforeRules: Array<Rule>;
    afterRules: Array<Rule>;

    constructor(resolver: Function, argumentBuilder: Function, rules: RulesObject = { before: [], after: [] }) {
        this.resolver = resolver;
        this.argumentBuilder = argumentBuilder;
        this.beforeRules = rules.before;
        this.afterRules = rules.after;
    }

    public useService(ServiceClass: Constructable<Service>) {
        // eslint-disable-next-line func-names
        return async function(...args: Array<any>) {
            const ctx = this.argumentBuilder(args);
            let result;
            const serviceData = {
                startTime: Date.now(),
                serviceName: ServiceClass.name
            };

            try {
                const updatedContext = await this.executeRules({
                    rules: this.beforeRules,
                    ServiceClass,
                    ctx,
                    serviceData
                });
                const service = new ServiceClass();
                let data = await service.execute(updatedContext);

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

    private async executeRules({ rules, ServiceClass, ctx, serviceData }: ExecuteRuleAruments) {
        let changedCtx = ctx;

        if (rules && rules.length) {
            for (const rule of rules) {
                const ruleArgs = ServiceClass[rule.name];
                if (!rule.name || !rule.execute || !rule.type) {
                    throw rulesExeption();
                }

                switch (rule.type) {
                    case "hidden":
                        changedCtx = rule.execute(changedCtx, ruleArgs, serviceData);

                    case "required":
                        if (!ruleArgs) {
                            throw ruleIsRequiredExetion(rule.name);
                        }

                        changedCtx = rule.execute(changedCtx, ruleArgs, serviceData);

                    case "custom":
                        if (ruleArgs) {
                            return rule.execute(changedCtx, ruleArgs, serviceData);
                        }

                        changedCtx = changedCtx;

                    default:
                        throw unexistedRuleTypeExeption(rule.type);
                }
            }
        }
        return changedCtx;
    }

    private errorCatchHandler(error: Error | Exception) {
        if (error instanceof Exception) {
            return { status: 500, error: error.toHash() };
        }
        console.log("SERVICE LAYER: \n\t", error);

        return { status: 500, error: { code: "UNKNOWN_ERROR" } };
    }
}
