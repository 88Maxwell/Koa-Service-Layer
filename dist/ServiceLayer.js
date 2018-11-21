'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Exception = require('./Exception');

var _Exception2 = _interopRequireDefault(_Exception);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceLayer {
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

                ctx.body = _extends({ status: 200 }, data);
            } catch (error) {
                if (error instanceof _Exception2.default) {
                    ctx.body = { status: 500, error: error.toHash() };
                } else {
                    ctx.body = { status: 500, error: { code: 'UNKNOWN_ERROR' } };
                }
            }
        };
    }

    async _executeRules(ServiceClass, ctx) {
        let changedCtx = ctx;
        // rules type can be required, epty, hidden
        for (const rule of this.rules) {
            const ruleArgs = ServiceClass[rule.name];
            const { name, body, type } = rule;
            if (type) {
                changedCtx = await body(changedCtx, ruleArgs);
            } else if (!ServiceClass[name] && type === "required") {
                throw new _Exception2.default({ code: "RULE_IS_REQUIRED", fields: { rule: name } });
            }
        }
    }
}
exports.default = ServiceLayer;