"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Loading;

var _react = _interopRequireDefault(require("react"));

require("./common.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// loading overlay
function Loading() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "overlay"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "loading"
  }));
}