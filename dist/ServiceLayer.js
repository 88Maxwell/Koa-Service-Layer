'use strict';

exports.__esModule = true;

var _Exception = require('./Exception');

var _Exception2 = _interopRequireDefault(_Exception);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceLayer {
    constructor({ logger, rules }) {
        this.logger = logger;
        this.rules = rules;
    }

    // logRequest(type, result, startTime) {
    //     this.logger(type, {
    //         service: serviceClass.name,
    //         runtime: Date.now() - startTime,
    //         params: inspect(params, { showHidden: false, depth: null }),
    //         result
    //     });
    // }

    useService(ServiceClass) {
        return async ctx => {
            const service = new ServiceClass();
            const validArgs = this._executeRules(service, ctx);
            const startTime = Date.now();
            const result = service.execute(validArgs);

            return this._handleService({ ctx, result, meta: { startTime } });
        };
    }

    async _executeRules(service, ctx) {
        let changedCtx = ctx;

        for (const rule of this.rules) {
            const ruleArgs = service[rule.name];
            if (ruleArgs) {
                changedCtx = await rule.body(changedCtx, ruleArgs);
            } else if (!service[rule.name] && rule.required) {
                throw new _Exception2.default({
                    code: "RULE_IS_REQUIRED",
                    fields: {
                        rule: rule.name
                    }
                });
            }
        }
    }
    async _handleService({ ctx, result }) {
        try {
            const data = await result;
            ctx.res.end({ status: 200, data });
        } catch (error) {
            if (error instanceof _Exception2.default) {
                res.send({
                    status: 500,
                    error: error.toHash()
                });
            } else {
                res.send({
                    status: 500,
                    error: { code: 'UNKNOWN_ERROR' }
                });
            }
        }
    }

}
exports.default = ServiceLayer;