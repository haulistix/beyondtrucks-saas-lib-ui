'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../icon/index.js');
var filterIconUp = require('./filter-icon-up.js');
var filterIconDown = require('./filter-icon-down.js');
var constants = require('../constants.js');

const SortIcon = (props) => {
  const {
    sortOrder,
    sorting
  } = props;
  return vue.createVNode(index.ElIcon, {
    "size": 12,
    "class": props.class,
    "color": sorting ? "var(--color-gray-800)" : "var(--color-gray-400)"
  }, {
    default: () => [sortOrder === constants.SortOrder.ASC ? vue.createVNode(filterIconUp["default"], null, null) : vue.createVNode(filterIconDown["default"], null, null)]
  });
};
var SortIcon$1 = SortIcon;

exports["default"] = SortIcon$1;
//# sourceMappingURL=sort-icon.js.map
