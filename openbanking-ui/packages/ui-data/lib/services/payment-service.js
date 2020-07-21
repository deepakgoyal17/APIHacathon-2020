"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDomesticPayment = createDomesticPayment;
exports.getDomesticPaymentStatus = getDomesticPaymentStatus;

var _request = _interopRequireDefault(require("./request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createDomesticPayment(dispatch, payload) {
  (0, _request["default"])(dispatch, 'pisp/domestic-payments', 'POST', {
    payload: payload
  }, {}, function (response) {// to do 
  });
}

function getDomesticPaymentStatus(dispatch) {
  (0, _request["default"])(dispatch, '/domestic-payment-status', 'GET', null, {}, function (response) {// to do 
  });
}