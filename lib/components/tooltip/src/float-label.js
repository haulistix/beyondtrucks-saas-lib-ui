'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
var tooltip = require('./tooltip.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');

const __default__ = vue.defineComponent({
  name: "ElFloatLabel",
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: {
    text: null,
    immediate: { type: Boolean }
  },
  emits: ["before-show"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const ns = index.useNamespace("float-label");
    const labelRef = vue.ref();
    const textRef = vue.ref();
    const visible = vue.ref(false);
    let hovering = false;
    const updateOverflow = () => {
      const label = textRef.value || labelRef.value;
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
    core.useResizeObserver(labelRef, updateOverflow);
    core.useResizeObserver(textRef, updateOverflow);
    vue.watch(() => props.text, updateOverflow, { flush: "post" });
    expose({ hide: handleMouseLeave });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(tooltip["default"], {
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
        default: vue.withCtx(() => [
          vue.createElementVNode("span", vue.mergeProps(_ctx.$attrs, {
            ref_key: "labelRef",
            ref: labelRef,
            class: _ctx.$slots.labelIcon ? [vue.unref(ns).b(), vue.unref(ns).is("with-icon")] : void 0,
            onMouseenter: ($event) => !_ctx.$slots.labelIcon && handleMouseEnter(),
            onMouseleave: handleMouseLeave
          }), [
            _ctx.$slots.labelIcon ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
              vue.createElementVNode("span", {
                ref_key: "textRef",
                ref: textRef,
                class: vue.normalizeClass(vue.unref(ns).e("text")),
                onMouseenter: handleMouseEnter,
                onMouseleave: handleMouseLeave
              }, vue.toDisplayString(__props.text), 35),
              vue.createElementVNode("span", {
                class: vue.normalizeClass(vue.unref(ns).e("icon")),
                onClick: vue.withModifiers(() => {
                }, ["stop"])
              }, [
                vue.renderSlot(_ctx.$slots, "labelIcon")
              ], 10, ["onClick"])
            ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
              vue.createTextVNode(vue.toDisplayString(__props.text), 1)
            ], 64))
          ], 16, ["onMouseenter"])
        ]),
        _: 3
      }, 8, ["content", "visible", "hide-after", "transition"]);
    };
  }
});
var ElFloatLabel = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "float-label.vue"]]);

exports["default"] = ElFloatLabel;
//# sourceMappingURL=float-label.js.map
