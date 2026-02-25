'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../icon/index.js');
var tag = require('./tag.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var index = require('../../../hooks/use-namespace/index.js');

const __default__ = vue.defineComponent({
  name: "ElTag"
});
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: tag.tagProps,
  emits: tag.tagEmits,
  setup(__props, { emit }) {
    const props = __props;
    const tagSize = useFormCommonProps.useFormSize();
    const ns = index.useNamespace("tag");
    const containerKls = vue.computed(() => {
      const { type, hit, effect, closable, round } = props;
      return [
        ns.b(),
        ns.is("closable", closable),
        ns.m(type || "primary"),
        ns.m(tagSize.value),
        ns.m(effect),
        ns.is("hit", hit),
        ns.is("round", round)
      ];
    });
    const handleClose = (event) => {
      emit("close", event);
    };
    const handleClick = (event) => {
      emit("click", event);
    };
    const handleVNodeMounted = (vnode) => {
      var _a, _b, _c;
      if ((_c = (_b = (_a = vnode == null ? void 0 : vnode.component) == null ? void 0 : _a.subTree) == null ? void 0 : _b.component) == null ? void 0 : _c.bum) {
        vnode.component.subTree.component.bum = null;
      }
    };
    return (_ctx, _cache) => {
      return _ctx.disableTransitions ? (vue.openBlock(), vue.createElementBlock("span", {
        key: 0,
        class: vue.normalizeClass(vue.unref(containerKls)),
        style: vue.normalizeStyle({ backgroundColor: _ctx.color }),
        onClick: handleClick
      }, [
        vue.createElementVNode("span", {
          class: vue.normalizeClass(vue.unref(ns).e("content"))
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2),
        _ctx.closable ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), {
          key: 0,
          class: vue.normalizeClass(vue.unref(ns).e("close")),
          onClick: vue.withModifiers(handleClose, ["stop"])
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
        }, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true)
      ], 6)) : (vue.openBlock(), vue.createBlock(vue.Transition, {
        key: 1,
        name: `${vue.unref(ns).namespace.value}-zoom-in-center`,
        appear: "",
        onVnodeMounted: handleVNodeMounted
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("span", {
            class: vue.normalizeClass(vue.unref(containerKls)),
            style: vue.normalizeStyle({ backgroundColor: _ctx.color }),
            onClick: handleClick
          }, [
            vue.createElementVNode("span", {
              class: vue.normalizeClass(vue.unref(ns).e("content"))
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 2),
            _ctx.closable ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("close")),
              onClick: vue.withModifiers(handleClose, ["stop"])
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
            }, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true)
          ], 6)
        ]),
        _: 3
      }, 8, ["name"]));
    };
  }
});
var Tag = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "tag.vue"]]);

exports["default"] = Tag;
//# sourceMappingURL=tag2.js.map
