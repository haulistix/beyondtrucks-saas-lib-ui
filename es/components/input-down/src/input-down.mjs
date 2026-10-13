import { autocompleteProps } from '../../autocomplete/src/autocomplete2.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { inputProps } from '../../input/src/input2.mjs';
import { UPDATE_MODEL_EVENT, INPUT_EVENT, CHANGE_EVENT } from '../../../constants/event.mjs';
import { isString } from '@vue/shared';
import { isNumber } from '../../../utils/types.mjs';

const inputDownProps = buildProps({
  ...inputProps,
  modelValue: {
    type: definePropType([String, Number]),
    default: ""
  },
  options: {
    type: definePropType(Array),
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
  placement: autocompleteProps.placement,
  teleported: autocompleteProps.teleported,
  appendTo: autocompleteProps.appendTo,
  popperClass: autocompleteProps.popperClass,
  popperStyle: autocompleteProps.popperStyle
});
const inputDownEmits = {
  [UPDATE_MODEL_EVENT]: (value) => isString(value) || isNumber(value),
  [INPUT_EVENT]: (value) => isString(value) || isNumber(value),
  [CHANGE_EVENT]: (value) => isString(value) || isNumber(value),
  select: (option) => typeof option === "object",
  focus: (event) => event instanceof FocusEvent,
  blur: (event) => event instanceof FocusEvent,
  clear: () => true
};

export { inputDownEmits, inputDownProps };
//# sourceMappingURL=input-down.mjs.map
