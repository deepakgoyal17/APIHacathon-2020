"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createRequest;

var _axios = _interopRequireDefault(require("axios"));

var _requestInterceptor = require("./request-interceptor");

var _common = require("../actions/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var base_url = 'http://localhost:8080/open-banking/v3';
(0, _requestInterceptor.setRequestInterceptor)();

function createRequest(dispatch, endpoint) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var callbackFn = arguments.length > 5 ? arguments[5] : undefined;
  dispatch((0, _common.setLoader)(true));
  (0, _axios["default"])({
    url: base_url + endpoint,
    method: method,
    data: data,
    headers: headers
  }).then(function (response) {
    // dont stop loader in case of redirection
    if (!endpoint.includes('init')) {
      dispatch((0, _common.setLoader)(false));
    }

    callbackFn(response.data);
  })["catch"](function (error) {
    dispatch((0, _common.setLoader)(false));
    dispatch((0, _common.setError)(error));
  });
}