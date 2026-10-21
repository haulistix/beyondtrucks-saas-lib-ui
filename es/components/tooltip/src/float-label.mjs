import { defineComponent, ref, watch, openBlock, createBlock, withCtx, createElementVNode, mergeProps, toDisplayString } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import ElTooltip from './tooltip.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';

const __default__ = defineComponent({
  name: "ElFloatLabel",
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    text: null,
    immediate: { type: Boolean }
  },
  emits: ["before-show"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const labelRef = ref();
    const visible = ref(false);
    let hovering = false;
    const updateOverflow = () => {
      const label = labelRef.value;
      const nextVisible = Boolean(hovering && label && label.scrollWidth > label.clientWidth);
      if (nextVisible && !visible.value)
        emit("before-show");
      visible.value = nextVisible;
    };
    const handleMouseEnter = () => {
      hovering = true;
      updateOverflow();
    };
    const handleMouseLeave = () => {
      hovering = false;
      visible.value = false;
    };
    useResizeObserver(labelRef, updateOverflow);
    watch(() => props.text, updateOverflow, { flush: "post" });
    expose({ hide: handleMouseLeave });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(ElTooltip, {
        content: __props.text,
        visible: visible.value,
        enterable: false,
        "trigger-keys": [],
        "show-after": 0,
        "hide-after": __props.immediate ? 0 : void 0,
        transition: __props.immediate ? "none" : void 0,
        effect: "light",
        placement: "top"
      }, {
        default: withCtx(() => [
          createElementVNode("span", mergeProps(_ctx.$attrs, {
            ref_key: "labelRef",
            ref: labelRef,
            onMouseenter: handleMouseEnter,
            onMouseleave: handleMouseLeave
          }), toDisplayString(__props.text), 17)
        ]),
        _: 1
      }, 8, ["content", "visible", "hide-after", "transition"]);
    };
  }
});
var ElFloatLabel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "float-label.vue"]]);

export { ElFloatLabel as default };
//# sourceMappingURL=float-label.mjs.map
