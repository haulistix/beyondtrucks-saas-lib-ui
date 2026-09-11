'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var autocomplete = require('../../autocomplete/src/autocomplete2.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var input = require('../../input/src/input2.js');
var event = require('../../../constants/event.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');

const inputDownProps = runtime.buildProps({
  ...input.inputProps,
  modelValue: {
    type: runtime.definePropType([String, Number]),
    default: ""
  },
  options: {
    type: runtime.definePropType(Array),
    default: () => []
  },
  valueKey: {
    type: String,
    default: "value"
  },
  labelKey: {
    type: String,
    default: "label"
  },
  placement: autocomplete.autocompleteProps.placement,
  teleported: autocomplete.autocompleteProps.teleported,
  appendTo: autocomplete.autocompleteProps.appendTo,
  popperClass: autocomplete.autocompleteProps.popperClass,
  popperStyle: autocomplete.autocompleteProps.popperStyle
});
const inputDownEmits = {
  [event.UPDATE_MODEL_EVENT]: (value) => shared.isString(value) || types.isNumber(value),
  [event.INPUT_EVENT]: (value) => shared.isString(value) || types.isNumber(value),
  [event.CHANGE_EVENT]: (value) => shared.isString(value) || types.isNumber(value),
  select: (option) => typeof option === "object",
  focus: (event) => event instanceof FocusEvent,
  blur: (event) => event instanceof FocusEvent,
  clear: () => true
};

exports.inputDownEmits = inputDownEmits;
exports.inputDownProps = inputDownProps;
//# sourceMappingURL=input-down.js.map
