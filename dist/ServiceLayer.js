"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Exception = _interopRequireDefault(require("./Exception"));

var ServiceLayer =
/*#__PURE__*/
function () {
  function ServiceLayer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, ServiceLayer);
    var rules = options.rules; // this.resolver = resolver;

    this.rules = rules && rules.length ? rules : [];
  }

  (0, _createClass2.default)(ServiceLayer, [{
    key: "useService",
    value: function useService(ServiceClass) {
      var _this = this;

      return (
        /*#__PURE__*/
        function () {
          var _ref = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee(ctx) {
            var result, validArgs, service, data;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return _this._executeRules(ServiceClass, ctx);

                  case 3:
                    validArgs = _context.sent;
                    service = new ServiceClass();
                    _context.next = 7;
                    return service.runExecutor(validArgs);

                  case 7:
                    data = _context.sent;

                    if ((0, _typeof2.default)(data) === "object") {
                      data = Array.isArray(data) ? (0, _toConsumableArray2.default)(data) : (0, _objectSpread2.default)({}, data);
                    }

                    result = {
                      status: 200,
                      data: data
                    };
                    _context.next = 15;
                    break;

                  case 12:
                    _context.prev = 12;
                    _context.t0 = _context["catch"](0);

                    if (_context.t0 instanceof _Exception.default) {
                      // eslint-disable-next-line no-param-reassign
                      result = {
                        status: 500,
                        error: _context.t0.toHash()
                      };
                    } else {
                      console.log("KOA SERVICE LAYER: \n\t", _context.t0);
                      result = {
                        status: 500,
                        error: {
                          code: "UNKNOWN_ERROR"
                        }
                      };
                    }

                  case 15:
                    // eslint-disable-next-line no-param-reassign
                    ctx.body = result; // return this.resolver.bind(ctx, result)();

                    return _context.abrupt("return", result);

                  case 17:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[0, 12]]);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }()
      );
    }
  }, {
    key: "_executeRules",
    value: function () {
      var _executeRules2 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(ServiceClass, ctx) {
        var changedCtx, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref3, name, execute, type, ruleArgs;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                changedCtx = ctx; // rules type can be required, custom, hidden

                if (!this.rules) {
                  _context2.next = 50;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 5;
                _iterator = this.rules[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 35;
                  break;
                }

                _ref3 = _step.value;
                name = _ref3.name, execute = _ref3.execute, type = _ref3.type;

                if (!(!name || !execute || !type)) {
                  _context2.next = 12;
                  break;
                }

                throw new _Exception.default({
                  code: "RULES_EXEPTION",
                  fields: {}
                });

              case 12:
                ruleArgs = ServiceClass[name];
                _context2.t0 = type;
                _context2.next = _context2.t0 === "hidden" ? 16 : _context2.t0 === "required" ? 20 : _context2.t0 === "custom" ? 26 : 31;
                break;

              case 16:
                _context2.next = 18;
                return execute(changedCtx);

              case 18:
                changedCtx = _context2.sent;
                return _context2.abrupt("break", 32);

              case 20:
                if (ruleArgs) {
                  _context2.next = 22;
                  break;
                }

                throw new _Exception.default({
                  code: "RULE_IS_REQUIRED",
                  fields: {
                    rule: name
                  }
                });

              case 22:
                _context2.next = 24;
                return execute(changedCtx, ruleArgs);

              case 24:
                changedCtx = _context2.sent;
                return _context2.abrupt("break", 32);

              case 26:
                if (!ruleArgs) {
                  _context2.next = 30;
                  break;
                }

                _context2.next = 29;
                return execute(changedCtx, ruleArgs);

              case 29:
                changedCtx = _context2.sent;

              case 30:
                return _context2.abrupt("break", 32);

              case 31:
                throw new _Exception.default({
                  code: "UNEXISTED_RULE_TYPE",
                  fields: {
                    type: type
                  }
                });

              case 32:
                _iteratorNormalCompletion = true;
                _context2.next = 7;
                break;

              case 35:
                _context2.next = 41;
                break;

              case 37:
                _context2.prev = 37;
                _context2.t1 = _context2["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 41:
                _context2.prev = 41;
                _context2.prev = 42;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 44:
                _context2.prev = 44;

                if (!_didIteratorError) {
                  _context2.next = 47;
                  break;
                }

                throw _iteratorError;

              case 47:
                return _context2.finish(44);

              case 48:
                return _context2.finish(41);

              case 49:
                return _context2.abrupt("return", changedCtx);

              case 50:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 37, 41, 49], [42,, 44, 48]]);
      }));

      function _executeRules(_x2, _x3) {
        return _executeRules2.apply(this, arguments);
      }

      return _executeRules;
    }()
  }]);
  return ServiceLayer;
}();

exports.default = ServiceLayer;