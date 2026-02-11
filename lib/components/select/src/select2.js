'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$2 = require('../../tooltip/index.js');
var index$1 = require('../../scrollbar/index.js');
var index = require('../../tag/index.js');
var index$3 = require('../../icon/index.js');
var useProps = require('../../select-v2/src/useProps.js');
var option = require('./option2.js');
var selectDropdown = require('./select-dropdown.js');
var useSelect = require('./useSelect.js');
var token = require('./token.js');
var options = require('./options.js');
var select = require('./select.js');
var optionGroup = require('./option-group.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$4 = require('../../../directives/click-outside/index.js');
var event = require('../../../constants/event.js');
var shared = require('@vue/shared');
var index$5 = require('../../../hooks/use-calc-input-width/index.js');
var types = require('../../../utils/types.js');
var vnode = require('../../../utils/vue/vnode.js');

const COMPONENT_NAME = "ElSelect";
const _sfc_main = vue.defineComponent({
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: {
    ElSelectMenu: selectDropdown["default"],
    ElOption: option["default"],
    ElOptions: options["default"],
    ElOptionGroup: optionGroup["default"],
    ElTag: index.ElTag,
    ElScrollbar: index$1.ElScrollbar,
    ElTooltip: index$2.ElTooltip,
    ElIcon: index$3.ElIcon
  },
  directives: { ClickOutside: index$4["default"] },
  props: select.selectProps,
  emits: [
    event.UPDATE_MODEL_EVENT,
    event.CHANGE_EVENT,
    "remove-tag",
    "add-item",
    "clear",
    "visible-change",
    "focus",
    "blur",
    "popup-scroll"
  ],
  setup(props, { emit, slots }) {
    const instance = vue.getCurrentInstance();
    const originalWarnHandler = instance.appContext.config.warnHandler;
    instance.appContext.config.warnHandler = (...args) => {
      if (!args[0] || args[0].includes('Slot "default" invoked outside of the render function')) {
        return;
      }
      console.warn(...args);
    };
    const modelValue = vue.computed(() => {
      const { modelValue: rawModelValue, multiple } = props;
      const fallback = multiple ? [] : void 0;
      if (shared.isArray(rawModelValue)) {
        return multiple ? rawModelValue : fallback;
      }
      return multiple ? fallback : rawModelValue;
    });
    const _props = vue.reactive({
      ...vue.toRefs(props),
      modelValue
    });
    const API = useSelect.useSelect(_props, emit);
    const { calculatorRef, inputStyle } = index$5.useCalcInputWidth();
    const { getLabel, getValue, getOptions, getDisabled } = useProps.useProps(props);
    const validateError = vue.computed(() => (API == null ? void 0 : API.validateState.value) === "error");
    const validateMsg = vue.computed(() => (API == null ? void 0 : API.validateMessage.value) || "");
    const getOptionProps = (option) => ({
      label: getLabel(option),
      value: getValue(option),
      disabled: getDisabled(option)
    });
    const flatTreeSelectData = (data) => {
      return data.reduce((acc, item) => {
        acc.push(item);
        if (item.children && item.children.length > 0) {
          acc.push(...flatTreeSelectData(item.children));
        }
        return acc;
      }, []);
    };
    const handleAddSelect = () => {
      emit("add-item", API.states.inputValue);
    };
    const manuallyRenderSlots = (vnodes) => {
      const children = vnode.flattedChildren(vnodes || []);
      children.forEach((item) => {
        var _a;
        if (shared.isObject(item) && (item.type.name === "ElOption" || item.type.name === "ElTree")) {
          const _name = item.type.name;
          if (_name === "ElTree") {
            const treeData = ((_a = item.props) == null ? void 0 : _a.data) || [];
            const flatData = flatTreeSelectData(treeData);
            flatData.forEach((treeItem) => {
              treeItem.currentLabel = treeItem.label || (shared.isObject(treeItem.value) ? "" : treeItem.value);
              API.onOptionCreate(treeItem);
            });
          } else if (_name === "ElOption") {
            const obj = { ...item.props };
            obj.currentLabel = obj.label || (shared.isObject(obj.value) ? "" : obj.value);
            API.onOptionCreate(obj);
          }
        }
      });
    };
    vue.watch(() => {
      var _a;
      return [(_a = slots.default) == null ? void 0 : _a.call(slots), modelValue.value];
    }, () => {
      var _a;
      if (props.persistent || API.states.options.size > 0) {
        return;
      }
      manuallyRenderSlots((_a = slots.default) == null ? void 0 : _a.call(slots));
    }, {
      immediate: true
    });
    vue.provide(token.selectKey, vue.reactive({
      props: _props,
      states: API.states,
      selectRef: API.selectRef,
      optionsArray: API.optionsArray,
      setSelected: API.setSelected,
      handleOptionSelect: API.handleOptionSelect,
      onOptionCreate: API.onOptionCreate,
      onOptionDestroy: API.onOptionDestroy
    }));
    const selectedLabel = vue.computed(() => {
      if (!props.multiple) {
        return API.states.selectedLabel;
      }
      return API.states.selected.map((i) => i.currentLabel);
    });
    vue.onBeforeUnmount(() => {
      instance.appContext.config.warnHandler = originalWarnHandler;
    });
    return {
      ...API,
      modelValue,
      selectedLabel,
      calculatorRef,
      inputStyle,
      validateError,
      validateMsg,
      handleAddSelect,
      getLabel,
      isEmpty: types.isEmpty,
      getValue,
      getOptions,
      getDisabled,
      getOptionProps
    };
  }
});
function _sfc_render(_ctx, _cache) {
  const _component_el_tag = vue.resolveComponent("el-tag");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_option = vue.resolveComponent("el-option");
  const _component_el_option_group = vue.resolveComponent("el-option-group");
  const _component_el_options = vue.resolveComponent("el-options");
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
  const _component_el_select_menu = vue.resolveComponent("el-select-menu");
  const _directive_click_outside = vue.resolveDirective("click-outside");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
    ref: "selectRef",
    class: vue.normalizeClass([_ctx.nsSelect.b(), _ctx.nsSelect.m(_ctx.selectSize)]),
    [vue.toHandlerKey(_ctx.mouseEnterEventName)]: ($event) => _ctx.states.inputHovering = true,
    onMouseleave: ($event) => _ctx.states.inputHovering = false
  }, [
    vue.createVNode(_component_el_tooltip, {
      ref: "tooltipRef",
      visible: _ctx.dropdownMenuVisible,
      placement: _ctx.placement,
      teleported: _ctx.teleported,
      "popper-class": [_ctx.nsSelect.e("popper"), _ctx.popperClass],
      "popper-style": _ctx.popperStyle,
      "popper-options": _ctx.popperOptions,
      "fallback-placements": _ctx.fallbackPlacements,
      effect: _ctx.effect,
      pure: "",
      trigger: "click",
      transition: `${_ctx.nsSelect.namespace.value}-zoom-in-top`,
      "stop-popper-mouse-event": false,
      "gpu-acceleration": false,
      persistent: _ctx.persistent,
      "append-to": _ctx.appendTo,
      "show-arrow": false,
      offset: _ctx.offset,
      onBeforeShow: _ctx.handleMenuEnter,
      onHide: ($event) => _ctx.states.isBeforeHide = false
    }, {
      default: vue.withCtx(() => {
        var _a;
        return [
          vue.createElementVNode("div", {
            ref: "wrapperRef",
            class: vue.normalizeClass([
              _ctx.nsSelect.e("wrapper"),
              _ctx.nsSelect.is("focused", _ctx.isFocused),
              _ctx.nsSelect.is("all", !!_ctx.haveAll),
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
              class: vue.normalizeClass(["float-label", {
                "prefix-label": _ctx.$slots.prefix,
                "select-visible": _ctx.dropdownMenuVisible || !_ctx.isEmpty(_ctx.states.inputValue)
              }])
            }, vue.toDisplayString(_ctx.placeholder), 3)) : vue.createCommentVNode("v-if", true),
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
                _ctx.nsSelect.is("near", _ctx.multiple && !_ctx.$slots.prefix && !!_ctx.states.selected.length)
              ])
            }, [
              _ctx.multiple ? vue.renderSlot(_ctx.$slots, "tag", {
                key: 0,
                data: _ctx.states.selected,
                deleteTag: _ctx.deleteTag,
                selectDisabled: _ctx.selectDisabled
              }, () => [
                _ctx.haveAll && !_ctx.states.selected.length ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 0,
                  class: "select-all-tag"
                }, vue.toDisplayString(_ctx.haveAll), 1)) : vue.createCommentVNode("v-if", true),
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.showTagList, (item) => {
                  return vue.openBlock(), vue.createElementBlock("div", {
                    key: _ctx.getValueKey(item),
                    class: vue.normalizeClass(_ctx.nsSelect.e("selected-item"))
                  }, [
                    vue.createVNode(_component_el_tag, {
                      closable: !_ctx.selectDisabled && !item.isDisabled,
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
                            index: item.index,
                            label: item.currentLabel,
                            value: item.value
                          }, () => [
                            vue.createTextVNode(vue.toDisplayString(item.currentLabel), 1)
                          ])
                        ], 2)
                      ]),
                      _: 2
                    }, 1032, ["closable", "size", "type", "effect", "style", "onClose"])
                  ], 2);
                }), 128)),
                _ctx.collapseTags && _ctx.states.selected.length > _ctx.maxCollapseTags ? (vue.openBlock(), vue.createBlock(_component_el_tooltip, {
                  key: 1,
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
                        "disable-transitions": "",
                        style: vue.normalizeStyle(_ctx.collapseTagStyle)
                      }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("span", {
                            class: vue.normalizeClass(_ctx.nsSelect.e("tags-text"))
                          }, " + " + vue.toDisplayString(_ctx.states.selected.length - _ctx.maxCollapseTags), 3)
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
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.collapseTagList, (item) => {
                        return vue.openBlock(), vue.createElementBlock("div", {
                          key: _ctx.getValueKey(item),
                          class: vue.normalizeClass(_ctx.nsSelect.e("selected-item"))
                        }, [
                          vue.createVNode(_component_el_tag, {
                            class: "in-tooltip",
                            closable: !_ctx.selectDisabled && !item.isDisabled,
                            size: _ctx.collapseTagSize,
                            type: _ctx.tagType,
                            effect: _ctx.tagEffect,
                            "disable-transitions": "",
                            onClose: ($event) => _ctx.deleteTag($event, item)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("span", {
                                class: vue.normalizeClass(_ctx.nsSelect.e("tags-text"))
                              }, [
                                vue.renderSlot(_ctx.$slots, "label", {
                                  index: item.index,
                                  label: item.currentLabel,
                                  value: item.value
                                }, () => [
                                  vue.createTextVNode(vue.toDisplayString(item.currentLabel), 1)
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
                  type: "text",
                  name: _ctx.name,
                  class: vue.normalizeClass([_ctx.nsSelect.e("input"), _ctx.nsSelect.is(_ctx.selectSize)]),
                  disabled: _ctx.selectDisabled,
                  autocomplete: _ctx.autocomplete,
                  maxlength: _ctx.filterMaxLength,
                  style: vue.normalizeStyle(_ctx.inputStyle),
                  tabindex: _ctx.tabindex,
                  role: "combobox",
                  readonly: !_ctx.filterable,
                  spellcheck: "false",
                  "aria-activedescendant": ((_a = _ctx.hoverOption) == null ? void 0 : _a.id) || "",
                  "aria-controls": _ctx.contentId,
                  "aria-expanded": _ctx.dropdownMenuVisible,
                  "aria-label": _ctx.ariaLabel,
                  "aria-autocomplete": "none",
                  "aria-haspopup": "listbox",
                  onKeydown: [
                    vue.withKeys(vue.withModifiers(($event) => _ctx.navigateOptions("next"), ["stop", "prevent"]), ["down"]),
                    vue.withKeys(vue.withModifiers(($event) => _ctx.navigateOptions("prev"), ["stop", "prevent"]), ["up"]),
                    vue.withKeys(vue.withModifiers(_ctx.handleEsc, ["stop", "prevent"]), ["esc"]),
                    vue.withKeys(vue.withModifiers(_ctx.selectOption, ["stop", "prevent"]), ["enter"]),
                    vue.withKeys(vue.withModifiers(_ctx.deletePrevTag, ["stop"]), ["delete"])
                  ],
                  onCompositionstart: _ctx.handleCompositionStart,
                  onCompositionupdate: _ctx.handleCompositionUpdate,
                  onCompositionend: _ctx.handleCompositionEnd,
                  onInput: _ctx.onInput,
                  onClick: vue.withModifiers(_ctx.toggleMenu, ["stop"])
                }, null, 46, ["id", "onUpdate:modelValue", "name", "disabled", "autocomplete", "maxlength", "tabindex", "readonly", "aria-activedescendant", "aria-controls", "aria-expanded", "aria-label", "onKeydown", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onInput", "onClick"]), [
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
              !_ctx.floatLabel || _ctx.shouldShowPlaceholder && _ctx.hasModelValue ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 1,
                class: vue.normalizeClass([
                  _ctx.nsSelect.e("selected-item"),
                  _ctx.nsSelect.e("placeholder"),
                  _ctx.nsSelect.is("transparent", !_ctx.hasModelValue || _ctx.expanded && !_ctx.states.inputValue)
                ])
              }, [
                vue.renderSlot(_ctx.$slots, "label", {
                  index: _ctx.getOption(_ctx.modelValue).index,
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
              vue.createTextVNode(vue.toDisplayString(_ctx.labelSuffix) + " ", 1),
              _ctx.$slots.info ? vue.renderSlot(_ctx.$slots, "info", { key: 0 }) : vue.createCommentVNode("v-if", true),
              _ctx.iconComponent && !_ctx.showClearBtn && !_ctx.validateError ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                key: 1,
                class: vue.normalizeClass([_ctx.nsSelect.e("caret"), _ctx.nsSelect.e("icon"), _ctx.iconReverse])
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
              }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
              _ctx.showClearBtn && _ctx.clearIcon ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                key: 2,
                class: vue.normalizeClass([
                  _ctx.nsSelect.e("caret"),
                  _ctx.nsSelect.e("icon"),
                  _ctx.nsSelect.e("clear")
                ]),
                onClick: _ctx.handleClearClick
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
                key: 3,
                content: _ctx.validateMsg,
                effect: "light",
                placement: "top",
                offset: 4
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_icon, {
                    class: "error-icon",
                    color: "#A1160A"
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createElementBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "12",
                        height: "12",
                        viewBox: "0 0 12 12"
                      }, [
                        vue.createElementVNode("path", { d: "M6.00041 1C8.00045 1 6.75037 5.25 6.75037 5.25C6.75037 5.25 10.1112 2.75 11.0004 4.5C11.8896 6.25 7.25037 6.75 7.25037 6.75C7.25037 6.75 10.7186 9.88284 9.25035 10.9496C7.78208 12.0164 6.00037 7.5 6.00037 7.5C6.00037 7.5 4.23586 12.0164 2.76759 10.9496C1.29932 9.88283 4.75037 6.75 4.75037 6.75C4.75037 6.75 0.250258 6.25 1.00035 4.5C1.75045 2.75 5.25037 5.25 5.25037 5.25C5.25037 5.25 4.00037 1 6.00041 1Z" })
                      ]))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["content"])) : vue.createCommentVNode("v-if", true),
              _ctx.validateState && _ctx.validateIcon ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                key: 4,
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
        vue.createVNode(_component_el_select_menu, { ref: "menuRef" }, {
          default: vue.withCtx(() => [
            _ctx.$slots.header ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "header")),
              onClick: vue.withModifiers(() => {
              }, ["stop"])
            }, [
              vue.renderSlot(_ctx.$slots, "header")
            ], 10, ["onClick"])) : vue.createCommentVNode("v-if", true),
            vue.withDirectives(vue.createVNode(_component_el_scrollbar, {
              id: _ctx.contentId,
              ref: "scrollbarRef",
              tag: "ul",
              "wrap-class": _ctx.nsSelect.be("dropdown", "wrap"),
              "view-class": _ctx.nsSelect.be("dropdown", "list"),
              class: vue.normalizeClass([_ctx.nsSelect.is("empty", _ctx.filteredOptionsCount === 0)]),
              role: "listbox",
              "aria-label": _ctx.ariaLabel,
              "aria-orientation": "vertical",
              onScroll: _ctx.popupScroll
            }, {
              default: vue.withCtx(() => [
                _ctx.states.selected.length && _ctx.haveAll ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: "select-all-item"
                }, vue.toDisplayString(_ctx.haveAll), 1)) : vue.createCommentVNode("v-if", true),
                _ctx.addShowTip && _ctx.filterable ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 1,
                  class: "select-add-tip"
                }, vue.toDisplayString(_ctx.addShowTip), 1)) : vue.createCommentVNode("v-if", true),
                _ctx.showNewOption ? (vue.openBlock(), vue.createBlock(_component_el_option, {
                  key: 2,
                  value: _ctx.states.inputValue,
                  created: true
                }, null, 8, ["value"])) : vue.createCommentVNode("v-if", true),
                vue.createVNode(_component_el_options, null, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "default", {}, () => [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.options, (option, index) => {
                        var _a;
                        return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
                          ((_a = _ctx.getOptions(option)) == null ? void 0 : _a.length) ? (vue.openBlock(), vue.createBlock(_component_el_option_group, {
                            key: 0,
                            label: _ctx.getLabel(option),
                            disabled: _ctx.getDisabled(option)
                          }, {
                            default: vue.withCtx(() => [
                              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.getOptions(option), (item) => {
                                return vue.openBlock(), vue.createBlock(_component_el_option, vue.mergeProps({
                                  key: _ctx.getValue(item)
                                }, _ctx.getOptionProps(item)), null, 16);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["label", "disabled"])) : (vue.openBlock(), vue.createBlock(_component_el_option, vue.normalizeProps(vue.mergeProps({ key: 1 }, _ctx.getOptionProps(option))), null, 16))
                        ], 64);
                      }), 128))
                    ])
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }, 8, ["id", "wrap-class", "view-class", "class", "aria-label", "onScroll"]), [
              [vue.vShow, (_ctx.states.options.size > 0 || _ctx.addItem) && !_ctx.loading]
            ]),
            _ctx.$slots.loading && _ctx.loading ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 1,
              class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "loading"))
            }, [
              vue.renderSlot(_ctx.$slots, "loading")
            ], 2)) : _ctx.loading || _ctx.filteredOptionsCount === 0 ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 2,
              class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "empty"))
            }, [
              vue.renderSlot(_ctx.$slots, "empty", {}, () => [
                !_ctx.addItem ? (vue.openBlock(), vue.createElementBlock("span", { key: 0 }, vue.toDisplayString(_ctx.emptyText), 1)) : (vue.openBlock(), vue.createElementBlock("div", {
                  key: 1,
                  class: "el-select-dropdown__item add-item",
                  onClick: _ctx.handleAddSelect
                }, [
                  vue.createVNode(_component_el_icon, { color: "#4f566" }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createElementBlock("svg", {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 12 12",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        vue.createElementVNode("g", { "clip-path": "url(#clip0_743_39597)" }, [
                          vue.createElementVNode("path", { d: "M12 5.25H6.75V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25Z" })
                        ]),
                        vue.createElementVNode("defs", null, [
                          vue.createElementVNode("clipPath", { id: "clip0_743_39597" }, [
                            vue.createElementVNode("rect", {
                              width: "12",
                              height: "12",
                              fill: "white"
                            })
                          ])
                        ])
                      ]))
                    ]),
                    _: 1
                  }),
                  vue.createElementVNode("span", { class: "tip" }, vue.toDisplayString(_ctx.states.inputValue), 1)
                ], 8, ["onClick"]))
              ])
            ], 2)) : vue.createCommentVNode("v-if", true),
            _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 3,
              class: vue.normalizeClass(_ctx.nsSelect.be("dropdown", "footer")),
              onClick: vue.withModifiers(() => {
              }, ["stop"])
            }, [
              vue.renderSlot(_ctx.$slots, "footer")
            ], 10, ["onClick"])) : vue.createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 512)
      ]),
      _: 3
    }, 8, ["visible", "placement", "teleported", "popper-class", "popper-style", "popper-options", "fallback-placements", "effect", "transition", "persistent", "append-to", "offset", "onBeforeShow", "onHide"])
  ], 16, ["onMouseleave"])), [
    [_directive_click_outside, _ctx.handleClickOutside, _ctx.popperRef]
  ]);
}
var Select = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render], ["__file", "select.vue"]]);

exports["default"] = Select;
//# sourceMappingURL=select2.js.map
