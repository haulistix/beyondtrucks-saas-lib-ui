'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var button = require('../../../button/src/button.js');
var index$1 = require('../../../icon/index.js');
var utils = require('../utils.js');
var panelMonthRange = require('../props/panel-month-range.js');
var useMonthRangeHeader = require('../composables/use-month-range-header.js');
var useRangePicker = require('../composables/use-range-picker.js');
var constants$1 = require('../constants.js');
var basicMonthTable = require('./basic-month-table.js');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../../hooks/use-locale/index.js');
var constants = require('../../../time-picker/src/constants.js');
var shared = require('@vue/shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

const unit = "year";
const __default__ = vue.defineComponent({
  name: "DatePickerMonthRange"
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: panelMonthRange.panelMonthRangeProps,
  emits: panelMonthRange.panelMonthRangeEmits,
  setup(__props, { emit }) {
    const props = __props;
    const { lang } = index.useLocale();
    const pickerBase = vue.inject(constants.PICKER_BASE_INJECTION_KEY);
    const isDefaultFormat = vue.inject(constants$1.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY);
    const { shortcuts, disabledDate } = pickerBase.props;
    const format = vue.toRef(pickerBase.props, "format");
    const defaultValue = vue.toRef(pickerBase.props, "defaultValue");
    const leftDate = vue.ref(dayjs__default["default"]().locale(lang.value));
    const rightDate = vue.ref(dayjs__default["default"]().locale(lang.value).add(1, unit));
    const {
      minDate,
      maxDate,
      rangeState,
      ppNs,
      drpNs,
      handleChangeRange,
      handleRangeConfirm,
      handleShortcutClick,
      onSelect,
      onReset
    } = useRangePicker.useRangePicker(props, {
      defaultValue,
      leftDate,
      rightDate,
      unit,
      onParsedValueChanged
    });
    const hasShortcuts = vue.computed(() => !!shortcuts.length);
    const {
      leftPrevYear,
      rightNextYear,
      leftNextYear,
      rightPrevYear,
      leftLabel,
      rightLabel,
      leftYear,
      rightYear
    } = useMonthRangeHeader.useMonthRangeHeader({
      unlinkPanels: vue.toRef(props, "unlinkPanels"),
      leftDate,
      rightDate
    });
    const enableYearArrow = vue.computed(() => {
      return props.unlinkPanels && rightYear.value > leftYear.value + 1;
    });
    const handleRangePick = (val, close = true) => {
      const minDate_ = val.minDate;
      const maxDate_ = val.maxDate;
      if (maxDate.value === maxDate_ && minDate.value === minDate_) {
        return;
      }
      emit("calendar-change", [minDate_.toDate(), maxDate_ && maxDate_.toDate()]);
      maxDate.value = maxDate_;
      minDate.value = minDate_;
      if (!close)
        return;
      handleRangeConfirm();
    };
    const handleClear = () => {
      let valueOnClear = null;
      if (pickerBase == null ? void 0 : pickerBase.emptyValues) {
        valueOnClear = pickerBase.emptyValues.valueOnClear.value;
      }
      leftDate.value = utils.getDefaultValue(vue.unref(defaultValue), {
        lang: vue.unref(lang),
        unit: "year",
        unlinkPanels: props.unlinkPanels
      })[0];
      rightDate.value = leftDate.value.add(1, "year");
      emit("pick", valueOnClear);
    };
    const formatToString = (value) => {
      return shared.isArray(value) ? value.map((_) => _.format(format.value)) : value.format(format.value);
    };
    const parseUserInput = (value) => {
      return utils.correctlyParseUserInput(value, format.value, lang.value, isDefaultFormat);
    };
    function onParsedValueChanged(minDate2, maxDate2) {
      if (props.unlinkPanels && maxDate2) {
        const minDateYear = (minDate2 == null ? void 0 : minDate2.year()) || 0;
        const maxDateYear = maxDate2.year();
        rightDate.value = minDateYear === maxDateYear ? maxDate2.add(1, unit) : maxDate2;
      } else {
        rightDate.value = leftDate.value.add(1, unit);
      }
    }
    vue.watch(() => props.visible, (visible) => {
      if (!visible && rangeState.value.selecting) {
        onReset(props.parsedValue);
        onSelect(false);
      }
    });
    emit("set-picker-option", ["isValidValue", utils.isValidRange]);
    emit("set-picker-option", ["formatToString", formatToString]);
    emit("set-picker-option", ["parseUserInput", parseUserInput]);
    emit("set-picker-option", ["handleClear", handleClear]);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass([
          vue.unref(ppNs).b(),
          vue.unref(drpNs).b(),
          {
            "has-sidebar": Boolean(_ctx.$slots.sidebar) || vue.unref(hasShortcuts)
          }
        ])
      }, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(vue.unref(ppNs).e("body-wrapper"))
        }, [
          vue.renderSlot(_ctx.$slots, "sidebar", {
            class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
          }),
          vue.unref(hasShortcuts) ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(shortcuts), (shortcut, key) => {
              return vue.openBlock(), vue.createElementBlock("button", {
                key,
                type: "button",
                class: vue.normalizeClass(vue.unref(ppNs).e("shortcut")),
                onClick: ($event) => vue.unref(handleShortcutClick)(shortcut)
              }, vue.toDisplayString(shortcut.text), 11, ["onClick"]);
            }), 128))
          ], 2)) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(ppNs).e("body"))
          }, [
            vue.createElementVNode("div", {
              class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-left"])
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(drpNs).e("header"))
              }, [
                vue.createVNode(button["default"], {
                  text: "",
                  class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-left icon-button"]),
                  onClick: vue.unref(leftPrevYear)
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "prev-year", {}, () => [
                      vue.createVNode(vue.unref(index$1.ElIcon), {
                        size: "16px",
                        color: "#374957"
                      }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(), vue.createElementBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "17",
                            height: "16",
                            viewBox: "0 0 17 16"
                          }, [
                            vue.createElementVNode("path", { d: "M7.95949 4.47147L7.01683 3.52881L3.48816 7.05747C3.2382 7.30751 3.09778 7.64659 3.09778 8.00014C3.09778 8.35369 3.2382 8.69277 3.48816 8.94281L7.01683 12.4715L7.95949 11.5288L4.43349 8.00014L7.95949 4.47147Z" }),
                            vue.createElementVNode("path", { d: "M12.6259 4.47147L11.6833 3.52881L7.68329 7.52881C7.55831 7.65383 7.4881 7.82337 7.4881 8.00014C7.4881 8.17692 7.55831 8.34646 7.68329 8.47147L11.6833 12.4715L12.6259 11.5288L9.09995 8.00014L12.6259 4.47147Z" })
                          ]))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["class", "onClick"]),
                _ctx.unlinkPanels ? (vue.openBlock(), vue.createBlock(button["default"], {
                  key: 0,
                  text: "",
                  disabled: !vue.unref(enableYearArrow),
                  class: vue.normalizeClass([[
                    vue.unref(ppNs).e("icon-btn"),
                    vue.unref(ppNs).is("disabled", !vue.unref(enableYearArrow))
                  ], "d-arrow-right icon-button"]),
                  onClick: vue.unref(leftNextYear)
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "next-year", {}, () => [
                      vue.createVNode(vue.unref(index$1.ElIcon), { size: "16px" }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(), vue.createElementBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "17",
                            height: "16",
                            viewBox: "0 0 17 16"
                          }, [
                            vue.createElementVNode("path", { d: "M13.2334 7.05747L9.70742 3.52881L8.76675 4.47147L12.2927 8.00014L8.76675 11.5288L9.71009 12.4715L13.2334 8.94281C13.4834 8.69277 13.6238 8.35369 13.6238 8.00014C13.6238 7.64659 13.4834 7.30751 13.2334 7.05747Z" }),
                            vue.createElementVNode("path", { d: "M9.04055 7.52881L5.04055 3.52881L4.09988 4.47147L7.62588 8.00014L4.09988 11.5288L5.04322 12.4715L9.04322 8.47147C9.16784 8.3461 9.23758 8.17637 9.23708 7.99959C9.23658 7.82281 9.16589 7.65347 9.04055 7.52881Z" })
                          ]))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled", "class", "onClick"])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", null, vue.toDisplayString(vue.unref(leftLabel)), 1)
              ], 2),
              vue.createVNode(basicMonthTable["default"], {
                "selection-mode": "range",
                date: leftDate.value,
                "min-date": vue.unref(minDate),
                "max-date": vue.unref(maxDate),
                "range-state": vue.unref(rangeState),
                "disabled-date": vue.unref(disabledDate),
                onChangerange: vue.unref(handleChangeRange),
                onPick: handleRangePick,
                onSelect: vue.unref(onSelect)
              }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
            ], 2),
            vue.createElementVNode("div", {
              class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-right"])
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(drpNs).e("header"))
              }, [
                _ctx.unlinkPanels ? (vue.openBlock(), vue.createBlock(button["default"], {
                  key: 0,
                  text: "",
                  disabled: !vue.unref(enableYearArrow),
                  class: vue.normalizeClass([[vue.unref(ppNs).e("icon-btn"), { "is-disabled": !vue.unref(enableYearArrow) }], "d-arrow-left icon-button"]),
                  onClick: vue.unref(rightPrevYear)
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "prev-year", {}, () => [
                      vue.createVNode(vue.unref(index$1.ElIcon), {
                        size: "16px",
                        color: "#374957"
                      }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(), vue.createElementBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "17",
                            height: "16",
                            viewBox: "0 0 17 16"
                          }, [
                            vue.createElementVNode("path", { d: "M7.95949 4.47147L7.01683 3.52881L3.48816 7.05747C3.2382 7.30751 3.09778 7.64659 3.09778 8.00014C3.09778 8.35369 3.2382 8.69277 3.48816 8.94281L7.01683 12.4715L7.95949 11.5288L4.43349 8.00014L7.95949 4.47147Z" }),
                            vue.createElementVNode("path", { d: "M12.6259 4.47147L11.6833 3.52881L7.68329 7.52881C7.55831 7.65383 7.4881 7.82337 7.4881 8.00014C7.4881 8.17692 7.55831 8.34646 7.68329 8.47147L11.6833 12.4715L12.6259 11.5288L9.09995 8.00014L12.6259 4.47147Z" })
                          ]))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled", "class", "onClick"])) : vue.createCommentVNode("v-if", true),
                vue.createVNode(button["default"], {
                  text: "",
                  class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-right icon-button"]),
                  onClick: vue.unref(rightNextYear)
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "next-year", {}, () => [
                      vue.createVNode(vue.unref(index$1.ElIcon), { size: "16px" }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(), vue.createElementBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "17",
                            height: "16",
                            viewBox: "0 0 17 16"
                          }, [
                            vue.createElementVNode("path", { d: "M13.2334 7.05747L9.70742 3.52881L8.76675 4.47147L12.2927 8.00014L8.76675 11.5288L9.71009 12.4715L13.2334 8.94281C13.4834 8.69277 13.6238 8.35369 13.6238 8.00014C13.6238 7.64659 13.4834 7.30751 13.2334 7.05747Z" }),
                            vue.createElementVNode("path", { d: "M9.04055 7.52881L5.04055 3.52881L4.09988 4.47147L7.62588 8.00014L4.09988 11.5288L5.04322 12.4715L9.04322 8.47147C9.16784 8.3461 9.23758 8.17637 9.23708 7.99959C9.23658 7.82281 9.16589 7.65347 9.04055 7.52881Z" })
                          ]))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["class", "onClick"]),
                vue.createElementVNode("div", null, vue.toDisplayString(vue.unref(rightLabel)), 1)
              ], 2),
              vue.createVNode(basicMonthTable["default"], {
                "selection-mode": "range",
                date: rightDate.value,
                "min-date": vue.unref(minDate),
                "max-date": vue.unref(maxDate),
                "range-state": vue.unref(rangeState),
                "disabled-date": vue.unref(disabledDate),
                onChangerange: vue.unref(handleChangeRange),
                onPick: handleRangePick,
                onSelect: vue.unref(onSelect)
              }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
            ], 2)
          ], 2)
        ], 2)
      ], 2);
    };
  }
});
var MonthRangePickPanel = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "panel-month-range.vue"]]);

exports["default"] = MonthRangePickPanel;
//# sourceMappingURL=panel-month-range.js.map
