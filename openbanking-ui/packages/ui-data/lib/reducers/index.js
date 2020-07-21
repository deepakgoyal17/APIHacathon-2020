"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appReducer = _interopRequireDefault(require("./appReducer"));

var _authReducer = _interopRequireDefault(require("./authReducer"));

var _commonReducer = _interopRequireDefault(require("./commonReducer"));

var _accountReducer = _interopRequireDefault(require("./accountReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  app: _appReducer["default"],
  auth: _authReducer["default"],
  common: _commonReducer["default"],
  account: _accountReducer["default"]
};
exports["default"] = _default;