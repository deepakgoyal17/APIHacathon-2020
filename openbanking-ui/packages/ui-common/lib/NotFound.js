"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NotFound;

var _react = _interopRequireDefault(require("react"));

require("./common.css");

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Unhandled routes view
function NotFound() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "notFound txtCenter"
  }, /*#__PURE__*/_react["default"].createElement("h2", null, "Oops, Page Not Found"), /*#__PURE__*/_react["default"].createElement("p", null, "The page you are trying to search is not found."), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Back"));
}