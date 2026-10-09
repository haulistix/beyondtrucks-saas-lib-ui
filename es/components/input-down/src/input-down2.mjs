import { defineComponent, ref, computed, openBlock, createBlock, unref, mergeProps, createSlots, withCtx, renderSlot, createElementVNode, normalizeClass, createVNode, createTextVNode, toDisplayString, nextTick } from 'vue';
import { pick } from 'lodash-unified';
import { ElAutocomplete } from '../../autocomplete/index.mjs';
import { ElRadio } from '../../radio/index.mjs';
import { inputDownProps, inputDownEmits } from './input-down.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { inputProps } from '../../input/src/input2.mjs';

const __default__ = defineComponent({
  name: "ElInputDown",
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: inputDownProps,
  emits: inputDownEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const ns = useNamespace("input-down");
    const autocompleteRef = ref();
    let showAllOnFocus = false;
    const passInputProps = computed(() => pick(props, Object.keys(inputProps)));
    const mergedPopperClass = computed(() => props.popperClass ? [ns.e("popper"), props.popperClass] : ns.e("popper"));
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
      nextTick(() => {
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
      return openBlock(), createBlock(unref(ElAutocomplete), mergeProps({
        ref_key: "autocompleteRef",
        ref: autocompleteRef
      }, unref(passInputProps), {
        class: [unref(ns).b(), _ctx.$attrs.class],
        style: _ctx.$attrs.style,
        "model-value": _ctx.modelValue,
        "fetch-suggestions": querySearch,
        "value-key": _ctx.valueKey,
        placement: _ctx.placement,
        teleported: _ctx.teleported,
        "append-to": _ctx.appendTo,
        "popper-class": unref(mergedPopperClass),
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
      }), createSlots({
        default: withCtx(({ item }) => [
          renderSlot(_ctx.$slots, "option", {
            item,
            selected: isSelected(item)
          }, () => [
            createElementVNode("div", {
              class: normalizeClass([unref(ns).e("option"), unref(ns).is("selected", isSelected(item))])
            }, [
              createVNode(unref(ElRadio), {
                "model-value": isSelected(item) ? getOptionValue(item) : void 0,
                value: getOptionValue(item),
                "aria-hidden": "true",
                tabindex: "-1"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(getOptionLabel(item)), 1)
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
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prepend")
          ])
        } : void 0,
        _ctx.$slots.append ? {
          name: "append",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "append")
          ])
        } : void 0,
        _ctx.$slots.prefix ? {
          name: "prefix",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prefix")
          ])
        } : void 0,
        _ctx.$slots.suffix ? {
          name: "suffix",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "suffix")
          ])
        } : void 0
      ]), 1040, ["class", "style", "model-value", "value-key", "placement", "teleported", "append-to", "popper-class", "popper-style"]);
    };
  }
});
var InputDown = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "input-down.vue"]]);

export { InputDown as default };
//# sourceMappingURL=input-down2.mjs.map
