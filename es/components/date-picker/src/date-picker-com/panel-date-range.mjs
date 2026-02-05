import { defineComponent, inject, toRef, ref, watch, computed, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, renderSlot, Fragment, renderList, toDisplayString, createCommentVNode, createVNode, withDirectives, withCtx, createBlock, createTextVNode } from 'vue';
import dayjs from 'dayjs';
import { ElButton } from '../../../button/index.mjs';
import { ElInput } from '../../../input/index.mjs';
import '../../../time-picker/index.mjs';
import { ElIcon } from '../../../icon/index.mjs';
import { ArrowRight, DArrowRight, DArrowLeft, ArrowLeft } from '@element-plus/icons-vue';
import { panelDateRangeProps } from '../props/panel-date-range.mjs';
import { useRangePicker } from '../composables/use-range-picker.mjs';
import { isValidRange, getDefaultValue, correctlyParseUserInput } from '../utils.mjs';
import { usePanelDateRange } from '../composables/use-panel-date-range.mjs';
import { ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY } from '../constants.mjs';
import YearTable from './basic-year-table.mjs';
import MonthTable from './basic-month-table.mjs';
import DateTable from './basic-date-table.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import TimePickPanel from '../../../time-picker/src/time-picker-com/panel-time-pick.mjs';
import ClickOutside from '../../../../directives/click-outside/index.mjs';
import { PICKER_BASE_INJECTION_KEY } from '../../../time-picker/src/constants.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { extractTimeFormat, extractDateFormat } from '../../../time-picker/src/utils.mjs';
import { isArray } from '@vue/shared';

const unit = "month";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "panel-date-range",
  props: panelDateRangeProps,
  emits: [
    "pick",
    "set-picker-option",
    "calendar-change",
    "panel-change"
  ],
  setup(__props, { emit }) {
    const props = __props;
    const pickerBase = inject(PICKER_BASE_INJECTION_KEY);
    const isDefaultFormat = inject(ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY);
    const { disabledDate, cellClassName, defaultTime, clearable, isFooter, isOk } = pickerBase.props;
    const format = toRef(pickerBase.props, "format");
    const shortcuts = toRef(pickerBase.props, "shortcuts");
    const defaultValue = toRef(pickerBase.props, "defaultValue");
    const cycle = toRef(pickerBase.props, "cycle");
    const settDefaultDate = toRef(pickerBase.props, "settDefaultDate");
    const cycleType = toRef(pickerBase.props, "cycleType");
    const { lang } = useLocale();
    const leftDate = ref(dayjs().locale(lang.value));
    const rightDate = ref(dayjs().locale(lang.value).add(1, unit));
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
      onReset,
      t
    } = useRangePicker(props, {
      defaultValue,
      defaultTime,
      leftDate,
      rightDate,
      unit,
      onParsedValueChanged
    });
    watch(() => props.visible, (visible) => {
      if (!visible && rangeState.value.selecting) {
        onReset(props.parsedValue);
        onSelect(false);
      }
    });
    const dateUserInput = ref({
      min: null,
      max: null
    });
    const timeUserInput = ref({
      min: null,
      max: null
    });
    const leftLabel = computed(() => {
      return `${t(`el.datepicker.month${leftDate.value.month() + 1}`)} ${leftDate.value.year()} ${t("el.datepicker.year")}`;
    });
    const rightLabel = computed(() => {
      return `${t(`el.datepicker.month${rightDate.value.month() + 1}`)} ${rightDate.value.year()} ${t("el.datepicker.year")}`;
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
    } = usePanelDateRange(props, emit, leftDate, rightDate);
    const hasShortcuts = computed(() => !!shortcuts.value.length);
    const minVisibleDate = computed(() => {
      if (dateUserInput.value.min !== null)
        return dateUserInput.value.min;
      if (minDate.value)
        return minDate.value.format(dateFormat.value);
      return "";
    });
    const maxVisibleDate = computed(() => {
      if (dateUserInput.value.max !== null)
        return dateUserInput.value.max;
      if (maxDate.value || minDate.value)
        return (maxDate.value || minDate.value).format(dateFormat.value);
      return "";
    });
    const minVisibleTime = computed(() => {
      if (timeUserInput.value.min !== null)
        return timeUserInput.value.min;
      if (minDate.value)
        return minDate.value.format(timeFormat.value);
      return "";
    });
    const maxVisibleTime = computed(() => {
      if (timeUserInput.value.max !== null)
        return timeUserInput.value.max;
      if (maxDate.value || minDate.value)
        return (maxDate.value || minDate.value).format(timeFormat.value);
      return "";
    });
    const timeFormat = computed(() => {
      return props.timeFormat || extractTimeFormat(format.value);
    });
    const dateFormat = computed(() => {
      return props.dateFormat || extractDateFormat(format.value);
    });
    const isValidValue = (date) => {
      return isValidRange(date) && (disabledDate ? !disabledDate(date[0].toDate()) && !disabledDate(date[1].toDate()) : true);
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
    const enableMonthArrow = computed(() => {
      const nextMonth = (leftMonth.value + 1) % 12;
      const yearOffset = leftMonth.value + 1 >= 12 ? 1 : 0;
      return props.unlinkPanels && new Date(leftYear.value + yearOffset, nextMonth) < new Date(rightYear.value, rightMonth.value);
    });
    const enableYearArrow = computed(() => {
      return props.unlinkPanels && rightYear.value * 12 + rightMonth.value - (leftYear.value * 12 + leftMonth.value + 1) >= 12;
    });
    const btnDisabled = computed(() => {
      return !(minDate.value && maxDate.value && !rangeState.value.selecting && isValidRange([minDate.value, maxDate.value]));
    });
    const showTime = computed(() => props.type === "datetime" || props.type === "datetimerange");
    const formatEmit = (emitDayjs, index) => {
      if (!emitDayjs)
        return;
      if (defaultTime) {
        const defaultTimeD = dayjs(defaultTime[index] || defaultTime).locale(lang.value);
        return defaultTimeD.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
      }
      return emitDayjs;
    };
    const getSelectingDate = inject("getSelectingDate", {
      getSelectingDate: void 0
    });
    const handleRangePick = (val, close = true) => {
      const min_ = val.minDate;
      const max_ = val.maxDate;
      const minDate_ = formatEmit(min_, 0);
      const maxDate_ = formatEmit(max_, 1);
      if (typeof getSelectingDate.getSelectingDate === "function") {
        getSelectingDate.getSelectingDate(val);
      }
      if (maxDate.value === maxDate_ && minDate.value === minDate_) {
        return;
      }
      emit("calendar-change", [min_.toDate(), max_ && max_.toDate()]);
      maxDate.value = maxDate_;
      minDate.value = minDate_;
      if (!close || showTime.value)
        return;
      handleRangeConfirm();
    };
    const minTimePickerVisible = ref(false);
    const maxTimePickerVisible = ref(false);
    const handleMinTimeClose = () => {
      minTimePickerVisible.value = false;
    };
    const handleMaxTimeClose = () => {
      maxTimePickerVisible.value = false;
    };
    const handleDateInput = (value, type) => {
      dateUserInput.value[type] = value;
      const parsedValueD = dayjs(value, dateFormat.value).locale(lang.value);
      if (parsedValueD.isValid()) {
        if (disabledDate && disabledDate(parsedValueD.toDate())) {
          return;
        }
        if (type === "min") {
          leftDate.value = parsedValueD;
          minDate.value = (minDate.value || leftDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
          if (!props.unlinkPanels && (!maxDate.value || maxDate.value.isBefore(minDate.value))) {
            rightDate.value = parsedValueD.add(1, "month");
            maxDate.value = minDate.value.add(1, "month");
          }
        } else {
          rightDate.value = parsedValueD;
          maxDate.value = (maxDate.value || rightDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
          if (!props.unlinkPanels && (!minDate.value || minDate.value.isAfter(maxDate.value))) {
            leftDate.value = parsedValueD.subtract(1, "month");
            minDate.value = maxDate.value.subtract(1, "month");
          }
        }
      }
    };
    const handleDateChange = (_, type) => {
      dateUserInput.value[type] = null;
    };
    const handleTimeInput = (value, type) => {
      timeUserInput.value[type] = value;
      const parsedValueD = dayjs(value, timeFormat.value).locale(lang.value);
      if (parsedValueD.isValid()) {
        if (type === "min") {
          minTimePickerVisible.value = true;
          minDate.value = (minDate.value || leftDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
          leftDate.value = minDate.value;
        } else {
          maxTimePickerVisible.value = true;
          maxDate.value = (maxDate.value || rightDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
          rightDate.value = maxDate.value;
        }
      }
    };
    const handleTimeChange = (_value, type) => {
      timeUserInput.value[type] = null;
      if (type === "min") {
        leftDate.value = minDate.value;
        minTimePickerVisible.value = false;
        if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
          maxDate.value = minDate.value;
        }
      } else {
        rightDate.value = maxDate.value;
        maxTimePickerVisible.value = false;
        if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
          minDate.value = maxDate.value;
        }
      }
      handleRangeConfirm(true);
    };
    const handleMinTimePick = (value, visible, first) => {
      if (timeUserInput.value.min)
        return;
      if (value) {
        leftDate.value = value;
        minDate.value = (minDate.value || leftDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
      }
      if (!first) {
        minTimePickerVisible.value = visible;
      }
      if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
        maxDate.value = minDate.value;
        rightDate.value = value;
      }
      handleRangeConfirm(true);
    };
    const handleMaxTimePick = (value, visible, first) => {
      if (timeUserInput.value.max)
        return;
      if (value) {
        rightDate.value = value;
        maxDate.value = (maxDate.value || rightDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
      }
      if (!first) {
        maxTimePickerVisible.value = visible;
      }
      if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
        minDate.value = maxDate.value;
      }
      handleRangeConfirm(true);
    };
    const handleClear = () => {
      let valueOnClear = null;
      if (pickerBase == null ? void 0 : pickerBase.emptyValues) {
        valueOnClear = pickerBase.emptyValues.valueOnClear.value;
      }
      leftDate.value = getDefaultValue(unref(defaultValue), {
        lang: unref(lang),
        unit: "month",
        unlinkPanels: props.unlinkPanels
      })[0];
      rightDate.value = leftDate.value.add(1, "month");
      maxDate.value = void 0;
      minDate.value = void 0;
      handleRangeConfirm(true);
      emit("pick", valueOnClear);
    };
    const formatToString = (value) => {
      return isArray(value) ? value.map((_) => _.format(format.value)) : value.format(format.value);
    };
    const parseUserInput = (value) => {
      return correctlyParseUserInput(value, format.value, lang.value, isDefaultFormat);
    };
    function onParsedValueChanged(minDate2, maxDate2) {
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
    emit("set-picker-option", ["isValidValue", isValidValue]);
    emit("set-picker-option", ["parseUserInput", parseUserInput]);
    emit("set-picker-option", ["handleClear", handleClear]);
    emit("set-picker-option", ["formatToString", formatToString]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ppNs).b(),
          unref(drpNs).b(),
          {
            "has-sidebar": _ctx.$slots.sidebar || unref(hasShortcuts),
            "has-time": unref(showTime)
          }
        ])
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(ppNs).e("body-wrapper"))
        }, [
          renderSlot(_ctx.$slots, "sidebar", {
            class: normalizeClass(unref(ppNs).e("sidebar"))
          }),
          unref(hasShortcuts) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref(ppNs).e("sidebar"))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(shortcuts), (shortcut, key) => {
              return openBlock(), createElementBlock("button", {
                key,
                type: "button",
                class: normalizeClass(unref(ppNs).e("shortcut")),
                onClick: ($event) => unref(handleShortcutClick)(shortcut)
              }, toDisplayString(shortcut.text), 11, ["onClick"]);
            }), 128))
          ], 2)) : createCommentVNode("v-if", true),
          createElementVNode("div", {
            class: normalizeClass(unref(ppNs).e("body"))
          }, [
            unref(showTime) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(unref(drpNs).e("time-header"))
            }, [
              createElementVNode("span", {
                class: normalizeClass(unref(drpNs).e("editors-wrap"))
              }, [
                createElementVNode("span", {
                  class: normalizeClass(unref(drpNs).e("time-picker-wrap"))
                }, [
                  createVNode(unref(ElInput), {
                    size: "small",
                    disabled: unref(rangeState).selecting,
                    placeholder: unref(t)("el.datepicker.startDate"),
                    class: normalizeClass(unref(drpNs).e("editor")),
                    "model-value": unref(minVisibleDate),
                    "validate-event": false,
                    onInput: (val) => handleDateInput(val, "min"),
                    onChange: (val) => handleDateChange(val, "min")
                  }, null, 8, ["disabled", "placeholder", "class", "model-value", "onInput", "onChange"])
                ], 2),
                withDirectives((openBlock(), createElementBlock("span", {
                  class: normalizeClass(unref(drpNs).e("time-picker-wrap"))
                }, [
                  createVNode(unref(ElInput), {
                    size: "small",
                    class: normalizeClass(unref(drpNs).e("editor")),
                    disabled: unref(rangeState).selecting,
                    placeholder: unref(t)("el.datepicker.startTime"),
                    "model-value": unref(minVisibleTime),
                    "validate-event": false,
                    onFocus: ($event) => minTimePickerVisible.value = true,
                    onInput: (val) => handleTimeInput(val, "min"),
                    onChange: (val) => handleTimeChange(val, "min")
                  }, null, 8, ["class", "disabled", "placeholder", "model-value", "onFocus", "onInput", "onChange"]),
                  createVNode(unref(TimePickPanel), {
                    visible: minTimePickerVisible.value,
                    format: unref(timeFormat),
                    "datetime-role": "start",
                    "parsed-value": leftDate.value,
                    onPick: handleMinTimePick
                  }, null, 8, ["visible", "format", "parsed-value"])
                ], 2)), [
                  [unref(ClickOutside), handleMinTimeClose]
                ])
              ], 2),
              createElementVNode("span", null, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowRight))
                  ]),
                  _: 1
                })
              ]),
              createElementVNode("span", {
                class: normalizeClass([unref(drpNs).e("editors-wrap"), "is-right"])
              }, [
                createElementVNode("span", {
                  class: normalizeClass(unref(drpNs).e("time-picker-wrap"))
                }, [
                  createVNode(unref(ElInput), {
                    size: "small",
                    class: normalizeClass(unref(drpNs).e("editor")),
                    disabled: unref(rangeState).selecting,
                    placeholder: unref(t)("el.datepicker.endDate"),
                    "model-value": unref(maxVisibleDate),
                    readonly: !unref(minDate),
                    "validate-event": false,
                    onInput: (val) => handleDateInput(val, "max"),
                    onChange: (val) => handleDateChange(val, "max")
                  }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly", "onInput", "onChange"])
                ], 2),
                withDirectives((openBlock(), createElementBlock("span", {
                  class: normalizeClass(unref(drpNs).e("time-picker-wrap"))
                }, [
                  createVNode(unref(ElInput), {
                    size: "small",
                    class: normalizeClass(unref(drpNs).e("editor")),
                    disabled: unref(rangeState).selecting,
                    placeholder: unref(t)("el.datepicker.endTime"),
                    "model-value": unref(maxVisibleTime),
                    readonly: !unref(minDate),
                    "validate-event": false,
                    onFocus: ($event) => unref(minDate) && (maxTimePickerVisible.value = true),
                    onInput: (val) => handleTimeInput(val, "max"),
                    onChange: (val) => handleTimeChange(val, "max")
                  }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly", "onFocus", "onInput", "onChange"]),
                  createVNode(unref(TimePickPanel), {
                    "datetime-role": "end",
                    visible: maxTimePickerVisible.value,
                    format: unref(timeFormat),
                    "parsed-value": rightDate.value,
                    onPick: handleMaxTimePick
                  }, null, 8, ["visible", "format", "parsed-value"])
                ], 2)), [
                  [unref(ClickOutside), handleMaxTimeClose]
                ])
              ], 2)
            ], 2)) : createCommentVNode("v-if", true),
            createElementVNode("div", {
              class: normalizeClass([[unref(ppNs).e("content"), unref(drpNs).e("content")], "is-left"])
            }, [
              createElementVNode("div", {
                class: normalizeClass(unref(drpNs).e("header"))
              }, [
                createVNode(unref(ElButton), {
                  text: "",
                  class: normalizeClass([unref(ppNs).e("icon-btn"), "d-arrow-left icon-button"]),
                  "aria-label": unref(t)(`el.datepicker.prevYear`),
                  onClick: leftPrevYear
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "prev-year", {}, () => [
                      createVNode(unref(ElIcon), {
                        size: "16px",
                        color: "#374957"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createElementBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "17",
                            height: "16",
                            viewBox: "0 0 17 16"
                          }, [
                            createElementVNode("path", { d: "M7.95949 4.47147L7.01683 3.52881L3.48816 7.05747C3.2382 7.30751 3.09778 7.64659 3.09778 8.00014C3.09778 8.35369 3.2382 8.69277 3.48816 8.94281L7.01683 12.4715L7.95949 11.5288L4.43349 8.00014L7.95949 4.47147Z" }),
                            createElementVNode("path", { d: "M12.6259 4.47147L11.6833 3.52881L7.68329 7.52881C7.55831 7.65383 7.4881 7.82337 7.4881 8.00014C7.4881 8.17692 7.55831 8.34646 7.68329 8.47147L11.6833 12.4715L12.6259 11.5288L9.09995 8.00014L12.6259 4.47147Z" })
                          ]))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["class", "aria-label"]),
                createVNode(unref(ElButton), {
                  text: "",
                  class: normalizeClass([unref(ppNs).e("icon-btn"), "arrow-left icon-button"]),
                  "aria-label": unref(t)(`el.datepicker.prevMonth`),
                  onClick: leftPrevMonth
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "prev-month", {}, () => [
                      createVNode(unref(ElIcon), {
                        size: "16px",
                        color: "#374957"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createElementBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "17",
                            height: "16",
                            viewBox: "0 0 17 16"
                          }, [
                            createElementVNode("path", { d: "M9.68339 12.4715L6.15473 8.94281C5.90476 8.69277 5.76434 8.35369 5.76434 8.00014C5.76434 7.64659 5.90476 7.30751 6.15473 7.05747L9.68339 3.52881L10.6261 4.47147L7.10006 8.00014L10.6287 11.5288L9.68339 12.4715Z" })
                          ]))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["class", "aria-label"]),
                _ctx.unlinkPanels ? (openBlock(), createBlock(unref(ElButton), {
                  key: 0,
                  text: "",
                  disabled: !unref(enableYearArrow),
                  class: normalizeClass([[unref(ppNs).e("icon-btn"), { "is-disabled": !unref(enableYearArrow) }], "d-arrow-right icon-button"]),
                  "aria-label": unref(t)(`el.datepicker.nextYear`),
                  onClick: leftNextYear
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "next-year", {}, () => [
                      createVNode(unref(ElIcon), null, {
                        default: withCtx(() => [
                          createVNode(unref(DArrowRight))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled", "class", "aria-label"])) : createCommentVNode("v-if", true),
                _ctx.unlinkPanels && unref(leftCurrentView) === "date" ? (openBlock(), createBlock(unref(ElButton), {
                  key: 1,
                  text: "",
                  disabled: !unref(enableMonthArrow),
                  class: normalizeClass([[
                    unref(ppNs).e("icon-btn"),
                    { "is-disabled": !unref(enableMonthArrow) }
                  ], "arrow-right icon-button"]),
                  "aria-label": unref(t)(`el.datepicker.nextMonth`),
                  onClick: leftNextMonth
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "next-month", {}, () => [
                      createVNode(unref(ElIcon), null, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowRight))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled", "class", "aria-label"])) : createCommentVNode("v-if", true),
                createElementVNode("div", null, toDisplayString(unref(leftLabel)), 1)
              ], 2),
              unref(leftCurrentView) === "date" ? (openBlock(), createBlock(DateTable, {
                key: 0,
                ref_key: "leftCurrentViewRef",
                ref: leftCurrentViewRef,
                "selection-mode": "range",
                date: leftDate.value,
                "min-date": unref(minDate),
                "max-date": unref(maxDate),
                "range-state": unref(rangeState),
                cycle: unref(cycle),
                "sett-default-date": unref(settDefaultDate),
                "cycle-type": unref(cycleType),
                "disabled-date": unref(disabledDate),
                "cell-class-name": unref(cellClassName),
                "show-week-number": _ctx.showWeekNumber,
                onChangerange: unref(handleChangeRange),
                onPick: handleRangePick,
                onSelect: unref(onSelect)
              }, null, 8, ["date", "min-date", "max-date", "range-state", "cycle", "sett-default-date", "cycle-type", "disabled-date", "cell-class-name", "show-week-number", "onChangerange", "onSelect"])) : createCommentVNode("v-if", true),
              unref(leftCurrentView) === "year" ? (openBlock(), createBlock(YearTable, {
                key: 1,
                ref_key: "leftCurrentViewRef",
                ref: leftCurrentViewRef,
                "selection-mode": "year",
                date: leftDate.value,
                "disabled-date": unref(disabledDate),
                "parsed-value": _ctx.parsedValue,
                onPick: unref(handleLeftYearPick)
              }, null, 8, ["date", "disabled-date", "parsed-value", "onPick"])) : createCommentVNode("v-if", true),
              unref(leftCurrentView) === "month" ? (openBlock(), createBlock(MonthTable, {
                key: 2,
                ref_key: "leftCurrentViewRef",
                ref: leftCurrentViewRef,
                "selection-mode": "month",
                date: leftDate.value,
                "parsed-value": _ctx.parsedValue,
                "disabled-date": unref(disabledDate),
                onPick: unref(handleLeftMonthPick)
              }, null, 8, ["date", "parsed-value", "disabled-date", "onPick"])) : createCommentVNode("v-if", true)
            ], 2),
            createElementVNode("div", {
              class: normalizeClass([[unref(ppNs).e("content"), unref(drpNs).e("content")], "is-right"])
            }, [
              createElementVNode("div", {
                class: normalizeClass(unref(drpNs).e("header"))
              }, [
                _ctx.unlinkPanels ? (openBlock(), createBlock(unref(ElButton), {
                  key: 0,
                  text: "",
                  disabled: !unref(enableYearArrow),
                  class: normalizeClass([[unref(ppNs).e("icon-btn"), { "is-disabled": !unref(enableYearArrow) }], "d-arrow-left icon-button"]),
                  "aria-label": unref(t)(`el.datepicker.prevYear`),
                  onClick: rightPrevYear
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "prev-year", {}, () => [
                      createVNode(unref(ElIcon), null, {
                        default: withCtx(() => [
                          createVNode(unref(DArrowLeft))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled", "class", "aria-label"])) : createCommentVNode("v-if", true),
                _ctx.unlinkPanels && unref(rightCurrentView) === "date" ? (openBlock(), createBlock(unref(ElButton), {
                  key: 1,
                  text: "",
                  disabled: !unref(enableMonthArrow),
                  class: normalizeClass([[
                    unref(ppNs).e("icon-btn"),
                    { "is-disabled": !unref(enableMonthArrow) }
                  ], "arrow-left icon-button"]),
                  "aria-label": unref(t)(`el.datepicker.prevMonth`),
                  onClick: rightPrevMonth
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "prev-month", {}, () => [
                      createVNode(unref(ElIcon), null, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled", "class", "aria-label"])) : createCommentVNode("v-if", true),
                createVNode(unref(ElButton), {
                  text: "",
                  "aria-label": unref(t)(`el.datepicker.nextYear`),
                  class: normalizeClass([unref(ppNs).e("icon-btn"), "d-arrow-right icon-button"]),
                  onClick: rightNextYear
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "next-year", {}, () => [
                      createVNode(unref(ElIcon), { size: "16px" }, {
                        default: withCtx(() => [
                          (openBlock(), createElementBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "17",
                            height: "16",
                            viewBox: "0 0 17 16"
                          }, [
                            createElementVNode("path", { d: "M13.2334 7.05747L9.70742 3.52881L8.76675 4.47147L12.2927 8.00014L8.76675 11.5288L9.71009 12.4715L13.2334 8.94281C13.4834 8.69277 13.6238 8.35369 13.6238 8.00014C13.6238 7.64659 13.4834 7.30751 13.2334 7.05747Z" }),
                            createElementVNode("path", { d: "M9.04055 7.52881L5.04055 3.52881L4.09988 4.47147L7.62588 8.00014L4.09988 11.5288L5.04322 12.4715L9.04322 8.47147C9.16784 8.3461 9.23758 8.17637 9.23708 7.99959C9.23658 7.82281 9.16589 7.65347 9.04055 7.52881Z" })
                          ]))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["aria-label", "class"]),
                createVNode(unref(ElButton), {
                  text: "",
                  class: normalizeClass([unref(ppNs).e("icon-btn"), "arrow-right icon-button"]),
                  "aria-label": unref(t)(`el.datepicker.nextMonth`),
                  onClick: rightNextMonth
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "next-month", {}, () => [
                      createVNode(unref(ElIcon), {
                        size: "16px",
                        color: "#374957"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createElementBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "17",
                            height: "16",
                            viewBox: "0 0 17 16"
                          }, [
                            createElementVNode("path", { d: "M7.70742 12.4715L6.76675 11.5288L10.2927 8.00014L6.76675 4.47147L7.71009 3.52881L11.2334 7.05747C11.4834 7.30751 11.6238 7.64659 11.6238 8.00014C11.6238 8.35369 11.4834 8.69277 11.2334 8.94281L7.70742 12.4715Z" })
                          ]))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 3
                }, 8, ["class", "aria-label"]),
                createElementVNode("div", null, toDisplayString(unref(rightLabel)), 1)
              ], 2),
              unref(rightCurrentView) === "date" ? (openBlock(), createBlock(DateTable, {
                key: 0,
                ref_key: "rightCurrentViewRef",
                ref: rightCurrentViewRef,
                "selection-mode": "range",
                date: rightDate.value,
                "min-date": unref(minDate),
                "max-date": unref(maxDate),
                "range-state": unref(rangeState),
                cycle: unref(cycle),
                "sett-default-date": unref(settDefaultDate),
                "cycle-type": unref(cycleType),
                "disabled-date": unref(disabledDate),
                "cell-class-name": unref(cellClassName),
                "show-week-number": _ctx.showWeekNumber,
                onChangerange: unref(handleChangeRange),
                onPick: handleRangePick,
                onSelect: unref(onSelect)
              }, null, 8, ["date", "min-date", "max-date", "range-state", "cycle", "sett-default-date", "cycle-type", "disabled-date", "cell-class-name", "show-week-number", "onChangerange", "onSelect"])) : createCommentVNode("v-if", true),
              unref(rightCurrentView) === "year" ? (openBlock(), createBlock(YearTable, {
                key: 1,
                ref_key: "rightCurrentViewRef",
                ref: rightCurrentViewRef,
                "selection-mode": "year",
                date: rightDate.value,
                "disabled-date": unref(disabledDate),
                "parsed-value": _ctx.parsedValue,
                onPick: unref(handleRightYearPick)
              }, null, 8, ["date", "disabled-date", "parsed-value", "onPick"])) : createCommentVNode("v-if", true),
              unref(rightCurrentView) === "month" ? (openBlock(), createBlock(MonthTable, {
                key: 2,
                ref_key: "rightCurrentViewRef",
                ref: rightCurrentViewRef,
                "selection-mode": "month",
                date: rightDate.value,
                "parsed-value": _ctx.parsedValue,
                "disabled-date": unref(disabledDate),
                onPick: unref(handleRightMonthPick)
              }, null, 8, ["date", "parsed-value", "disabled-date", "onPick"])) : createCommentVNode("v-if", true)
            ], 2)
          ], 2)
        ], 2),
        unref(showTime) || ["week", "custom"].includes(unref(cycleType)) || unref(isFooter) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ppNs).e("footer"))
        }, [
          unref(clearable) ? (openBlock(), createBlock(unref(ElButton), {
            key: 0,
            text: "",
            size: "small",
            class: normalizeClass(unref(ppNs).e("link-btn")),
            onClick: handleClear
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("el.datepicker.clear")), 1)
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", true),
          unref(isOk) ? (openBlock(), createBlock(unref(ElButton), {
            key: 1,
            plain: "",
            size: "small",
            class: normalizeClass(unref(ppNs).e("link-btn")),
            disabled: unref(btnDisabled),
            onClick: ($event) => unref(handleRangeConfirm)(false)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("el.datepicker.confirm")), 1)
            ]),
            _: 1
          }, 8, ["class", "disabled", "onClick"])) : createCommentVNode("v-if", true)
        ], 2)) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var DateRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "panel-date-range.vue"]]);

export { DateRangePickPanel as default };
//# sourceMappingURL=panel-date-range.mjs.map
