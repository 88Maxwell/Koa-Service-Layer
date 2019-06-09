"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Service = function Service() {
  var _this = this;

  (0, _classCallCheck2.default)(this, Service);
  (0, _defineProperty2.default)(this, "runExecutor", function (args) {
    return _this.execute(args);
  });
};

exports.default = Service;