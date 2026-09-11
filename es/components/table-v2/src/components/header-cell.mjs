import { renderSlot, createVNode } from 'vue';
import { ElTooltip } from '../../../tooltip/index.mjs';

const HeaderCell = (props, {
  slots
}) => {
  var _a, _b;
  const title = (_b = (_a = props.column) == null ? void 0 : _a.title) != null ? _b : "";
  return renderSlot(slots, "default", props, () => [createVNode(ElTooltip, {
    "content": title,
    "disabled": !title,
    "effect": "light",
    "placement": "top-start",
    "popperClass": "text-overflow-tooltip"
  }, {
    default: () => [createVNode("div", {
      "class": props.class
    }, [title])]
  })]);
};
HeaderCell.displayName = "ElTableV2HeaderCell";
HeaderCell.inheritAttrs = false;
var HeaderCell$1 = HeaderCell;

export { HeaderCell$1 as default };
//# sourceMappingURL=header-cell.mjs.map
