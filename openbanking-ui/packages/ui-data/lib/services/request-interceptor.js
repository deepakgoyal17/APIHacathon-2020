"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRequestInterceptor = setRequestInterceptor;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function setRequestInterceptor() {
  _axios["default"].interceptors.request.use(function (config) {
    var sessionId = sessionStorage.getItem('session_id');
    var token = localStorage.getItem('token');
    var refresh_token = localStorage.getItem('refresh_token');
    config.headers['session_id'] = sessionId;
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Content-Type'] = 'application/json';

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
      config.headers['refresh_token'] = refresh_token;
    }

    return config;
  }, function (error) {
    Promise.reject(error);
  });
}