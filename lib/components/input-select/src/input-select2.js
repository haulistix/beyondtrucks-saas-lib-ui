'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('../../../utils/vue/props/runtime.js');
var shared = require('@vue/shared');

const inputSelectControlTypes = ["input", "select"];
const isInputSelectLayout = (value) => shared.isArray(value) && value.length === 2 && value.every((item) => inputSelectControlTypes.includes(item));
const inputSelectProps = runtime.buildProps({
  layout: {
    type: runtime.definePropType(Array),
    default: () => ["select", "input"],
    validator: isInputSelectLayout
  },
  leftValue: {
    type: runtime.definePropType([
      Array,
      String,
      Number,
      Boolean,
      Object
    ]),
    default: void 0
  },
  rightValue: {
    type: runtime.definePropType([
      Array,
      String,
      Number,
      Boolean,
      Object
    ]),
    default: void 0
  },
  leftProps: {
    type: runtime.definePropType(Object),
    default: () => ({})
  },
  rightProps: {
    type: runtime.definePropType(Object),
    default: () => ({})
  }
});
const inputSelectEmits = {
  "update:leftValue": (_value) => true,
  "update:rightValue": (_value) => true,
  "left-change": (_value) => true,
  "right-change": (_value) => true,
  "left-focus": (event) => event instanceof FocusEvent,
  "right-focus": (event) => event instanceof FocusEvent,
  "left-blur": (event) => event instanceof FocusEvent,
  "right-blur": (event) => event instanceof FocusEvent,
  "left-clear": () => true,
  "right-clear": () => true,
  "left-visible-change": (visible) => typeof visible === "boolean",
  "right-visible-change": (visible) => typeof visible === "boolean"
};

exports.inputSelectControlTypes = inputSelectControlTypes;
exports.inputSelectEmits = inputSelectEmits;
exports.inputSelectProps = inputSelectProps;
//# sourceMappingURL=input-select2.js.map
