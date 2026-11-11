'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var radio = require('./radio.js');
var useRadio = require('./use-radio.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');
var event = require('../../../constants/event.js');

const __default__ = vue.defineComponent({
  name: "ElRadio"
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: radio.radioProps,
  emits: radio.radioEmits,
  setup(__props, { emit }) {
    const props = __props;
    const ns = index.useNamespace("radio");
    const {
      radioRef,
      radioGroup,
      focus,
      size,
      disabled,
      error,
      modelValue,
      actualValue
    } = useRadio.useRadio(props, emit);
    function handleChange() {
      vue.nextTick(() => emit(event.CHANGE_EVENT, modelValue.value));
    }
    return (_ctx, _cache) => {
      var _a;
      return vue.openBlock(), vue.createElementBlock("label", {
        class: vue.normalizeClass([
          vue.unref(ns).b(),
          vue.unref(ns).is("disabled", vue.unref(disabled)),
          vue.unref(ns).is("error", vue.unref(error)),
          vue.unref(ns).is("focus", vue.unref(focus)),
          vue.unref(ns).is("bordered", _ctx.border),
          vue.unref(ns).is("checked", vue.unref(modelValue) === vue.unref(actualValue)),
          vue.unref(ns).m(vue.unref(size))
        ])
      }, [
        vue.createElementVNode("span", {
          class: vue.normalizeClass([
            vue.unref(ns).e("input"),
            vue.unref(ns).is("disabled", vue.unref(disabled)),
            vue.unref(ns).is("error", vue.unref(error)),
            vue.unref(ns).is("checked", vue.unref(modelValue) === vue.unref(actualValue))
          ])
        }, [
          vue.withDirectives(vue.createElementVNode("input", {
            ref_key: "radioRef",
            ref: radioRef,
            "onUpdate:modelValue": ($event) => vue.isRef(modelValue) ? modelValue.value = $event : null,
            class: vue.normalizeClass(vue.unref(ns).e("original")),
            value: vue.unref(actualValue),
            name: _ctx.name || ((_a = vue.unref(radioGroup)) == null ? void 0 : _a.name),
            disabled: vue.unref(disabled),
            checked: vue.unref(modelValue) === vue.unref(actualValue),
            type: "radio",
            onFocus: ($event) => focus.value = true,
            onBlur: ($event) => focus.value = false,
            onChange: handleChange,
            onClick: vue.withModifiers(() => {
            }, ["stop"])
          }, null, 42, ["onUpdate:modelValue", "value", "name", "disabled", "checked", "onFocus", "onBlur", "onClick"]), [
            [vue.vModelRadio, vue.unref(modelValue)]
          ]),
          vue.createElementVNode("span", {
            class: vue.normalizeClass(vue.unref(ns).e("inner"))
          }, [
            vue.unref(modelValue) === vue.unref(actualValue) ? (vue.openBlock(), vue.createElementBlock("svg", {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("check")),
              viewBox: "0 0 10.5 10.5",
              "aria-hidden": "true"
            }, [
              vue.createElementVNode("path", { d: "M3.41254 9.37345C3.26626 9.37351 3.12141 9.34471 2.98628 9.28871C2.85114 9.2327 2.72839 9.15059 2.62504 9.04707L0.192101 6.61545L1.12048 5.68751L3.41254 7.97957L9.3796 2.01251L10.308 2.94045L4.20004 9.04707C4.09669 9.15059 3.97393 9.2327 3.8388 9.28871C3.70367 9.34471 3.55882 9.37351 3.41254 9.37345Z" })
            ], 2)) : vue.createCommentVNode("v-if", true)
          ], 2)
        ], 2),
        _ctx.$slots.default || _ctx.label !== void 0 && _ctx.label !== null && _ctx.label !== "" ? (vue.openBlock(), vue.createElementBlock("span", {
          key: 0,
          class: vue.normalizeClass(vue.unref(ns).e("label")),
          onKeydown: vue.withModifiers(() => {
          }, ["stop"])
        }, [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
          ])
        ], 42, ["onKeydown"])) : vue.createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var Radio = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "radio.vue"]]);

exports["default"] = Radio;
//# sourceMappingURL=radio2.js.map
