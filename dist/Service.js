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

var Service =
/*#__PURE__*/
function () {
  function Service() {
    (0, _classCallCheck2.default)(this, Service);
  }

  (0, _createClass2.default)(Service, [{
    key: "runExecutor",
    value: function () {
      var _runExecutor = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(args) {
        var result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.execute(args);

              case 2:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function runExecutor(_x) {
        return _runExecutor.apply(this, arguments);
      }

      return runExecutor;
    }()
  }]);
  return Service;
}();

exports.default = Service;