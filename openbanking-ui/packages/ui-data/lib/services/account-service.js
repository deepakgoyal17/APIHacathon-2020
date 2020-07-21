"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccountList = getAccountList;
exports.getAccountById = getAccountById;
exports.getAccountBalances = getAccountBalances;
exports.getAccountTransactions = getAccountTransactions;
exports.getAccountDirectDebits = getAccountDirectDebits;
exports.getAccountStandingOrders = getAccountStandingOrders;
exports.getVirtualAccount = getVirtualAccount;
exports.getAccountProducts = getAccountProducts;

var _request = _interopRequireDefault(require("./request"));

var _app = require("../actions/app");

var _account = require("../actions/account");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mockData = {
  "Data": {
    "VirtualAccFlag": "true",
    "AccountId": "a0031afc-8c2a-419a-88f4-5116f96c178a",
    "VirtualAccounts": [{
      "VirtualAccId": "d9a3c34c-ad7a-47be-8308-4751778241b2",
      "TagName": "House Loan",
      "PrincipalAmount": "10000.00",
      "AutoDebitDate": "2020-07-10T02:59:00.000Z",
      "DueDate": "2020-07-01T12:35:00.000Z",
      "Interest": "7.39",
      "VirtualAccType": "ROLLOVER",
      "Currency": "GBP",
      "Term": null
    }, {
      "VirtualAccId": "d6b60051-c603-4836-950e-1f150a49dd57",
      "TagName": "Car Loan",
      "PrincipalAmount": "5000.00",
      "AutoDebitDate": "2020-07-05T02:59:00.000Z",
      "DueDate": "2020-07-01T12:35:00.000Z",
      "Interest": "1.64",
      "VirtualAccType": "ROLLOVER",
      "Currency": "GBP",
      "Term": null
    }, {
      "VirtualAccId": "d330aa06-9063-45bd-a337-5d37e37873b4",
      "TagName": "MM Savings",
      "PrincipalAmount": "0",
      "AutoDebitDate": "2020-07-01",
      "DueDate": "2030-07-01",
      "Interest": "1265.02",
      "VirtualAccType": "SAVINGS",
      "Currency": "GBP",
      "Term": "10 Years"
    }]
  },
  "Links": null,
  "Meta": null
}; //accounts api's

function getAccountList(dispatch) {
  (0, _request["default"])(dispatch, '/aisp/accounts', 'GET', null, {}, function (response) {
    //callback placeholder where one or multiple actions can be dispatched
    dispatch((0, _app.setData)(response));

    if (response.Data.Account.length > 0) {
      dispatch((0, _account.setAccountId)(response.Data.Account[0].AccountId));
    }
  });
} // get account by id


function getAccountById(dispatch, accountId) {
  (0, _request["default"])(dispatch, "/aisp/accounts/".concat(accountId), 'GET', null, {}, function (response) {
    dispatch((0, _app.setData)(response));
  });
}

function getAccountBalances(dispatch, accountId) {
  (0, _request["default"])(dispatch, "/aisp/accounts/".concat(accountId, "/balances"), 'GET', null, {}, function (response) {
    dispatch((0, _app.setData)(response));
  });
}

function getAccountTransactions(dispatch, accountId) {
  (0, _request["default"])(dispatch, "/aisp/accounts/".concat(accountId, "/transactions"), 'GET', null, {}, function (response) {
    dispatch((0, _app.setData)(response));
  });
}

function getAccountDirectDebits(dispatch, accountId) {
  (0, _request["default"])(dispatch, "/aisp/accounts/".concat(accountId, "/direct-debits"), 'GET', null, {}, function (response) {
    dispatch((0, _app.setData)(response));
  });
}

function getAccountStandingOrders(dispatch, accountId) {
  (0, _request["default"])(dispatch, "/aisp/accounts/".concat(accountId, "/standing-orders"), 'GET', null, {}, function (response) {
    dispatch((0, _app.setData)(response));
  });
}

function getVirtualAccount(dispatch, accountId) {
  (0, _request["default"])(dispatch, "/aisp/accounts/".concat(accountId, "/virtualAccounts"), 'GET', null, {}, function (response) {
    dispatch((0, _app.setData)(response));
  });
}

function getAccountProducts(dispatch, params) {
  (0, _request["default"])(dispatch, '/aisp/products', 'GET', params, {}, function (response) {
    dispatch((0, _app.setData)(response));
  });
}