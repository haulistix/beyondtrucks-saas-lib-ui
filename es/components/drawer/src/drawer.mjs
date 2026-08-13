import { defineComponent, useSlots, computed, ref, resolveDirective, openBlock, createBlock, unref, withCtx, createVNode, Transition, withDirectives, createElementBlock, mergeProps, withModifiers, createElementVNode, normalizeClass, renderSlot, toDisplayString, createCommentVNode, normalizeStyle, vShow } from 'vue';
import ElFocusTrap from '../../focus-trap/src/focus-trap.mjs';
import { ElIcon } from '../../icon/index.mjs';
import { ElOverlay } from '../../overlay/index.mjs';
import { ElTeleport } from '../../teleport/index.mjs';
import { useResizable } from './composables/useResizable.mjs';
import { drawerProps, drawerEmits } from './drawer2.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useDialog } from '../../dialog/src/use-dialog.mjs';
import { useDeprecated } from '../../../hooks/use-deprecated/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';

const __default__ = defineComponent({
  name: "ElDrawer",
  inheritAttrs: false
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: drawerProps,
  emits: drawerEmits,
  setup(__props, { expose }) {
    const props = __props;
    const slots = useSlots();
    useDeprecated({
      scope: "el-drawer",
      from: "the title slot",
      replacement: "the header slot",
      version: "3.0.0",
      ref: "https://element-plus.org/en-US/component/drawer.html#slots"
    }, computed(() => !!slots.title));
    const drawerRef = ref();
    const focusStartRef = ref();
    const draggerRef = ref();
    const ns = useNamespace("drawer");
    const { t } = useLocale();
    const {
      afterEnter,
      afterLeave,
      beforeLeave,
      visible,
      rendered,
      titleId,
      bodyId,
      zIndex,
      onModalClick,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onFocusoutPrevented,
      onCloseRequested,
      handleClose
    } = useDialog(props, drawerRef);
    const { isHorizontal, size, isResizing } = useResizable(props, draggerRef);
    const penetrable = computed(() => props.modalPenetrable && !props.modal);
    expose({
      handleClose,
      afterEnter,
      afterLeave
    });
    return (_ctx, _cache) => {
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createBlock(unref(ElTeleport), {
        to: _ctx.appendTo,
        disabled: _ctx.appendTo !== "body" ? false : !_ctx.appendToBody
      }, {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(ns).b("fade"),
            onAfterEnter: unref(afterEnter),
            onAfterLeave: unref(afterLeave),
            onBeforeLeave: unref(beforeLeave),
            persisted: ""
          }, {
            default: withCtx(() => {
              var _a;
              return [
                withDirectives(createVNode(unref(ElOverlay), {
                  mask: _ctx.modal,
                  "overlay-class": [
                    unref(ns).is("drawer"),
                    (_a = _ctx.modalClass) != null ? _a : "",
                    `${unref(ns).namespace.value}-modal-drawer`,
                    unref(ns).is("penetrable", unref(penetrable))
                  ],
                  "z-index": unref(zIndex),
                  onClick: unref(onModalClick)
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ElFocusTrap), {
                      loop: "",
                      trapped: unref(visible),
                      "focus-trap-el": drawerRef.value,
                      "focus-start-el": focusStartRef.value,
                      onFocusAfterTrapped: unref(onOpenAutoFocus),
                      onFocusAfterReleased: unref(onCloseAutoFocus),
                      onFocusoutPrevented: unref(onFocusoutPrevented),
                      onReleaseRequested: unref(onCloseRequested)
                    }, {
                      default: withCtx(() => [
                        withDirectives((openBlock(), createElementBlock("div", mergeProps({
                          ref_key: "drawerRef",
                          ref: drawerRef,
                          "aria-modal": "true",
                          "aria-label": _ctx.title || void 0,
                          "aria-labelledby": !_ctx.title ? unref(titleId) : void 0,
                          "aria-describedby": unref(bodyId)
                        }, _ctx.$attrs, {
                          class: [
                            unref(ns).b(),
                            _ctx.direction,
                            unref(visible) && "open",
                            unref(ns).is("dragging", unref(isResizing))
                          ],
                          style: { [unref(isHorizontal) ? "width" : "height"]: unref(size) },
                          role: "dialog",
                          onClick: withModifiers(() => {
                          }, ["stop"])
                        }), [
                          createElementVNode("span", {
                            ref_key: "focusStartRef",
                            ref: focusStartRef,
                            class: normalizeClass(unref(ns).e("sr-focus")),
                            tabindex: "-1"
                          }, null, 2),
                          _ctx.withHeader ? (openBlock(), createElementBlock("header", {
                            key: 0,
                            class: normalizeClass([unref(ns).e("header"), _ctx.headerClass])
                          }, [
                            !_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
                              key: 0,
                              close: unref(handleClose),
                              titleId: unref(titleId),
                              titleClass: unref(ns).e("title")
                            }, () => [
                              createElementVNode("span", {
                                id: unref(titleId),
                                role: "heading",
                                "aria-level": _ctx.headerAriaLevel,
                                class: normalizeClass(unref(ns).e("title"))
                              }, toDisplayString(_ctx.title), 11, ["id", "aria-level"])
                            ]) : renderSlot(_ctx.$slots, "title", { key: 1 }, () => [
                              createCommentVNode(" DEPRECATED SLOT ")
                            ]),
                            _ctx.showClose ? (openBlock(), createElementBlock("button", {
                              key: 2,
                              "aria-label": unref(t)("el.drawer.close"),
                              class: normalizeClass(["icon-button", unref(ns).e("close-btn")]),
                              type: "button",
                              onClick: unref(handleClose)
                            }, [
                              createVNode(unref(ElIcon), {
                                class: normalizeClass(unref(ns).e("close")),
                                size: "16px"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createElementBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "12",
                                    height: "12",
                                    viewBox: "0 0 12 12"
                                  }, [
                                    createElementVNode("path", { d: "M11 1.87969L10.1203 1L6 5.12072L1.87969 1L1 1.87969L5.12072 6L1 10.1203L1.87969 11L6 6.87928L10.1203 11L11 10.1203L6.87928 6L11 1.87969Z" })
                                  ]))
                                ]),
                                _: 1
                              }, 8, ["class"])
                            ], 10, ["aria-label", "onClick"])) : createCommentVNode("v-if", true)
                          ], 2)) : createCommentVNode("v-if", true),
                          unref(rendered) ? (openBlock(), createElementBlock("div", {
                            key: 1,
                            id: unref(bodyId),
                            class: normalizeClass([unref(ns).e("body"), _ctx.bodyClass])
                          }, [
                            renderSlot(_ctx.$slots, "default")
                          ], 10, ["id"])) : createCommentVNode("v-if", true),
                          _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
                            key: 2,
                            class: normalizeClass([unref(ns).e("footer"), _ctx.footerClass])
                          }, [
                            renderSlot(_ctx.$slots, "footer")
                          ], 2)) : createCommentVNode("v-if", true),
                          _ctx.resizable ? (openBlock(), createElementBlock("div", {
                            key: 3,
                            ref_key: "draggerRef",
                            ref: draggerRef,
                            style: normalizeStyle({ zIndex: unref(zIndex) }),
                            class: normalizeClass(unref(ns).e("dragger"))
                          }, null, 6)) : createCommentVNode("v-if", true)
                        ], 16, ["aria-label", "aria-labelledby", "aria-describedby", "onClick"])), [
                          [_directive_loading, _ctx.loading]
                        ])
                      ]),
                      _: 3
                    }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
                  ]),
                  _: 3
                }, 8, ["mask", "overlay-class", "z-index", "onClick"]), [
                  [vShow, unref(visible)]
                ])
              ];
            }),
            _: 3
          }, 8, ["name", "onAfterEnter", "onAfterLeave", "onBeforeLeave"])
        ]),
        _: 3
      }, 8, ["to", "disabled"]);
    };
  }
});
var Drawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "drawer.vue"]]);

export { Drawer as default };
//# sourceMappingURL=drawer.mjs.map
