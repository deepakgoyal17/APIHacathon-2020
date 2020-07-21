"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = InfoDisplay;

var _react = _interopRequireDefault(require("react"));

require("./InfoDisplay.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//display formatted json data
function InfoDisplay(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data;

  if (!data) {
    return null;
  }

  if (!data.Data.hasOwnProperty('VirtualAccFlag')) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "infoContainer"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "formattedData"
    }, /*#__PURE__*/_react["default"].createElement("pre", null, JSON.stringify(data, null, 4))));
  } else {
    console.log(data.Data);
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "wrapper"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "header-text"
    }, " ROLLOVER "), /*#__PURE__*/_react["default"].createElement("div", {
      className: "table"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "row header"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Tag Name"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Principal Amount"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Currency"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Auto Debit Date"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Due Date"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Interest Earned")), data.Data.VirtualAccounts.map(function (listValue, index) {
      if (listValue.VirtualAccType == 'ROLLOVER') {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell",
          "data-title": "Debit Data"
        }, listValue.TagName), /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell",
          "data-title": "Age"
        }, listValue.PrincipalAmount), /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell",
          "data-title": "Occupation"
        }, listValue.Currency), /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell",
          "data-title": "Location"
        }, listValue.AutoDebitDate.split('T')[0]), /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell",
          "data-title": "Location"
        }, listValue.DueDate.split('T')[0]), /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell",
          "data-title": "Location"
        }, listValue.Interest));
      }
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "wrapper"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "header-text"
    }, " SAVINGS "), /*#__PURE__*/_react["default"].createElement("div", {
      className: "table"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "row header"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Tag Name"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Currency"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Start Date"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Maturity Date"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Amount on Maturity"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "cell"
    }, "Term")), data.Data.VirtualAccounts.map(function (listValue, index) {
      if (listValue.VirtualAccType == 'SAVINGS') {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell",
          "data-title": "Debit Data"
        }, listValue.TagName), /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell",
          "data-title": "Age"
        }, listValue.Currency), /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell",
          "data-title": "Occupation"
        }, listValue.AutoDebitDate.split('T')[0]), /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell",
          "data-title": "Location"
        }, listValue.DueDate.split('T')[0]), /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell-maturity",
          "data-title": "Location"
        }, listValue.Interest), /*#__PURE__*/_react["default"].createElement("div", {
          className: "cell",
          "data-title": "Location"
        }, listValue.Term));
      }
    }))));
  }
}