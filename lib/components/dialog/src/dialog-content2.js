'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$2 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var constants = require('./constants.js');
var dialogContent = require('./dialog-content.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var tokens = require('../../focus-trap/src/tokens.js');
var index$1 = require('../../../hooks/use-draggable/index.js');
var refs = require('../../../utils/vue/refs.js');
var index = require('../../../hooks/use-locale/index.js');

const __default__ = vue.defineComponent({ name: "ElDialogContent" });
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: dialogContent.dialogContentProps,
  emits: dialogContent.dialogContentEmits,
  setup(__props, { expose }) {
    const props = __props;
    const { t } = index.useLocale();
    const { dialogRef, headerRef, bodyId, ns, style } = vue.inject(constants.dialogInjectionKey);
    const { focusTrapRef } = vue.inject(tokens.FOCUS_TRAP_INJECTION_KEY);
    const composedDialogRef = refs.composeRefs(focusTrapRef, dialogRef);
    const headerBgColor = vue.computed(() => {
      if (props.headerBackgroundColor)
        return props.headerBackgroundColor;
      if (props.headerType === dialogContent.HeaderType.Error)
        return "var(--color-red-100)";
      if (props.headerType === dialogContent.HeaderType.Warning)
        return "var(--color-yellow-100)";
      return void 0;
    });
    const draggable = vue.computed(() => !!props.draggable);
    const overflow = vue.computed(() => !!props.overflow);
    const { resetPosition, updatePosition, isDragging } = index$1.useDraggable(dialogRef, headerRef, draggable, overflow);
    const dialogKls = vue.computed(() => [
      ns.b(),
      ns.is("fullscreen", props.fullscreen),
      ns.is("draggable", draggable.value),
      ns.is("dragging", isDragging.value),
      ns.is("align-center", !!props.alignCenter),
      { [ns.m("center")]: props.center }
    ]);
    expose({
      resetPosition,
      updatePosition
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        ref: vue.unref(composedDialogRef),
        class: vue.normalizeClass(vue.unref(dialogKls)),
        style: vue.normalizeStyle(vue.unref(style)),
        tabindex: "-1"
      }, [
        vue.createElementVNode("header", {
          ref_key: "headerRef",
          ref: headerRef,
          style: vue.normalizeStyle({ backgroundColor: vue.unref(headerBgColor) }),
          class: vue.normalizeClass([vue.unref(ns).e("header"), _ctx.headerClass, { "show-close": _ctx.showClose }])
        }, [
          vue.renderSlot(_ctx.$slots, "header", {}, () => [
            vue.createElementVNode("span", {
              role: "heading",
              "aria-level": _ctx.ariaLevel,
              class: vue.normalizeClass([
                vue.unref(ns).e("title"),
                { error: _ctx.headerType === vue.unref(dialogContent.HeaderType).Error },
                { warning: _ctx.headerType === vue.unref(dialogContent.HeaderType).Warning },
                "flex items-center"
              ])
            }, [
              _ctx.headerType === vue.unref(dialogContent.HeaderType).Error ? (vue.openBlock(), vue.createBlock(vue.unref(index$2.ElIcon), {
                key: 0,
                size: "18"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(iconsVue.WarnTriangleFilled))
                ]),
                _: 1
              })) : _ctx.headerType === vue.unref(dialogContent.HeaderType).Warning ? (vue.openBlock(), vue.createBlock(vue.unref(index$2.ElIcon), {
                key: 1,
                size: "18"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(iconsVue.WarningFilled))
                ]),
                _: 1
              })) : vue.createCommentVNode("v-if", true),
              vue.createTextVNode(" " + vue.toDisplayString(_ctx.title), 1)
            ], 10, ["aria-level"])
          ]),
          _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            "aria-label": vue.unref(t)("el.dialog.close"),
            class: vue.normalizeClass(vue.unref(ns).e("headerbtn")),
            type: "button",
            onClick: ($event) => _ctx.$emit("close")
          }, [
            vue.createVNode(vue.unref(index$2.ElIcon), {
              class: vue.normalizeClass(vue.unref(ns).e("close")),
              size: "24px"
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createElementBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "25",
                  height: "24",
                  viewBox: "0 0 25 24"
                }, [
                  vue.createElementVNode("path", { d: "M19.2068 6.70685L17.7928 5.29285L12.4998 10.5858L7.20685 5.29285L5.79285 6.70685L11.0858 11.9998L5.79285 17.2928L7.20685 18.7068L12.4998 13.4138L17.7928 18.7068L19.2068 17.2928L13.9138 11.9998L19.2068 6.70685Z" })
                ]))
              ]),
              _: 1
            }, 8, ["class"])
          ], 10, ["aria-label", "onClick"])) : vue.createCommentVNode("v-if", true)
        ], 6),
        vue.createElementVNode("div", {
          id: vue.unref(bodyId),
          class: vue.normalizeClass([vue.unref(ns).e("body"), _ctx.bodyClass])
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 10, ["id"]),
        _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("footer", {
          key: 0,
          class: vue.normalizeClass([vue.unref(ns).e("footer"), _ctx.footerClass])
        }, [
          vue.renderSlot(_ctx.$slots, "footer")
        ], 2)) : vue.createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var ElDialogContent = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "dialog-content.vue"]]);

exports["default"] = ElDialogContent;
//# sourceMappingURL=dialog-content2.js.map
