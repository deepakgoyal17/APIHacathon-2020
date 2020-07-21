"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccessToken = getAccessToken;
exports.initializeJourney = initializeJourney;

var _request = _interopRequireDefault(require("./request"));

var _auth = require("./../actions/auth");

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getAccessToken(dispatch, code, type) {
  (0, _request["default"])(dispatch, '/token', 'POST', {
    code: code
  }, {}, function (response) {
    dispatch((0, _auth.setAccessToken)(response.access_token, response.refresh_token));

    if (response.access_token && response.refresh_token) {
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
    }

    sessionStorage.removeItem('type', type);
    document.location.href = "/".concat(type);
  });
}

function initializeJourney(dispatch, type) {
  var sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) sessionStorage.setItem('session_id', (0, _uuid.v5)('http://openbanking.apithon', _uuid.v5.URL));
  (0, _request["default"])(dispatch, "/".concat(type, "/init"), 'GET', null, {}, function (response) {
    sessionStorage.setItem('type', type); // set url as per server response

    document.location = response;
  });
}