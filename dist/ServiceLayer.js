"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Exception = _interopRequireDefault(require("./Exception"));

var ServiceLayer =
/*#__PURE__*/
function () {
  function ServiceLayer(_ref) {
    var _ref$rules = _ref.rules,
        rules = _ref$rules === void 0 ? [] : _ref$rules;
    (0, _classCallCheck2.default)(this, ServiceLayer);
    this.rules = rules;
  }

  (0, _createClass2.default)(ServiceLayer, [{
    key: "useService",
    value: function useService(ServiceClass) {
      var _this = this;

      return (
        /*#__PURE__*/
        function () {
          var _ref2 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee(ctx) {
            var validArgs, service, data;
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
                    ctx.body = {
                      status: 200,
                      data: data
                    };
                    _context.next = 14;
                    break;

                  case 11:
                    _context.prev = 11;
                    _context.t0 = _context["catch"](0);

                    if (_context.t0 instanceof _Exception.default) {
                      ctx.body = {
                        status: 500,
                        error: _context.t0.toHash()
                      };
                    } else {
                      console.log("KOA SERVICE LAYER: \n\t", _context.t0);
                      ctx.body = {
                        status: 500,
                        error: {
                          code: "UNKNOWN_ERROR"
                        }
                      };
                    }

                  case 14:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[0, 11]]);
          }));

          return function (_x) {
            return _ref2.apply(this, arguments);
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
        var changedCtx, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, rule, ruleArgs, name, execute, type;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                changedCtx = ctx; // rules type can be required, epty, hidden

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 4;
                _iterator = this.rules[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 21;
                  break;
                }

                rule = _step.value;
                ruleArgs = ServiceClass[rule.name];
                name = rule.name, execute = rule.execute, type = rule.type;

                if (!type) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 13;
                return execute(changedCtx, ruleArgs);

              case 13:
                changedCtx = _context2.sent;
                _context2.next = 18;
                break;

              case 16:
                if (!(!ServiceClass[name] && type === "required")) {
                  _context2.next = 18;
                  break;
                }

                throw new _Exception.default({
                  code: "RULE_IS_REQUIRED",
                  fields: {
                    rule: name
                  }
                });

              case 18:
                _iteratorNormalCompletion = true;
                _context2.next = 6;
                break;

              case 21:
                _context2.next = 27;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 27:
                _context2.prev = 27;
                _context2.prev = 28;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 30:
                _context2.prev = 30;

                if (!_didIteratorError) {
                  _context2.next = 33;
                  break;
                }

                throw _iteratorError;

              case 33:
                return _context2.finish(30);

              case 34:
                return _context2.finish(27);

              case 35:
                return _context2.abrupt("return", changedCtx);

              case 36:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 23, 27, 35], [28,, 30, 34]]);
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