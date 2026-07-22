import { defineComponent, useSlots, computed, openBlock, createBlock, resolveDynamicComponent, unref, normalizeClass, withCtx, createElementVNode, withDirectives, mergeProps, isRef, withModifiers, vModelCheckbox, createVNode, createElementBlock, createCommentVNode, renderSlot, Fragment, createTextVNode, toDisplayString } from 'vue';
import ElIcon from '../../icon/src/icon.mjs';
import { checkboxProps, checkboxEmits } from './checkbox.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useCheckbox } from './composables/use-checkbox.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const __default__ = defineComponent({
  name: "ElCheckbox"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: checkboxProps,
  emits: checkboxEmits,
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const {
      inputId,
      isLabeledByFormItem,
      isChecked,
      isDisabled,
      isFocused,
      checkboxSize,
      hasOwnLabel,
      model,
      actualValue,
      handleChange,
      onClickRoot
    } = useCheckbox(props, slots);
    const inputBindings = computed(() => {
      var _a, _b, _c, _d;
      if (props.trueValue || props.falseValue || props.trueLabel || props.falseLabel) {
        return {
          "true-value": (_b = (_a = props.trueValue) != null ? _a : props.trueLabel) != null ? _b : true,
          "false-value": (_d = (_c = props.falseValue) != null ? _c : props.falseLabel) != null ? _d : false
        };
      }
      return {
        value: actualValue.value
      };
    });
    const ns = useNamespace("checkbox");
    const iconColor = computed(() => {
      return props.isShow ? "#2a3f4d" : isChecked.value ? isDisabled.value ? "#2a3f4d" : "#fff" : "#2a3f4d";
    });
    const compKls = computed(() => {
      return [
        ns.b(),
        ns.m(checkboxSize.value),
        ns.is("disabled", isDisabled.value),
        ns.is("bordered", props.border),
        ns.is("show", props.isShow),
        ns.is("checked", isChecked.value)
      ];
    });
    const spanKls = computed(() => {
      return [
        ns.e("input"),
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("indeterminate", props.indeterminate),
        ns.is("focus", isFocused.value)
      ];
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(!unref(hasOwnLabel) && unref(isLabeledByFormItem) ? "span" : "label"), {
        class: normalizeClass(unref(compKls)),
        "aria-controls": _ctx.indeterminate ? _ctx.ariaControls : null,
        onClick: unref(onClickRoot)
      }, {
        default: withCtx(() => [
          createElementVNode("span", {
            class: normalizeClass(unref(spanKls))
          }, [
            withDirectives(createElementVNode("input", mergeProps({
              id: unref(inputId),
              "onUpdate:modelValue": ($event) => isRef(model) ? model.value = $event : null,
              class: unref(ns).e("original"),
              type: "checkbox",
              indeterminate: _ctx.indeterminate,
              name: _ctx.name,
              tabindex: _ctx.tabindex,
              disabled: unref(isDisabled)
            }, unref(inputBindings), {
              onChange: unref(handleChange),
              onFocus: ($event) => isFocused.value = true,
              onBlur: ($event) => isFocused.value = false,
              onClick: withModifiers(() => {
              }, ["stop"])
            }), null, 16, ["id", "onUpdate:modelValue", "indeterminate", "name", "tabindex", "disabled", "onChange", "onFocus", "onBlur", "onClick"]), [
              [vModelCheckbox, unref(model)]
            ]),
            createElementVNode("span", {
              class: normalizeClass(unref(ns).e("inner"))
            }, [
              createVNode(ElIcon, {
                color: unref(iconColor),
                size: "12px"
              }, {
                default: withCtx(() => [
                  unref(isChecked) && !_ctx.indeterminate ? (openBlock(), createElementBlock("svg", {
                    key: 0,
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12"
                  }, [
                    createElementVNode("path", { d: "M3.90004 10.7125C3.73287 10.7126 3.56732 10.6796 3.41289 10.6156C3.25845 10.5516 3.11816 10.4578 3.00004 10.3395L0.219543 7.56049L1.28054 6.49999L3.90004 9.11949L10.7195 2.29999L11.7805 3.36049L4.80004 10.3395C4.68193 10.4578 4.54164 10.5516 4.3872 10.6156C4.23276 10.6796 4.06722 10.7126 3.90004 10.7125Z" })
                  ])) : createCommentVNode("v-if", true)
                ]),
                _: 1
              }, 8, ["color"])
            ], 2)
          ], 2),
          unref(hasOwnLabel) ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(unref(ns).e("label"))
          }, [
            renderSlot(_ctx.$slots, "default"),
            !_ctx.$slots.default ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(_ctx.label), 1)
            ], 64)) : createCommentVNode("v-if", true)
          ], 2)) : createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 8, ["class", "aria-controls", "onClick"]);
    };
  }
});
var Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "checkbox.vue"]]);

export { Checkbox as default };
//# sourceMappingURL=checkbox2.mjs.map
