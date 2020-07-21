"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setError = exports.setLoader = void 0;

var _common = require("../actionCreators/common");

var setLoader = function setLoader(loading) {
  return {
    type: _common.SET_LOADING,
    loading: loading
  };
};

exports.setLoader = setLoader;

var setError = function setError(error) {
  return {
    type: _common.SET_ERROR,
    error: error
  };
};

exports.setError = setError;