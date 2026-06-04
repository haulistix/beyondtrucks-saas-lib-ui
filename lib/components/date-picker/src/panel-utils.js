'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var panelDatePick = require('./date-picker-com/panel-date-pick.js');
var panelDateRange = require('./date-picker-com/panel-date-range.js');
var panelMonthRange = require('./date-picker-com/panel-month-range.js');
var panelYearRange = require('./date-picker-com/panel-year-range.js');
var panelStartRange = require('./date-picker-com/panel-start-range.js');
var panelEndRange = require('./date-picker-com/panel-end-range.js');

const getPanel = function(type) {
  switch (type) {
    case "daterange":
    case "datetimerange": {
      return panelDateRange["default"];
    }
    case "datestartrange": {
      return panelStartRange["default"];
    }
    case "dateendrange": {
      return panelEndRange["default"];
    }
    case "monthrange": {
      return panelMonthRange["default"];
    }
    case "yearrange": {
      return panelYearRange["default"];
    }
    default: {
      return panelDatePick["default"];
    }
  }
};

exports.getPanel = getPanel;
//# sourceMappingURL=panel-utils.js.map
