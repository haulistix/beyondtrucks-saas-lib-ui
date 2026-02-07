import { defineComponent, useAttrs, useSlots, computed, shallowRef, ref, watch, nextTick, onMounted, toRef, openBlock, createElementBlock, normalizeClass, unref, normalizeStyle, createCommentVNode, Fragment, renderSlot, createElementVNode, createBlock, withCtx, resolveDynamicComponent, mergeProps, toDisplayString, withModifiers, createVNode } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import Tooltip from '../../tooltip/src/tooltip.mjs';
import { useResizeObserver, isClient } from '@vueuse/core';
import { isNil } from 'lodash-unified';
import { inputProps, inputEmits } from './input2.mjs';
import { looseToNumber, calcTextareaHeight } from './utils.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useAttrs as useAttrs$1 } from '../../../hooks/use-attrs/index.mjs';
import { useFormItem, useFormItemInputId } from '../../form/src/hooks/use-form-item.mjs';
import { useFormSize, useFormDisabled } from '../../form/src/hooks/use-form-common-props.mjs';
import { useFocusController } from '../../../hooks/use-focus-controller/index.mjs';
import { ValidateComponentsMap } from '../../../utils/vue/icon.mjs';
import { useComposition } from '../../../hooks/use-composition/index.mjs';
import { INPUT_EVENT, UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../constants/event.mjs';
import { useCursor } from '../../../hooks/use-cursor/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { debugWarn } from '../../../utils/error.mjs';
import { isEmpty } from '../../../utils/types.mjs';
import { NOOP, isObject } from '@vue/shared';

const COMPONENT_NAME = "ElInput";
const __default__ = defineComponent({
  name: COMPONENT_NAME,
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: inputProps,
  emits: inputEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const rawAttrs = useAttrs();
    const attrs = useAttrs$1();
    const slots = useSlots();
    const containerKls = computed(() => [
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
    const wrapperKls = computed(() => [
      nsInput.e("wrapper"),
      nsInput.is("focus", isFocused.value),
      props.preStar && !isFocused.value && !textLength.value ? "pre-star-item" : ""
    ]);
    const teatareaStar = computed(() => props.preStar && !isFocused.value && !textLength.value && !validateState.value);
    const { form: elForm, formItem: elFormItem } = useFormItem();
    const { inputId } = useFormItemInputId(props, {
      formItemContext: elFormItem
    });
    const inputSize = useFormSize();
    const inputDisabled = useFormDisabled();
    const nsInput = useNamespace("input");
    const nsTextarea = useNamespace("textarea");
    const input = shallowRef();
    const textarea = shallowRef();
    const hovering = ref(false);
    const passwordVisible = ref(false);
    const countStyle = ref();
    const textareaCalcStyle = shallowRef(props.inputStyle);
    const _ref = computed(() => input.value || textarea.value);
    const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref, {
      disabled: inputDisabled,
      afterBlur() {
        var _a;
        if (props.validateEvent) {
          (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "blur").catch((err) => debugWarn());
        }
      }
    });
    const needStatusIcon = computed(() => {
      var _a;
      return (_a = elForm == null ? void 0 : elForm.statusIcon) != null ? _a : false;
    });
    const validateState = computed(() => (elFormItem == null ? void 0 : elFormItem.validateState) || "");
    const validateMsg = computed(() => (elFormItem == null ? void 0 : elFormItem.validateMessage) || "");
    const validateIcon = computed(() => validateState.value && ValidateComponentsMap[validateState.value]);
    const validateError = computed(() => validateState.value === "error");
    const containerStyle = computed(() => [
      rawAttrs.style
    ]);
    const textareaStyle = computed(() => [
      props.inputStyle,
      textareaCalcStyle.value,
      { resize: props.resize }
    ]);
    const nativeInputValue = computed(() => isNil(props.modelValue) ? "" : String(props.modelValue));
    const showClear = computed(() => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value));
    const showPwdVisible = computed(() => props.showPassword && !inputDisabled.value && !!nativeInputValue.value);
    const isWordLimitVisible = computed(() => props.showWordLimit && !!props.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword);
    const textLength = computed(() => nativeInputValue.value.length);
    const inputExceed = computed(() => !!isWordLimitVisible.value && textLength.value > Number(props.maxlength));
    const suffixVisible = computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value);
    const hasModelModifiers = computed(() => !!Object.keys(props.modelModifiers).length);
    const [recordCursor, setCursor] = useCursor(input);
    useResizeObserver(textarea, (entries) => {
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
      if (!isClient || type !== "textarea" || !textarea.value)
        return;
      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : void 0;
        const maxRows = isObject(autosize) ? autosize.maxRows : void 0;
        const textareaStyle2 = calcTextareaHeight(textarea.value, minRows, maxRows);
        textareaCalcStyle.value = {
          overflowY: "hidden",
          ...textareaStyle2
        };
        nextTick(() => {
          textarea.value.offsetHeight;
          textareaCalcStyle.value = textareaStyle2;
        });
      } else {
        textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight
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
        value = `${looseToNumber(value)}`;
      }
      if (props.formatter && props.parser) {
        value = props.parser(value);
      }
      return value;
    };
    const handleInput = async (event) => {
      if (isComposing.value)
        return;
      const { lazy } = props.modelModifiers;
      let { value } = event.target;
      if (lazy) {
        emit(INPUT_EVENT, value);
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
      emit(UPDATE_MODEL_EVENT, value);
      emit(INPUT_EVENT, value);
      await nextTick();
      if (props.formatter && props.parser || !hasModelModifiers.value) {
        setNativeInputValue();
      }
      setCursor();
    };
    const handleChange = async (event) => {
      let { value } = event.target;
      value = formatValue(value);
      if (props.modelModifiers.lazy) {
        emit(UPDATE_MODEL_EVENT, value);
      }
      emit(CHANGE_EVENT, value);
      await nextTick();
      setNativeInputValue();
    };
    const {
      isComposing,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd
    } = useComposition({ emit, afterComposition: handleInput });
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
      emit(UPDATE_MODEL_EVENT, "");
      emit(CHANGE_EVENT, "");
      emit("clear");
      emit(INPUT_EVENT, "");
    };
    watch(() => props.modelValue, () => {
      var _a;
      nextTick(() => resizeTextarea());
      if (props.validateEvent) {
        (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change").catch((err) => debugWarn());
      }
    });
    watch(nativeInputValue, (newValue) => {
      if (!_ref.value) {
        return;
      }
      const { trim, number } = props.modelModifiers;
      const elValue = _ref.value.value;
      const displayValue = (number || props.type === "number") && !/^0\d/.test(elValue) ? `${looseToNumber(elValue)}` : elValue;
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
    watch(() => props.type, async () => {
      await nextTick();
      setNativeInputValue();
      resizeTextarea();
    });
    onMounted(() => {
      if (!props.formatter && props.parser) ;
      setNativeInputValue();
      nextTick(resizeTextarea);
    });
    expose({
      input,
      textarea,
      ref: _ref,
      textareaStyle,
      autosize: toRef(props, "autosize"),
      isComposing,
      focus,
      blur,
      select,
      clear,
      resizeTextarea
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(containerKls),
          {
            [unref(nsInput).bm("group", "append")]: _ctx.$slots.append,
            [unref(nsInput).bm("group", "prepend")]: _ctx.$slots.prepend
          }
        ]),
        style: normalizeStyle(unref(containerStyle)),
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave
      }, [
        createCommentVNode(" input "),
        _ctx.type !== "textarea" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createCommentVNode(" prepend slot "),
          _ctx.$slots.prepend ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref(nsInput).be("group", "prepend"))
          }, [
            renderSlot(_ctx.$slots, "prepend")
          ], 2)) : createCommentVNode("v-if", true),
          createElementVNode("div", {
            ref_key: "wrapperRef",
            ref: wrapperRef,
            class: normalizeClass(unref(wrapperKls))
          }, [
            createCommentVNode(" prefix slot "),
            _ctx.$slots.prefix || _ctx.prefixIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(unref(nsInput).e("prefix"))
            }, [
              createElementVNode("span", {
                class: normalizeClass(unref(nsInput).e("prefix-inner"))
              }, [
                renderSlot(_ctx.$slots, "prefix"),
                _ctx.prefixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 0,
                  class: normalizeClass(unref(nsInput).e("icon")),
                  size: "12px"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(_ctx.prefixIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : createCommentVNode("v-if", true)
              ], 2)
            ], 2)) : createCommentVNode("v-if", true),
            createElementVNode("input", mergeProps({
              id: unref(inputId),
              ref_key: "input",
              ref: input,
              required: "",
              class: unref(nsInput).e("inner")
            }, unref(attrs), {
              name: _ctx.name,
              minlength: _ctx.minlength,
              maxlength: _ctx.maxlength,
              type: _ctx.showPassword ? passwordVisible.value ? "text" : "password" : _ctx.type,
              disabled: unref(inputDisabled),
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
              onCompositionstart: unref(handleCompositionStart),
              onCompositionupdate: unref(handleCompositionUpdate),
              onCompositionend: unref(handleCompositionEnd),
              onInput: handleInput,
              onChange: handleChange,
              onKeydown: handleKeydown
            }), null, 16, ["id", "name", "minlength", "maxlength", "type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus", "role", "inputmode", "onCompositionstart", "onCompositionupdate", "onCompositionend"]),
            _ctx.floatLabel && _ctx.placeholder ? (openBlock(), createElementBlock("span", {
              key: 1,
              class: normalizeClass(["float-label", {
                "prefix-label": _ctx.$slots.prefix || _ctx.prefixIcon,
                "has-value": !unref(isEmpty)(_ctx.modelValue)
              }])
            }, toDisplayString(_ctx.placeholder), 3)) : createCommentVNode("v-if", true),
            createCommentVNode(" suffix slot "),
            unref(suffixVisible) ? (openBlock(), createElementBlock("span", {
              key: 2,
              class: normalizeClass(unref(nsInput).e("suffix"))
            }, [
              createElementVNode("span", {
                class: normalizeClass(unref(nsInput).e("suffix-inner"))
              }, [
                unref(showClear) ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 0,
                  class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("clear")]),
                  onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                  onClick: clear
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
                }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", true),
                (!unref(showClear) || !unref(showPwdVisible) || !unref(isWordLimitVisible)) && ((_a = _ctx.alwaysShowSuffix) != null ? _a : !unref(validateState)) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  _ctx.isHoverSuffix && hovering.value || !_ctx.isHoverSuffix ? renderSlot(_ctx.$slots, "suffix", { key: 0 }) : createCommentVNode("v-if", true),
                  _ctx.suffixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                    key: 1,
                    class: normalizeClass(unref(nsInput).e("icon"))
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(_ctx.suffixIcon)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : createCommentVNode("v-if", true)
                ], 64)) : createCommentVNode("v-if", true),
                unref(showPwdVisible) ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 2,
                  class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("password")]),
                  onClick: handlePasswordVisible,
                  onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                  onMouseup: withModifiers(unref(NOOP), ["prevent"])
                }, {
                  default: withCtx(() => [
                    passwordVisible.value ? (openBlock(), createElementBlock("svg", {
                      key: 0,
                      xmlns: "http://www.w3.org/2000/svg",
                      "xmlns:xlink": "http://www.w3.org/1999/xlink",
                      width: "24",
                      height: "24",
                      fill: "#1a1f36",
                      viewBox: "0 0 24 24"
                    }, [
                      createElementVNode("path", {
                        id: "ujy5xle6ka",
                        d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                      })
                    ])) : (openBlock(), createElementBlock("svg", {
                      key: 1,
                      width: "18",
                      fill: "#1a1f36",
                      height: "18",
                      viewBox: "0 0 18 18",
                      xmlns: "http://www.w3.org/2000/svg",
                      "xmlns:xlink": "http://www.w3.org/1999/xlink"
                    }, [
                      createElementVNode("path", {
                        id: "a",
                        d: "M9 5.25c2.07 0 3.75 1.68 3.75 3.75 0 .488-.098.945-.27 1.373l2.19 2.19A8.863 8.863 0 0 0 17.242 9c-1.297-3.293-4.5-5.625-8.25-5.625-1.05 0-2.055.188-2.985.525l1.62 1.62A3.64 3.64 0 0 1 9 5.25zM1.5 3.203l1.71 1.71.345.345A8.853 8.853 0 0 0 .75 9c1.297 3.293 4.5 5.625 8.25 5.625a8.832 8.832 0 0 0 3.285-.63l.315.315 2.197 2.19.953-.953L2.453 2.25l-.953.953zM5.647 7.35 6.81 8.512c-.037.158-.06.323-.06.488A2.247 2.247 0 0 0 9 11.25c.165 0 .33-.023.488-.06l1.162 1.162A3.717 3.717 0 0 1 9 12.75c-2.07 0-3.75-1.68-3.75-3.75 0-.592.15-1.147.397-1.65zm3.233-.585 2.362 2.362.015-.12a2.247 2.247 0 0 0-2.25-2.25l-.127.008z"
                      })
                    ]))
                  ]),
                  _: 1
                }, 8, ["class", "onMousedown", "onMouseup"])) : createCommentVNode("v-if", true),
                unref(isWordLimitVisible) ? (openBlock(), createElementBlock("span", {
                  key: 3,
                  class: normalizeClass([
                    unref(nsInput).e("count"),
                    unref(nsInput).is("outside", _ctx.wordLimitPosition === "outside")
                  ])
                }, [
                  createElementVNode("span", {
                    class: normalizeClass(unref(nsInput).e("count-inner"))
                  }, toDisplayString(unref(textLength)) + " / " + toDisplayString(_ctx.maxlength), 3)
                ], 2)) : createCommentVNode("v-if", true),
                unref(validateState) && unref(validateIcon) && unref(needStatusIcon) ? (openBlock(), createBlock(unref(ElIcon), {
                  key: 4,
                  class: normalizeClass([
                    unref(nsInput).e("icon"),
                    unref(nsInput).e("validateIcon"),
                    unref(nsInput).is("loading", unref(validateState) === "validating")
                  ]),
                  innerHTML: unref(validateIcon)
                }, null, 8, ["class", "innerHTML"])) : createCommentVNode("v-if", true)
              ], 2)
            ], 2)) : createCommentVNode("v-if", true),
            unref(validateError) ? (openBlock(), createBlock(Tooltip, {
              key: 3,
              content: unref(validateMsg),
              effect: "light",
              placement: "top",
              offset: 4
            }, {
              default: withCtx(() => [
                createVNode(unref(ElIcon), {
                  class: "error-icon",
                  color: "#D91F11"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "12",
                      height: "11",
                      viewBox: "0 0 12 11"
                    }, [
                      createElementVNode("path", {
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
            }, 8, ["content"])) : createCommentVNode("v-if", true)
          ], 2),
          createCommentVNode(" append slot "),
          _ctx.$slots.append ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(unref(nsInput).be("group", "append"))
          }, [
            renderSlot(_ctx.$slots, "append")
          ], 2)) : createCommentVNode("v-if", true)
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createCommentVNode(" textarea "),
          createElementVNode("textarea", mergeProps({
            id: unref(inputId),
            ref_key: "textarea",
            ref: textarea,
            class: [unref(nsTextarea).e("inner"), unref(nsInput).is("focus", unref(isFocused))]
          }, unref(attrs), {
            minlength: _ctx.minlength,
            maxlength: _ctx.maxlength,
            tabindex: _ctx.tabindex,
            disabled: unref(inputDisabled),
            readonly: _ctx.readonly,
            autocomplete: _ctx.autocomplete,
            style: unref(textareaStyle),
            "aria-label": _ctx.ariaLabel,
            placeholder: !_ctx.floatLabel ? _ctx.placeholder : "",
            form: _ctx.form,
            autofocus: _ctx.autofocus,
            rows: _ctx.rows,
            role: _ctx.containerRole,
            onCompositionstart: unref(handleCompositionStart),
            onCompositionupdate: unref(handleCompositionUpdate),
            onCompositionend: unref(handleCompositionEnd),
            onInput: handleInput,
            onFocus: unref(handleFocus),
            onBlur: unref(handleBlur),
            onChange: handleChange,
            onKeydown: handleKeydown
          }), null, 16, ["id", "minlength", "maxlength", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus", "rows", "role", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onFocus", "onBlur"]),
          unref(teatareaStar) ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: "pre-star-item"
          }, "*")) : createCommentVNode("v-if", true),
          _ctx.$slots.textareaPrefix ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: "textarea-prefix"
          }, [
            renderSlot(_ctx.$slots, "textareaPrefix")
          ])) : createCommentVNode("v-if", true),
          _ctx.$slots.textareaSuffix ? (openBlock(), createElementBlock("span", {
            key: 2,
            class: "textarea-suffix"
          }, [
            renderSlot(_ctx.$slots, "textareaSuffix")
          ])) : createCommentVNode("v-if", true),
          unref(validateError) ? (openBlock(), createBlock(Tooltip, {
            key: 3,
            content: unref(validateMsg),
            effect: "light",
            placement: "top",
            offset: 4
          }, {
            default: withCtx(() => [
              createVNode(unref(ElIcon), {
                class: "error-icon",
                color: "#D91F11"
              }, {
                default: withCtx(() => [
                  (openBlock(), createElementBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "11",
                    viewBox: "0 0 12 11"
                  }, [
                    createElementVNode("path", {
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
          }, 8, ["content"])) : createCommentVNode("v-if", true),
          _ctx.floatLabel && _ctx.placeholder ? (openBlock(), createElementBlock("span", {
            key: 4,
            class: normalizeClass(["float-label", { "has-value": !unref(isEmpty)(_ctx.modelValue) }]),
            onClick: handleTextareaFocus
          }, toDisplayString(_ctx.placeholder), 3)) : createCommentVNode("v-if", true),
          unref(isWordLimitVisible) ? (openBlock(), createElementBlock("span", {
            key: 5,
            style: normalizeStyle(countStyle.value),
            class: normalizeClass([
              unref(nsInput).e("count"),
              unref(nsInput).is("outside", _ctx.wordLimitPosition === "outside")
            ])
          }, toDisplayString(unref(textLength)) + " / " + toDisplayString(_ctx.maxlength), 7)) : createCommentVNode("v-if", true)
        ], 64))
      ], 38);
    };
  }
});
var Input = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "input.vue"]]);

export { Input as default };
//# sourceMappingURL=input.mjs.map
