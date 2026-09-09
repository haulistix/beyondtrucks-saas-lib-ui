'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../tooltip/index.js');
var cell = require('../cell.js');

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const TableV2Cell = vue.defineComponent({
  name: "ElTableV2Cell",
  inheritAttrs: false,
  props: cell.tableV2CellProps,
  setup(props, {
    slots
  }) {
    const contentRef = vue.ref();
    const isOverflowing = vue.ref(false);
    const updateOverflow = () => {
      const element = contentRef.value;
      if (!props.showOverflowTooltip || !element) {
        isOverflowing.value = false;
        return;
      }
      isOverflowing.value = Boolean(element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight);
    };
    vue.onMounted(updateOverflow);
    vue.onUpdated(updateOverflow);
    return () => {
      var _a;
      const {
        cellData,
        showOverflowTooltip,
        style
      } = props;
      const displayText = ((_a = cellData == null ? void 0 : cellData.toString) == null ? void 0 : _a.call(cellData)) || "";
      const defaultSlot = vue.renderSlot(slots, "default", props, () => [displayText]);
      const content = vue.createVNode("div", {
        "ref": contentRef,
        "class": props.class,
        "title": showOverflowTooltip ? void 0 : displayText,
        "style": style,
        "onMouseenter": showOverflowTooltip ? updateOverflow : void 0
      }, [defaultSlot]);
      if (!showOverflowTooltip)
        return content;
      const tooltipOptions = typeof showOverflowTooltip === "object" ? showOverflowTooltip : {};
      return vue.createVNode(index.ElTooltip, vue.mergeProps({
        "effect": "light",
        "placement": "top"
      }, tooltipOptions, {
        "content": displayText,
        "disabled": !isOverflowing.value
      }), _isSlot(content) ? content : {
        default: () => [content]
      });
    };
  }
});
var TableCell = TableV2Cell;

exports["default"] = TableCell;
//# sourceMappingURL=cell.js.map
