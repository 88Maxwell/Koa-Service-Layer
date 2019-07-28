"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Exception = _interopRequireDefault(require("./Exception"));

var _exeptions = require("./utils/exeptions");

var _helpers = require("./utils/helpers");

var ServiceLayer =
/*#__PURE__*/
function () {
  function ServiceLayer(resolver, argumentBuilder) {
    var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      before: [],
      after: []
    };
    (0, _classCallCheck2.default)(this, ServiceLayer);
    (0, _defineProperty2.default)(this, "_executeRule", function (_ref, executeArgs) {
      var name = _ref.name,
          execute = _ref.execute,
          type = _ref.type;

      if (!name || !execute || !type) {
        throw (0, _exeptions.rulesExeption)();
      }

      switch (type) {
        case "hidden":
          return execute.apply(void 0, (0, _toConsumableArray2.default)(executeArgs));

        case "required":
          if (!executeArgs[1]) {
            throw (0, _exeptions.ruleIsRequiredExetion)(name);
          }

          return execute.apply(void 0, (0, _toConsumableArray2.default)(executeArgs));

        case "custom":
          if (executeArgs[1]) {
            return execute.apply(void 0, (0, _toConsumableArray2.default)(executeArgs));
          }

          return executeArgs[0];

        default:
          throw (0, _exeptions.unexistedRuleTypeExeption)(type);
      }
    });
    if (!(0, _helpers.isFunction)(resolver)) throw (0, _exeptions.invalidArgumentExeption)("resolver");
    if (!(0, _helpers.isFunction)(argumentBuilder)) throw (0, _exeptions.invalidArgumentExeption)("argumentBuilder");
    this.resolver = resolver;
    this.argumentBuilder = argumentBuilder;
    this.beforeRules = rules.before;
    this.afterRules = rules.after;
  }

  (0, _createClass2.default)(ServiceLayer, [{
    key: "useService",
    value: function useService(ServiceClass) {
      // eslint-disable-next-line func-names
      return (
        /*#__PURE__*/
        (0, _asyncToGenerator2.default)(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee() {
          var ctx,
              result,
              serviceData,
              executeRulesArgs,
              updatedContext,
              service,
              data,
              _args = arguments;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  ctx = this.argumentBuilder(Array.prototype.slice.call(_args));
                  serviceData = {
                    startTime: Date.now(),
                    serviceName: ServiceClass.name
                  };
                  executeRulesArgs = {
                    rules: this.beforeRules,
                    ServiceClass: ServiceClass,
                    ctx: ctx,
                    serviceData: serviceData
                  };
                  _context.prev = 3;
                  _context.next = 6;
                  return this._executeRules(executeRulesArgs);

                case 6:
                  updatedContext = _context.sent;
                  service = new ServiceClass();
                  _context.next = 10;
                  return service.runExecutor.call(ctx, updatedContext);

                case 10:
                  data = _context.sent;

                  if ((0, _typeof2.default)(data) === "object") {
                    data = Array.isArray(data) ? (0, _toConsumableArray2.default)(data) : (0, _objectSpread2.default)({}, data);
                  }

                  result = {
                    status: 200,
                    data: data
                  };
                  _context.next = 15;
                  return this._executeRules({
                    rules: this.afterRules,
                    ServiceClass: ServiceClass,
                    ctx: updatedContext,
                    serviceData: (0, _objectSpread2.default)({}, serviceData, {
                      result: (0, _helpers.deepClone)(result)
                    })
                  });

                case 15:
                  _context.next = 20;
                  break;

                case 17:
                  _context.prev = 17;
                  _context.t0 = _context["catch"](3);
                  result = this._errorCatchHandler(_context.t0);

                case 20:
                  return _context.abrupt("return", this.resolver.call(ctx, result));

                case 21:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 17]]);
        })).bind(this)
      );
    }
  }, {
    key: "_executeRules",
    value: function () {
      var _executeRules2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(_ref3) {
        var rules, ServiceClass, ctx, serviceData, changedCtx, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, rule, ruleArgs, executeArgs;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                rules = _ref3.rules, ServiceClass = _ref3.ServiceClass, ctx = _ref3.ctx, serviceData = _ref3.serviceData;
                changedCtx = ctx; // rules type can be required, custom, hidden

                if (!rules) {
                  _context2.next = 32;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 6;
                _iterator = rules[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 18;
                  break;
                }

                rule = _step.value;
                ruleArgs = ServiceClass[rule.name];
                executeArgs = [changedCtx, ruleArgs, serviceData];
                _context2.next = 14;
                return this._executeRule(rule, executeArgs);

              case 14:
                changedCtx = _context2.sent;

              case 15:
                _iteratorNormalCompletion = true;
                _context2.next = 8;
                break;

              case 18:
                _context2.next = 24;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](6);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 24:
                _context2.prev = 24;
                _context2.prev = 25;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 27:
                _context2.prev = 27;

                if (!_didIteratorError) {
                  _context2.next = 30;
                  break;
                }

                throw _iteratorError;

              case 30:
                return _context2.finish(27);

              case 31:
                return _context2.finish(24);

              case 32:
                return _context2.abrupt("return", changedCtx);

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 20, 24, 32], [25,, 27, 31]]);
      }));

      function _executeRules(_x) {
        return _executeRules2.apply(this, arguments);
      }

      return _executeRules;
    }()
  }, {
    key: "_errorCatchHandler",
    value: function _errorCatchHandler(error) {
      if (error instanceof _Exception.default) {
        return {
          status: 500,
          error: error.toHash()
        };
      }

      console.log("SERVICE LAYER: \n\t", error);
      return {
        status: 500,
        error: {
          code: "UNKNOWN_ERROR"
        }
      };
    }
  }]);
  return ServiceLayer;
}();

exports.default = ServiceLayer;