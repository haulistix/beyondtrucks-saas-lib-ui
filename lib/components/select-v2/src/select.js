'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../tooltip/index.js');
var index = require('../../tag/index.js');
var index$2 = require('../../icon/index.js');
var selectDropdown = require('./select-dropdown.js');
var useSelect = require('./useSelect.js');
var defaults = require('./defaults.js');
var token = require('./token.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$3 = require('../../../directives/click-outside/index.js');
var shared = require('@vue/shared');
var index$4 = require('../../../hooks/use-calc-input-width/index.js');
var index$5 = require('../../../hooks/use-id/index.js');
var form = require('../../../constants/form.js');

const _sfc_main = vue.defineComponent({
  name: "ElSelectV2",
  components: {
    ElSelectMenu: selectDropdown["default"],
    ElTag: index.ElTag,
    ElTooltip: index$1.ElTooltip,
    ElIcon: index$2.ElIcon
  },
  directives: { ClickOutside: index$3["default"] },
  props: defaults.selectV2Props,
  emits: defaults.selectV2Emits,
  setup(props, { emit }) {
    const modelValue = vue.computed(() => {
      const { modelValue: rawModelValue, multiple } = props;
      const fallback = multiple ? [] : void 0;
      if (shared.isArray(rawModelValue)) {
        return multiple ? rawModelValue : fallback;
      }
      return multiple ? fallback : rawModelValue;
    });
    const API = useSelect["default"](vue.reactive({
      ...vue.toRefs(props),
      modelValue
    }), emit);
    const { calculatorRef, inputStyle } = index$4.useCalcInputWidth();
    const contentId = index$5.useId();
    const validateError = vue.computed(() => (API == null ? void 0 : API.validateState.value) === "error");
    const validateMsg = vue.computed(() => (API == null ? void 0 : API.validateMessage.value) || "");
    vue.provide(token.selectV2InjectionKey, {
      props: vue.reactive({
        ...vue.toRefs(props),
        height: API.popupHeight,
        modelValue
      }),
      expanded: API.expanded,
      tooltipRef: API.tooltipRef,
      contentId,
      onSelect: API.onSelect,
      onHover: API.onHover,
      onKeyboardNavigate: API.onKeyboardNavigate,
      onKeyboardSelect: API.onKeyboardSelect
    });
    const selectedLabel = vue.computed(() => {
      if (!props.multiple) {
        return API.states.selectedLabel;
      }
      return API.states.cachedOptions.map((i) => API.getLabel(i));
    });
    return {
      ...API,
      modelValue,
      selectedLabel,
      calculatorRef,
      inputStyle,
      validateError,
      validateMsg,
      contentId,
      BORDER_HORIZONTAL_WIDTH: form.BORDER_HORIZONTAL_WIDTH
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tag = vue.resolveComponent("el-tag");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_select_menu = vue.resolveComponent("el-select-menu");
  const _directive_click_outside = vue.resolveDirective("click-outside");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
    ref: "selectRef",
    class: vue.normalizeClass([_ctx.nsSelect.b(), _ctx.nsSelect.m(_ctx.selectSize)]),
    onMouseenter: ($event) => _ctx.states.inputHovering = true,
    onMouseleave: ($event) => _ctx.states.inputHovering = false
  }, [
    vue.createVNode(_component_el_tooltip, {
      ref: "tooltipRef",
      visible: _ctx.dropdownMenuVisible,
      teleported: _ctx.teleported,
      "popper-class": [_ctx.nsSelect.e("popper"), _ctx.popperClass],
      "popper-style": _ctx.popperStyle,
      "gpu-acceleration": false,
      "stop-popper-mouse-event": false,
      "popper-options": _ctx.popperOptions,
      "fallback-placements": _ctx.fallbackPlacements,
      effect: _ctx.effect,
      placement: _ctx.placement,
      pure: "",
      transition: `${_ctx.nsSelect.namespace.value}-zoom-in-top`,
      trigger: "click",
      persistent: _ctx.persistent,
      "append-to": _ctx.appendTo,
      "show-arrow": _ctx.showArrow,
      offset: _ctx.offset,
      onBeforeShow: _ctx.handleMenuEnter,
      onHide: ($event) => _ctx.states.isBeforeHide = false
    }, {
      default: vue.withCtx(() => {
        var _a, _b, _c;
        return [
          vue.createElementVNode("div", {
            ref: "wrapperRef",
            class: vue.normalizeClass([
              _ctx.nsSelect.e("wrapper"),
              _ctx.nsSelect.is("focused", _ctx.isFocused),
              _ctx.nsSelect.is("hovering", _ctx.states.inputHovering),
              _ctx.nsSelect.is("filterable", _ctx.filterable),
              _ctx.nsSelect.is("disabled", _ctx.selectDisabled),
              _ctx.nsSelect.is("value", _ctx.hasModelValue),
              _ctx.preStar && !_ctx.isFocused && !_ctx.hasModelValue ? "pre-star-item" : ""
            ]),
            onClick: vue.withModifiers(_ctx.toggleMenu, ["prevent"])
          }, [
            _ctx.floatLabel ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              class: "float-label"
            }, vue.toDisplayString(_ctx.placeholder), 1)) : vue.createCommentVNode("v-if", true),
            _ctx.$slots.prefix ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 1,
              ref: "prefixRef",
              class: vue.normalizeClass(_ctx.nsSelect.e("prefix"))
            }, [
              vue.renderSlot(_ctx.$slots, "prefix")
            ], 2)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("div", {
              ref: "selectionRef",
              class: vue.normalizeClass([
                _ctx.nsSelect.e("selection"),
                _ctx.nsSelect.is("near", _ctx.multiple && !_ctx.$slots.prefix && !!_ctx.modelValue.length)
              ])
            }, [
              _ctx.multiple ? vue.renderSlot(_ctx.$slots, "tag", {
                key: 0,
                data: _ctx.states.cachedOptions,
                deleteTag: _ctx.deleteTag,
                selectDisabled: _ctx.selectDisabled
              }, () => [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.showTagList, (item) => {
                  return vue.openBlock(), vue.createElementBlock("div", {
                    key: _ctx.getValueKey(_ctx.getValue(item)),
                    class: vue.normalizeClass(_ctx.nsSelect.e("selected-item"))
                  }, [
                    vue.createVNode(_component_el_tag, {
                      closable: !_ctx.selectDisabled && !_ctx.getDisabled(item),
                      size: _ctx.collapseTagSize,
                      type: _ctx.tagType,
                      effect: _ctx.tagEffect,
                      "disable-transitions": "",
                      style: vue.normalizeStyle(_ctx.tagStyle),
                      onClose: ($event) => _ctx.deleteTag($event, item)
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("span", {
                          class: vue.normalizeClass(_ctx.nsSelect.e("tags-text"))
                        }, [
                          vue.renderSlot(_ctx.$slots, "label", {
                            index: _ctx.getIndex(item),
                            label: _ctx.getLabel(item),
                            value: _ctx.getValue(item)
                          }, () => [
                            vue.createTextVNode(vue.toDisplayString(_ctx.getLabel(item)), 1)
                          ])
                        ], 2)
                      ]),
                      _: 2
                    }, 1032, ["closable", "size", "type", "effect", "style", "onClose"])
                  ], 2);
                }), 128)),
                _ctx.collapseTags && _ctx.modelValue.length > _ctx.maxCollapseTags ? (vue.openBlock(), vue.createBlock(_component_el_tooltip, {
                  key: 0,
                  ref: "tagTooltipRef",
                  disabled: _ctx.dropdownMenuVisible || !_ctx.collapseTagsTooltip,
                  "fallback-placements": ["bottom", "top", "right", "left"],
                  effect: _ctx.effect,
                  placement: "bottom",
                  "popper-class": _ctx.popperClass,
                  "popper-style": _ctx.popperStyle,
                  teleported: _ctx.teleported
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("div", {
                      ref: "collapseItemRef",
                      class: vue.normalizeClass(_ctx.nsSelect.e("selected-item"))
                    }, [
                      vue.createVNode(_component_el_tag, {
                        closable: false,
                        size: _ctx.collapseTagSize,
                        type: _ctx.tagType,
                        effect: _ctx.tagEffect,
                        style: vue.normalizeStyle(_ctx.collapseTagStyle),
                        "disable-transitions": ""
                      }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("span", {
                            class: vue.normalizeClass(_ctx.nsSelect.e("tags-text"))
                          }, " + " + vue.toDisplayString(_ctx.modelValue.length - _ctx.maxCollapseTags), 3)
                        ]),
                        _: 1
                      }, 8, ["size", "type", "effect", "style"])
                    ], 2)
                  ]),
                  content: vue.withCtx(() => [
                    vue.createElementVNode("div", {
                      ref: "tagMenuRef",
                      class: vue.normalizeClass(_ctx.nsSelect.e("selection"))
                    }, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.collapseTagList, (selected) => {
                        return vue.openBlock(), vue.createElementBlock("div", {
                          key: _ctx.getValueKey(_ctx.getValue(selected)),
                          class: vue.normalizeClass(_ctx.nsSelect.e("selected-item"))
                        }, [
                          vue.createVNode(_component_el_tag, {
                            class: "in-tooltip",
                            closable: !_ctx.selectDisabled && !_ctx.getDisabled(selected),
                            size: _ctx.collapseTagSize,
                            type: _ctx.tagType,
                            effect: _ctx.tagEffect,
                            "disable-transitions": "",
                            onClose: ($event) => _ctx.deleteTag($event, selected)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("span", {
                                class: vue.normalizeClass(_ctx.nsSelect.e("tags-text"))
                              }, [
                                vue.renderSlot(_ctx.$slots, "label", {
                                  index: _ctx.getIndex(selected),
                                  label: _ctx.getLabel(selected),
                                  value: _ctx.getValue(selected)
                                }, () => [
                                  vue.createTextVNode(vue.toDisplayString(_ctx.getLabel(selected)), 1)
                                ])
                              ], 2)
                            ]),
                            _: 2
                          }, 1032, ["closable", "size", "type", "effect", "onClose"])
                        ], 2);
                      }), 128))
                    ], 2)
                  ]),
                  _: 3
                }, 8, ["disabled", "effect", "popper-class", "popper-style", "teleported"])) : vue.createCommentVNode("v-if", true)
              ]) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("div", {
                class: vue.normalizeClass([
                  _ctx.nsSelect.e("selected-item"),
                  _ctx.nsSelect.e("input-wrapper"),
                  _ctx.nsSelect.is("hidden", !_ctx.filterable)
                ])
              }, [
                vue.withDirectives(vue.createElementVNode("input", {
                  id: _ctx.inputId,
                  ref: "inputRef",
                  "onUpdate:modelValue": ($event) => _ctx.states.inputValue = $event,
                  style: vue.normalizeStyle(_ctx.inputStyle),
                  autocomplete: _ctx.autocomplete,
                  tabindex: _ctx.tabindex,
                  "aria-autocomplete": "none",
                  "aria-haspopup": "listbox",
                  autocapitalize: "off",
                  "aria-expanded": _ctx.expanded,
                  "aria-label": _ctx.ariaLabel,
                  class: vue.normalizeClass([_ctx.nsSelect.e("input"), _ctx.nsSelect.is(_ctx.selectSize)]),
                  disabled: _ctx.selectDisabled,
                  role: "combobox",
                  "aria-controls": _ctx.contentId,
                  "aria-activedescendant": _ctx.states.hoveringIndex >= 0 ? `${_ctx.contentId}-${_ctx.states.hoveringIndex}` : "",
                  readonly: !_ctx.filterable,
                  spellcheck: "false",
                  type: "text",
                  name: _ctx.name,
                  onInput: _ctx.onInput,
                  onCompositionstart: _ctx.handleCompositionStart,
                  onCompositionupdate: _ctx.handleCompositionUpdate,
                  onCompositionend: _ctx.handleCompositionEnd,
                  onKeydown: [
                    vue.withKeys(vue.withModifiers(($event) => _ctx.onKeyboardNavigate("backward"), ["stop", "prevent"]), ["up"]),
                    vue.withKeys(vue.withModifiers(($event) => _ctx.onKeyboardNavigate("forward"), ["stop", "prevent"]), ["down"]),
                    vue.withKeys(vue.withModifiers(_ctx.onKeyboardSelect, ["stop", "prevent"]), ["enter"]),
                    vue.withKeys(vue.withModifiers(_ctx.handleEsc, ["stop", "prevent"]), ["esc"]),
                    vue.withKeys(vue.withModifiers(_ctx.handleDel, ["stop"]), ["delete"])
                  ],
                  onClick: vue.withModifiers(_ctx.toggleMenu, ["stop"])
                }, null, 46, ["id", "onUpdate:modelValue", "autocomplete", "tabindex", "aria-expanded", "aria-label", "disabled", "aria-controls", "aria-activedescendant", "readonly", "name", "onInput", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onKeydown", "onClick"]), [
                  [vue.vModelText, _ctx.states.inputValue]
                ]),
                _ctx.filterable ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 0,
                  ref: "calculatorRef",
                  "aria-hidden": "true",
                  class: vue.normalizeClass(_ctx.nsSelect.e("input-calculator")),
                  textContent: vue.toDisplayString(_ctx.states.inputValue)
                }, null, 10, ["textContent"])) : vue.createCommentVNode("v-if", true)
              ], 2),
              _ctx.shouldShowPlaceholder && _ctx.hasModelValue ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 1,
                class: vue.normalizeClass([
                  _ctx.nsSelect.e("selected-item"),
                  _ctx.nsSelect.e("placeholder"),
                  _ctx.nsSelect.is("transparent", !_ctx.hasModelValue || _ctx.expanded && !_ctx.states.inputValue)
                ])
              }, [
                vue.renderSlot(_ctx.$slots, "label", {
                  index: (_b = (_a = _ctx.allOptionsValueMap.get(_ctx.modelValue)) == null ? void 0 : _a.index) != null ? _b : -1,
                  label: _ctx.currentPlaceholder,
                  value: _ctx.modelValue
                }, () => [
                  vue.createElementVNode("span", null, vue.toDisplayString(_ctx.currentPlaceholder), 1)
                ])
              ], 2)) : vue.createCommentVNode("v-if", true)
            ], 2),
            vue.createElementVNode("div", {
              ref: "suffixRef",
              class: vue.normalizeClass(_ctx.nsSelect.e("suffix"))
            }, [
              _ctx.iconComponent && !_ctx.validateError ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                ((_c = _ctx.$slots) == null ? void 0 : _c.suffix) ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: "tip-wrap"
                }, [
                  vue.renderSlot(_ctx.$slots, "suffix")
                ], 512)), [
                  [vue.vShow, !_ctx.showClearBtn]
                ]) : vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_icon, {
                  key: 1,
                  class: vue.normalizeClass([_ctx.nsSelect.e("caret"), _ctx.nsInput.e("icon"), _ctx.iconReverse])
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createElementBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "12",
                      height: "12",
                      viewBox: "0 0 12 12"
                    }, [
                      vue.createElementVNode("path", { d: "M5.99992 7.75002C5.86862 7.75024 5.73856 7.72452 5.61723 7.67432C5.4959 7.62413 5.38569 7.55045 5.29292 7.45752L2.64642 4.81052L3.35342 4.10352L5.99992 6.75002L8.64642 4.10352L9.35342 4.81052L6.70692 7.45702C6.6142 7.55004 6.50401 7.62381 6.38267 7.67409C6.26134 7.72438 6.13126 7.75018 5.99992 7.75002Z" })
                    ]))
                  ]),
                  _: 1
                }, 8, ["class"])), [
                  [vue.vShow, !_ctx.showClearBtn]
                ])
              ], 64)) : vue.createCommentVNode("v-if", true),
              _ctx.showClearBtn && _ctx.clearIcon ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                key: 1,
                class: vue.normalizeClass([
                  _ctx.nsSelect.e("caret"),
                  _ctx.nsInput.e("icon"),
                  _ctx.nsSelect.e("clear")
                ]),
                onClick: vue.withModifiers(_ctx.handleClear, ["prevent", "stop"])
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createElementBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12"
                  }, [
                    vue.createElementVNode("path", { d: "M9.35349 3.35342L8.64648 2.64642L5.99998 5.29292L3.35348 2.64642L2.64648 3.35342L5.29298 5.99992L2.64648 8.64642L3.35348 9.35342L5.99998 6.70692L8.64648 9.35342L9.35349 8.64642L6.70698 5.99992L9.35349 3.35342Z" })
                  ]))
                ]),
                _: 1
              }, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true),
              _ctx.validateError ? (vue.openBlock(), vue.createBlock(_component_el_tooltip, {
                key: 2,
                content: _ctx.validateMsg,
                effect: "light",
                placement: "top",
                offset: 4
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_icon, {
                    class: "error-icon",
                    color: "#D91F11"
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createElementBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "12",
                        height: "11",
                        viewBox: "0 0 12 11"
                      }, [
                        vue.createElementVNode("path", {
                          "fill-rule": "evenodd",
                          "clip-rule": "evenodd",
                          d: "M0 10.5H12L6 0L0 10.5ZM6.5 8.5H5.5V7.5H6.5V8.5ZM6.5 6.5H5.5V4.5H6.5V6.5Z"
                        })
                      ]))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["content"])) : vue.createCommentVNode("v-if", true),
              _ctx.validateState && _ctx.validateIcon && _ctx.needStatusIcon ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                key: 3,
                class: vue.normalizeClass([
                  _ctx.nsInput.e("icon"),
                  _ctx.nsInput.e("validateIcon"),
                  _ctx.nsInput.is("loading", _ctx.validateState === "validating")
                ]),
                innerHTML: _ctx.validateIcon
              }, null, 8, ["class", "innerHTML"])) : vue.createCommentVNode("v-if", true)
            ], 2)
          ], 10, ["onClick"])
        ];
      }),
      content: vue.withCtx(() => [
        vue.createVNode(_component_el_select_menu, {
          id: _ctx.contentId,
          ref: "menuRef",
          data: _ctx.filteredOptions,
          width: _ctx.popperSize - _ctx.BORDER_HORIZONTAL_WIDTH,
          "hovering-index": _ctx.states.hoveringIndex,
          "scrollbar-always-on": _ctx.scrollbarAlwaysOn,
          "aria-label": _ctx.ariaLabel
        }, vue.createSlots({
          default: vue.withCtx((scope) => [
            vue.renderSlot(_ctx.$slots, "default", vue.normalizeProps(vue.guardReactiveProps(scope)))
          ]),
          _: 2
        }, [
          _ctx.$slots.header ? {
            name: "header",
            fn: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "header")),
                onClick: vue.withModifiers(() => {
                }, ["stop"])
              }, [
                vue.renderSlot(_ctx.$slots, "header")
              ], 10, ["onClick"])
            ])
          } : void 0,
          _ctx.$slots.loading && _ctx.loading ? {
            name: "loading",
            fn: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "loading"))
              }, [
                vue.renderSlot(_ctx.$slots, "loading")
              ], 2)
            ])
          } : _ctx.loading || _ctx.filteredOptions.length === 0 ? {
            name: "empty",
            fn: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "empty"))
              }, [
                vue.renderSlot(_ctx.$slots, "empty", {}, () => [
                  vue.createElementVNode("span", null, vue.toDisplayString(_ctx.emptyText), 1)
                ])
              ], 2)
            ])
          } : void 0,
          _ctx.$slots.footer ? {
            name: "footer",
            fn: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "footer")),
                onClick: vue.withModifiers(() => {
                }, ["stop"])
              }, [
                vue.renderSlot(_ctx.$slots, "footer")
              ], 10, ["onClick"])
            ])
          } : void 0
        ]), 1032, ["id", "data", "width", "hovering-index", "scrollbar-always-on", "aria-label"])
      ]),
      _: 3
    }, 8, ["visible", "teleported", "popper-class", "popper-style", "popper-options", "fallback-placements", "effect", "placement", "transition", "persistent", "append-to", "show-arrow", "offset", "onBeforeShow", "onHide"])
  ], 42, ["onMouseenter", "onMouseleave"])), [
    [_directive_click_outside, _ctx.handleClickOutside, _ctx.popperRef]
  ]);
}
var Select = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render], ["__file", "select.vue"]]);

exports["default"] = Select;
//# sourceMappingURL=select.js.map
