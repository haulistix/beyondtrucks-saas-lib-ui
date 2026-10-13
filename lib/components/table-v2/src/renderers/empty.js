'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../../hooks/use-locale/index.js');
var index$1 = require('../../../../hooks/use-namespace/index.js');

const Empty = (props, {
  slots
}) => {
  const {
    t
  } = index.useLocale();
  const ns = index$1.useNamespace("table-v2");
  const defaultSlot = vue.renderSlot(slots, "default", {}, () => [vue.createVNode("span", {
    "class": ns.e("empty-text")
  }, [vue.createTextVNode("("), t("el.table.emptyText"), vue.createTextVNode(")")])]);
  return vue.createVNode("div", {
    "class": props.class,
    "style": props.style
  }, [defaultSlot]);
};
Empty.displayName = "ElTableV2Empty";
var Empty$1 = Empty;

exports["default"] = Empty$1;
//# sourceMappingURL=empty.js.map
