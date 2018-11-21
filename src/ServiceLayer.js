import Exception from './Exception';

export default class ServiceLayer {
    constructor({ rules }) {
        this.logger = logger;
        this.rules = rules;
    }

    useService(ServiceClass) {
        return async ctx => {
            try {
                const validArgs = await this._executeRules(ServiceClass, ctx);
                const service = new ServiceClass();
                const data = await service.execute(validArgs);
                
                ctx.body = { status: 200, ...data };
            } catch (error) {
                if (error instanceof Exception) {
                    ctx.body = { status: 500, error: error.toHash() };

                } else {
                    ctx.body = { status: 500, error: { code: 'UNKNOWN_ERROR' } };
                }

            }
        }
    }

    async _executeRules(ServiceClass, ctx) {
        let changedCtx = ctx;
        // rules type can be required, epty, hidden
        for (const rule of this.rules) {
            const ruleArgs = ServiceClass[rule.name];
            const { name, body, type } = rule;

            if (!ServiceClass[name] && type === "required") {
                throw new Exception({ code: "RULE_IS_REQUIRED", fields: { rule: name } });
            } else {
                changedCtx = await body(changedCtx, ruleArgs);
            }
        }
    }
}

