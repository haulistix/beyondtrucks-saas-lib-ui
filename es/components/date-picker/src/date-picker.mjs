import { defineComponent, computed, provide, reactive, toRef, ref, createVNode, mergeProps, Fragment, isVNode } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import localeData from 'dayjs/plugin/localeData.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import weekYear from 'dayjs/plugin/weekYear.js';
import dayOfYear from 'dayjs/plugin/dayOfYear.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import { ElRadioGroup, ElRadioButton } from '../../radio/index.mjs';
import '../../time-picker/index.mjs';
import { ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, ROOT_PICKER_INJECTION_KEY } from './constants.mjs';
import { datePickerProps } from './props/date-picker.mjs';
import { getPanel } from './panel-utils.mjs';
import { PICKER_POPPER_OPTIONS_INJECTION_KEY, DEFAULT_FORMATS_DATEPICKER, DEFAULT_FORMATS_DATE } from '../../time-picker/src/constants.mjs';
import CommonPicker from '../../time-picker/src/common/picker.mjs';
import { UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(dayOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
var DatePicker = defineComponent({
  name: "ElDatePicker",
  install: null,
  props: datePickerProps,
  emits: [UPDATE_MODEL_EVENT],
  setup(props, {
    expose,
    emit,
    slots
  }) {
    const ns = useNamespace("picker-panel");
    const isDefaultFormat = computed(() => {
      return !props.format;
    });
    provide(ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, isDefaultFormat);
    provide(PICKER_POPPER_OPTIONS_INJECTION_KEY, reactive(toRef(props, "popperOptions")));
    provide(ROOT_PICKER_INJECTION_KEY, {
      slots,
      pickerNs: ns
    });
    const selectType = ref(props.typeList.length ? props.typeList[0].key : void 0);
    const handleRadioChange = (value) => {
      selectType.value = value;
    };
    const commonPicker = ref();
    const selectingDate = ref();
    const refProps = {
      selectType,
      focus: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.blur();
      },
      handleOpen: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.handleOpen();
      },
      handleClose: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.handleClose();
      },
      selectingDate
    };
    const getSelectingDate = (val) => {
      selectingDate.value = val;
    };
    provide("getSelectingDate", {
      getSelectingDate
    });
    expose(refProps);
    const onModelValueUpdated = (val) => {
      emit(UPDATE_MODEL_EVENT, val);
    };
    const componentType = computed(() => {
      return selectType.value || props.type;
    });
    return () => {
      var _a;
      const format = (_a = props.format) != null ? _a : DEFAULT_FORMATS_DATEPICKER[componentType.value] || DEFAULT_FORMATS_DATE;
      const Component = getPanel(componentType.value);
      return createVNode(CommonPicker, mergeProps(props, {
        "format": format,
        "type": componentType.value,
        "ref": commonPicker,
        "onUpdate:modelValue": onModelValueUpdated
      }), {
        default: (scopedProps) => {
          var _a2;
          let _slot;
          return createVNode(Fragment, null, [((_a2 = props.typeList) == null ? void 0 : _a2.length) > 0 && createVNode(ElRadioGroup, {
            "modelValue": selectType.value,
            "onChange": handleRadioChange,
            "size": "small"
          }, _isSlot(_slot = props.typeList.map((item) => createVNode(ElRadioButton, {
            "key": item.key,
            "value": item.key,
            "label": item.label,
            "class": {
              "is-active": selectType.value === item.key
            }
          }, null))) ? _slot : {
            default: () => [_slot]
          }), createVNode(Component, scopedProps, {
            "prev-month": slots["prev-month"],
            "next-month": slots["next-month"],
            "prev-year": slots["prev-year"],
            "next-year": slots["next-year"]
          })]);
        },
        "range-separator": slots["range-separator"],
        open: slots["open"]
      });
    };
  }
});

export { DatePicker as default };
//# sourceMappingURL=date-picker.mjs.map
