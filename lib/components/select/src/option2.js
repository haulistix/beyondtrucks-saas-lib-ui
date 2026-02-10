'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@popperjs/core');
var runtime = require('../../../utils/vue/props/runtime.js');

const COMPONENT_NAME = "ElOption";
const optionProps = runtime.buildProps({
  value: {
    type: [String, Number, Boolean, Object],
    required: true
  },
  label: {
    type: [String, Number]
  },
  created: Boolean,
  showTip: {
    type: Boolean,
    default: true
  },
  placement: {
    type: runtime.definePropType(String),
    values: core.placements,
    default: "left"
  },
  disabled: Boolean
});

exports.COMPONENT_NAME = COMPONENT_NAME;
exports.optionProps = optionProps;
//# sourceMappingURL=option2.js.map
