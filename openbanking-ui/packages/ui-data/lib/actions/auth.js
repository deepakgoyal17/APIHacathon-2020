"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setJourneyType = exports.setAccessToken = void 0;

var _auth = require("../actionCreators/auth");

var setAccessToken = function setAccessToken(token, refresh_token) {
  return {
    type: _auth.SET_ACCESS_TOKEN,
    token: token,
    refresh_token: refresh_token
  };
};

exports.setAccessToken = setAccessToken;

var setJourneyType = function setJourneyType(journeyType) {
  return {
    type: _auth.SET_JOURNEY_TYPE,
    journeyType: journeyType
  };
};

exports.setJourneyType = setJourneyType;