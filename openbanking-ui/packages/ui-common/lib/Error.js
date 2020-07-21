"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Error;

var _react = _interopRequireDefault(require("react"));

require("./common.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// error displayed when api throws 4xx , 5xx error
function Error() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "errorContainer"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "alert alert-danger"
  }, "We have encountered a problem while connecting to server."));
}