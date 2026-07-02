'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var lodashUnified = require('lodash-unified');
var util = require('../../table/src/util.js');
var index = require('../../checkbox/index.js');
var index$1 = require('../../icon/index.js');
var index$2 = require('../../tooltip/index.js');
var useOption = require('./useOption.js');
var useProps = require('./useProps.js');
var defaults = require('./defaults.js');
var token = require('./token.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$3 = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  components: { ElCheckbox: index.ElCheckbox, ElIcon: index$1.ElIcon, ElTooltip: index$2.ElTooltip },
  props: defaults.optionV2Props,
  emits: defaults.optionV2Emits,
  setup(props, { emit }) {
    const select = vue.inject(token.selectV2InjectionKey);
    const showTip = vue.ref(true);
    const ns = index$3.useNamespace("select");
    const multiple = vue.computed(() => select.props.multiple);
    const { hoverItem, selectOptionClick } = useOption.useOption(props, { emit });
    const { getLabel, getValue } = useProps.useProps(select.props);
    const contentId = select.contentId;
    const isItemSelected = (item) => {
      if (!item || item.type === "Group" || !multiple.value)
        return false;
      const values = Array.isArray(select.props.modelValue) ? select.props.modelValue : [];
      const itemValue = getValue(item);
      if (!lodashUnified.isObject(itemValue)) {
        return values.includes(itemValue);
      }
      return values.some((value) => lodashUnified.get(value, select.props.valueKey) === lodashUnified.get(itemValue, select.props.valueKey));
    };
    const selectedCount = vue.computed(() => {
      if (!multiple.value || !Array.isArray(props.data))
        return 0;
      return props.data.filter((item) => isItemSelected(item)).length;
    });
    const showSelectedDivider = vue.computed(() => {
      return !props.selected && multiple.value && selectedCount.value > 0 && props.index === selectedCount.value;
    });
    const optionStyle = vue.computed(() => {
      var _a;
      return {
        ...(_a = props.style) != null ? _a : {},
        borderTop: showSelectedDivider.value ? "1px solid #E7ECEF" : "none"
      };
    });
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
      multiple,
      showTip,
      optionStyle,
      hoverItem,
      selectOptionClick,
      getLabel,
      handleCellMouseEnter
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = vue.resolveComponent("el-checkbox");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  const _component_el_icon = vue.resolveComponent("el-icon");
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
        _ctx.multiple ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
          key: 0,
          "model-value": _ctx.selected,
          disabled: _ctx.disabled
        }, null, 8, ["model-value", "disabled"])) : vue.createCommentVNode("v-if", true),
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
        _ctx.selected && !_ctx.multiple ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: "option-wrap-icon"
        }, [
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
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ])
  ], 46, ["id", "aria-selected", "aria-disabled", "onMousemove", "onClick", "onMouseenter"]);
}
var OptionItem = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render], ["__file", "option-item.vue"]]);

exports["default"] = OptionItem;
//# sourceMappingURL=option-item.js.map
