import { renderSlot, createVNode, createTextVNode } from 'vue';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index.mjs';

const Empty = (props, {
  slots
}) => {
  const {
    t
  } = useLocale();
  const ns = useNamespace("table-v2");
  const defaultSlot = renderSlot(slots, "default", {}, () => [createVNode("span", {
    "class": ns.e("empty-text")
  }, [createTextVNode("("), t("el.table.emptyText"), createTextVNode(")")])]);
  return createVNode("div", {
    "class": props.class,
    "style": props.style
  }, [defaultSlot]);
};
Empty.displayName = "ElTableV2Empty";
var Empty$1 = Empty;

export { Empty$1 as default };
//# sourceMappingURL=empty.mjs.map
