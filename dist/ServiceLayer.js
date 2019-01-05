"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Exception = _interopRequireDefault(require("./Exception"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ServiceLayer =
/*#__PURE__*/
function () {
  function ServiceLayer(_ref) {
    var _ref$rules = _ref.rules,
        rules = _ref$rules === void 0 ? [] : _ref$rules;

    _classCallCheck(this, ServiceLayer);

    this.rules = rules;
  }

  _createClass(ServiceLayer, [{
    key: "useService",
    value: function useService(ServiceClass) {
      var _this = this;

      return (
        /*#__PURE__*/
        function () {
          var _ref2 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(ctx) {
            var validArgs, service, data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
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
      var _executeRules2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(ServiceClass, ctx) {
        var changedCtx, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, rule, ruleArgs, name, execute, type;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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