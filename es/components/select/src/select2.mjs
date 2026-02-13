import { defineComponent, getCurrentInstance, computed, reactive, toRefs, watch, provide, onBeforeUnmount, resolveComponent, resolveDirective, withDirectives, openBlock, createElementBlock, normalizeClass, toHandlerKey, createVNode, withCtx, createElementVNode, withModifiers, toDisplayString, createCommentVNode, renderSlot, Fragment, renderList, normalizeStyle, createTextVNode, createBlock, withKeys, vModelText, mergeProps, normalizeProps, vShow } from 'vue';
import { ElTooltip } from '../../tooltip/index.mjs';
import { ElScrollbar } from '../../scrollbar/index.mjs';
import { ElTag } from '../../tag/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import { useProps } from '../../select-v2/src/useProps.mjs';
import Option from './option2.mjs';
import ElSelectMenu from './select-dropdown.mjs';
import { useSelect } from './useSelect.mjs';
import { selectKey } from './token.mjs';
import ElOptions from './options.mjs';
import { selectProps } from './select.mjs';
import OptionGroup from './option-group.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import ClickOutside from '../../../directives/click-outside/index.mjs';
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../constants/event.mjs';
import { isArray, isObject } from '@vue/shared';
import { useCalcInputWidth } from '../../../hooks/use-calc-input-width/index.mjs';
import { isEmpty } from '../../../utils/types.mjs';
import { flattedChildren } from '../../../utils/vue/vnode.mjs';

const COMPONENT_NAME = "ElSelect";
const _sfc_main = defineComponent({
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: {
    ElSelectMenu,
    ElOption: Option,
    ElOptions,
    ElOptionGroup: OptionGroup,
    ElTag,
    ElScrollbar,
    ElTooltip,
    ElIcon
  },
  directives: { ClickOutside },
  props: selectProps,
  emits: [
    UPDATE_MODEL_EVENT,
    CHANGE_EVENT,
    "remove-tag",
    "add-item",
    "clear",
    "visible-change",
    "focus",
    "blur",
    "popup-scroll"
  ],
  setup(props, { emit, slots }) {
    const instance = getCurrentInstance();
    const originalWarnHandler = instance.appContext.config.warnHandler;
    instance.appContext.config.warnHandler = (...args) => {
      if (!args[0] || args[0].includes('Slot "default" invoked outside of the render function')) {
        return;
      }
      console.warn(...args);
    };
    const modelValue = computed(() => {
      const { modelValue: rawModelValue, multiple } = props;
      const fallback = multiple ? [] : void 0;
      if (isArray(rawModelValue)) {
        return multiple ? rawModelValue : fallback;
      }
      return multiple ? fallback : rawModelValue;
    });
    const _props = reactive({
      ...toRefs(props),
      modelValue
    });
    const API = useSelect(_props, emit);
    const { calculatorRef, inputStyle } = useCalcInputWidth();
    const { getLabel, getValue, getOptions, getDisabled } = useProps(props);
    const validateError = computed(() => (API == null ? void 0 : API.validateState.value) === "error");
    const validateMsg = computed(() => (API == null ? void 0 : API.validateMessage.value) || "");
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
      const children = flattedChildren(vnodes || []);
      children.forEach((item) => {
        var _a;
        if (isObject(item) && (item.type.name === "ElOption" || item.type.name === "ElTree")) {
          const _name = item.type.name;
          if (_name === "ElTree") {
            const treeData = ((_a = item.props) == null ? void 0 : _a.data) || [];
            const flatData = flatTreeSelectData(treeData);
            flatData.forEach((treeItem) => {
              treeItem.currentLabel = treeItem.label || (isObject(treeItem.value) ? "" : treeItem.value);
              API.onOptionCreate(treeItem);
            });
          } else if (_name === "ElOption") {
            const obj = { ...item.props };
            obj.currentLabel = obj.label || (isObject(obj.value) ? "" : obj.value);
            API.onOptionCreate(obj);
          }
        }
      });
    };
    watch(() => {
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
    provide(selectKey, reactive({
      props: _props,
      states: API.states,
      selectRef: API.selectRef,
      optionsArray: API.optionsArray,
      setSelected: API.setSelected,
      handleOptionSelect: API.handleOptionSelect,
      onOptionCreate: API.onOptionCreate,
      onOptionDestroy: API.onOptionDestroy
    }));
    const selectedLabel = computed(() => {
      if (!props.multiple) {
        return API.states.selectedLabel;
      }
      return API.states.selected.map((i) => i.currentLabel);
    });
    onBeforeUnmount(() => {
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
      isEmpty,
      getValue,
      getOptions,
      getDisabled,
      getOptionProps
    };
  }
});
function _sfc_render(_ctx, _cache) {
  const _component_el_tag = resolveComponent("el-tag");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_option_group = resolveComponent("el-option-group");
  const _component_el_options = resolveComponent("el-options");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_el_select_menu = resolveComponent("el-select-menu");
  const _directive_click_outside = resolveDirective("click-outside");
  return withDirectives((openBlock(), createElementBlock("div", {
    ref: "selectRef",
    class: normalizeClass([_ctx.nsSelect.b(), _ctx.nsSelect.m(_ctx.selectSize)]),
    [toHandlerKey(_ctx.mouseEnterEventName)]: ($event) => _ctx.states.inputHovering = true,
    onMouseleave: ($event) => _ctx.states.inputHovering = false
  }, [
    createVNode(_component_el_tooltip, {
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
      default: withCtx(() => {
        var _a;
        return [
          createElementVNode("div", {
            ref: "wrapperRef",
            class: normalizeClass([
              _ctx.nsSelect.e("wrapper"),
              _ctx.nsSelect.is("focused", _ctx.isFocused),
              _ctx.nsSelect.is("all", !!_ctx.haveAll),
              _ctx.nsSelect.is("hovering", _ctx.states.inputHovering),
              _ctx.nsSelect.is("filterable", _ctx.filterable),
              _ctx.nsSelect.is("disabled", _ctx.selectDisabled),
              _ctx.nsSelect.is("value", _ctx.hasModelValue)
            ]),
            onClick: withModifiers(_ctx.toggleMenu, ["prevent"])
          }, [
            _ctx.floatLabel ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(["float-label", {
                "prefix-label": _ctx.$slots.prefix,
                "select-visible": _ctx.dropdownMenuVisible || !_ctx.isEmpty(_ctx.states.inputValue)
              }])
            }, toDisplayString(_ctx.placeholder), 3)) : createCommentVNode("v-if", true),
            _ctx.$slots.prefix ? (openBlock(), createElementBlock("div", {
              key: 1,
              ref: "prefixRef",
              class: normalizeClass(_ctx.nsSelect.e("prefix"))
            }, [
              renderSlot(_ctx.$slots, "prefix")
            ], 2)) : createCommentVNode("v-if", true),
            createElementVNode("div", {
              ref: "selectionRef",
              class: normalizeClass([
                _ctx.nsSelect.e("selection"),
                _ctx.nsSelect.is("near", _ctx.multiple && !_ctx.$slots.prefix && !!_ctx.states.selected.length)
              ])
            }, [
              _ctx.multiple ? renderSlot(_ctx.$slots, "tag", {
                key: 0,
                data: _ctx.states.selected,
                deleteTag: _ctx.deleteTag,
                selectDisabled: _ctx.selectDisabled
              }, () => [
                _ctx.haveAll && !_ctx.states.selected.length ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: "select-all-tag"
                }, toDisplayString(_ctx.haveAll), 1)) : createCommentVNode("v-if", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.showTagList, (item) => {
                  return openBlock(), createElementBlock("div", {
                    key: _ctx.getValueKey(item),
                    class: normalizeClass(_ctx.nsSelect.e("selected-item"))
                  }, [
                    createVNode(_component_el_tag, {
                      closable: !_ctx.selectDisabled && !item.isDisabled,
                      size: _ctx.collapseTagSize,
                      type: _ctx.tagType,
                      effect: _ctx.tagEffect,
                      "disable-transitions": "",
                      style: normalizeStyle(_ctx.tagStyle),
                      round: "",
                      onClose: ($event) => _ctx.deleteTag($event, item)
                    }, {
                      default: withCtx(() => [
                        createElementVNode("span", {
                          class: normalizeClass(_ctx.nsSelect.e("tags-text"))
                        }, [
                          renderSlot(_ctx.$slots, "label", {
                            index: item.index,
                            label: item.currentLabel,
                            value: item.value
                          }, () => [
                            createTextVNode(toDisplayString(item.currentLabel), 1)
                          ])
                        ], 2)
                      ]),
                      _: 2
                    }, 1032, ["closable", "size", "type", "effect", "style", "onClose"])
                  ], 2);
                }), 128)),
                _ctx.collapseTags && _ctx.states.selected.length > _ctx.maxCollapseTags ? (openBlock(), createBlock(_component_el_tooltip, {
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
                  default: withCtx(() => [
                    createElementVNode("div", {
                      ref: "collapseItemRef",
                      class: normalizeClass(_ctx.nsSelect.e("selected-item"))
                    }, [
                      createVNode(_component_el_tag, {
                        closable: false,
                        size: _ctx.collapseTagSize,
                        type: _ctx.tagType,
                        effect: _ctx.tagEffect,
                        "disable-transitions": "",
                        style: normalizeStyle(_ctx.collapseTagStyle),
                        round: ""
                      }, {
                        default: withCtx(() => [
                          createElementVNode("span", {
                            class: normalizeClass(_ctx.nsSelect.e("tags-text"))
                          }, " + " + toDisplayString(_ctx.states.selected.length - _ctx.maxCollapseTags), 3)
                        ]),
                        _: 1
                      }, 8, ["size", "type", "effect", "style"])
                    ], 2)
                  ]),
                  content: withCtx(() => [
                    createElementVNode("div", {
                      ref: "tagMenuRef",
                      class: normalizeClass(_ctx.nsSelect.e("selection"))
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.collapseTagList, (item) => {
                        return openBlock(), createElementBlock("div", {
                          key: _ctx.getValueKey(item),
                          class: normalizeClass(_ctx.nsSelect.e("selected-item"))
                        }, [
                          createVNode(_component_el_tag, {
                            class: "in-tooltip",
                            closable: !_ctx.selectDisabled && !item.isDisabled,
                            size: _ctx.collapseTagSize,
                            type: _ctx.tagType,
                            effect: _ctx.tagEffect,
                            "disable-transitions": "",
                            round: "",
                            onClose: ($event) => _ctx.deleteTag($event, item)
                          }, {
                            default: withCtx(() => [
                              createElementVNode("span", {
                                class: normalizeClass(_ctx.nsSelect.e("tags-text"))
                              }, [
                                renderSlot(_ctx.$slots, "label", {
                                  index: item.index,
                                  label: item.currentLabel,
                                  value: item.value
                                }, () => [
                                  createTextVNode(toDisplayString(item.currentLabel), 1)
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
                }, 8, ["disabled", "effect", "popper-class", "popper-style", "teleported"])) : createCommentVNode("v-if", true)
              ]) : createCommentVNode("v-if", true),
              createElementVNode("div", {
                class: normalizeClass([
                  _ctx.nsSelect.e("selected-item"),
                  _ctx.nsSelect.e("input-wrapper"),
                  _ctx.nsSelect.is("hidden", !_ctx.filterable)
                ])
              }, [
                withDirectives(createElementVNode("input", {
                  id: _ctx.inputId,
                  ref: "inputRef",
                  "onUpdate:modelValue": ($event) => _ctx.states.inputValue = $event,
                  type: "text",
                  name: _ctx.name,
                  class: normalizeClass([_ctx.nsSelect.e("input"), _ctx.nsSelect.is(_ctx.selectSize)]),
                  disabled: _ctx.selectDisabled,
                  autocomplete: _ctx.autocomplete,
                  maxlength: _ctx.filterMaxLength,
                  style: normalizeStyle(_ctx.inputStyle),
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
                    withKeys(withModifiers(($event) => _ctx.navigateOptions("next"), ["stop", "prevent"]), ["down"]),
                    withKeys(withModifiers(($event) => _ctx.navigateOptions("prev"), ["stop", "prevent"]), ["up"]),
                    withKeys(withModifiers(_ctx.handleEsc, ["stop", "prevent"]), ["esc"]),
                    withKeys(withModifiers(_ctx.selectOption, ["stop", "prevent"]), ["enter"]),
                    withKeys(withModifiers(_ctx.deletePrevTag, ["stop"]), ["delete"])
                  ],
                  onCompositionstart: _ctx.handleCompositionStart,
                  onCompositionupdate: _ctx.handleCompositionUpdate,
                  onCompositionend: _ctx.handleCompositionEnd,
                  onInput: _ctx.onInput,
                  onClick: withModifiers(_ctx.toggleMenu, ["stop"])
                }, null, 46, ["id", "onUpdate:modelValue", "name", "disabled", "autocomplete", "maxlength", "tabindex", "readonly", "aria-activedescendant", "aria-controls", "aria-expanded", "aria-label", "onKeydown", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onInput", "onClick"]), [
                  [vModelText, _ctx.states.inputValue]
                ]),
                _ctx.filterable ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  ref: "calculatorRef",
                  "aria-hidden": "true",
                  class: normalizeClass(_ctx.nsSelect.e("input-calculator")),
                  textContent: toDisplayString(_ctx.states.inputValue)
                }, null, 10, ["textContent"])) : createCommentVNode("v-if", true)
              ], 2),
              !_ctx.floatLabel || _ctx.shouldShowPlaceholder && _ctx.hasModelValue ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass([
                  _ctx.nsSelect.e("selected-item"),
                  _ctx.nsSelect.e("placeholder"),
                  _ctx.nsSelect.is("transparent", !_ctx.hasModelValue || _ctx.expanded && !_ctx.states.inputValue)
                ])
              }, [
                renderSlot(_ctx.$slots, "label", {
                  index: _ctx.getOption(_ctx.modelValue).index,
                  label: _ctx.currentPlaceholder,
                  value: _ctx.modelValue
                }, () => [
                  createElementVNode("span", null, toDisplayString(_ctx.currentPlaceholder), 1)
                ])
              ], 2)) : createCommentVNode("v-if", true)
            ], 2),
            createElementVNode("div", {
              ref: "suffixRef",
              class: normalizeClass(_ctx.nsSelect.e("suffix"))
            }, [
              createTextVNode(toDisplayString(_ctx.labelSuffix) + " ", 1),
              _ctx.$slots.info ? renderSlot(_ctx.$slots, "info", { key: 0 }) : createCommentVNode("v-if", true),
              _ctx.iconComponent && !_ctx.showClearBtn && !_ctx.validateError ? (openBlock(), createBlock(_component_el_icon, {
                key: 1,
                class: normalizeClass([_ctx.nsSelect.e("caret"), _ctx.nsSelect.e("icon"), _ctx.iconReverse])
              }, {
                default: withCtx(() => [
                  (openBlock(), createElementBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12"
                  }, [
                    createElementVNode("path", { d: "M5.99992 7.75002C5.86862 7.75024 5.73856 7.72452 5.61723 7.67432C5.4959 7.62413 5.38569 7.55045 5.29292 7.45752L2.64642 4.81052L3.35342 4.10352L5.99992 6.75002L8.64642 4.10352L9.35342 4.81052L6.70692 7.45702C6.6142 7.55004 6.50401 7.62381 6.38267 7.67409C6.26134 7.72438 6.13126 7.75018 5.99992 7.75002Z" })
                  ]))
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("v-if", true),
              _ctx.showClearBtn && _ctx.clearIcon ? (openBlock(), createBlock(_component_el_icon, {
                key: 2,
                class: normalizeClass([
                  _ctx.nsSelect.e("caret"),
                  _ctx.nsSelect.e("icon"),
                  _ctx.nsSelect.e("clear")
                ]),
                onClick: _ctx.handleClearClick
              }, {
                default: withCtx(() => [
                  (openBlock(), createElementBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12"
                  }, [
                    createElementVNode("path", { d: "M9.35349 3.35342L8.64648 2.64642L5.99998 5.29292L3.35348 2.64642L2.64648 3.35342L5.29298 5.99992L2.64648 8.64642L3.35348 9.35342L5.99998 6.70692L8.64648 9.35342L9.35349 8.64642L6.70698 5.99992L9.35349 3.35342Z" })
                  ]))
                ]),
                _: 1
              }, 8, ["class", "onClick"])) : createCommentVNode("v-if", true),
              _ctx.validateError ? (openBlock(), createBlock(_component_el_tooltip, {
                key: 3,
                content: _ctx.validateMsg,
                effect: "light",
                placement: "top",
                offset: 4
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, {
                    class: "error-icon",
                    color: "#A1160A"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createElementBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "12",
                        height: "12",
                        viewBox: "0 0 12 12"
                      }, [
                        createElementVNode("path", { d: "M6.00041 1C8.00045 1 6.75037 5.25 6.75037 5.25C6.75037 5.25 10.1112 2.75 11.0004 4.5C11.8896 6.25 7.25037 6.75 7.25037 6.75C7.25037 6.75 10.7186 9.88284 9.25035 10.9496C7.78208 12.0164 6.00037 7.5 6.00037 7.5C6.00037 7.5 4.23586 12.0164 2.76759 10.9496C1.29932 9.88283 4.75037 6.75 4.75037 6.75C4.75037 6.75 0.250258 6.25 1.00035 4.5C1.75045 2.75 5.25037 5.25 5.25037 5.25C5.25037 5.25 4.00037 1 6.00041 1Z" })
                      ]))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["content"])) : createCommentVNode("v-if", true),
              _ctx.validateState && _ctx.validateIcon ? (openBlock(), createBlock(_component_el_icon, {
                key: 4,
                class: normalizeClass([
                  _ctx.nsInput.e("icon"),
                  _ctx.nsInput.e("validateIcon"),
                  _ctx.nsInput.is("loading", _ctx.validateState === "validating")
                ]),
                innerHTML: _ctx.validateIcon
              }, null, 8, ["class", "innerHTML"])) : createCommentVNode("v-if", true)
            ], 2)
          ], 10, ["onClick"])
        ];
      }),
      content: withCtx(() => [
        createVNode(_component_el_select_menu, { ref: "menuRef" }, {
          default: withCtx(() => [
            _ctx.$slots.header ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(_ctx.nsSelect.be("dropdown", "header")),
              onClick: withModifiers(() => {
              }, ["stop"])
            }, [
              renderSlot(_ctx.$slots, "header")
            ], 10, ["onClick"])) : createCommentVNode("v-if", true),
            withDirectives(createVNode(_component_el_scrollbar, {
              id: _ctx.contentId,
              ref: "scrollbarRef",
              tag: "ul",
              "wrap-class": _ctx.nsSelect.be("dropdown", "wrap"),
              "view-class": _ctx.nsSelect.be("dropdown", "list"),
              class: normalizeClass([_ctx.nsSelect.is("empty", _ctx.filteredOptionsCount === 0)]),
              role: "listbox",
              "aria-label": _ctx.ariaLabel,
              "aria-orientation": "vertical",
              onScroll: _ctx.popupScroll
            }, {
              default: withCtx(() => [
                _ctx.states.selected.length && _ctx.haveAll ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "select-all-item"
                }, toDisplayString(_ctx.haveAll), 1)) : createCommentVNode("v-if", true),
                _ctx.addShowTip && _ctx.filterable ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: "select-add-tip"
                }, toDisplayString(_ctx.addShowTip), 1)) : createCommentVNode("v-if", true),
                _ctx.showNewOption ? (openBlock(), createBlock(_component_el_option, {
                  key: 2,
                  value: _ctx.states.inputValue,
                  created: true
                }, null, 8, ["value"])) : createCommentVNode("v-if", true),
                createVNode(_component_el_options, null, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default", {}, () => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option, index) => {
                        var _a;
                        return openBlock(), createElementBlock(Fragment, { key: index }, [
                          ((_a = _ctx.getOptions(option)) == null ? void 0 : _a.length) ? (openBlock(), createBlock(_component_el_option_group, {
                            key: 0,
                            label: _ctx.getLabel(option),
                            disabled: _ctx.getDisabled(option)
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getOptions(option), (item) => {
                                return openBlock(), createBlock(_component_el_option, mergeProps({
                                  key: _ctx.getValue(item)
                                }, _ctx.getOptionProps(item)), null, 16);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["label", "disabled"])) : (openBlock(), createBlock(_component_el_option, normalizeProps(mergeProps({ key: 1 }, _ctx.getOptionProps(option))), null, 16))
                        ], 64);
                      }), 128))
                    ])
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }, 8, ["id", "wrap-class", "view-class", "class", "aria-label", "onScroll"]), [
              [vShow, (_ctx.states.options.size > 0 || _ctx.addItem) && !_ctx.loading]
            ]),
            _ctx.$slots.loading && _ctx.loading ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(_ctx.nsSelect.be("dropdown", "loading"))
            }, [
              renderSlot(_ctx.$slots, "loading")
            ], 2)) : _ctx.loading || _ctx.filteredOptionsCount === 0 ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: normalizeClass(_ctx.nsSelect.be("dropdown", "empty"))
            }, [
              renderSlot(_ctx.$slots, "empty", {}, () => [
                !_ctx.addItem ? (openBlock(), createElementBlock("span", { key: 0 }, toDisplayString(_ctx.emptyText), 1)) : (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: "el-select-dropdown__item add-item",
                  onClick: _ctx.handleAddSelect
                }, [
                  createVNode(_component_el_icon, { color: "#4f566" }, {
                    default: withCtx(() => [
                      (openBlock(), createElementBlock("svg", {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 12 12",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createElementVNode("g", { "clip-path": "url(#clip0_743_39597)" }, [
                          createElementVNode("path", { d: "M12 5.25H6.75V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25Z" })
                        ]),
                        createElementVNode("defs", null, [
                          createElementVNode("clipPath", { id: "clip0_743_39597" }, [
                            createElementVNode("rect", {
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
                  createElementVNode("span", { class: "tip" }, toDisplayString(_ctx.states.inputValue), 1)
                ], 8, ["onClick"]))
              ])
            ], 2)) : createCommentVNode("v-if", true),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
              key: 3,
              class: normalizeClass(_ctx.nsSelect.be("dropdown", "footer")),
              onClick: withModifiers(() => {
              }, ["stop"])
            }, [
              renderSlot(_ctx.$slots, "footer")
            ], 10, ["onClick"])) : createCommentVNode("v-if", true)
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
var Select = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "select.vue"]]);

export { Select as default };
//# sourceMappingURL=select2.mjs.map
