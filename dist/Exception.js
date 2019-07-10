"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _jsonPointer = _interopRequireDefault(require("json-pointer"));

var _renameKeys = _interopRequireDefault(require("rename-keys"));

var Exception =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2.default)(Exception, _Error);

  function Exception(data) {
    var _this;

    (0, _classCallCheck2.default)(this, Exception);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Exception).call(this));
    if (!data.fields) throw new Error("FIELDS_REQUIRED");
    if (!data.code) throw new Error("MESSAGE_REQUIRED");

    var fields = _jsonPointer.default.dict(data.fields);

    _this.fields = (0, _renameKeys.default)(fields, function (str) {
      return str.substr(1);
    });
    _this.code = data.code;
    _this.message = data.message;
    return _this;
  }

  (0, _createClass2.default)(Exception, [{
    key: "toHash",
    value: function toHash() {
      return {
        fields: this.fields,
        code: this.code
      };
    }
  }]);
  return Exception;
}((0, _wrapNativeSuper2.default)(Error));

exports.default = Exception;