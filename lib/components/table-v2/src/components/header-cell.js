'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../tooltip/index.js');

const HeaderCell = (props, {
  slots
}) => {
  var _a, _b;
  const title = (_b = (_a = props.column) == null ? void 0 : _a.title) != null ? _b : "";
  return vue.renderSlot(slots, "default", props, () => [vue.createVNode(index.ElTooltip, {
    "content": title,
    "disabled": !title,
    "effect": "light",
    "placement": "top-start",
    "popperClass": "text-overflow-tooltip"
  }, {
    default: () => [vue.createVNode("div", {
      "class": props.class
    }, [title])]
  })]);
};
HeaderCell.displayName = "ElTableV2HeaderCell";
HeaderCell.inheritAttrs = false;
var HeaderCell$1 = HeaderCell;

exports["default"] = HeaderCell$1;
//# sourceMappingURL=header-cell.js.map
