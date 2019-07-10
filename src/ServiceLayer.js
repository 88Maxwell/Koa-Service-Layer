import Exception from "./Exception";

export default class ServiceLayer {
    constructor(options = {}) {
        const {
            rules
            // resolver
        } = options;

        // this.resolver = resolver;
        this.rules = rules && rules.length ? rules : [];
    }

    useService(ServiceClass) {
        return async ctx => {
            let result;

            try {
                const validArgs = await this._executeRules(ServiceClass, ctx);
                const service = new ServiceClass();
                const data = await service.runExecutor(validArgs);

                result = { status: 200, data: { ...data } };
            } catch (error) {
                if (error instanceof Exception) {
                    // eslint-disable-next-line no-param-reassign
                    result = { status: 500, error: error.toHash() };
                } else {
                    console.log("KOA SERVICE LAYER: \n\t", error);

                    result = { status: 500, error: { code: "UNKNOWN_ERROR" } };
                }
            }

            // eslint-disable-next-line no-param-reassign
            ctx.body = result;

            // return this.resolver.bind(ctx, result)();
            return result;
        };
    }

    async _executeRules(ServiceClass, ctx) {
        let changedCtx = ctx;

        // rules type can be required, custom, hidden
        if (this.rules) {
            for (const { name, execute, type } of this.rules) {
                if (!name || !execute || !type) {
                    throw new Exception({
                        code   : "RULES_EXEPTION",
                        fields : {}
                    });
                }

                const ruleArgs = ServiceClass[name];

                switch (type) {
                    case "hidden":
                        changedCtx = await execute(changedCtx);
                        break;

                    case "required":
                        if (!ruleArgs) {
                            throw new Exception({
                                code   : "RULE_IS_REQUIRED",
                                fields : { rule: name }
                            });
                        }
                        changedCtx = await execute(changedCtx, ruleArgs);
                        break;

                    case "custom":
                        if (ruleArgs) {
                            changedCtx = await execute(changedCtx, ruleArgs);
                        }
                        break;

                    default:
                        throw new Exception({
                            code   : "UNEXISTED_RULE_TYPE",
                            fields : { type }
                        });
                }
            }

            return changedCtx;
        }
    }
}
