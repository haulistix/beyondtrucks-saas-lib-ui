import { defineComponent, ref, inject, toRef, computed, useSlots, watch, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, renderSlot, Fragment, renderList, toDisplayString, createCommentVNode, createVNode, withCtx, createBlock } from 'vue';
import dayjs from 'dayjs';
import ElButton from '../../../button/src/button.mjs';
import { ElIcon } from '../../../icon/index.mjs';
import { panelYearRangeProps, panelYearRangeEmits } from '../props/panel-year-range.mjs';
import { useYearRangeHeader } from '../composables/use-year-range-header.mjs';
import { useRangePicker } from '../composables/use-range-picker.mjs';
import { correctlyParseUserInput, isValidRange, getDefaultValue } from '../utils.mjs';
import { ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY } from '../constants.mjs';
import YearTable from './basic-year-table.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { PICKER_BASE_INJECTION_KEY } from '../../../time-picker/src/constants.mjs';
import { isArray } from '@vue/shared';

const step = 10;
const unit = "year";
const __default__ = defineComponent({
  name: "DatePickerYearRange"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: panelYearRangeProps,
  emits: panelYearRangeEmits,
  setup(__props, { emit }) {
    const props = __props;
    const { lang } = useLocale();
    const leftDate = ref(dayjs().locale(lang.value));
    const rightDate = ref(dayjs().locale(lang.value).add(step, unit));
    const isDefaultFormat = inject(ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY);
    const pickerBase = inject(PICKER_BASE_INJECTION_KEY);
    const { shortcuts, disabledDate } = pickerBase.props;
    const format = toRef(pickerBase.props, "format");
    const defaultValue = toRef(pickerBase.props, "defaultValue");
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
    } = useRangePicker(props, {
      defaultValue,
      leftDate,
      rightDate,
      step,
      unit,
      onParsedValueChanged
    });
    const {
      leftPrevYear,
      rightNextYear,
      leftNextYear,
      rightPrevYear,
      leftLabel,
      rightLabel,
      leftYear,
      rightYear
    } = useYearRangeHeader({
      unlinkPanels: toRef(props, "unlinkPanels"),
      leftDate,
      rightDate
    });
    const hasShortcuts = computed(() => !!shortcuts.length);
    const panelKls = computed(() => [
      ppNs.b(),
      drpNs.b(),
      {
        "has-sidebar": Boolean(useSlots().sidebar) || hasShortcuts.value
      }
    ]);
    const leftPanelKls = computed(() => {
      return {
        content: [ppNs.e("content"), drpNs.e("content"), "is-left"],
        arrowLeftBtn: [ppNs.e("icon-btn"), "d-arrow-left"],
        arrowRightBtn: [
          ppNs.e("icon-btn"),
          ppNs.is("disabled", !enableYearArrow.value),
          "d-arrow-right"
        ]
      };
    });
    const rightPanelKls = computed(() => {
      return {
        content: [ppNs.e("content"), drpNs.e("content"), "is-right"],
        arrowLeftBtn: [
          ppNs.e("icon-btn"),
          ppNs.is("disabled", !enableYearArrow.value),
          "d-arrow-left"
        ],
        arrowRightBtn: [ppNs.e("icon-btn"), "d-arrow-right"]
      };
    });
    const enableYearArrow = computed(() => {
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
    const parseUserInput = (value) => {
      return correctlyParseUserInput(value, format.value, lang.value, isDefaultFormat);
    };
    const formatToString = (value) => {
      return isArray(value) ? value.map((day) => day.format(format.value)) : value.format(format.value);
    };
    const isValidValue = (date) => {
      return isValidRange(date) && (disabledDate ? !disabledDate(date[0].toDate()) && !disabledDate(date[1].toDate()) : true);
    };
    const handleClear = () => {
      let valueOnClear = null;
      if (pickerBase == null ? void 0 : pickerBase.emptyValues) {
        valueOnClear = pickerBase.emptyValues.valueOnClear.value;
      }
      const defaultArr = getDefaultValue(unref(defaultValue), {
        lang: unref(lang),
        step,
        unit,
        unlinkPanels: props.unlinkPanels
      });
      leftDate.value = defaultArr[0];
      rightDate.value = defaultArr[1];
      emit("pick", valueOnClear);
    };
    function onParsedValueChanged(minDate2, maxDate2) {
      if (props.unlinkPanels && maxDate2) {
        const minDateYear = (minDate2 == null ? void 0 : minDate2.year()) || 0;
        const maxDateYear = maxDate2.year();
        rightDate.value = minDateYear + step > maxDateYear ? maxDate2.add(step, unit) : maxDate2;
      } else {
        rightDate.value = leftDate.value.add(step, unit);
      }
    }
    watch(() => props.visible, (visible) => {
      if (!visible && rangeState.value.selecting) {
        onReset(props.parsedValue);
        onSelect(false);
      }
    });
    emit("set-picker-option", ["isValidValue", isValidValue]);
    emit("set-picker-option", ["parseUserInput", parseUserInput]);
    emit("set-picker-option", ["formatToString", formatToString]);
    emit("set-picker-option", ["handleClear", handleClear]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(panelKls))
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
            createElementVNode("div", {
              class: normalizeClass(unref(leftPanelKls).content)
            }, [
              createElementVNode("div", {
                class: normalizeClass(unref(drpNs).e("header"))
              }, [
                createVNode(ElButton, {
                  text: "",
                  class: normalizeClass(["icon-button", unref(leftPanelKls).arrowLeftBtn]),
                  onClick: unref(leftPrevYear)
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
                }, 8, ["class", "onClick"]),
                _ctx.unlinkPanels ? (openBlock(), createBlock(ElButton, {
                  key: 0,
                  text: "",
                  class: normalizeClass(["icon-button", unref(leftPanelKls).arrowRightBtn]),
                  disabled: !unref(enableYearArrow),
                  onClick: unref(leftNextYear)
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
                }, 8, ["disabled", "class", "onClick"])) : createCommentVNode("v-if", true),
                createElementVNode("div", null, toDisplayString(unref(leftLabel)), 1)
              ], 2),
              createVNode(YearTable, {
                "selection-mode": "range",
                date: leftDate.value,
                "min-date": unref(minDate),
                "max-date": unref(maxDate),
                "range-state": unref(rangeState),
                "disabled-date": unref(disabledDate),
                onChangerange: unref(handleChangeRange),
                onPick: handleRangePick,
                onSelect: unref(onSelect)
              }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
            ], 2),
            createElementVNode("div", {
              class: normalizeClass(unref(rightPanelKls).content)
            }, [
              createElementVNode("div", {
                class: normalizeClass(unref(drpNs).e("header"))
              }, [
                _ctx.unlinkPanels ? (openBlock(), createBlock(ElButton, {
                  key: 0,
                  text: "",
                  class: normalizeClass(["icon-button", unref(rightPanelKls).arrowLeftBtn]),
                  disabled: !unref(enableYearArrow),
                  onClick: unref(rightPrevYear)
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
                }, 8, ["disabled", "class", "onClick"])) : createCommentVNode("v-if", true),
                createVNode(ElButton, {
                  text: "",
                  class: normalizeClass(["icon-button", unref(rightPanelKls).arrowRightBtn]),
                  onClick: unref(rightNextYear)
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
                }, 8, ["class", "onClick"]),
                createElementVNode("div", null, toDisplayString(unref(rightLabel)), 1)
              ], 2),
              createVNode(YearTable, {
                "selection-mode": "range",
                date: rightDate.value,
                "min-date": unref(minDate),
                "max-date": unref(maxDate),
                "range-state": unref(rangeState),
                "disabled-date": unref(disabledDate),
                onChangerange: unref(handleChangeRange),
                onPick: handleRangePick,
                onSelect: unref(onSelect)
              }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "onChangerange", "onSelect"])
            ], 2)
          ], 2)
        ], 2)
      ], 2);
    };
  }
});
var YearRangePickPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "panel-year-range.vue"]]);

export { YearRangePickPanel as default };
//# sourceMappingURL=panel-year-range.mjs.map
