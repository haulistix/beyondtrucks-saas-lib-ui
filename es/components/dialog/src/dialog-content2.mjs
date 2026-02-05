import { defineComponent, inject, computed, openBlock, createElementBlock, unref, normalizeClass, normalizeStyle, createElementVNode, renderSlot, createBlock, withCtx, createVNode, createCommentVNode, createTextVNode, toDisplayString } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { WarnTriangleFilled, WarningFilled } from '@element-plus/icons-vue';
import { dialogInjectionKey } from './constants.mjs';
import { dialogContentProps, dialogContentEmits, HeaderType } from './dialog-content.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { FOCUS_TRAP_INJECTION_KEY } from '../../focus-trap/src/tokens.mjs';
import { useDraggable } from '../../../hooks/use-draggable/index.mjs';
import { composeRefs } from '../../../utils/vue/refs.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';

const __default__ = defineComponent({ name: "ElDialogContent" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: dialogContentProps,
  emits: dialogContentEmits,
  setup(__props, { expose }) {
    const props = __props;
    const { t } = useLocale();
    const { dialogRef, headerRef, bodyId, ns, style } = inject(dialogInjectionKey);
    const { focusTrapRef } = inject(FOCUS_TRAP_INJECTION_KEY);
    const composedDialogRef = composeRefs(focusTrapRef, dialogRef);
    const headerBgColor = computed(() => {
      if (props.headerBackgroundColor)
        return props.headerBackgroundColor;
      if (props.headerType === HeaderType.Error)
        return "var(--color-red-100)";
      if (props.headerType === HeaderType.Warning)
        return "var(--color-yellow-100)";
      return void 0;
    });
    const draggable = computed(() => !!props.draggable);
    const overflow = computed(() => !!props.overflow);
    const { resetPosition, updatePosition, isDragging } = useDraggable(dialogRef, headerRef, draggable, overflow);
    const dialogKls = computed(() => [
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
      return openBlock(), createElementBlock("div", {
        ref: unref(composedDialogRef),
        class: normalizeClass(unref(dialogKls)),
        style: normalizeStyle(unref(style)),
        tabindex: "-1"
      }, [
        createElementVNode("header", {
          ref_key: "headerRef",
          ref: headerRef,
          style: normalizeStyle({ backgroundColor: unref(headerBgColor) }),
          class: normalizeClass([unref(ns).e("header"), _ctx.headerClass, { "show-close": _ctx.showClose }])
        }, [
          renderSlot(_ctx.$slots, "header", {}, () => [
            createElementVNode("span", {
              role: "heading",
              "aria-level": _ctx.ariaLevel,
              class: normalizeClass([
                unref(ns).e("title"),
                { error: _ctx.headerType === unref(HeaderType).Error },
                { warning: _ctx.headerType === unref(HeaderType).Warning },
                "flex items-center"
              ])
            }, [
              _ctx.headerType === unref(HeaderType).Error ? (openBlock(), createBlock(unref(ElIcon), {
                key: 0,
                size: "18"
              }, {
                default: withCtx(() => [
                  createVNode(unref(WarnTriangleFilled))
                ]),
                _: 1
              })) : _ctx.headerType === unref(HeaderType).Warning ? (openBlock(), createBlock(unref(ElIcon), {
                key: 1,
                size: "18"
              }, {
                default: withCtx(() => [
                  createVNode(unref(WarningFilled))
                ]),
                _: 1
              })) : createCommentVNode("v-if", true),
              createTextVNode(" " + toDisplayString(_ctx.title), 1)
            ], 10, ["aria-level"])
          ]),
          _ctx.showClose ? (openBlock(), createElementBlock("button", {
            key: 0,
            "aria-label": unref(t)("el.dialog.close"),
            class: normalizeClass(unref(ns).e("headerbtn")),
            type: "button",
            onClick: ($event) => _ctx.$emit("close")
          }, [
            createVNode(unref(ElIcon), {
              class: normalizeClass(unref(ns).e("close")),
              size: "24px"
            }, {
              default: withCtx(() => [
                (openBlock(), createElementBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "25",
                  height: "24",
                  viewBox: "0 0 25 24"
                }, [
                  createElementVNode("path", { d: "M19.2068 6.70685L17.7928 5.29285L12.4998 10.5858L7.20685 5.29285L5.79285 6.70685L11.0858 11.9998L5.79285 17.2928L7.20685 18.7068L12.4998 13.4138L17.7928 18.7068L19.2068 17.2928L13.9138 11.9998L19.2068 6.70685Z" })
                ]))
              ]),
              _: 1
            }, 8, ["class"])
          ], 10, ["aria-label", "onClick"])) : createCommentVNode("v-if", true)
        ], 6),
        createElementVNode("div", {
          id: unref(bodyId),
          class: normalizeClass([unref(ns).e("body"), _ctx.bodyClass])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 10, ["id"]),
        _ctx.$slots.footer ? (openBlock(), createElementBlock("footer", {
          key: 0,
          class: normalizeClass([unref(ns).e("footer"), _ctx.footerClass])
        }, [
          renderSlot(_ctx.$slots, "footer")
        ], 2)) : createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var ElDialogContent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "dialog-content.vue"]]);

export { ElDialogContent as default };
//# sourceMappingURL=dialog-content2.mjs.map
