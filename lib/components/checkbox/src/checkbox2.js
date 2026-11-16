'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var icon = require('../../icon/src/icon2.js');
var checkbox = require('./checkbox.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var useCheckbox = require('./composables/use-checkbox.js');
var index = require('../../../hooks/use-namespace/index.js');

const __default__ = vue.defineComponent({
  name: "ElCheckbox"
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: checkbox.checkboxProps,
  emits: checkbox.checkboxEmits,
  setup(__props) {
    const props = __props;
    const slots = vue.useSlots();
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
    } = useCheckbox.useCheckbox(props, slots);
    const inputBindings = vue.computed(() => {
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
    const ns = index.useNamespace("checkbox");
    const iconColor = vue.computed(() => {
      return props.isShow ? "#2a3f4d" : isChecked.value ? isDisabled.value ? "#2a3f4d" : "#fff" : "#2a3f4d";
    });
    const compKls = vue.computed(() => {
      return [
        ns.b(),
        ns.m(checkboxSize.value),
        ns.is("disabled", isDisabled.value),
        ns.is("bordered", props.border),
        ns.is("show", props.isShow),
        ns.is("checked", isChecked.value)
      ];
    });
    const spanKls = vue.computed(() => {
      return [
        ns.e("input"),
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("indeterminate", props.indeterminate),
        ns.is("focus", isFocused.value)
      ];
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(!vue.unref(hasOwnLabel) && vue.unref(isLabeledByFormItem) ? "span" : "label"), {
        class: vue.normalizeClass(vue.unref(compKls)),
        "aria-controls": _ctx.indeterminate ? _ctx.ariaControls : null,
        onClick: vue.unref(onClickRoot)
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("span", {
            class: vue.normalizeClass(vue.unref(spanKls))
          }, [
            vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
              id: vue.unref(inputId),
              "onUpdate:modelValue": ($event) => vue.isRef(model) ? model.value = $event : null,
              class: vue.unref(ns).e("original"),
              type: "checkbox",
              indeterminate: _ctx.indeterminate,
              name: _ctx.name,
              tabindex: _ctx.tabindex,
              disabled: vue.unref(isDisabled)
            }, vue.unref(inputBindings), {
              onChange: vue.unref(handleChange),
              onFocus: ($event) => isFocused.value = true,
              onBlur: ($event) => isFocused.value = false,
              onClick: vue.withModifiers(() => {
              }, ["stop"])
            }), null, 16, ["id", "onUpdate:modelValue", "indeterminate", "name", "tabindex", "disabled", "onChange", "onFocus", "onBlur", "onClick"]), [
              [vue.vModelCheckbox, vue.unref(model)]
            ]),
            vue.createElementVNode("span", {
              class: vue.normalizeClass(vue.unref(ns).e("inner"))
            }, [
              vue.createVNode(icon["default"], {
                color: vue.unref(iconColor),
                size: "12px"
              }, {
                default: vue.withCtx(() => [
                  vue.unref(isChecked) && !_ctx.indeterminate ? (vue.openBlock(), vue.createElementBlock("svg", {
                    key: 0,
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12"
                  }, [
                    vue.createElementVNode("path", { d: "M3.90004 10.7125C3.73287 10.7126 3.56732 10.6796 3.41289 10.6156C3.25845 10.5516 3.11816 10.4578 3.00004 10.3395L0.219543 7.56049L1.28054 6.49999L3.90004 9.11949L10.7195 2.29999L11.7805 3.36049L4.80004 10.3395C4.68193 10.4578 4.54164 10.5516 4.3872 10.6156C4.23276 10.6796 4.06722 10.7126 3.90004 10.7125Z" })
                  ])) : vue.createCommentVNode("v-if", true)
                ]),
                _: 1
              }, 8, ["color"])
            ], 2)
          ], 2),
          vue.unref(hasOwnLabel) ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            class: vue.normalizeClass(vue.unref(ns).e("label"))
          }, [
            vue.renderSlot(_ctx.$slots, "default"),
            !_ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
              vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
            ], 64)) : vue.createCommentVNode("v-if", true)
          ], 2)) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 8, ["class", "aria-controls", "onClick"]);
    };
  }
});
var Checkbox = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "checkbox.vue"]]);

exports["default"] = Checkbox;
//# sourceMappingURL=checkbox2.js.map
