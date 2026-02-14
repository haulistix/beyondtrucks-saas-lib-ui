import { placements } from '@popperjs/core';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const COMPONENT_NAME = "ElOption";
const optionProps = buildProps({
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
    type: definePropType(String),
    values: placements,
    default: "left"
  },
  disabled: Boolean
});

export { COMPONENT_NAME, optionProps };
//# sourceMappingURL=option2.mjs.map
