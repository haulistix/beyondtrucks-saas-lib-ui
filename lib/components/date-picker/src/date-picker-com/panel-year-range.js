'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var button = require('../../../button/src/button.js');
var index$1 = require('../../../icon/index.js');
var panelYearRange = require('../props/panel-year-range.js');
var useYearRangeHeader = require('../composables/use-year-range-header.js');
var useRangePicker = require('../composables/use-range-picker.js');
var utils = require('../utils.js');
var constants = require('../constants.js');
var basicYearTable = require('./basic-year-table.js');
var pluginVue_exportHelper = require('../../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../../hooks/use-locale/index.js');
var constants$1 = require('../../../time-picker/src/constants.js');
var shared = require('@vue/shared');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

const step = 10;
const unit = "year";
const __default__ = vue.defineComponent({
  name: "DatePickerYearRange"
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: panelYearRange.panelYearRangeProps,
  emits: panelYearRange.panelYearRangeEmits,
  setup(__props, { emit }) {
    const props = __props;
    const { lang } = index.useLocale();
    const leftDate = vue.ref(dayjs__default["default"]().locale(lang.value));
    const rightDate = vue.ref(dayjs__default["default"]().locale(lang.value).add(step, unit));
    const isDefaultFormat = vue.inject(constants.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY);
    const pickerBase = vue.inject(constants$1.PICKER_BASE_INJECTION_KEY);
    const { shortcuts, disabledDate } = pickerBase.props;
    const format = vue.toRef(pickerBase.props, "format");
    const defaultValue = vue.toRef(pickerBase.props, "defaultValue");
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
    } = useYearRangeHeader.useYearRangeHeader({
      unlinkPanels: vue.toRef(props, "unlinkPanels"),
      leftDate,
      rightDate
    });
    const hasShortcuts = vue.computed(() => !!shortcuts.length);
    const panelKls = vue.computed(() => [
      ppNs.b(),
      drpNs.b(),
      {
        "has-sidebar": Boolean(vue.useSlots().sidebar) || hasShortcuts.value
      }
    ]);
    const leftPanelKls = vue.computed(() => {
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
    const rightPanelKls = vue.computed(() => {
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
    const parseUserInput = (value) => {
      return utils.correctlyParseUserInput(value, format.value, lang.value, isDefaultFormat);
    };
    const formatToString = (value) => {
      return shared.isArray(value) ? value.map((day) => day.format(format.value)) : value.format(format.value);
    };
    const isValidValue = (date) => {
      return utils.isValidRange(date) && (disabledDate ? !disabledDate(date[0].toDate()) && !disabledDate(date[1].toDate()) : true);
    };
    const handleClear = () => {
      let valueOnClear = null;
      if (pickerBase == null ? void 0 : pickerBase.emptyValues) {
        valueOnClear = pickerBase.emptyValues.valueOnClear.value;
      }
      const defaultArr = utils.getDefaultValue(vue.unref(defaultValue), {
        lang: vue.unref(lang),
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
    vue.watch(() => props.visible, (visible) => {
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
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass(vue.unref(panelKls))
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
              class: vue.normalizeClass(vue.unref(leftPanelKls).content)
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(drpNs).e("header"))
              }, [
                vue.createVNode(button["default"], {
                  text: "",
                  class: vue.normalizeClass(["icon-button", vue.unref(leftPanelKls).arrowLeftBtn]),
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
                  class: vue.normalizeClass(["icon-button", vue.unref(leftPanelKls).arrowRightBtn]),
                  disabled: !vue.unref(enableYearArrow),
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
              vue.createVNode(basicYearTable["default"], {
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
              class: vue.normalizeClass(vue.unref(rightPanelKls).content)
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(drpNs).e("header"))
              }, [
                _ctx.unlinkPanels ? (vue.openBlock(), vue.createBlock(button["default"], {
                  key: 0,
                  text: "",
                  class: vue.normalizeClass(["icon-button", vue.unref(rightPanelKls).arrowLeftBtn]),
                  disabled: !vue.unref(enableYearArrow),
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
                  class: vue.normalizeClass(["icon-button", vue.unref(rightPanelKls).arrowRightBtn]),
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
              vue.createVNode(basicYearTable["default"], {
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
var YearRangePickPanel = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "panel-year-range.vue"]]);

exports["default"] = YearRangePickPanel;
//# sourceMappingURL=panel-year-range.js.map
