"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = __importDefault(require("./Exception"));
const exeptions_1 = require("./utils/exeptions");
const helpers_1 = require("./utils/helpers");
class ServiceLayer {
    constructor(resolver, argumentBuilder, rules = { before: [], after: [] }) {
        this.executeRule = ({ name, execute, type }, executeArgs) => {
            if (!name || !execute || !type) {
                throw exeptions_1.rulesExeption();
            }
            switch (type) {
                case "hidden":
                    return execute(...executeArgs);
                case "required":
                    if (!executeArgs[1]) {
                        throw exeptions_1.ruleIsRequiredExetion(name);
                    }
                    return execute(...executeArgs);
                case "custom":
                    if (executeArgs[1]) {
                        return execute(...executeArgs);
                    }
                    return executeArgs[0];
                default:
                    throw exeptions_1.unexistedRuleTypeExeption(type);
            }
        };
        if (!helpers_1.isFunction(resolver))
            throw exeptions_1.invalidArgumentExeption("resolver");
        if (!helpers_1.isFunction(argumentBuilder))
            throw exeptions_1.invalidArgumentExeption("argumentBuilder");
        this.resolver = resolver;
        this.argumentBuilder = argumentBuilder;
        this.beforeRules = rules.before;
        this.afterRules = rules.after;
    }
    useService(ServiceClass) {
        // eslint-disable-next-line func-names
        return function () {
            return __awaiter(this, arguments, void 0, function* () {
                const ctx = this.argumentBuilder([...arguments]);
                let result;
                const serviceData = {
                    startTime: Date.now(),
                    serviceName: ServiceClass.name
                };
                const executeRulesArgs = {
                    rules: this.beforeRules,
                    ServiceClass,
                    ctx,
                    serviceData
                };
                try {
                    const updatedContext = yield this.executeRules(executeRulesArgs);
                    const service = new ServiceClass();
                    let data = yield service.runExecutor.call(ctx, updatedContext);
                    if (typeof data === "object") {
                        data = Array.isArray(data) ? [...data] : Object.assign({}, data);
                    }
                    result = { status: 200, data };
                    yield this.executeRules({
                        rules: this.afterRules,
                        ServiceClass,
                        ctx: updatedContext,
                        serviceData: Object.assign({}, serviceData, { result: helpers_1.deepClone(result) })
                    });
                }
                catch (error) {
                    result = this.errorCatchHandler(error);
                }
                return this.resolver.call(ctx, result);
            });
        }.bind(this);
    }
    executeRules(argumens) {
        return __awaiter(this, void 0, void 0, function* () {
            let changedCtx = ctx;
            // rules type can be required, custom, hidden
            if (rules) {
                for (const rule of rules) {
                    const ruleArgs = ServiceClass[rule.name];
                    const executeArgs = [changedCtx, ruleArgs, serviceData];
                    changedCtx = yield this.executeRule(rule, executeArgs);
                }
            }
        });
    }
    errorCatchHandler(error) {
        if (error instanceof Exception_1.default) {
            return { status: 500, error: error.toHash() };
        }
        console.log("SERVICE LAYER: \n\t", error);
        return { status: 500, error: { code: "UNKNOWN_ERROR" } };
    }
}
exports.default = ServiceLayer;
