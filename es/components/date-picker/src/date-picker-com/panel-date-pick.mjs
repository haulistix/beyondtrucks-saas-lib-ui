import { defineComponent, useAttrs, useSlots, inject, toRef, ref, computed, watch, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, renderSlot, Fragment, renderList, toDisplayString, createCommentVNode, createVNode, withDirectives, withKeys, vShow, withCtx, createBlock, createTextVNode, nextTick } from 'vue';
import dayjs from 'dayjs';
import { ElButton } from '../../../button/index.mjs';
import { ElInput } from '../../../input/index.mjs';
import '../../../time-picker/index.mjs';
import { ElIcon } from '../../../icon/index.mjs';
import { panelDatePickProps } from '../props/panel-date-pick.mjs';
import { getValidDateOfMonth, getValidDateOfYear, correctlyParseUserInput } from '../utils.mjs';
import { ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY } from '../constants.mjs';
import DateTable from './basic-date-table.mjs';
import MonthTable from './basic-month-table.mjs';
import YearTable from './basic-year-table.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import { PICKER_BASE_INJECTION_KEY } from '../../../time-picker/src/constants.mjs';
import { TOOLTIP_INJECTION_KEY } from '../../../tooltip/src/constants.mjs';
import { extractTimeFormat, extractDateFormat } from '../../../time-picker/src/utils.mjs';
import { extractFirst } from '../../../../utils/arrays.mjs';
import TimePickPanel from '../../../time-picker/src/time-picker-com/panel-time-pick.mjs';
import ClickOutside from '../../../../directives/click-outside/index.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { isArray, isFunction } from '@vue/shared';
import { EVENT_CODE } from '../../../../constants/aria.mjs';
import { getEventCode } from '../../../../utils/dom/event.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "panel-date-pick",
  props: panelDatePickProps,
  emits: ["pick", "set-picker-option", "panel-change"],
  setup(__props, { emit: contextEmit }) {
    const props = __props;
    const timeWithinRange = (_, __, ___) => true;
    const ppNs = useNamespace("picker-panel");
    const dpNs = useNamespace("date-picker");
    const attrs = useAttrs();
    const slots = useSlots();
    const { t, lang } = useLocale();
    const pickerBase = inject(PICKER_BASE_INJECTION_KEY);
    const isDefaultFormat = inject(ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY);
    const popper = inject(TOOLTIP_INJECTION_KEY);
    const { shortcuts, disabledDate, cellClassName, defaultTime } = pickerBase.props;
    const defaultValue = toRef(pickerBase.props, "defaultValue");
    const currentViewRef = ref();
    const innerDate = ref(dayjs().locale(lang.value));
    const isChangeToNow = ref(false);
    let isShortcut = false;
    const defaultTimeD = computed(() => {
      return dayjs(defaultTime).locale(lang.value);
    });
    const month = computed(() => {
      return innerDate.value.month();
    });
    const year = computed(() => {
      return innerDate.value.year();
    });
    const selectableRange = ref([]);
    const userInputDate = ref(null);
    const userInputTime = ref(null);
    const checkDateWithinRange = (date) => {
      return selectableRange.value.length > 0 ? timeWithinRange(date, selectableRange.value, props.format || "HH:mm:ss") : true;
    };
    const formatEmit = (emitDayjs) => {
      if (defaultTime && !visibleTime.value && !isChangeToNow.value && !isShortcut) {
        return defaultTimeD.value.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
      }
      if (showTime.value)
        return emitDayjs.millisecond(0);
      return emitDayjs.startOf("day");
    };
    const emit = (value, ...args) => {
      if (!value) {
        contextEmit("pick", value, ...args);
      } else if (isArray(value)) {
        const dates = value.map(formatEmit);
        contextEmit("pick", dates, ...args);
      } else {
        contextEmit("pick", formatEmit(value), ...args);
      }
      userInputDate.value = null;
      userInputTime.value = null;
      isChangeToNow.value = false;
      isShortcut = false;
    };
    const handleDatePick = async (value, keepOpen) => {
      if (selectionMode.value === "date" && dayjs.isDayjs(value)) {
        const parsedDateValue = extractFirst(props.parsedValue);
        let newDate = parsedDateValue ? parsedDateValue.year(value.year()).month(value.month()).date(value.date()) : value;
        if (!checkDateWithinRange(newDate)) {
          newDate = selectableRange.value[0][0].year(value.year()).month(value.month()).date(value.date());
        }
        innerDate.value = newDate;
        emit(newDate, showTime.value || keepOpen);
        if (props.type === "datetime") {
          await nextTick();
          handleFocusPicker();
        }
      } else if (selectionMode.value === "week") {
        emit(value.date);
      } else if (selectionMode.value === "dates") {
        emit(value, true);
      }
    };
    const moveByMonth = (forward) => {
      const action = forward ? "add" : "subtract";
      innerDate.value = innerDate.value[action](1, "month");
      handlePanelChange("month");
    };
    const moveByYear = (forward) => {
      const currentDate = innerDate.value;
      const action = forward ? "add" : "subtract";
      innerDate.value = currentView.value === "year" ? currentDate[action](10, "year") : currentDate[action](1, "year");
      handlePanelChange("year");
    };
    const currentView = ref("date");
    const yearLabel = computed(() => {
      const yearTranslation = t("el.datepicker.year");
      if (currentView.value === "year") {
        const startYear = Math.floor(year.value / 10) * 10;
        if (yearTranslation) {
          return `${startYear} ${yearTranslation} - ${startYear + 9} ${yearTranslation}`;
        }
        return `${startYear} - ${startYear + 9}`;
      }
      return `${year.value} ${yearTranslation}`;
    });
    const setNow = () => {
      emit(dayjs(/* @__PURE__ */ new Date()).locale(lang.value));
    };
    const handleShortcutClick = (shortcut) => {
      const shortcutValue = isFunction(shortcut.value) ? shortcut.value() : shortcut.value;
      if (shortcutValue) {
        isShortcut = true;
        emit(dayjs(shortcutValue).locale(lang.value));
        return;
      }
      if (shortcut.onClick) {
        shortcut.onClick({
          attrs,
          slots,
          emit: contextEmit
        });
      }
    };
    const selectionMode = computed(() => {
      const { type } = props;
      if (["week", "month", "months", "year", "years", "dates"].includes(type))
        return type;
      return "date";
    });
    const isMultipleType = computed(() => {
      return selectionMode.value === "dates" || selectionMode.value === "months" || selectionMode.value === "years";
    });
    const keyboardMode = computed(() => {
      return selectionMode.value === "date" ? currentView.value : selectionMode.value;
    });
    const hasShortcuts = computed(() => !!shortcuts.length);
    const handleMonthPick = async (month2, keepOpen) => {
      if (selectionMode.value === "month") {
        innerDate.value = getValidDateOfMonth(innerDate.value, innerDate.value.year(), month2, lang.value, disabledDate);
        emit(innerDate.value, false);
      } else if (selectionMode.value === "months") {
        emit(month2, keepOpen != null ? keepOpen : true);
      } else {
        innerDate.value = getValidDateOfMonth(innerDate.value, innerDate.value.year(), month2, lang.value, disabledDate);
        currentView.value = "date";
        if (["month", "year", "date", "week"].includes(selectionMode.value)) {
          emit(innerDate.value, true);
          await nextTick();
          handleFocusPicker();
        }
      }
      handlePanelChange("month");
    };
    const handleYearPick = async (year2, keepOpen) => {
      if (selectionMode.value === "year") {
        const data = innerDate.value.startOf("year").year(year2);
        innerDate.value = getValidDateOfYear(data, lang.value, disabledDate);
        emit(innerDate.value, false);
      } else if (selectionMode.value === "years") {
        emit(year2, keepOpen != null ? keepOpen : true);
      } else {
        const data = innerDate.value.year(year2);
        innerDate.value = getValidDateOfYear(data, lang.value, disabledDate);
        currentView.value = "month";
        if (["month", "year", "date", "week"].includes(selectionMode.value)) {
          emit(innerDate.value, true);
          await nextTick();
          handleFocusPicker();
        }
      }
      handlePanelChange("year");
    };
    const showPicker = async (view) => {
      currentView.value = view;
      await nextTick();
      handleFocusPicker();
    };
    const showTime = computed(() => props.type === "datetime" || props.type === "datetimerange");
    const footerVisible = computed(() => {
      const showDateFooter = showTime.value || selectionMode.value === "dates";
      const showYearFooter = selectionMode.value === "years";
      const showMonthFooter = selectionMode.value === "months";
      const isDateView = currentView.value === "date";
      const isYearView = currentView.value === "year";
      const isMonthView = currentView.value === "month";
      return showDateFooter && isDateView || showYearFooter && isYearView || showMonthFooter && isMonthView;
    });
    const disabledConfirm = computed(() => {
      if (!disabledDate)
        return false;
      if (!props.parsedValue)
        return true;
      if (isArray(props.parsedValue)) {
        return disabledDate(props.parsedValue[0].toDate());
      }
      return disabledDate(props.parsedValue.toDate());
    });
    const onConfirm = () => {
      if (isMultipleType.value) {
        emit(props.parsedValue);
      } else {
        let result = extractFirst(props.parsedValue);
        if (!result) {
          const defaultTimeD2 = dayjs(defaultTime).locale(lang.value);
          const defaultValueD = getDefaultValue();
          result = defaultTimeD2.year(defaultValueD.year()).month(defaultValueD.month()).date(defaultValueD.date());
        }
        innerDate.value = result;
        emit(result);
      }
    };
    const disabledNow = computed(() => {
      if (!disabledDate)
        return false;
      return disabledDate(dayjs().locale(lang.value).toDate());
    });
    const changeToNow = () => {
      const now = dayjs().locale(lang.value);
      const nowDate = now.toDate();
      isChangeToNow.value = true;
      if ((!disabledDate || !disabledDate(nowDate)) && checkDateWithinRange(nowDate)) {
        innerDate.value = dayjs().locale(lang.value);
        emit(innerDate.value);
      }
    };
    const timeFormat = computed(() => {
      return props.timeFormat || extractTimeFormat(props.format);
    });
    const dateFormat = computed(() => {
      return props.dateFormat || extractDateFormat(props.format);
    });
    const visibleTime = computed(() => {
      if (userInputTime.value)
        return userInputTime.value;
      if (!props.parsedValue && !defaultValue.value)
        return;
      const dateValue = extractFirst(props.parsedValue) || innerDate.value;
      return dateValue.format(timeFormat.value);
    });
    const visibleDate = computed(() => {
      if (userInputDate.value)
        return userInputDate.value;
      if (!props.parsedValue && !defaultValue.value)
        return;
      const dateValue = extractFirst(props.parsedValue) || innerDate.value;
      return dateValue.format(dateFormat.value);
    });
    const timePickerVisible = ref(false);
    const onTimePickerInputFocus = () => {
      timePickerVisible.value = true;
    };
    const handleTimePickClose = () => {
      timePickerVisible.value = false;
    };
    const getUnits = (date) => {
      return {
        hour: date.hour(),
        minute: date.minute(),
        second: date.second(),
        year: date.year(),
        month: date.month(),
        date: date.date()
      };
    };
    const handleTimePick = (value, visible, first) => {
      const { hour, minute, second } = getUnits(value);
      const parsedDateValue = extractFirst(props.parsedValue);
      const newDate = parsedDateValue ? parsedDateValue.hour(hour).minute(minute).second(second) : value;
      innerDate.value = newDate;
      emit(innerDate.value, true);
      if (!first) {
        timePickerVisible.value = visible;
      }
    };
    const handleVisibleTimeChange = (value) => {
      const newDate = dayjs(value, timeFormat.value).locale(lang.value);
      if (newDate.isValid() && checkDateWithinRange(newDate)) {
        const { year: year2, month: month2, date } = getUnits(innerDate.value);
        innerDate.value = newDate.year(year2).month(month2).date(date);
        userInputTime.value = null;
        timePickerVisible.value = false;
        emit(innerDate.value, true);
      }
    };
    const handleVisibleDateChange = (value) => {
      const newDate = correctlyParseUserInput(value, dateFormat.value, lang.value, isDefaultFormat);
      if (newDate.isValid()) {
        if (disabledDate && disabledDate(newDate.toDate())) {
          return;
        }
        const { hour, minute, second } = getUnits(innerDate.value);
        innerDate.value = newDate.hour(hour).minute(minute).second(second);
        userInputDate.value = null;
        emit(innerDate.value, true);
      }
    };
    const isValidValue = (date) => {
      return dayjs.isDayjs(date) && date.isValid() && (disabledDate ? !disabledDate(date.toDate()) : true);
    };
    const parseUserInput = (value) => {
      return correctlyParseUserInput(value, props.format, lang.value, isDefaultFormat);
    };
    const getDefaultValue = () => {
      const parseDate = dayjs(defaultValue.value).locale(lang.value);
      if (!defaultValue.value) {
        const defaultTimeDValue = defaultTimeD.value;
        return dayjs().hour(defaultTimeDValue.hour()).minute(defaultTimeDValue.minute()).second(defaultTimeDValue.second()).locale(lang.value);
      }
      return parseDate;
    };
    const handleFocusPicker = () => {
      var _a;
      if (["week", "month", "year", "date"].includes(selectionMode.value)) {
        (_a = currentViewRef.value) == null ? void 0 : _a.focus();
      }
    };
    const _handleFocusPicker = () => {
      handleFocusPicker();
      if (selectionMode.value === "week") {
        handleKeyControl(EVENT_CODE.down);
      }
    };
    const handleKeydownTable = (event) => {
      const code = getEventCode(event);
      const validCode = [
        EVENT_CODE.up,
        EVENT_CODE.down,
        EVENT_CODE.left,
        EVENT_CODE.right,
        EVENT_CODE.home,
        EVENT_CODE.end,
        EVENT_CODE.pageUp,
        EVENT_CODE.pageDown
      ];
      if (validCode.includes(code)) {
        handleKeyControl(code);
        event.stopPropagation();
        event.preventDefault();
      }
      if ([EVENT_CODE.enter, EVENT_CODE.space, EVENT_CODE.numpadEnter].includes(code) && userInputDate.value === null && userInputTime.value === null) {
        event.preventDefault();
        emit(innerDate.value, false);
      }
    };
    const handleKeyControl = (code) => {
      var _a;
      const { up, down, left, right, home, end, pageUp, pageDown } = EVENT_CODE;
      const mapping = {
        year: {
          [up]: -4,
          [down]: 4,
          [left]: -1,
          [right]: 1,
          offset: (date, step) => date.setFullYear(date.getFullYear() + step)
        },
        month: {
          [up]: -4,
          [down]: 4,
          [left]: -1,
          [right]: 1,
          offset: (date, step) => date.setMonth(date.getMonth() + step)
        },
        week: {
          [up]: -1,
          [down]: 1,
          [left]: -1,
          [right]: 1,
          offset: (date, step) => date.setDate(date.getDate() + step * 7)
        },
        date: {
          [up]: -7,
          [down]: 7,
          [left]: -1,
          [right]: 1,
          [home]: (date) => -date.getDay(),
          [end]: (date) => -date.getDay() + 6,
          [pageUp]: (date) => -new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
          [pageDown]: (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
          offset: (date, step) => date.setDate(date.getDate() + step)
        }
      };
      const newDate = innerDate.value.toDate();
      while (Math.abs(innerDate.value.diff(newDate, "year", true)) < 1) {
        const map = mapping[keyboardMode.value];
        if (!map)
          return;
        map.offset(newDate, isFunction(map[code]) ? map[code](newDate) : (_a = map[code]) != null ? _a : 0);
        if (disabledDate && disabledDate(newDate)) {
          break;
        }
        const result = dayjs(newDate).locale(lang.value);
        innerDate.value = result;
        contextEmit("pick", result, true);
        break;
      }
    };
    const handlePanelChange = (mode) => {
      contextEmit("panel-change", innerDate.value.toDate(), mode, currentView.value);
    };
    watch(() => selectionMode.value, (val) => {
      if (["month", "year"].includes(val)) {
        currentView.value = val;
        return;
      } else if (val === "years") {
        currentView.value = "year";
        return;
      } else if (val === "months") {
        currentView.value = "month";
        return;
      }
      currentView.value = "date";
    }, { immediate: true });
    watch(() => currentView.value, () => {
      popper == null ? void 0 : popper.updatePopper();
    });
    watch(() => defaultValue.value, (val) => {
      if (val) {
        innerDate.value = getDefaultValue();
      }
    }, { immediate: true });
    watch(() => props.parsedValue, (val) => {
      if (val) {
        if (isMultipleType.value)
          return;
        if (isArray(val))
          return;
        innerDate.value = val;
      } else {
        innerDate.value = getDefaultValue();
      }
    }, { immediate: true });
    contextEmit("set-picker-option", ["isValidValue", isValidValue]);
    contextEmit("set-picker-option", ["parseUserInput", parseUserInput]);
    contextEmit("set-picker-option", ["handleFocusPicker", _handleFocusPicker]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ppNs).b(),
          unref(dpNs).b(),
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
                onClick: ($event) => handleShortcutClick(shortcut)
              }, toDisplayString(shortcut.text), 11, ["onClick"]);
            }), 128))
          ], 2)) : createCommentVNode("v-if", true),
          createElementVNode("div", {
            class: normalizeClass(unref(ppNs).e("body"))
          }, [
            unref(showTime) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(unref(dpNs).e("time-header"))
            }, [
              createElementVNode("span", {
                class: normalizeClass(unref(dpNs).e("editor-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  placeholder: unref(t)("el.datepicker.selectDate"),
                  "model-value": unref(visibleDate),
                  size: "small",
                  "validate-event": false,
                  onInput: (val) => userInputDate.value = val,
                  onChange: handleVisibleDateChange
                }, null, 8, ["placeholder", "model-value", "onInput"])
              ], 2),
              withDirectives((openBlock(), createElementBlock("span", {
                class: normalizeClass(unref(dpNs).e("editor-wrap"))
              }, [
                createVNode(unref(ElInput), {
                  placeholder: unref(t)("el.datepicker.selectTime"),
                  "model-value": unref(visibleTime),
                  size: "small",
                  "validate-event": false,
                  onFocus: onTimePickerInputFocus,
                  onInput: (val) => userInputTime.value = val,
                  onChange: handleVisibleTimeChange
                }, null, 8, ["placeholder", "model-value", "onInput"]),
                createVNode(unref(TimePickPanel), {
                  visible: timePickerVisible.value,
                  format: unref(timeFormat),
                  "parsed-value": innerDate.value,
                  onPick: handleTimePick
                }, null, 8, ["visible", "format", "parsed-value"])
              ], 2)), [
                [unref(ClickOutside), handleTimePickClose]
              ])
            ], 2)) : createCommentVNode("v-if", true),
            withDirectives(createElementVNode("div", {
              class: normalizeClass([
                unref(dpNs).e("header"),
                (currentView.value === "year" || currentView.value === "month") && unref(dpNs).em("header", "bordered")
              ])
            }, [
              createElementVNode("div", null, [
                withDirectives(createElementVNode("div", {
                  role: "button",
                  "aria-live": "polite",
                  tabindex: "0",
                  class: normalizeClass([
                    unref(dpNs).e("header-label"),
                    { active: currentView.value === "month" }
                  ]),
                  onKeydown: withKeys(($event) => showPicker("month"), ["enter"]),
                  onClick: ($event) => showPicker("month")
                }, toDisplayString(unref(t)(`el.datepicker.month${unref(month) + 1}`)), 43, ["onKeydown", "onClick"]), [
                  [vShow, currentView.value === "date"]
                ]),
                createElementVNode("div", {
                  role: "button",
                  class: normalizeClass(unref(dpNs).e("header-label")),
                  "aria-live": "polite",
                  tabindex: "0",
                  onKeydown: withKeys(($event) => showPicker("year"), ["enter"]),
                  onClick: ($event) => showPicker("year")
                }, toDisplayString(unref(yearLabel)), 43, ["onKeydown", "onClick"])
              ]),
              createElementVNode("div", null, [
                createElementVNode("div", {
                  class: normalizeClass(unref(dpNs).e("custom-now-btn"))
                }, [
                  createVNode(unref(ElButton), {
                    class: normalizeClass(["icon-button", unref(ppNs).e("icon-btn")]),
                    text: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ElIcon), {
                        size: "16px",
                        color: "#374957",
                        onClick: setNow
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createElementBlock("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 16 16",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createElementVNode("g", { id: "fi-ss-small-undo-alt" }, [
                              createElementVNode("path", {
                                id: "Vector",
                                d: "M11.069 5.88475L5.02766 5.89723L6.20495 4.76619L5.43876 4L3.65061 5.78814C3.44745 5.99137 3.33331 6.26697 3.33331 6.55433C3.33331 6.8417 3.44745 7.1173 3.65061 7.32052L5.43876 9.10867L6.20495 8.34247L5.01157 7.19437H10.7885C10.8364 7.19437 10.8824 7.2134 10.9163 7.24727C10.9501 7.28114 10.9692 7.32708 10.9692 7.37499L10.9163 11.1527C10.9163 11.2006 10.8972 11.2466 10.8634 11.2804C10.8295 11.3143 10.7835 11.3333 10.7356 11.3333H4.05267V12.6667H11C11.3353 12.6667 11.6569 12.5335 11.894 12.2963C12.1311 12.0592 12.2643 11.7376 12.2643 11.4023L12.3333 7.1491C12.3333 6.81377 12.2001 6.49218 11.963 6.25507C11.7259 6.01796 11.4043 5.88475 11.069 5.88475Z"
                              })
                            ])
                          ]))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["class"])
                ], 2),
                createElementVNode("div", {
                  class: normalizeClass(unref(dpNs).e("prev-btn"))
                }, [
                  createVNode(unref(ElButton), {
                    text: "",
                    "aria-label": unref(t)(`el.datepicker.prevYear`),
                    class: normalizeClass(["d-arrow-left icon-button", unref(ppNs).e("icon-btn")]),
                    onClick: ($event) => moveByYear(false)
                  }, {
                    default: withCtx(() => [
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
                    ]),
                    _: 1
                  }, 8, ["aria-label", "class", "onClick"]),
                  withDirectives(createVNode(unref(ElButton), {
                    text: "",
                    "aria-label": unref(t)(`el.datepicker.prevMonth`),
                    class: normalizeClass([unref(ppNs).e("icon-btn"), "arrow-left icon-button"]),
                    onClick: ($event) => moveByMonth(false)
                  }, {
                    default: withCtx(() => [
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
                    ]),
                    _: 1
                  }, 8, ["aria-label", "class", "onClick"]), [
                    [vShow, currentView.value === "date"]
                  ])
                ], 2),
                createElementVNode("div", {
                  class: normalizeClass(unref(dpNs).e("next-btn"))
                }, [
                  withDirectives(createVNode(unref(ElButton), {
                    text: "",
                    "aria-label": unref(t)(`el.datepicker.nextMonth`),
                    class: normalizeClass([unref(ppNs).e("icon-btn"), "arrow-right icon-button"]),
                    onClick: ($event) => moveByMonth(true)
                  }, {
                    default: withCtx(() => [
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
                    ]),
                    _: 1
                  }, 8, ["aria-label", "class", "onClick"]), [
                    [vShow, currentView.value === "date"]
                  ]),
                  createVNode(unref(ElButton), {
                    text: "",
                    "aria-label": unref(t)(`el.datepicker.nextYear`),
                    class: normalizeClass([unref(ppNs).e("icon-btn"), "d-arrow-right icon-button"]),
                    onClick: ($event) => moveByYear(true)
                  }, {
                    default: withCtx(() => [
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
                    ]),
                    _: 1
                  }, 8, ["aria-label", "class", "onClick"])
                ], 2)
              ])
            ], 2), [
              [vShow, currentView.value !== "time"]
            ]),
            createElementVNode("div", {
              class: normalizeClass(unref(ppNs).e("content")),
              onKeydown: handleKeydownTable
            }, [
              currentView.value === "date" ? (openBlock(), createBlock(DateTable, {
                key: 0,
                ref_key: "currentViewRef",
                ref: currentViewRef,
                "selection-mode": unref(selectionMode),
                date: innerDate.value,
                "parsed-value": _ctx.parsedValue,
                "disabled-date": unref(disabledDate),
                "cell-class-name": unref(cellClassName),
                "show-week-number": _ctx.showWeekNumber,
                onPick: handleDatePick
              }, null, 8, ["selection-mode", "date", "parsed-value", "disabled-date", "cell-class-name", "show-week-number"])) : createCommentVNode("v-if", true),
              currentView.value === "year" ? (openBlock(), createBlock(YearTable, {
                key: 1,
                ref_key: "currentViewRef",
                ref: currentViewRef,
                "selection-mode": unref(selectionMode),
                date: innerDate.value,
                "disabled-date": unref(disabledDate),
                "parsed-value": _ctx.parsedValue,
                onPick: handleYearPick
              }, null, 8, ["selection-mode", "date", "disabled-date", "parsed-value"])) : createCommentVNode("v-if", true),
              currentView.value === "month" ? (openBlock(), createBlock(MonthTable, {
                key: 2,
                ref_key: "currentViewRef",
                ref: currentViewRef,
                "selection-mode": unref(selectionMode),
                date: innerDate.value,
                "parsed-value": _ctx.parsedValue,
                "disabled-date": unref(disabledDate),
                onPick: handleMonthPick
              }, null, 8, ["selection-mode", "date", "parsed-value", "disabled-date"])) : createCommentVNode("v-if", true)
            ], 34)
          ], 2)
        ], 2),
        withDirectives(createElementVNode("div", {
          class: normalizeClass(unref(ppNs).e("footer"))
        }, [
          withDirectives(createVNode(unref(ElButton), {
            text: "",
            size: "small",
            class: normalizeClass(unref(ppNs).e("link-btn")),
            disabled: unref(disabledNow),
            onClick: changeToNow
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("el.datepicker.now")), 1)
            ]),
            _: 1
          }, 8, ["class", "disabled"]), [
            [vShow, !unref(isMultipleType) && _ctx.showNow]
          ]),
          createVNode(unref(ElButton), {
            plain: "",
            size: "small",
            class: normalizeClass(unref(ppNs).e("link-btn")),
            disabled: unref(disabledConfirm),
            onClick: onConfirm
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("el.datepicker.confirm")), 1)
            ]),
            _: 1
          }, 8, ["class", "disabled"])
        ], 2), [
          [vShow, unref(footerVisible)]
        ])
      ], 2);
    };
  }
});
var DatePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "panel-date-pick.vue"]]);

export { DatePickPanel as default };
//# sourceMappingURL=panel-date-pick.mjs.map
