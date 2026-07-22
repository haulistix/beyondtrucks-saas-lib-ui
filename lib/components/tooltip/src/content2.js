'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
require('../../popper/index.js');
var index$4 = require('../../overlay/index.js');
var index$3 = require('../../teleport/index.js');
var constants = require('./constants.js');
var content = require('./content.js');
var utils = require('./utils.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-popper-container/index.js');
var arrays = require('../../../utils/arrays.js');
var content$1 = require('../../popper/src/content.js');
var index$1 = require('../../../hooks/use-z-index/index.js');
var index$2 = require('../../../hooks/use-namespace/index.js');
var aria = require('../../../utils/dom/aria.js');
var event = require('../../../utils/dom/event.js');
var types = require('../../../utils/types.js');

const __default__ = vue.defineComponent({
  name: "ElTooltipContent",
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: content.useTooltipContentProps,
  setup(__props, { expose }) {
    var _a;
    const props = __props;
    const { selector } = index.usePopperContainerId();
    const { nextZIndex } = index$1.useZIndex();
    const ns = index$2.useNamespace("tooltip");
    const contentRef = vue.ref();
    const popperContentRef = core.computedEager(() => {
      var _a2;
      return (_a2 = contentRef.value) == null ? void 0 : _a2.popperContentRef;
    });
    let stopHandle;
    const {
      controlled,
      id,
      open,
      trigger,
      onClose,
      onOpen,
      onShow,
      onHide,
      onBeforeShow,
      onBeforeHide
    } = vue.inject(constants.TOOLTIP_INJECTION_KEY, void 0);
    const transitionClass = vue.computed(() => {
      return props.transition || `${ns.namespace.value}-fade-in-linear`;
    });
    const zIndex = vue.ref((_a = props.zIndex) != null ? _a : nextZIndex());
    const overlayZIndex = vue.computed(() => props.modal ? zIndex.value - 1 : void 0);
    const persistentRef = vue.computed(() => {
      return props.persistent;
    });
    vue.onBeforeUnmount(() => {
      stopHandle == null ? void 0 : stopHandle();
    });
    const shouldRender = vue.computed(() => {
      return vue.unref(persistentRef) ? true : vue.unref(open);
    });
    const shouldShow = vue.computed(() => {
      return props.disabled ? false : vue.unref(open);
    });
    const appendTo = vue.computed(() => {
      return props.appendTo || selector.value;
    });
    const contentStyle = vue.computed(() => {
      var _a2;
      return (_a2 = props.style) != null ? _a2 : {};
    });
    const ariaHidden = vue.ref(true);
    const onTransitionLeave = () => {
      onHide();
      isFocusInsideContent() && aria.focusElement(document.body, { preventScroll: true });
      ariaHidden.value = true;
    };
    const stopWhenControlled = () => {
      if (vue.unref(controlled))
        return true;
    };
    const onContentEnter = event.composeEventHandlers(stopWhenControlled, () => {
      if (props.enterable && utils.isTriggerType(vue.unref(trigger), "hover")) {
        onOpen();
      }
    });
    const onContentLeave = event.composeEventHandlers(stopWhenControlled, () => {
      if (utils.isTriggerType(vue.unref(trigger), "hover")) {
        onClose();
      }
    });
    const onBeforeEnter = () => {
      var _a2, _b;
      (_b = (_a2 = contentRef.value) == null ? void 0 : _a2.updatePopper) == null ? void 0 : _b.call(_a2);
      onBeforeShow == null ? void 0 : onBeforeShow();
    };
    const onBeforeLeave = () => {
      onBeforeHide == null ? void 0 : onBeforeHide();
    };
    const onAfterShow = () => {
      onShow();
    };
    const onBlur = () => {
      if (!props.virtualTriggering) {
        onClose();
      }
    };
    const updateContentZIndex = async () => {
      var _a2, _b;
      zIndex.value = types.isNumber(props.zIndex) ? props.zIndex : nextZIndex();
      await vue.nextTick();
      (_b = (_a2 = contentRef.value) == null ? void 0 : _a2.updatePopper) == null ? void 0 : _b.call(_a2);
    };
    const onModalClick = () => {
      if (!props.closeOnClickModal)
        return;
      onClose();
    };
    const isFocusInsideContent = (event) => {
      var _a2;
      const popperContent = (_a2 = contentRef.value) == null ? void 0 : _a2.popperContentRef;
      const activeElement = (event == null ? void 0 : event.relatedTarget) || document.activeElement;
      return popperContent == null ? void 0 : popperContent.contains(activeElement);
    };
    vue.watch(() => vue.unref(open), (val) => {
      if (!val) {
        stopHandle == null ? void 0 : stopHandle();
      } else {
        ariaHidden.value = false;
        updateContentZIndex();
        stopHandle = core.onClickOutside(popperContentRef, () => {
          if (vue.unref(controlled))
            return;
          const needClose = arrays.castArray(vue.unref(trigger)).every((item) => {
            return item !== "hover" && item !== "focus";
          });
          if (needClose) {
            onClose();
          }
        }, { detectIframe: true });
      }
    }, {
      flush: "post"
    });
    vue.watch(() => props.zIndex, () => {
      updateContentZIndex();
    });
    vue.watch(() => props.content, () => {
      var _a2, _b;
      (_b = (_a2 = contentRef.value) == null ? void 0 : _a2.updatePopper) == null ? void 0 : _b.call(_a2);
    });
    expose({
      contentRef,
      isFocusInsideContent
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index$3.ElTeleport), {
        disabled: !_ctx.teleported,
        to: vue.unref(appendTo)
      }, {
        default: vue.withCtx(() => {
          var _a2;
          return [
            _ctx.modal ? vue.withDirectives((vue.openBlock(), vue.createBlock(vue.unref(index$4.ElOverlay), {
              key: 0,
              "overlay-class": [vue.unref(ns).e("overlay"), (_a2 = _ctx.modalClass) != null ? _a2 : ""],
              "z-index": vue.unref(overlayZIndex),
              onClick: onModalClick
            }, null, 8, ["overlay-class", "z-index"])), [
              [vue.vShow, vue.unref(shouldShow)]
            ]) : vue.createCommentVNode("v-if", true),
            vue.unref(shouldRender) || !ariaHidden.value ? (vue.openBlock(), vue.createBlock(vue.Transition, {
              key: 1,
              name: vue.unref(transitionClass),
              appear: !vue.unref(persistentRef),
              onAfterLeave: onTransitionLeave,
              onBeforeEnter,
              onAfterEnter: onAfterShow,
              onBeforeLeave,
              persisted: ""
            }, {
              default: vue.withCtx(() => [
                vue.withDirectives(vue.createVNode(vue.unref(content$1["default"]), vue.mergeProps({
                  id: vue.unref(id),
                  ref_key: "contentRef",
                  ref: contentRef
                }, _ctx.$attrs, {
                  "aria-label": _ctx.ariaLabel,
                  "aria-hidden": ariaHidden.value,
                  "boundaries-padding": _ctx.boundariesPadding,
                  "fallback-placements": _ctx.fallbackPlacements,
                  "gpu-acceleration": _ctx.gpuAcceleration,
                  offset: _ctx.offset,
                  placement: _ctx.placement,
                  "popper-options": _ctx.popperOptions,
                  "arrow-offset": _ctx.arrowOffset,
                  strategy: _ctx.strategy,
                  effect: _ctx.effect,
                  enterable: _ctx.enterable,
                  pure: _ctx.pure,
                  "popper-class": _ctx.popperClass,
                  "popper-style": [_ctx.popperStyle, vue.unref(contentStyle)],
                  "reference-el": _ctx.referenceEl,
                  "trigger-target-el": _ctx.triggerTargetEl,
                  visible: vue.unref(shouldShow),
                  "z-index": zIndex.value,
                  loop: _ctx.loop,
                  onMouseenter: vue.unref(onContentEnter),
                  onMouseleave: vue.unref(onContentLeave),
                  onBlur,
                  onClose: vue.unref(onClose)
                }), {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "default")
                  ]),
                  _: 3
                }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "arrow-offset", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "loop", "onMouseenter", "onMouseleave", "onClose"]), [
                  [vue.vShow, vue.unref(shouldShow)]
                ])
              ]),
              _: 3
            }, 8, ["name", "appear"])) : vue.createCommentVNode("v-if", true)
          ];
        }),
        _: 3
      }, 8, ["disabled", "to"]);
    };
  }
});
var ElTooltipContent = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "content.vue"]]);

exports["default"] = ElTooltipContent;
//# sourceMappingURL=content2.js.map
