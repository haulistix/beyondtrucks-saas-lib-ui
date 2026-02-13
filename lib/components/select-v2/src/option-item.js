'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../../table/src/util.js');
var index$1 = require('../../tooltip/index.js');
var useOption = require('./useOption.js');
var useProps = require('./useProps.js');
var defaults = require('./defaults.js');
var token = require('./token.js');
var index = require('../../icon/index.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$2 = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  components: { ElIcon: index.ElIcon, ElTooltip: index$1.ElTooltip },
  props: defaults.optionV2Props,
  emits: defaults.optionV2Emits,
  setup(props, { emit }) {
    const select = vue.inject(token.selectV2InjectionKey);
    const showTip = vue.ref(true);
    const ns = index$2.useNamespace("select");
    const { hoverItem, selectOptionClick } = useOption.useOption(props, { emit });
    const { getLabel } = useProps.useProps(select.props);
    const contentId = select.contentId;
    const handleCellMouseEnter = (event) => {
      const cellChild = event.target.querySelector(".option-wrap-content");
      if (!cellChild)
        return;
      if (cellChild && !(cellChild == null ? void 0 : cellChild.childNodes.length)) {
        showTip.value = false;
        return;
      }
      const range = document.createRange();
      range.setStart(cellChild, 0);
      range.setEnd(cellChild, cellChild.childNodes.length);
      const { width: rangeWidth, height: rangeHeight } = range.getBoundingClientRect();
      const { width: cellChildWidth, height: cellChildHeight } = cellChild.getBoundingClientRect();
      const { top, left, right, bottom } = util.getPadding(cellChild);
      const horizontalPadding = left + right;
      const verticalPadding = top + bottom;
      showTip.value = !(util.isGreaterThan(rangeWidth + horizontalPadding, cellChildWidth) || util.isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || util.isGreaterThan(cellChild.scrollWidth, cellChildWidth));
    };
    return {
      ns,
      contentId,
      showTip,
      hoverItem,
      selectOptionClick,
      getLabel,
      handleCellMouseEnter
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  const _component_el_icon = vue.resolveComponent("el-icon");
  return vue.openBlock(), vue.createElementBlock("li", {
    id: `${_ctx.contentId}-${_ctx.index}`,
    role: "option",
    "aria-selected": _ctx.selected,
    "aria-disabled": _ctx.disabled || void 0,
    style: vue.normalizeStyle(_ctx.style),
    class: vue.normalizeClass([
      _ctx.ns.be("dropdown", "item"),
      _ctx.ns.is("selected", _ctx.selected),
      _ctx.ns.is("disabled", _ctx.disabled),
      _ctx.ns.is("created", _ctx.created),
      _ctx.ns.is("hovering", _ctx.hovering)
    ]),
    onMousemove: _ctx.hoverItem,
    onClick: vue.withModifiers(_ctx.selectOptionClick, ["stop"]),
    onMouseenter: _ctx.handleCellMouseEnter
  }, [
    vue.renderSlot(_ctx.$slots, "default", {
      item: _ctx.item,
      index: _ctx.index,
      disabled: _ctx.disabled
    }, () => [
      vue.createElementVNode("div", { class: "option-wrap" }, [
        vue.createVNode(_component_el_tooltip, {
          ref: "tooltipRef",
          effect: "light",
          disabled: _ctx.disabled || _ctx.showTip,
          content: _ctx.getLabel(_ctx.item),
          placement: "right",
          "popper-class": "optionPopperClass"
        }, {
          default: vue.withCtx(() => {
            var _a;
            return [
              vue.createElementVNode("div", { class: "option-wrap-content" }, [
                vue.renderSlot(_ctx.$slots, "optionIcon"),
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(["select-label", { "select-margin": (_a = _ctx.$slots) == null ? void 0 : _a.optionIcon }])
                }, vue.toDisplayString(_ctx.getLabel(_ctx.item)), 3)
              ])
            ];
          }),
          _: 3
        }, 8, ["disabled", "content"]),
        vue.withDirectives(vue.createElementVNode("div", { class: "option-wrap-icon" }, [
          vue.createVNode(_component_el_icon, {
            size: "16px",
            color: "#2A3F4D"
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(), vue.createElementBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 16 16"
              }, [
                vue.createElementVNode("path", { d: "M5.20006 14.2833C4.97716 14.2834 4.75643 14.2395 4.55052 14.1542C4.3446 14.0688 4.15754 13.9437 4.00006 13.786L0.292725 10.0807L1.70739 8.66665L5.20006 12.1593L14.2927 3.06665L15.7074 4.48065L6.40006 13.786C6.24257 13.9437 6.05552 14.0688 5.8496 14.1542C5.64369 14.2395 5.42296 14.2834 5.20006 14.2833Z" })
              ]))
            ]),
            _: 1
          })
        ], 512), [
          [vue.vShow, _ctx.selected]
        ])
      ])
    ])
  ], 46, ["id", "aria-selected", "aria-disabled", "onMousemove", "onClick", "onMouseenter"]);
}
var OptionItem = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render], ["__file", "option-item.vue"]]);

exports["default"] = OptionItem;
//# sourceMappingURL=option-item.js.map
