import { defineComponent, computed, openBlock, createElementBlock, mergeProps, unref, renderSlot } from 'vue';
import { iconProps } from './icon.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isUndefined } from '../../../utils/types.mjs';
import { addUnit } from '../../../utils/dom/style.mjs';

const __default__ = defineComponent({
  name: "ElIcon",
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = computed(() => {
      const { size, color } = props;
      if (!size && !color)
        return {};
      return {
        fontSize: isUndefined(size) ? void 0 : addUnit(size),
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return _ctx.$attrs.innerHTML != null ? (openBlock(), createElementBlock("i", mergeProps({
        key: 0,
        class: unref(ns).b(),
        style: unref(style)
      }, _ctx.$attrs), null, 16)) : (openBlock(), createElementBlock("i", mergeProps({
        key: 1,
        class: unref(ns).b(),
        style: unref(style)
      }, _ctx.$attrs), [
        renderSlot(_ctx.$slots, "default")
      ], 16));
    };
  }
});
var ElIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "icon.vue"]]);

export { ElIcon as default };
//# sourceMappingURL=icon2.mjs.map
