import Exception from "./Exception";

export default class ServiceLayer {
    constructor({ rules = [] }) {
        this.rules = rules;
    }

    useService(ServiceClass) {
        return async ctx => {
            try {
                const validArgs = await this._executeRules(ServiceClass, ctx);
                const service = new ServiceClass();
                const data = await service.runExecutor(validArgs);

                ctx.body = { status: 200, data };
            } catch (error) {
                if (error instanceof Exception) {
                    ctx.body = { status: 500, error: error.toHash() };
                } else {
                    console.log("KOA SERVICE LAYER: \n\t", error);
                    ctx.body = {
                        status: 500,
                        error: { code: "UNKNOWN_ERROR" }
                    };
                }
            }
            return ctx.body;
        };
    }

    async _executeRules(ServiceClass, ctx) {
        let changedCtx = ctx;
        
        // rules type can be required, epty, hidden
        for (const rule of this.rules) {
            const ruleArgs = ServiceClass[rule.name];
            const { name, execute, type } = rule;

            if (type) {
                changedCtx = await execute(changedCtx, ruleArgs);
            } else if (!ServiceClass[name] && type === "required") {
                throw new Exception({
                    code: "RULE_IS_REQUIRED",
                    fields: { rule: name }
                });
            }
        }

        return changedCtx;
    }
}
