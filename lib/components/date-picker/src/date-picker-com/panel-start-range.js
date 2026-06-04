'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var index$1 = require('../../../button/index.js');
var index$2 = require('../../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var panelDateRange = require('../props/panel-date-range.js');
var useRangePicker = require('../composables/use-range-picker.js');
var utils = require('../utils.js');
var usePanelDateRange = require('../composables/use-panel-date-range.js');
var constants$1 = require('../constants.js');
var basicYearTable = require('./basic-year-table.js');
var basicMonthTable = require('./basic-month-table.js');
var basicDateTable = require('./basic-date-table.js');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');
var constants = require('../../../time-picker/src/constants.js');
var index = require('../../../../hooks/use-locale/index.js');
var shared = require('@vue/shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

const unit = "month";
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "panel-start-range",
  props: panelDateRange.panelDateRangeProps,
  emits: [
    "pick",
    "set-picker-option",
    "calendar-change",
    "panel-change"
  ],
  setup(__props, { emit }) {
    const props = __props;
    const pickerBase = vue.inject(constants.PICKER_BASE_INJECTION_KEY);
    const isDefaultFormat = vue.inject(constants$1.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY);
    const {
      disabledDate: baseDisabledDate,
      cellClassName,
      defaultTime,
      clearable
    } = pickerBase.props;
    const format = vue.toRef(pickerBase.props, "format");
    const defaultValue = vue.toRef(pickerBase.props, "defaultValue");
    const showFooter = vue.toRef(pickerBase.props, "showFooter");
    const { lang } = index.useLocale();
    const leftDate = vue.ref(dayjs__default["default"]().locale(lang.value));
    const rightDate = vue.ref(dayjs__default["default"]().locale(lang.value).add(1, unit));
    const { minDate, maxDate, rangeState, ppNs, drpNs, t, handleChangeRange } = useRangePicker.useRangePicker(props, {
      defaultValue,
      defaultTime,
      leftDate,
      rightDate,
      unit,
      onParsedValueChanged
    });
    const leftLabel = vue.computed(() => {
      return `${t(`el.datepicker.month${leftDate.value.month() + 1}`)} ${leftDate.value.year()} ${t("el.datepicker.year")}`;
    });
    const rightLabel = vue.computed(() => {
      return `${t(`el.datepicker.month${rightDate.value.month() + 1}`)} ${rightDate.value.year()} ${t("el.datepicker.year")}`;
    });
    const displayedDate = vue.computed(() => {
      var _a;
      return (_a = minDate.value) != null ? _a : maxDate.value;
    });
    const displayMinDate = vue.computed(() => {
      if (rangeState.value.selecting && maxDate.value && rangeState.value.endDate) {
        return maxDate.value;
      }
      return minDate.value && maxDate.value ? minDate.value : void 0;
    });
    const displayMaxDate = vue.computed(() => {
      if (rangeState.value.selecting && maxDate.value && rangeState.value.endDate) {
        return rangeState.value.endDate;
      }
      return minDate.value && maxDate.value ? maxDate.value : void 0;
    });
    const {
      leftCurrentView,
      rightCurrentView,
      leftCurrentViewRef,
      rightCurrentViewRef,
      leftYear,
      rightYear,
      leftMonth,
      rightMonth,
      handleLeftYearPick,
      handleRightYearPick,
      handleLeftMonthPick,
      handleRightMonthPick,
      handlePanelChange,
      adjustDateByView
    } = usePanelDateRange.usePanelDateRange(props, emit, leftDate, rightDate);
    const isValidValue = (date) => {
      return utils.isValidPartialRange(date, baseDisabledDate);
    };
    const disabledDate = (date) => {
      if (baseDisabledDate == null ? void 0 : baseDisabledDate(date))
        return true;
      return !!maxDate.value && dayjs__default["default"](date).isAfter(maxDate.value, "day");
    };
    const leftPrevYear = () => {
      leftDate.value = adjustDateByView(leftCurrentView.value, leftDate.value, false);
      if (!props.unlinkPanels) {
        rightDate.value = leftDate.value.add(1, "month");
      }
      handlePanelChange("year");
    };
    const leftPrevMonth = () => {
      leftDate.value = leftDate.value.subtract(1, "month");
      if (!props.unlinkPanels) {
        rightDate.value = leftDate.value.add(1, "month");
      }
      handlePanelChange("month");
    };
    const rightNextYear = () => {
      if (!props.unlinkPanels) {
        leftDate.value = adjustDateByView(rightCurrentView.value, leftDate.value, true);
        rightDate.value = leftDate.value.add(1, "month");
      } else {
        rightDate.value = adjustDateByView(rightCurrentView.value, rightDate.value, true);
      }
      handlePanelChange("year");
    };
    const rightNextMonth = () => {
      if (!props.unlinkPanels) {
        leftDate.value = leftDate.value.add(1, "month");
        rightDate.value = leftDate.value.add(1, "month");
      } else {
        rightDate.value = rightDate.value.add(1, "month");
      }
      handlePanelChange("month");
    };
    const leftNextYear = () => {
      leftDate.value = adjustDateByView(leftCurrentView.value, leftDate.value, true);
      handlePanelChange("year");
    };
    const leftNextMonth = () => {
      leftDate.value = leftDate.value.add(1, "month");
      handlePanelChange("month");
    };
    const rightPrevYear = () => {
      rightDate.value = adjustDateByView(rightCurrentView.value, rightDate.value, false);
      handlePanelChange("year");
    };
    const rightPrevMonth = () => {
      rightDate.value = rightDate.value.subtract(1, "month");
      handlePanelChange("month");
    };
    const enableMonthArrow = vue.computed(() => {
      const nextMonth = (leftMonth.value + 1) % 12;
      const yearOffset = leftMonth.value + 1 >= 12 ? 1 : 0;
      return props.unlinkPanels && new Date(leftYear.value + yearOffset, nextMonth) < new Date(rightYear.value, rightMonth.value);
    });
    const enableYearArrow = vue.computed(() => {
      return props.unlinkPanels && rightYear.value * 12 + rightMonth.value - (leftYear.value * 12 + leftMonth.value + 1) >= 12;
    });
    const formatEmit = (emitDayjs, index) => {
      if (!emitDayjs)
        return;
      if (defaultTime) {
        const defaultTimeD = dayjs__default["default"](defaultTime[index] || defaultTime).locale(lang.value);
        return defaultTimeD.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
      }
      return emitDayjs;
    };
    const emitStartRange = (visible = false) => {
      emit("pick", utils.getPartialRangePayload([minDate.value, maxDate.value]).pickRange, visible);
    };
    const updateRangeValue = (nextMinDate, nextMaxDate, keepOpen = false) => {
      const { dayRange, dateRange } = utils.getPartialRangePayload([
        nextMinDate,
        nextMaxDate
      ]);
      const [normalizedMinDate, normalizedMaxDate] = dayRange;
      minDate.value = normalizedMinDate;
      maxDate.value = normalizedMaxDate;
      leftDate.value = normalizedMinDate || leftDate.value;
      onParsedValueChanged(normalizedMinDate, normalizedMaxDate);
      emit("calendar-change", dateRange);
      if (!keepOpen) {
        emitStartRange(false);
      }
    };
    const handleDatePick = (value, keepOpen = false) => {
      const nextMinDate = formatEmit(value, 0);
      if (!nextMinDate)
        return;
      updateRangeValue(nextMinDate, maxDate.value, keepOpen);
    };
    const handleClear = () => {
      let valueOnClear = null;
      if (pickerBase == null ? void 0 : pickerBase.emptyValues) {
        valueOnClear = pickerBase.emptyValues.valueOnClear.value;
      }
      leftDate.value = utils.getDefaultValue(vue.unref(defaultValue), {
        lang: vue.unref(lang),
        unit: "month",
        unlinkPanels: props.unlinkPanels
      })[0];
      rightDate.value = leftDate.value.add(1, "month");
      maxDate.value = void 0;
      minDate.value = void 0;
      emit("pick", valueOnClear);
    };
    const formatToString = (value) => {
      return shared.isArray(value) ? value.map((_) => _ ? _.format(format.value) : "") : value.format(format.value);
    };
    const parseUserInput = (value) => {
      if (shared.isArray(value)) {
        return value.map((item) => item ? utils.correctlyParseUserInput(item, format.value, lang.value, isDefaultFormat) : null);
      }
      return utils.correctlyParseUserInput(value, format.value, lang.value, isDefaultFormat);
    };
    const syncHoverRangeState = () => {
      var _a;
      if (!props.visible || !maxDate.value) {
        rangeState.value.selecting = false;
        rangeState.value.endDate = null;
        return;
      }
      rangeState.value.selecting = true;
      rangeState.value.endDate = (_a = minDate.value) != null ? _a : null;
    };
    function onParsedValueChanged(minDate2, maxDate2) {
      const today = dayjs__default["default"]().locale(lang.value);
      const includesToday = minDate2 && maxDate2 && !today.isBefore(minDate2, "day") && !today.isAfter(maxDate2, "day");
      if (includesToday) {
        leftDate.value = today;
        if (props.unlinkPanels && maxDate2) {
          const currentYear = today.year();
          const currentMonth = today.month();
          rightDate.value = currentYear === maxDate2.year() && currentMonth === maxDate2.month() ? maxDate2.add(1, unit) : maxDate2;
        } else {
          rightDate.value = leftDate.value.add(1, unit);
          if (maxDate2) {
            rightDate.value = rightDate.value.hour(maxDate2.hour()).minute(maxDate2.minute()).second(maxDate2.second());
          }
        }
        return;
      }
      if (props.unlinkPanels && maxDate2) {
        const minDateYear = (minDate2 == null ? void 0 : minDate2.year()) || 0;
        const minDateMonth = (minDate2 == null ? void 0 : minDate2.month()) || 0;
        const maxDateYear = maxDate2.year();
        const maxDateMonth = maxDate2.month();
        rightDate.value = minDateYear === maxDateYear && minDateMonth === maxDateMonth ? maxDate2.add(1, unit) : maxDate2;
      } else {
        rightDate.value = leftDate.value.add(1, unit);
        if (maxDate2) {
          rightDate.value = rightDate.value.hour(maxDate2.hour()).minute(maxDate2.minute()).second(maxDate2.second());
        }
      }
    }
    vue.watch(() => props.visible, syncHoverRangeState, { immediate: true });
    vue.watch([minDate, maxDate], syncHoverRangeState);
    emit("set-picker-option", ["isValidValue", isValidValue]);
    emit("set-picker-option", ["parseUserInput", parseUserInput]);
    emit("set-picker-option", ["handleClear", handleClear]);
    emit("set-picker-option", [
      "handleClosePick",
      () => {
        if (minDate.value) {
          emitStartRange(false);
        }
      }
    ]);
    emit("set-picker-option", ["formatToString", formatToString]);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass(["data-start-range", [vue.unref(ppNs).b(), vue.unref(drpNs).b()]])
      }, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(vue.unref(ppNs).e("body-wrapper"))
        }, [
          vue.renderSlot(_ctx.$slots, "option"),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(ppNs).e("body"))
          }, [
            vue.createElementVNode("div", {
              class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-left"])
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(drpNs).e("header"))
              }, [
                vue.createVNode(vue.unref(index$1.ElButton), {
                  text: "",
                  class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-left icon-button"]),
                  "aria-label": vue.unref(t)(`el.datepicker.prevYear`),
                  onClick: leftPrevYear
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "prev-year", {}, () => [
                      vue.createVNode(vue.unref(index$2.ElIcon), {
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
                }, 8, ["class", "aria-label"]),
                vue.createVNode(vue.unref(index$1.ElButton), {
                  text: "",
                  class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-left icon-button"]),
                  "aria-label": vue.unref(t)(`el.datepicker.prevMonth`),
                  onClick: leftPrevMonth
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "prev-month", {}, () => [
                      vue.createVNode(vue.unref(index$2.ElIcon), {
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
                            vue.createElementVNode("path", { d: "M9.68339 12.4715L6.15473 8.94281C5.90476 8.69277 5.76434 8.35369 5.76434 8.00014C5.76434 7.64659 5.90476 7.30751 6.15473 7.05747L9.68339 3.52881L10.6261 4.47147L7.10006 8.00014L10.6287 11.5288L9.68339 12.4715Z" })
                          ]))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["class", "aria-label"]),
                _ctx.unlinkPanels ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElButton), {
                  key: 0,
                  text: "",
                  disabled: !vue.unref(enableYearArrow),
                  class: vue.normalizeClass([[vue.unref(ppNs).e("icon-btn"), { "is-disabled": !vue.unref(enableYearArrow) }], "d-arrow-right icon-button"]),
                  "aria-label": vue.unref(t)(`el.datepicker.nextYear`),
                  onClick: leftNextYear
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "next-year", {}, () => [
                      vue.createVNode(vue.unref(index$2.ElIcon), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(iconsVue.DArrowRight))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled", "class", "aria-label"])) : vue.createCommentVNode("v-if", true),
                _ctx.unlinkPanels && vue.unref(leftCurrentView) === "date" ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElButton), {
                  key: 1,
                  text: "",
                  disabled: !vue.unref(enableMonthArrow),
                  class: vue.normalizeClass([[
                    vue.unref(ppNs).e("icon-btn"),
                    { "is-disabled": !vue.unref(enableMonthArrow) }
                  ], "arrow-right icon-button"]),
                  "aria-label": vue.unref(t)(`el.datepicker.nextMonth`),
                  onClick: leftNextMonth
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "next-month", {}, () => [
                      vue.createVNode(vue.unref(index$2.ElIcon), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(iconsVue.ArrowRight))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled", "class", "aria-label"])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", null, vue.toDisplayString(vue.unref(leftLabel)), 1)
              ], 2),
              vue.unref(leftCurrentView) === "date" ? (vue.openBlock(), vue.createBlock(basicDateTable["default"], {
                key: 0,
                ref_key: "leftCurrentViewRef",
                ref: leftCurrentViewRef,
                "selection-mode": "date",
                date: leftDate.value,
                "parsed-value": vue.unref(displayedDate),
                "min-date": vue.unref(displayMinDate),
                "max-date": vue.unref(displayMaxDate),
                "range-state": vue.unref(rangeState),
                "disabled-date": disabledDate,
                "cell-class-name": vue.unref(cellClassName),
                "show-week-number": _ctx.showWeekNumber,
                onChangerange: vue.unref(handleChangeRange),
                onPick: handleDatePick
              }, null, 8, ["date", "parsed-value", "min-date", "max-date", "range-state", "cell-class-name", "show-week-number", "onChangerange"])) : vue.createCommentVNode("v-if", true),
              vue.unref(leftCurrentView) === "year" ? (vue.openBlock(), vue.createBlock(basicYearTable["default"], {
                key: 1,
                ref_key: "leftCurrentViewRef",
                ref: leftCurrentViewRef,
                "selection-mode": "year",
                date: leftDate.value,
                "disabled-date": disabledDate,
                "parsed-value": _ctx.parsedValue,
                onPick: vue.unref(handleLeftYearPick)
              }, null, 8, ["date", "parsed-value", "onPick"])) : vue.createCommentVNode("v-if", true),
              vue.unref(leftCurrentView) === "month" ? (vue.openBlock(), vue.createBlock(basicMonthTable["default"], {
                key: 2,
                ref_key: "leftCurrentViewRef",
                ref: leftCurrentViewRef,
                "selection-mode": "month",
                date: leftDate.value,
                "parsed-value": _ctx.parsedValue,
                "disabled-date": disabledDate,
                onPick: vue.unref(handleLeftMonthPick)
              }, null, 8, ["date", "parsed-value", "onPick"])) : vue.createCommentVNode("v-if", true)
            ], 2),
            vue.createElementVNode("div", {
              class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-right"])
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(drpNs).e("header"))
              }, [
                _ctx.unlinkPanels ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElButton), {
                  key: 0,
                  text: "",
                  disabled: !vue.unref(enableYearArrow),
                  class: vue.normalizeClass([[vue.unref(ppNs).e("icon-btn"), { "is-disabled": !vue.unref(enableYearArrow) }], "d-arrow-left icon-button"]),
                  "aria-label": vue.unref(t)(`el.datepicker.prevYear`),
                  onClick: rightPrevYear
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "prev-year", {}, () => [
                      vue.createVNode(vue.unref(index$2.ElIcon), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(iconsVue.DArrowLeft))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled", "class", "aria-label"])) : vue.createCommentVNode("v-if", true),
                _ctx.unlinkPanels && vue.unref(rightCurrentView) === "date" ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElButton), {
                  key: 1,
                  text: "",
                  disabled: !vue.unref(enableMonthArrow),
                  class: vue.normalizeClass([[
                    vue.unref(ppNs).e("icon-btn"),
                    { "is-disabled": !vue.unref(enableMonthArrow) }
                  ], "arrow-left icon-button"]),
                  "aria-label": vue.unref(t)(`el.datepicker.prevMonth`),
                  onClick: rightPrevMonth
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "prev-month", {}, () => [
                      vue.createVNode(vue.unref(index$2.ElIcon), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(iconsVue.ArrowLeft))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled", "class", "aria-label"])) : vue.createCommentVNode("v-if", true),
                vue.createVNode(vue.unref(index$1.ElButton), {
                  text: "",
                  "aria-label": vue.unref(t)(`el.datepicker.nextYear`),
                  class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-right icon-button"]),
                  onClick: rightNextYear
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "next-year", {}, () => [
                      vue.createVNode(vue.unref(index$2.ElIcon), { size: "16px" }, {
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
                }, 8, ["aria-label", "class"]),
                vue.createVNode(vue.unref(index$1.ElButton), {
                  text: "",
                  class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-right icon-button"]),
                  "aria-label": vue.unref(t)(`el.datepicker.nextMonth`),
                  onClick: rightNextMonth
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "next-month", {}, () => [
                      vue.createVNode(vue.unref(index$2.ElIcon), {
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
                            vue.createElementVNode("path", { d: "M7.70742 12.4715L6.76675 11.5288L10.2927 8.00014L6.76675 4.47147L7.71009 3.52881L11.2334 7.05747C11.4834 7.30751 11.6238 7.64659 11.6238 8.00014C11.6238 8.35369 11.4834 8.69277 11.2334 8.94281L7.70742 12.4715Z" })
                          ]))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["class", "aria-label"]),
                vue.createElementVNode("div", null, vue.toDisplayString(vue.unref(rightLabel)), 1)
              ], 2),
              vue.unref(rightCurrentView) === "date" ? (vue.openBlock(), vue.createBlock(basicDateTable["default"], {
                key: 0,
                ref_key: "rightCurrentViewRef",
                ref: rightCurrentViewRef,
                "selection-mode": "date",
                date: rightDate.value,
                "parsed-value": vue.unref(displayedDate),
                "min-date": vue.unref(displayMinDate),
                "max-date": vue.unref(displayMaxDate),
                "range-state": vue.unref(rangeState),
                "disabled-date": disabledDate,
                "cell-class-name": vue.unref(cellClassName),
                "show-week-number": _ctx.showWeekNumber,
                onChangerange: vue.unref(handleChangeRange),
                onPick: handleDatePick
              }, null, 8, ["date", "parsed-value", "min-date", "max-date", "range-state", "cell-class-name", "show-week-number", "onChangerange"])) : vue.createCommentVNode("v-if", true),
              vue.unref(rightCurrentView) === "year" ? (vue.openBlock(), vue.createBlock(basicYearTable["default"], {
                key: 1,
                ref_key: "rightCurrentViewRef",
                ref: rightCurrentViewRef,
                "selection-mode": "year",
                date: rightDate.value,
                "disabled-date": disabledDate,
                "parsed-value": _ctx.parsedValue,
                onPick: vue.unref(handleRightYearPick)
              }, null, 8, ["date", "parsed-value", "onPick"])) : vue.createCommentVNode("v-if", true),
              vue.unref(rightCurrentView) === "month" ? (vue.openBlock(), vue.createBlock(basicMonthTable["default"], {
                key: 2,
                ref_key: "rightCurrentViewRef",
                ref: rightCurrentViewRef,
                "selection-mode": "month",
                date: rightDate.value,
                "parsed-value": _ctx.parsedValue,
                "disabled-date": disabledDate,
                onPick: vue.unref(handleRightMonthPick)
              }, null, 8, ["date", "parsed-value", "onPick"])) : vue.createCommentVNode("v-if", true)
            ], 2)
          ], 2)
        ], 2),
        vue.unref(showFooter) && vue.unref(clearable) ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(vue.unref(ppNs).e("footer"))
        }, [
          vue.unref(clearable) ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElButton), {
            key: 0,
            class: vue.normalizeClass(vue.unref(ppNs).e("link-btn")),
            onClick: handleClear
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(vue.unref(t)("el.datepicker.clear")), 1)
            ]),
            _: 1
          }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
        ], 2)) : vue.createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var DateStartRangePickPanel = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "panel-start-range.vue"]]);

exports["default"] = DateStartRangePickPanel;
//# sourceMappingURL=panel-start-range.js.map
