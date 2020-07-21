"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  setupInterceptors: function setupInterceptors(history, store) {
    // Add a response interceptor
    _axios["default"].interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      //catches if the session ended!
      if (error.response.status === 401) {
        console.log('EXPIRED TOKEN!');
        localStorage.clear();
        store.dispatch(logout());
        history.push('/');
      }

      return Promise.reject(error);
    });
  }
};
exports["default"] = _default;