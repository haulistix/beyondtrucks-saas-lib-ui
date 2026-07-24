import { defineComponent, inject, toRef, ref, computed, watch, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, renderSlot, createVNode, withCtx, createBlock, createCommentVNode, toDisplayString, createTextVNode } from 'vue';
import dayjs from 'dayjs';
import { ElButton } from '../../../button/index.mjs';
import { ElIcon } from '../../../icon/index.mjs';
import { DArrowRight, ArrowRight, DArrowLeft, ArrowLeft } from '@element-plus/icons-vue';
import { panelDateRangeProps } from '../props/panel-date-range.mjs';
import { useRangePicker } from '../composables/use-range-picker.mjs';
import { isValidPartialRange, getPartialRangePayload, getSequentialRangePick, getDefaultValue, correctlyParseUserInput } from '../utils.mjs';
import { usePanelDateRange } from '../composables/use-panel-date-range.mjs';
import { ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY } from '../constants.mjs';
import YearTable from './basic-year-table.mjs';
import MonthTable from './basic-month-table.mjs';
import DateTable from './basic-date-table.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import { PICKER_BASE_INJECTION_KEY } from '../../../time-picker/src/constants.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { isArray } from '@vue/shared';

const unit = "month";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "panel-end-range",
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
    const {
      disabledDate: baseDisabledDate,
      cellClassName,
      defaultTime,
      clearable,
      isOk
    } = pickerBase.props;
    const format = toRef(pickerBase.props, "format");
    const defaultValue = toRef(pickerBase.props, "defaultValue");
    const showFooter = toRef(pickerBase.props, "showFooter");
    const { lang } = useLocale();
    const leftDate = ref(dayjs().locale(lang.value));
    const rightDate = ref(dayjs().locale(lang.value).add(1, unit));
    const { minDate, maxDate, rangeState, ppNs, drpNs, t, handleChangeRange } = useRangePicker(props, {
      defaultValue,
      defaultTime,
      leftDate,
      rightDate,
      unit,
      onParsedValueChanged
    });
    const leftLabel = computed(() => {
      return `${t(`el.datepicker.month${leftDate.value.month() + 1}`)} ${leftDate.value.year()} ${t("el.datepicker.year")}`;
    });
    const rightLabel = computed(() => {
      return `${t(`el.datepicker.month${rightDate.value.month() + 1}`)} ${rightDate.value.year()} ${t("el.datepicker.year")}`;
    });
    const displayedDate = computed(() => {
      var _a;
      return (_a = maxDate.value) != null ? _a : minDate.value;
    });
    const selectingStartDate = ref(false);
    const displayMinDate = computed(() => {
      if (selectingStartDate.value && maxDate.value && rangeState.value.endDate) {
        return maxDate.value;
      }
      if (rangeState.value.selecting && minDate.value && rangeState.value.endDate) {
        return minDate.value;
      }
      return minDate.value && maxDate.value ? minDate.value : void 0;
    });
    const displayMaxDate = computed(() => {
      if (selectingStartDate.value && maxDate.value && rangeState.value.endDate) {
        return rangeState.value.endDate;
      }
      if (rangeState.value.selecting && minDate.value && rangeState.value.endDate) {
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
    } = usePanelDateRange(props, emit, leftDate, rightDate);
    const isValidValue = (date) => {
      return isValidPartialRange(date, baseDisabledDate);
    };
    const disabledDate = (date) => {
      if (baseDisabledDate == null ? void 0 : baseDisabledDate(date))
        return true;
      return !!minDate.value && dayjs(date).isBefore(minDate.value, "day");
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
    const formatEmit = (emitDayjs, index) => {
      if (!emitDayjs)
        return;
      if (defaultTime) {
        const defaultTimeD = dayjs(defaultTime[index] || defaultTime).locale(lang.value);
        return defaultTimeD.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
      }
      return emitDayjs;
    };
    const emitEndRange = (visible = false) => {
      emit("pick", getPartialRangePayload([minDate.value, maxDate.value]).pickRange, visible);
    };
    const updateRangeValue = (nextMinDate, nextMaxDate, keepOpen = false) => {
      const { dayRange, dateRange } = getPartialRangePayload([
        nextMinDate,
        nextMaxDate
      ]);
      const [normalizedMinDate, normalizedMaxDate] = dayRange;
      minDate.value = normalizedMinDate;
      maxDate.value = normalizedMaxDate;
      rightDate.value = normalizedMaxDate || rightDate.value;
      onParsedValueChanged(normalizedMinDate, normalizedMaxDate);
      emit("calendar-change", dateRange);
      if (!keepOpen) {
        emitEndRange(false);
      }
    };
    const handleDatePick = (value, keepOpen = false) => {
      const endpointIndex = selectingStartDate.value ? 0 : 1;
      const nextDate = formatEmit(value, endpointIndex);
      if (!nextDate)
        return;
      const { range, completed } = getSequentialRangePick("end", selectingStartDate.value, nextDate, [minDate.value, maxDate.value]);
      selectingStartDate.value = !completed;
      updateRangeValue(range[0], range[1], !completed || keepOpen);
      syncHoverRangeState();
    };
    const handleClear = () => {
      maxDate.value = void 0;
      const remainingMinDate = minDate.value;
      if (remainingMinDate) {
        leftDate.value = remainingMinDate;
        onParsedValueChanged(remainingMinDate, void 0);
      } else {
        leftDate.value = getDefaultValue(unref(defaultValue), {
          lang: unref(lang),
          unit: "month",
          unlinkPanels: props.unlinkPanels
        })[0];
        rightDate.value = leftDate.value.add(1, "month");
      }
      emit("pick", getPartialRangePayload([remainingMinDate, void 0]).pickRange);
    };
    const formatToString = (value) => {
      return isArray(value) ? value.map((_) => _ ? _.format(format.value) : "") : value.format(format.value);
    };
    const parseUserInput = (value) => {
      if (isArray(value)) {
        return value.map((item) => item ? correctlyParseUserInput(item, format.value, lang.value, isDefaultFormat) : null);
      }
      return correctlyParseUserInput(value, format.value, lang.value, isDefaultFormat);
    };
    const syncHoverRangeState = () => {
      var _a;
      if (!props.visible) {
        selectingStartDate.value = false;
        rangeState.value.selecting = false;
        rangeState.value.endDate = null;
        return;
      }
      if (selectingStartDate.value && maxDate.value) {
        rangeState.value.selecting = true;
        rangeState.value.endDate = maxDate.value;
        return;
      }
      if (!minDate.value) {
        rangeState.value.selecting = false;
        rangeState.value.endDate = null;
        return;
      }
      rangeState.value.selecting = true;
      rangeState.value.endDate = (_a = maxDate.value) != null ? _a : null;
    };
    function onParsedValueChanged(minDate2, maxDate2) {
      const today = dayjs().locale(lang.value);
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
    watch(() => props.visible, syncHoverRangeState, { immediate: true });
    watch([minDate, maxDate], syncHoverRangeState);
    emit("set-picker-option", ["isValidValue", isValidValue]);
    emit("set-picker-option", ["parseUserInput", parseUserInput]);
    emit("set-picker-option", ["handleClear", handleClear]);
    emit("set-picker-option", [
      "handleClosePick",
      () => {
        if (minDate.value || maxDate.value) {
          emitEndRange(false);
        }
      }
    ]);
    emit("set-picker-option", ["formatToString", formatToString]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["data-end-range", [unref(ppNs).b(), unref(drpNs).b()]]),
        onMouseleave: syncHoverRangeState
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(ppNs).e("body-wrapper"))
        }, [
          renderSlot(_ctx.$slots, "option"),
          createElementVNode("div", {
            class: normalizeClass(unref(ppNs).e("body"))
          }, [
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
                "selection-mode": "date",
                date: leftDate.value,
                "parsed-value": unref(displayedDate),
                "min-date": unref(displayMinDate),
                "max-date": unref(displayMaxDate),
                "range-state": unref(rangeState),
                "disabled-date": disabledDate,
                "cell-class-name": unref(cellClassName),
                "show-week-number": _ctx.showWeekNumber,
                onChangerange: unref(handleChangeRange),
                onPick: handleDatePick
              }, null, 8, ["date", "parsed-value", "min-date", "max-date", "range-state", "cell-class-name", "show-week-number", "onChangerange"])) : createCommentVNode("v-if", true),
              unref(leftCurrentView) === "year" ? (openBlock(), createBlock(YearTable, {
                key: 1,
                ref_key: "leftCurrentViewRef",
                ref: leftCurrentViewRef,
                "selection-mode": "year",
                date: leftDate.value,
                "disabled-date": disabledDate,
                "parsed-value": _ctx.parsedValue,
                onPick: unref(handleLeftYearPick)
              }, null, 8, ["date", "parsed-value", "onPick"])) : createCommentVNode("v-if", true),
              unref(leftCurrentView) === "month" ? (openBlock(), createBlock(MonthTable, {
                key: 2,
                ref_key: "leftCurrentViewRef",
                ref: leftCurrentViewRef,
                "selection-mode": "month",
                date: leftDate.value,
                "parsed-value": _ctx.parsedValue,
                "disabled-date": disabledDate,
                onPick: unref(handleLeftMonthPick)
              }, null, 8, ["date", "parsed-value", "onPick"])) : createCommentVNode("v-if", true)
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
                "selection-mode": "date",
                date: rightDate.value,
                "parsed-value": unref(displayedDate),
                "min-date": unref(displayMinDate),
                "max-date": unref(displayMaxDate),
                "range-state": unref(rangeState),
                "disabled-date": disabledDate,
                "cell-class-name": unref(cellClassName),
                "show-week-number": _ctx.showWeekNumber,
                onChangerange: unref(handleChangeRange),
                onPick: handleDatePick
              }, null, 8, ["date", "parsed-value", "min-date", "max-date", "range-state", "cell-class-name", "show-week-number", "onChangerange"])) : createCommentVNode("v-if", true),
              unref(rightCurrentView) === "year" ? (openBlock(), createBlock(YearTable, {
                key: 1,
                ref_key: "rightCurrentViewRef",
                ref: rightCurrentViewRef,
                "selection-mode": "year",
                date: rightDate.value,
                "disabled-date": disabledDate,
                "parsed-value": _ctx.parsedValue,
                onPick: unref(handleRightYearPick)
              }, null, 8, ["date", "parsed-value", "onPick"])) : createCommentVNode("v-if", true),
              unref(rightCurrentView) === "month" ? (openBlock(), createBlock(MonthTable, {
                key: 2,
                ref_key: "rightCurrentViewRef",
                ref: rightCurrentViewRef,
                "selection-mode": "month",
                date: rightDate.value,
                "parsed-value": _ctx.parsedValue,
                "disabled-date": disabledDate,
                onPick: unref(handleRightMonthPick)
              }, null, 8, ["date", "parsed-value", "onPick"])) : createCommentVNode("v-if", true)
            ], 2)
          ], 2)
        ], 2),
        unref(showFooter) && (unref(clearable) || unref(isOk)) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ppNs).e("footer"))
        }, [
          unref(clearable) ? (openBlock(), createBlock(unref(ElButton), {
            key: 0,
            class: normalizeClass(unref(ppNs).e("link-btn")),
            onClick: handleClear
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("el.datepicker.clear")), 1)
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", true)
        ], 2)) : createCommentVNode("v-if", true)
      ], 34);
    };
  }
});
var DateEndRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "panel-end-range.vue"]]);

export { DateEndRangePickPanel as default };
//# sourceMappingURL=panel-end-range.mjs.map
