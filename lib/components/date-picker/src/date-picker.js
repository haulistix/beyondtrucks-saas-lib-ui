'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat.js');
var advancedFormat = require('dayjs/plugin/advancedFormat.js');
var localeData = require('dayjs/plugin/localeData.js');
var weekOfYear = require('dayjs/plugin/weekOfYear.js');
var weekYear = require('dayjs/plugin/weekYear.js');
var dayOfYear = require('dayjs/plugin/dayOfYear.js');
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter.js');
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore.js');
var index$1 = require('../../radio/index.js');
require('../../time-picker/index.js');
var constants = require('./constants.js');
var datePicker = require('./props/date-picker.js');
var panelUtils = require('./panel-utils.js');
var constants$1 = require('../../time-picker/src/constants.js');
var picker = require('../../time-picker/src/common/picker.js');
var event = require('../../../constants/event.js');
var index = require('../../../hooks/use-namespace/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
var customParseFormat__default = /*#__PURE__*/_interopDefaultLegacy(customParseFormat);
var advancedFormat__default = /*#__PURE__*/_interopDefaultLegacy(advancedFormat);
var localeData__default = /*#__PURE__*/_interopDefaultLegacy(localeData);
var weekOfYear__default = /*#__PURE__*/_interopDefaultLegacy(weekOfYear);
var weekYear__default = /*#__PURE__*/_interopDefaultLegacy(weekYear);
var dayOfYear__default = /*#__PURE__*/_interopDefaultLegacy(dayOfYear);
var isSameOrAfter__default = /*#__PURE__*/_interopDefaultLegacy(isSameOrAfter);
var isSameOrBefore__default = /*#__PURE__*/_interopDefaultLegacy(isSameOrBefore);

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
dayjs__default["default"].extend(localeData__default["default"]);
dayjs__default["default"].extend(advancedFormat__default["default"]);
dayjs__default["default"].extend(customParseFormat__default["default"]);
dayjs__default["default"].extend(weekOfYear__default["default"]);
dayjs__default["default"].extend(weekYear__default["default"]);
dayjs__default["default"].extend(dayOfYear__default["default"]);
dayjs__default["default"].extend(isSameOrAfter__default["default"]);
dayjs__default["default"].extend(isSameOrBefore__default["default"]);
var DatePicker = vue.defineComponent({
  name: "ElDatePicker",
  install: null,
  props: datePicker.datePickerProps,
  emits: [event.UPDATE_MODEL_EVENT],
  setup(props, {
    expose,
    emit,
    slots
  }) {
    const ns = index.useNamespace("picker-panel");
    const isDefaultFormat = vue.computed(() => {
      return !props.format;
    });
    vue.provide(constants.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, isDefaultFormat);
    vue.provide(constants$1.PICKER_POPPER_OPTIONS_INJECTION_KEY, vue.reactive(vue.toRef(props, "popperOptions")));
    vue.provide(constants.ROOT_PICKER_INJECTION_KEY, {
      slots,
      pickerNs: ns
    });
    const selectType = vue.ref(props.typeList.length ? props.typeList[0].key : void 0);
    const handleRadioChange = (value) => {
      selectType.value = value;
    };
    const commonPicker = vue.ref();
    const selectingDate = vue.ref();
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
    vue.provide("getSelectingDate", {
      getSelectingDate
    });
    expose(refProps);
    const onModelValueUpdated = (val) => {
      emit(event.UPDATE_MODEL_EVENT, val);
    };
    const componentType = vue.computed(() => {
      return selectType.value || props.type;
    });
    return () => {
      var _a;
      const format = (_a = props.format) != null ? _a : constants$1.DEFAULT_FORMATS_DATEPICKER[componentType.value] || constants$1.DEFAULT_FORMATS_DATE;
      const Component = panelUtils.getPanel(componentType.value);
      return vue.createVNode(picker["default"], vue.mergeProps(props, {
        "format": format,
        "type": componentType.value,
        "ref": commonPicker,
        "onUpdate:modelValue": onModelValueUpdated
      }), {
        default: (scopedProps) => {
          var _a2;
          let _slot;
          return vue.createVNode(vue.Fragment, null, [((_a2 = props.typeList) == null ? void 0 : _a2.length) > 0 && vue.createVNode(index$1.ElRadioGroup, {
            "modelValue": selectType.value,
            "onChange": handleRadioChange,
            "size": "small"
          }, _isSlot(_slot = props.typeList.map((item) => vue.createVNode(index$1.ElRadioButton, {
            "key": item.key,
            "value": item.key,
            "label": item.label,
            "class": {
              "is-active": selectType.value === item.key
            }
          }, null))) ? _slot : {
            default: () => [_slot]
          }), vue.createVNode(Component, scopedProps, {
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

exports["default"] = DatePicker;
//# sourceMappingURL=date-picker.js.map
