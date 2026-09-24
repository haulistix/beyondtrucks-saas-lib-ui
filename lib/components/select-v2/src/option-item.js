'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../../table/src/util.js');
var index = require('../../checkbox/index.js');
var index$1 = require('../../radio/index.js');
var index$2 = require('../../tooltip/index.js');
var useOption = require('./useOption.js');
var useProps = require('./useProps.js');
var defaults = require('./defaults.js');
var token = require('./token.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$3 = require('../../../hooks/use-namespace/index.js');

const hasMeaningfulSlotContent = (content) => {
  var _a;
  if (Array.isArray(content)) {
    return content.some(hasMeaningfulSlotContent);
  }
  if (typeof content === "string" || typeof content === "number") {
    return Boolean(String(content).trim());
  }
  if (!content || typeof content !== "object")
    return false;
  const node = content;
  if (node.type === vue.Comment)
    return false;
  if (node.type === vue.Text) {
    return Boolean(String((_a = node.children) != null ? _a : "").trim());
  }
  if (node.type === vue.Fragment) {
    return hasMeaningfulSlotContent(node.children);
  }
  return true;
};
const _sfc_main = vue.defineComponent({
  components: { ElCheckbox: index.ElCheckbox, ElRadio: index$1.ElRadio, ElTooltip: index$2.ElTooltip },
  props: defaults.optionV2Props,
  emits: defaults.optionV2Emits,
  setup(props, { emit, slots }) {
    const select = vue.inject(token.selectV2InjectionKey);
    const isTextOverflowing = vue.ref(false);
    const ns = index$3.useNamespace("select");
    const multiple = vue.computed(() => select.props.multiple);
    const { hoverItem, selectOptionClick } = useOption.useOption(props, { emit });
    const { getLabel, getTip } = useProps.useProps(select.props);
    const currentTip = vue.computed(() => getTip(props.item));
    const hasDefaultSlot = vue.computed(() => {
      var _a, _b;
      return hasMeaningfulSlotContent((_b = (_a = slots.default) == null ? void 0 : _a.call(slots, {
        item: props.item,
        index: props.index,
        disabled: props.disabled
      })) != null ? _b : []);
    });
    const contentId = select.contentId;
    const optionStyle = vue.computed(() => {
      const virtualStyle = { ...props.style };
      if (virtualStyle.height === `${defaults.SELECT_V2_DEFAULT_ITEM_HEIGHT}px`) {
        delete virtualStyle.height;
      }
      return virtualStyle;
    });
    const handleCellMouseEnter = (event) => {
      const cellChild = event.target.querySelector(".option-wrap-content");
      if (!cellChild)
        return;
      if (cellChild && !(cellChild == null ? void 0 : cellChild.childNodes.length)) {
        isTextOverflowing.value = false;
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
      isTextOverflowing.value = util.isGreaterThan(rangeWidth + horizontalPadding, cellChildWidth) || util.isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || util.isGreaterThan(cellChild.scrollWidth, cellChildWidth);
    };
    return {
      ns,
      select,
      contentId,
      multiple,
      hasDefaultSlot,
      isTextOverflowing,
      currentTip,
      showSelectionSection: vue.computed(() => props.showSelectionSection),
      optionStyle,
      hoverItem,
      selectOptionClick,
      getLabel,
      handleCellMouseEnter
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_radio = vue.resolveComponent("el-radio");
  const _component_el_checkbox = vue.resolveComponent("el-checkbox");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  return vue.openBlock(), vue.createElementBlock("li", {
    id: `${_ctx.contentId}-${_ctx.index}`,
    role: "option",
    "aria-selected": _ctx.selected,
    "aria-disabled": _ctx.disabled || void 0,
    style: vue.normalizeStyle(_ctx.optionStyle),
    class: vue.normalizeClass([
      _ctx.ns.be("dropdown", "item"),
      _ctx.ns.is("selected", _ctx.selected),
      _ctx.ns.is("disabled", _ctx.disabled),
      _ctx.ns.is("created", _ctx.created),
      _ctx.ns.is("hovering", _ctx.hovering),
      _ctx.ns.is("multiple", _ctx.multiple),
      _ctx.ns.is("section-start", _ctx.showSelectionSection)
    ]),
    onMousemove: _ctx.hoverItem,
    onClick: vue.withModifiers(_ctx.selectOptionClick, ["stop"]),
    onMouseenter: _ctx.handleCellMouseEnter
  }, [
    _ctx.showSelectionSection ? (vue.openBlock(), vue.createElementBlock("div", {
      key: 0,
      class: vue.normalizeClass([_ctx.ns.be("dropdown", "section-title"), _ctx.ns.is("unselected-section")]),
      onClick: vue.withModifiers(() => {
      }, ["stop"]),
      onMousemove: vue.withModifiers(() => {
      }, ["stop"])
    }, " Unselected ", 42, ["onClick", "onMousemove"])) : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", { class: "option-wrap" }, [
      !_ctx.multiple ? (vue.openBlock(), vue.createBlock(_component_el_radio, {
        key: 0,
        "model-value": _ctx.selected,
        value: true,
        disabled: _ctx.disabled,
        onClick: vue.withModifiers(() => {
        }, ["stop"]),
        onChange: _ctx.selectOptionClick
      }, null, 8, ["model-value", "disabled", "onClick", "onChange"])) : vue.createCommentVNode("v-if", true),
      _ctx.multiple ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
        key: 1,
        "model-value": _ctx.selected,
        disabled: _ctx.disabled
      }, null, 8, ["model-value", "disabled"])) : vue.createCommentVNode("v-if", true),
      vue.createVNode(_component_el_tooltip, {
        ref: "tooltipRef",
        effect: "light",
        disabled: _ctx.select.props.showOptionTooltip === false || !_ctx.isTextOverflowing,
        placement: "right",
        "popper-class": "tipPopperClass"
      }, {
        content: vue.withCtx(() => [
          _ctx.isTextOverflowing ? (vue.openBlock(), vue.createElementBlock("div", { key: 0 }, vue.toDisplayString(_ctx.getLabel(_ctx.item)), 1)) : vue.createCommentVNode("v-if", true),
          _ctx.currentTip ? (vue.openBlock(), vue.createElementBlock("div", { key: 1 }, vue.toDisplayString(_ctx.currentTip), 1)) : vue.createCommentVNode("v-if", true)
        ]),
        default: vue.withCtx(() => {
          var _a;
          return [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(["option-wrap-content", { "option-wrap-custom-content": _ctx.hasDefaultSlot }])
            }, [
              _ctx.hasDefaultSlot ? vue.renderSlot(_ctx.$slots, "default", {
                key: 0,
                item: _ctx.item,
                index: _ctx.index,
                disabled: _ctx.disabled
              }) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                vue.renderSlot(_ctx.$slots, "optionIcon"),
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(["select-label", { "select-margin": (_a = _ctx.$slots) == null ? void 0 : _a.optionIcon }])
                }, vue.toDisplayString(_ctx.getLabel(_ctx.item)), 3)
              ], 64))
            ], 2)
          ];
        }),
        _: 3
      }, 8, ["disabled"])
    ])
  ], 46, ["id", "aria-selected", "aria-disabled", "onMousemove", "onClick", "onMouseenter"]);
}
var OptionItem = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render], ["__file", "option-item.vue"]]);

exports["default"] = OptionItem;
//# sourceMappingURL=option-item.js.map
