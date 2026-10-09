'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var lodashUnified = require('lodash-unified');
var index$1 = require('../../autocomplete/index.js');
var index$2 = require('../../radio/index.js');
var inputDown = require('./input-down.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');
var input = require('../../input/src/input2.js');

const __default__ = vue.defineComponent({
  name: "ElInputDown",
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: inputDown.inputDownProps,
  emits: inputDown.inputDownEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const ns = index.useNamespace("input-down");
    const autocompleteRef = vue.ref();
    let showAllOnFocus = false;
    const passInputProps = vue.computed(() => lodashUnified.pick(props, Object.keys(input.inputProps)));
    const mergedPopperClass = vue.computed(() => props.popperClass ? [ns.e("popper"), props.popperClass] : ns.e("popper"));
    const getOptionValue = (option) => option[props.valueKey];
    const getOptionLabel = (option) => {
      var _a, _b;
      return String((_b = (_a = option[props.labelKey]) != null ? _a : getOptionValue(option)) != null ? _b : "");
    };
    const isSelected = (option) => String(getOptionValue(option)) === String(props.modelValue);
    const querySearch = (query, callback) => {
      if (showAllOnFocus) {
        showAllOnFocus = false;
        callback(props.options);
        return;
      }
      const keyword = query.trim().toLocaleLowerCase();
      if (!keyword) {
        callback(props.options);
        return;
      }
      callback(props.options.filter((option) => {
        const label = getOptionLabel(option).toLocaleLowerCase();
        const value = String(getOptionValue(option)).toLocaleLowerCase();
        return label.includes(keyword) || value.includes(keyword);
      }));
    };
    const handleUpdate = (value) => emit("update:modelValue", value);
    const handleInput = (value) => {
      showAllOnFocus = false;
      emit("input", value);
    };
    const handleChange = (value) => emit("change", value);
    const handleFocus = (event) => {
      showAllOnFocus = true;
      emit("focus", event);
    };
    const handleBlur = (event) => {
      showAllOnFocus = false;
      emit("blur", event);
    };
    const handleClear = () => {
      emit("clear");
    };
    const handleSelect = (option) => {
      showAllOnFocus = false;
      emit("select", option);
      vue.nextTick(() => {
        var _a, _b;
        (_a = autocompleteRef.value) == null ? void 0 : _a.close();
        (_b = autocompleteRef.value) == null ? void 0 : _b.getData("");
      });
    };
    const focus = () => {
      var _a;
      return (_a = autocompleteRef.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      return (_a = autocompleteRef.value) == null ? void 0 : _a.blur();
    };
    const close = () => {
      var _a;
      (_a = autocompleteRef.value) == null ? void 0 : _a.close();
    };
    expose({
      autocompleteRef,
      focus,
      blur,
      close
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index$1.ElAutocomplete), vue.mergeProps({
        ref_key: "autocompleteRef",
        ref: autocompleteRef
      }, vue.unref(passInputProps), {
        class: [vue.unref(ns).b(), _ctx.$attrs.class],
        style: _ctx.$attrs.style,
        "model-value": _ctx.modelValue,
        "fetch-suggestions": querySearch,
        "value-key": _ctx.valueKey,
        placement: _ctx.placement,
        teleported: _ctx.teleported,
        "append-to": _ctx.appendTo,
        "popper-class": vue.unref(mergedPopperClass),
        "popper-style": _ctx.popperStyle,
        debounce: 0,
        "is-clear": false,
        "fit-input-width": "",
        "onUpdate:modelValue": handleUpdate,
        onInput: handleInput,
        onChange: handleChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onClear: handleClear,
        onSelect: handleSelect
      }), vue.createSlots({
        default: vue.withCtx(({ item }) => [
          vue.renderSlot(_ctx.$slots, "option", {
            item,
            selected: isSelected(item)
          }, () => [
            vue.createElementVNode("div", {
              class: vue.normalizeClass([vue.unref(ns).e("option"), vue.unref(ns).is("selected", isSelected(item))])
            }, [
              vue.createVNode(vue.unref(index$2.ElRadio), {
                "model-value": isSelected(item) ? getOptionValue(item) : void 0,
                value: getOptionValue(item),
                "aria-hidden": "true",
                tabindex: "-1"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(getOptionLabel(item)), 1)
                ]),
                _: 2
              }, 1032, ["model-value", "value"])
            ], 2)
          ])
        ]),
        _: 2
      }, [
        _ctx.$slots.prepend ? {
          name: "prepend",
          fn: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "prepend")
          ])
        } : void 0,
        _ctx.$slots.append ? {
          name: "append",
          fn: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "append")
          ])
        } : void 0,
        _ctx.$slots.prefix ? {
          name: "prefix",
          fn: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "prefix")
          ])
        } : void 0,
        _ctx.$slots.suffix ? {
          name: "suffix",
          fn: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "suffix")
          ])
        } : void 0
      ]), 1040, ["class", "style", "model-value", "value-key", "placement", "teleported", "append-to", "popper-class", "popper-style"]);
    };
  }
});
var InputDown = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "input-down.vue"]]);

exports["default"] = InputDown;
//# sourceMappingURL=input-down2.js.map
