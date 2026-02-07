'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$4 = require('../../icon/index.js');
var tooltip = require('../../tooltip/src/tooltip.js');
var core = require('@vueuse/core');
var lodashUnified = require('lodash-unified');
var input = require('./input2.js');
var utils = require('./utils.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-attrs/index.js');
var useFormItem = require('../../form/src/hooks/use-form-item.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var index$2 = require('../../../hooks/use-focus-controller/index.js');
var icon = require('../../../utils/vue/icon.js');
var index$3 = require('../../../hooks/use-composition/index.js');
var event = require('../../../constants/event.js');
var index$5 = require('../../../hooks/use-cursor/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');
var error = require('../../../utils/error.js');
var types = require('../../../utils/types.js');
var shared = require('@vue/shared');

const COMPONENT_NAME = "ElInput";
const __default__ = vue.defineComponent({
  name: COMPONENT_NAME,
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: input.inputProps,
  emits: input.inputEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const rawAttrs = vue.useAttrs();
    const attrs = index.useAttrs();
    const slots = vue.useSlots();
    const containerKls = vue.computed(() => [
      props.type === "textarea" ? nsTextarea.b() : nsInput.b(),
      nsInput.m(inputSize.value),
      nsInput.is("disabled", inputDisabled.value),
      nsInput.is("exceed", inputExceed.value),
      {
        [nsInput.b("group")]: slots.prepend || slots.append,
        [nsInput.m("prefix")]: slots.prefix || props.prefixIcon,
        [nsInput.m("suffix")]: slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
        [nsInput.bm("suffix", "password-clear")]: showClear.value && showPwdVisible.value,
        [nsInput.b("hidden")]: props.type === "hidden"
      },
      rawAttrs.class
    ]);
    const wrapperKls = vue.computed(() => [
      nsInput.e("wrapper"),
      nsInput.is("focus", isFocused.value),
      props.preStar && !isFocused.value && !textLength.value ? "pre-star-item" : ""
    ]);
    const teatareaStar = vue.computed(() => props.preStar && !isFocused.value && !textLength.value && !validateState.value);
    const { form: elForm, formItem: elFormItem } = useFormItem.useFormItem();
    const { inputId } = useFormItem.useFormItemInputId(props, {
      formItemContext: elFormItem
    });
    const inputSize = useFormCommonProps.useFormSize();
    const inputDisabled = useFormCommonProps.useFormDisabled();
    const nsInput = index$1.useNamespace("input");
    const nsTextarea = index$1.useNamespace("textarea");
    const input = vue.shallowRef();
    const textarea = vue.shallowRef();
    const hovering = vue.ref(false);
    const passwordVisible = vue.ref(false);
    const countStyle = vue.ref();
    const textareaCalcStyle = vue.shallowRef(props.inputStyle);
    const _ref = vue.computed(() => input.value || textarea.value);
    const { wrapperRef, isFocused, handleFocus, handleBlur } = index$2.useFocusController(_ref, {
      disabled: inputDisabled,
      afterBlur() {
        var _a;
        if (props.validateEvent) {
          (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "blur").catch((err) => error.debugWarn());
        }
      }
    });
    const needStatusIcon = vue.computed(() => {
      var _a;
      return (_a = elForm == null ? void 0 : elForm.statusIcon) != null ? _a : false;
    });
    const validateState = vue.computed(() => (elFormItem == null ? void 0 : elFormItem.validateState) || "");
    const validateMsg = vue.computed(() => (elFormItem == null ? void 0 : elFormItem.validateMessage) || "");
    const validateIcon = vue.computed(() => validateState.value && icon.ValidateComponentsMap[validateState.value]);
    const validateError = vue.computed(() => validateState.value === "error");
    const containerStyle = vue.computed(() => [
      rawAttrs.style
    ]);
    const textareaStyle = vue.computed(() => [
      props.inputStyle,
      textareaCalcStyle.value,
      { resize: props.resize }
    ]);
    const nativeInputValue = vue.computed(() => lodashUnified.isNil(props.modelValue) ? "" : String(props.modelValue));
    const showClear = vue.computed(() => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value));
    const showPwdVisible = vue.computed(() => props.showPassword && !inputDisabled.value && !!nativeInputValue.value);
    const isWordLimitVisible = vue.computed(() => props.showWordLimit && !!props.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword);
    const textLength = vue.computed(() => nativeInputValue.value.length);
    const inputExceed = vue.computed(() => !!isWordLimitVisible.value && textLength.value > Number(props.maxlength));
    const suffixVisible = vue.computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value);
    const hasModelModifiers = vue.computed(() => !!Object.keys(props.modelModifiers).length);
    const [recordCursor, setCursor] = index$5.useCursor(input);
    core.useResizeObserver(textarea, (entries) => {
      onceInitSizeTextarea();
      if (!isWordLimitVisible.value || props.resize !== "both")
        return;
      const entry = entries[0];
      const { width } = entry.contentRect;
      countStyle.value = {
        right: `calc(100% - ${width + 15 + 6}px)`
      };
    });
    const handleTextareaFocus = () => {
      var _a;
      (_a = textarea.value) == null ? void 0 : _a.focus();
    };
    const resizeTextarea = () => {
      const { type, autosize } = props;
      if (!core.isClient || type !== "textarea" || !textarea.value)
        return;
      if (autosize) {
        const minRows = shared.isObject(autosize) ? autosize.minRows : void 0;
        const maxRows = shared.isObject(autosize) ? autosize.maxRows : void 0;
        const textareaStyle2 = utils.calcTextareaHeight(textarea.value, minRows, maxRows);
        textareaCalcStyle.value = {
          overflowY: "hidden",
          ...textareaStyle2
        };
        vue.nextTick(() => {
          textarea.value.offsetHeight;
          textareaCalcStyle.value = textareaStyle2;
        });
      } else {
        textareaCalcStyle.value = {
          minHeight: utils.calcTextareaHeight(textarea.value).minHeight
        };
      }
    };
    const createOnceInitResize = (resizeTextarea2) => {
      let isInit = false;
      return () => {
        var _a;
        if (isInit || !props.autosize)
          return;
        const isElHidden = ((_a = textarea.value) == null ? void 0 : _a.offsetParent) === null;
        if (!isElHidden) {
          setTimeout(resizeTextarea2);
          isInit = true;
        }
      };
    };
    const onceInitSizeTextarea = createOnceInitResize(resizeTextarea);
    const setNativeInputValue = () => {
      const input2 = _ref.value;
      const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value;
      if (!input2 || input2.value === formatterValue)
        return;
      input2.value = formatterValue;
    };
    const formatValue = (value) => {
      const { trim, number } = props.modelModifiers;
      if (trim) {
        value = value.trim();
      }
      if (number) {
        value = `${utils.looseToNumber(value)}`;
      }
      if (props.formatter && props.parser) {
        value = props.parser(value);
      }
      return value;
    };
    const handleInput = async (event$1) => {
      if (isComposing.value)
        return;
      const { lazy } = props.modelModifiers;
      let { value } = event$1.target;
      if (lazy) {
        emit(event.INPUT_EVENT, value);
        return;
      }
      value = formatValue(value);
      if (String(value) === nativeInputValue.value) {
        if (props.formatter) {
          setNativeInputValue();
        }
        return;
      }
      recordCursor();
      emit(event.UPDATE_MODEL_EVENT, value);
      emit(event.INPUT_EVENT, value);
      await vue.nextTick();
      if (props.formatter && props.parser || !hasModelModifiers.value) {
        setNativeInputValue();
      }
      setCursor();
    };
    const handleChange = async (event$1) => {
      let { value } = event$1.target;
      value = formatValue(value);
      if (props.modelModifiers.lazy) {
        emit(event.UPDATE_MODEL_EVENT, value);
      }
      emit(event.CHANGE_EVENT, value);
      await vue.nextTick();
      setNativeInputValue();
    };
    const {
      isComposing,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd
    } = index$3.useComposition({ emit, afterComposition: handleInput });
    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
    };
    const focus = () => {
      var _a;
      return (_a = _ref.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      return (_a = _ref.value) == null ? void 0 : _a.blur();
    };
    const handleMouseLeave = (evt) => {
      hovering.value = false;
      emit("mouseleave", evt);
    };
    const handleMouseEnter = (evt) => {
      hovering.value = true;
      emit("mouseenter", evt);
    };
    const handleKeydown = (evt) => {
      emit("keydown", evt);
    };
    const select = () => {
      var _a;
      (_a = _ref.value) == null ? void 0 : _a.select();
    };
    const clear = () => {
      emit(event.UPDATE_MODEL_EVENT, "");
      emit(event.CHANGE_EVENT, "");
      emit("clear");
      emit(event.INPUT_EVENT, "");
    };
    vue.watch(() => props.modelValue, () => {
      var _a;
      vue.nextTick(() => resizeTextarea());
      if (props.validateEvent) {
        (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change").catch((err) => error.debugWarn());
      }
    });
    vue.watch(nativeInputValue, (newValue) => {
      if (!_ref.value) {
        return;
      }
      const { trim, number } = props.modelModifiers;
      const elValue = _ref.value.value;
      const displayValue = (number || props.type === "number") && !/^0\d/.test(elValue) ? `${utils.looseToNumber(elValue)}` : elValue;
      if (displayValue === newValue) {
        return;
      }
      if (document.activeElement === _ref.value && _ref.value.type !== "range") {
        if (trim && displayValue.trim() === newValue) {
          return;
        }
      }
      setNativeInputValue();
    });
    vue.watch(() => props.type, async () => {
      await vue.nextTick();
      setNativeInputValue();
      resizeTextarea();
    });
    vue.onMounted(() => {
      if (!props.formatter && props.parser) ;
      setNativeInputValue();
      vue.nextTick(resizeTextarea);
    });
    expose({
      input,
      textarea,
      ref: _ref,
      textareaStyle,
      autosize: vue.toRef(props, "autosize"),
      isComposing,
      focus,
      blur,
      select,
      clear,
      resizeTextarea
    });
    return (_ctx, _cache) => {
      var _a;
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass([
          vue.unref(containerKls),
          {
            [vue.unref(nsInput).bm("group", "append")]: _ctx.$slots.append,
            [vue.unref(nsInput).bm("group", "prepend")]: _ctx.$slots.prepend
          }
        ]),
        style: vue.normalizeStyle(vue.unref(containerStyle)),
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave
      }, [
        vue.createCommentVNode(" input "),
        _ctx.type !== "textarea" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          vue.createCommentVNode(" prepend slot "),
          _ctx.$slots.prepend ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(vue.unref(nsInput).be("group", "prepend"))
          }, [
            vue.renderSlot(_ctx.$slots, "prepend")
          ], 2)) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("div", {
            ref_key: "wrapperRef",
            ref: wrapperRef,
            class: vue.normalizeClass(vue.unref(wrapperKls))
          }, [
            vue.createCommentVNode(" prefix slot "),
            _ctx.$slots.prefix || _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              class: vue.normalizeClass(vue.unref(nsInput).e("prefix"))
            }, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(vue.unref(nsInput).e("prefix-inner"))
              }, [
                vue.renderSlot(_ctx.$slots, "prefix"),
                _ctx.prefixIcon ? (vue.openBlock(), vue.createBlock(vue.unref(index$4.ElIcon), {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(nsInput).e("icon")),
                  size: "12px"
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.prefixIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
              ], 2)
            ], 2)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("input", vue.mergeProps({
              id: vue.unref(inputId),
              ref_key: "input",
              ref: input,
              required: "",
              class: vue.unref(nsInput).e("inner")
            }, vue.unref(attrs), {
              name: _ctx.name,
              minlength: _ctx.minlength,
              maxlength: _ctx.maxlength,
              type: _ctx.showPassword ? passwordVisible.value ? "text" : "password" : _ctx.type,
              disabled: vue.unref(inputDisabled),
              readonly: _ctx.readonly,
              autocomplete: _ctx.autocomplete,
              tabindex: _ctx.tabindex,
              "aria-label": _ctx.ariaLabel,
              placeholder: !_ctx.floatLabel ? _ctx.placeholder : "",
              style: _ctx.inputStyle,
              form: _ctx.form,
              autofocus: _ctx.autofocus,
              role: _ctx.containerRole,
              inputmode: _ctx.inputmode,
              onCompositionstart: vue.unref(handleCompositionStart),
              onCompositionupdate: vue.unref(handleCompositionUpdate),
              onCompositionend: vue.unref(handleCompositionEnd),
              onInput: handleInput,
              onChange: handleChange,
              onKeydown: handleKeydown
            }), null, 16, ["id", "name", "minlength", "maxlength", "type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus", "role", "inputmode", "onCompositionstart", "onCompositionupdate", "onCompositionend"]),
            _ctx.floatLabel && _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 1,
              class: vue.normalizeClass(["float-label", {
                "prefix-label": _ctx.$slots.prefix || _ctx.prefixIcon,
                "has-value": !vue.unref(types.isEmpty)(_ctx.modelValue)
              }])
            }, vue.toDisplayString(_ctx.placeholder), 3)) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" suffix slot "),
            vue.unref(suffixVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 2,
              class: vue.normalizeClass(vue.unref(nsInput).e("suffix"))
            }, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(vue.unref(nsInput).e("suffix-inner"))
              }, [
                vue.unref(showClear) ? (vue.openBlock(), vue.createBlock(vue.unref(index$4.ElIcon), {
                  key: 0,
                  class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsInput).e("clear")]),
                  onMousedown: vue.withModifiers(vue.unref(shared.NOOP), ["prevent"]),
                  onClick: clear
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
                }, 8, ["class", "onMousedown"])) : vue.createCommentVNode("v-if", true),
                (!vue.unref(showClear) || !vue.unref(showPwdVisible) || !vue.unref(isWordLimitVisible)) && ((_a = _ctx.alwaysShowSuffix) != null ? _a : !vue.unref(validateState)) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  _ctx.isHoverSuffix && hovering.value || !_ctx.isHoverSuffix ? vue.renderSlot(_ctx.$slots, "suffix", { key: 0 }) : vue.createCommentVNode("v-if", true),
                  _ctx.suffixIcon ? (vue.openBlock(), vue.createBlock(vue.unref(index$4.ElIcon), {
                    key: 1,
                    class: vue.normalizeClass(vue.unref(nsInput).e("icon"))
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.suffixIcon)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                ], 64)) : vue.createCommentVNode("v-if", true),
                vue.unref(showPwdVisible) ? (vue.openBlock(), vue.createBlock(vue.unref(index$4.ElIcon), {
                  key: 2,
                  class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsInput).e("password")]),
                  onClick: handlePasswordVisible,
                  onMousedown: vue.withModifiers(vue.unref(shared.NOOP), ["prevent"]),
                  onMouseup: vue.withModifiers(vue.unref(shared.NOOP), ["prevent"])
                }, {
                  default: vue.withCtx(() => [
                    passwordVisible.value ? (vue.openBlock(), vue.createElementBlock("svg", {
                      key: 0,
                      xmlns: "http://www.w3.org/2000/svg",
                      "xmlns:xlink": "http://www.w3.org/1999/xlink",
                      width: "24",
                      height: "24",
                      fill: "#1a1f36",
                      viewBox: "0 0 24 24"
                    }, [
                      vue.createElementVNode("path", {
                        id: "ujy5xle6ka",
                        d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                      })
                    ])) : (vue.openBlock(), vue.createElementBlock("svg", {
                      key: 1,
                      width: "18",
                      fill: "#1a1f36",
                      height: "18",
                      viewBox: "0 0 18 18",
                      xmlns: "http://www.w3.org/2000/svg",
                      "xmlns:xlink": "http://www.w3.org/1999/xlink"
                    }, [
                      vue.createElementVNode("path", {
                        id: "a",
                        d: "M9 5.25c2.07 0 3.75 1.68 3.75 3.75 0 .488-.098.945-.27 1.373l2.19 2.19A8.863 8.863 0 0 0 17.242 9c-1.297-3.293-4.5-5.625-8.25-5.625-1.05 0-2.055.188-2.985.525l1.62 1.62A3.64 3.64 0 0 1 9 5.25zM1.5 3.203l1.71 1.71.345.345A8.853 8.853 0 0 0 .75 9c1.297 3.293 4.5 5.625 8.25 5.625a8.832 8.832 0 0 0 3.285-.63l.315.315 2.197 2.19.953-.953L2.453 2.25l-.953.953zM5.647 7.35 6.81 8.512c-.037.158-.06.323-.06.488A2.247 2.247 0 0 0 9 11.25c.165 0 .33-.023.488-.06l1.162 1.162A3.717 3.717 0 0 1 9 12.75c-2.07 0-3.75-1.68-3.75-3.75 0-.592.15-1.147.397-1.65zm3.233-.585 2.362 2.362.015-.12a2.247 2.247 0 0 0-2.25-2.25l-.127.008z"
                      })
                    ]))
                  ]),
                  _: 1
                }, 8, ["class", "onMousedown", "onMouseup"])) : vue.createCommentVNode("v-if", true),
                vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 3,
                  class: vue.normalizeClass([
                    vue.unref(nsInput).e("count"),
                    vue.unref(nsInput).is("outside", _ctx.wordLimitPosition === "outside")
                  ])
                }, [
                  vue.createElementVNode("span", {
                    class: vue.normalizeClass(vue.unref(nsInput).e("count-inner"))
                  }, vue.toDisplayString(vue.unref(textLength)) + " / " + vue.toDisplayString(_ctx.maxlength), 3)
                ], 2)) : vue.createCommentVNode("v-if", true),
                vue.unref(validateState) && vue.unref(validateIcon) && vue.unref(needStatusIcon) ? (vue.openBlock(), vue.createBlock(vue.unref(index$4.ElIcon), {
                  key: 4,
                  class: vue.normalizeClass([
                    vue.unref(nsInput).e("icon"),
                    vue.unref(nsInput).e("validateIcon"),
                    vue.unref(nsInput).is("loading", vue.unref(validateState) === "validating")
                  ]),
                  innerHTML: vue.unref(validateIcon)
                }, null, 8, ["class", "innerHTML"])) : vue.createCommentVNode("v-if", true)
              ], 2)
            ], 2)) : vue.createCommentVNode("v-if", true),
            vue.unref(validateError) ? (vue.openBlock(), vue.createBlock(tooltip["default"], {
              key: 3,
              content: vue.unref(validateMsg),
              effect: "light",
              placement: "top",
              offset: 4
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.unref(index$4.ElIcon), {
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
            }, 8, ["content"])) : vue.createCommentVNode("v-if", true)
          ], 2),
          vue.createCommentVNode(" append slot "),
          _ctx.$slots.append ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 1,
            class: vue.normalizeClass(vue.unref(nsInput).be("group", "append"))
          }, [
            vue.renderSlot(_ctx.$slots, "append")
          ], 2)) : vue.createCommentVNode("v-if", true)
        ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
          vue.createCommentVNode(" textarea "),
          vue.createElementVNode("textarea", vue.mergeProps({
            id: vue.unref(inputId),
            ref_key: "textarea",
            ref: textarea,
            class: [vue.unref(nsTextarea).e("inner"), vue.unref(nsInput).is("focus", vue.unref(isFocused))]
          }, vue.unref(attrs), {
            minlength: _ctx.minlength,
            maxlength: _ctx.maxlength,
            tabindex: _ctx.tabindex,
            disabled: vue.unref(inputDisabled),
            readonly: _ctx.readonly,
            autocomplete: _ctx.autocomplete,
            style: vue.unref(textareaStyle),
            "aria-label": _ctx.ariaLabel,
            placeholder: !_ctx.floatLabel ? _ctx.placeholder : "",
            form: _ctx.form,
            autofocus: _ctx.autofocus,
            rows: _ctx.rows,
            role: _ctx.containerRole,
            onCompositionstart: vue.unref(handleCompositionStart),
            onCompositionupdate: vue.unref(handleCompositionUpdate),
            onCompositionend: vue.unref(handleCompositionEnd),
            onInput: handleInput,
            onFocus: vue.unref(handleFocus),
            onBlur: vue.unref(handleBlur),
            onChange: handleChange,
            onKeydown: handleKeydown
          }), null, 16, ["id", "minlength", "maxlength", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus", "rows", "role", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onFocus", "onBlur"]),
          vue.unref(teatareaStar) ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            class: "pre-star-item"
          }, "*")) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.textareaPrefix ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 1,
            class: "textarea-prefix"
          }, [
            vue.renderSlot(_ctx.$slots, "textareaPrefix")
          ])) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.textareaSuffix ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 2,
            class: "textarea-suffix"
          }, [
            vue.renderSlot(_ctx.$slots, "textareaSuffix")
          ])) : vue.createCommentVNode("v-if", true),
          vue.unref(validateError) ? (vue.openBlock(), vue.createBlock(tooltip["default"], {
            key: 3,
            content: vue.unref(validateMsg),
            effect: "light",
            placement: "top",
            offset: 4
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(index$4.ElIcon), {
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
          _ctx.floatLabel && _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 4,
            class: vue.normalizeClass(["float-label", { "has-value": !vue.unref(types.isEmpty)(_ctx.modelValue) }]),
            onClick: handleTextareaFocus
          }, vue.toDisplayString(_ctx.placeholder), 3)) : vue.createCommentVNode("v-if", true),
          vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 5,
            style: vue.normalizeStyle(countStyle.value),
            class: vue.normalizeClass([
              vue.unref(nsInput).e("count"),
              vue.unref(nsInput).is("outside", _ctx.wordLimitPosition === "outside")
            ])
          }, vue.toDisplayString(vue.unref(textLength)) + " / " + vue.toDisplayString(_ctx.maxlength), 7)) : vue.createCommentVNode("v-if", true)
        ], 64))
      ], 38);
    };
  }
});
var Input = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "input.vue"]]);

exports["default"] = Input;
//# sourceMappingURL=input.js.map
