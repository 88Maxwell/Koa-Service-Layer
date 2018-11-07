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
            const validArgs = await this._executeRules(ServiceClass, ctx);
            const startTime = Date.now();
            const service = new ServiceClass();
            const data = await service.execute(validArgs);

            return this._handleService({ ctx, data, meta: { startTime } });
        };
    }

    async _executeRules(ServiceClass, ctx) {
        let changedCtx = ctx;

        for (const rule of this.rules) {
            const ruleArgs = ServiceClass[rule.name];
            if (ruleArgs) {
                changedCtx = await rule.body(changedCtx, ruleArgs);
            } else if (!ServiceClass[rule.name] && rule.required) {
                throw new _Exception2.default({
                    code: "RULE_IS_REQUIRED",
                    fields: {
                        rule: rule.name
                    }
                });
            }
        }
    }

    _handleService({ ctx, data }) {
        try {
            ctx.body = { status: 200, data };
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