'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../input/index.js');
var index$2 = require('../../select/index.js');
var inputSelect = require('./input-select2.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  name: "ElInputSelect",
  inheritAttrs: false,
  props: inputSelect.inputSelectProps,
  emits: inputSelect.inputSelectEmits,
  setup(props, { attrs, slots, emit, expose }) {
    const ns = index.useNamespace("input-select");
    const leftRef = vue.ref();
    const rightRef = vue.ref();
    const getControlSlots = (side) => {
      const prefix = `${side}-`;
      return Object.entries(slots).reduce((controlSlots, [name, slot]) => {
        if (name.startsWith(prefix) && slot) {
          controlSlots[name.slice(prefix.length)] = slot;
        }
        return controlSlots;
      }, {});
    };
    const updateValue = (side, value) => {
      if (side === "left")
        emit("update:leftValue", value);
      else
        emit("update:rightValue", value);
    };
    const handleChange = (side, value) => {
      if (side === "left")
        emit("left-change", value);
      else
        emit("right-change", value);
    };
    const handleFocus = (side, event) => {
      if (side === "left")
        emit("left-focus", event);
      else
        emit("right-focus", event);
    };
    const handleBlur = (side, event) => {
      if (side === "left")
        emit("left-blur", event);
      else
        emit("right-blur", event);
    };
    const handleClear = (side) => {
      if (side === "left")
        emit("left-clear");
      else
        emit("right-clear");
    };
    const handleVisibleChange = (side, visible) => {
      if (side === "left")
        emit("left-visible-change", visible);
      else
        emit("right-visible-change", visible);
    };
    const renderControl = (side, control) => {
      const isLeft = side === "left";
      const controlProps = isLeft ? props.leftProps : props.rightProps;
      const modelValue = isLeft ? props.leftValue : props.rightValue;
      const component = control === "input" ? index$1.ElInput : index$2.ElSelect;
      const controlRef = isLeft ? leftRef : rightRef;
      const listeners = control === "select" ? {
        onVisibleChange: (visible) => handleVisibleChange(side, visible)
      } : {};
      return vue.createVNode(component, {
        ...controlProps,
        ...listeners,
        key: `${side}-${control}`,
        ref: controlRef,
        class: [
          ns.e("control"),
          ns.is(side),
          controlProps == null ? void 0 : controlProps.class
        ],
        modelValue,
        "onUpdate:modelValue": (value) => updateValue(side, value),
        onChange: (value) => handleChange(side, value),
        onFocus: (event) => handleFocus(side, event),
        onBlur: (event) => handleBlur(side, event),
        onClear: () => handleClear(side)
      }, getControlSlots(side));
    };
    const focus = (side = "left") => {
      var _a, _b;
      const controlRef = side === "left" ? leftRef : rightRef;
      (_b = (_a = controlRef.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    };
    const blur = (side = "left") => {
      var _a, _b;
      const controlRef = side === "left" ? leftRef : rightRef;
      (_b = (_a = controlRef.value) == null ? void 0 : _a.blur) == null ? void 0 : _b.call(_a);
    };
    expose({
      leftRef,
      rightRef,
      focus,
      blur
    });
    return () => vue.h("div", {
      ...attrs,
      class: [ns.b(), attrs.class],
      "data-layout": props.layout.join("-")
    }, [
      renderControl("left", props.layout[0]),
      renderControl("right", props.layout[1])
    ]);
  }
});
var InputSelect = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "input-select.vue"]]);

exports["default"] = InputSelect;
//# sourceMappingURL=input-select.js.map
