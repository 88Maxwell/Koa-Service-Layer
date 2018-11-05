import Service from './Service';
import Exception from './Exception';


export default class {
    constructor({ logger, rules }) {
        this.logger = logger;
        this.Service = Service;
        this.Exception = Exception;
        this.rules = rules;
    }

    useService = ServiceClass => async ctx => {
        // eslint-disable-next-line
        const service = new ServiceClass();
        const validArgs = this._executeRules(service, ctx);

        const response = await service.execute(validArgs);

        ctx.res.end(response);
    }

    async _executeRules(service, ctx) {
        let changedCtx = ctx;

        for (const rule of this.rules) {
            if (service[rule.name]) {
                changedCtx = await rule.body(changedCtx, service[rule.name]);
            } else if (!service[rule.name] && rule.required) {
                // eslint-disable-next-line
                new this.Exception();
            }
        }
    }
}

