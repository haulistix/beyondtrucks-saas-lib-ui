import { defineComponent, ref, onMounted, onUpdated, renderSlot, createVNode, mergeProps, isVNode } from 'vue';
import { ElTooltip } from '../../../tooltip/index.mjs';
import { tableV2CellProps } from '../cell.mjs';

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const TableV2Cell = defineComponent({
  name: "ElTableV2Cell",
  inheritAttrs: false,
  props: tableV2CellProps,
  setup(props, {
    slots
  }) {
    const contentRef = ref();
    const isOverflowing = ref(false);
    const updateOverflow = () => {
      const element = contentRef.value;
      if (!props.showOverflowTooltip || !element) {
        isOverflowing.value = false;
        return;
      }
      isOverflowing.value = Boolean(element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight);
    };
    onMounted(updateOverflow);
    onUpdated(updateOverflow);
    return () => {
      var _a;
      const {
        cellData,
        showOverflowTooltip,
        style
      } = props;
      const displayText = ((_a = cellData == null ? void 0 : cellData.toString) == null ? void 0 : _a.call(cellData)) || "";
      const defaultSlot = renderSlot(slots, "default", props, () => [displayText]);
      const content = createVNode("div", {
        "ref": contentRef,
        "class": props.class,
        "title": showOverflowTooltip ? void 0 : displayText,
        "style": style,
        "onMouseenter": showOverflowTooltip ? updateOverflow : void 0
      }, [defaultSlot]);
      if (!showOverflowTooltip)
        return content;
      const tooltipOptions = typeof showOverflowTooltip === "object" ? showOverflowTooltip : {};
      return createVNode(ElTooltip, mergeProps({
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

export { TableCell as default };
//# sourceMappingURL=cell.mjs.map
