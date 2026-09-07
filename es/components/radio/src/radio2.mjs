import { defineComponent, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, withDirectives, isRef, withModifiers, vModelRadio, createCommentVNode, renderSlot, createTextVNode, toDisplayString, nextTick } from 'vue';
import { radioProps, radioEmits } from './radio.mjs';
import { useRadio } from './use-radio.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { CHANGE_EVENT } from '../../../constants/event.mjs';

const __default__ = defineComponent({
  name: "ElRadio"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: radioProps,
  emits: radioEmits,
  setup(__props, { emit }) {
    const props = __props;
    const ns = useNamespace("radio");
    const {
      radioRef,
      radioGroup,
      focus,
      size,
      disabled,
      error,
      modelValue,
      actualValue
    } = useRadio(props, emit);
    function handleChange() {
      nextTick(() => emit(CHANGE_EVENT, modelValue.value));
    }
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("label", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).is("disabled", unref(disabled)),
          unref(ns).is("error", unref(error)),
          unref(ns).is("focus", unref(focus)),
          unref(ns).is("bordered", _ctx.border),
          unref(ns).is("checked", unref(modelValue) === unref(actualValue)),
          unref(ns).m(unref(size))
        ])
      }, [
        createElementVNode("span", {
          class: normalizeClass([
            unref(ns).e("input"),
            unref(ns).is("disabled", unref(disabled)),
            unref(ns).is("error", unref(error)),
            unref(ns).is("checked", unref(modelValue) === unref(actualValue))
          ])
        }, [
          withDirectives(createElementVNode("input", {
            ref_key: "radioRef",
            ref: radioRef,
            "onUpdate:modelValue": ($event) => isRef(modelValue) ? modelValue.value = $event : null,
            class: normalizeClass(unref(ns).e("original")),
            value: unref(actualValue),
            name: _ctx.name || ((_a = unref(radioGroup)) == null ? void 0 : _a.name),
            disabled: unref(disabled),
            checked: unref(modelValue) === unref(actualValue),
            type: "radio",
            onFocus: ($event) => focus.value = true,
            onBlur: ($event) => focus.value = false,
            onChange: handleChange,
            onClick: withModifiers(() => {
            }, ["stop"])
          }, null, 42, ["onUpdate:modelValue", "value", "name", "disabled", "checked", "onFocus", "onBlur", "onClick"]), [
            [vModelRadio, unref(modelValue)]
          ]),
          createElementVNode("span", {
            class: normalizeClass(unref(ns).e("inner"))
          }, [
            unref(modelValue) === unref(actualValue) ? (openBlock(), createElementBlock("svg", {
              key: 0,
              class: normalizeClass(unref(ns).e("check")),
              viewBox: "0 0 10.5 10.5",
              "aria-hidden": "true"
            }, [
              createElementVNode("path", { d: "M3.41254 9.37345C3.26626 9.37351 3.12141 9.34471 2.98628 9.28871C2.85114 9.2327 2.72839 9.15059 2.62504 9.04707L0.192101 6.61545L1.12048 5.68751L3.41254 7.97957L9.3796 2.01251L10.308 2.94045L4.20004 9.04707C4.09669 9.15059 3.97393 9.2327 3.8388 9.28871C3.70367 9.34471 3.55882 9.37351 3.41254 9.37345Z" })
            ], 2)) : createCommentVNode("v-if", true)
          ], 2)
        ], 2),
        _ctx.$slots.default || _ctx.label !== void 0 && _ctx.label !== null && _ctx.label !== "" ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(unref(ns).e("label")),
          onKeydown: withModifiers(() => {
          }, ["stop"])
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_ctx.label), 1)
          ])
        ], 42, ["onKeydown"])) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var Radio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "radio.vue"]]);

export { Radio as default };
//# sourceMappingURL=radio2.mjs.map
