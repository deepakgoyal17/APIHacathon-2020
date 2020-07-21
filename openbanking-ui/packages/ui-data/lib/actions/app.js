"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setData = void 0;

var _app = require("../actionCreators/app");

var setData = function setData(data) {
  return {
    type: _app.SET_DATA,
    data: data
  };
};

exports.setData = setData;