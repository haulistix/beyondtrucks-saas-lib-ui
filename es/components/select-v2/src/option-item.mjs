import { defineComponent, inject, ref, computed, Comment, Text, Fragment, resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, withModifiers, createElementVNode, createBlock, createCommentVNode, createVNode, withCtx, toDisplayString, renderSlot } from 'vue';
import { isObject, get } from 'lodash-unified';
import { getPadding, isGreaterThan } from '../../table/src/util.mjs';
import { ElCheckbox } from '../../checkbox/index.mjs';
import { ElRadio } from '../../radio/index.mjs';
import { ElTooltip } from '../../tooltip/index.mjs';
import { useOption } from './useOption.mjs';
import { useProps } from './useProps.mjs';
import { optionV2Props, optionV2Emits, SELECT_V2_DEFAULT_ITEM_HEIGHT } from './defaults.mjs';
import { selectV2InjectionKey } from './token.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

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
  if (node.type === Comment)
    return false;
  if (node.type === Text) {
    return Boolean(String((_a = node.children) != null ? _a : "").trim());
  }
  if (node.type === Fragment) {
    return hasMeaningfulSlotContent(node.children);
  }
  return true;
};
const _sfc_main = defineComponent({
  components: { ElCheckbox, ElRadio, ElTooltip },
  props: optionV2Props,
  emits: optionV2Emits,
  setup(props, { emit, slots }) {
    const select = inject(selectV2InjectionKey);
    const isTextOverflowing = ref(false);
    const ns = useNamespace("select");
    const multiple = computed(() => select.props.multiple);
    const { hoverItem, selectOptionClick } = useOption(props, { emit });
    const { getLabel, getValue, getTip } = useProps(select.props);
    const currentTip = computed(() => getTip(props.item));
    const hasDefaultSlot = computed(() => {
      var _a, _b;
      return hasMeaningfulSlotContent((_b = (_a = slots.default) == null ? void 0 : _a.call(slots, {
        item: props.item,
        index: props.index,
        disabled: props.disabled
      })) != null ? _b : []);
    });
    const contentId = select.contentId;
    const isItemSelected = (item) => {
      if (!item || item.type === "Group" || !multiple.value)
        return false;
      const values = Array.isArray(select.props.modelValue) ? select.props.modelValue : [];
      const itemValue = getValue(item);
      if (!isObject(itemValue)) {
        return values.includes(itemValue);
      }
      return values.some((value) => get(value, select.props.valueKey) === get(itemValue, select.props.valueKey));
    };
    const selectedCount = computed(() => {
      if (!multiple.value || !Array.isArray(props.data))
        return 0;
      return props.data.filter((item) => isItemSelected(item)).length;
    });
    const showSelectedDivider = computed(() => {
      return !props.selected && multiple.value && selectedCount.value > 0 && props.index === selectedCount.value;
    });
    const optionStyle = computed(() => {
      const virtualStyle = { ...props.style };
      if (virtualStyle.height === `${SELECT_V2_DEFAULT_ITEM_HEIGHT}px`) {
        delete virtualStyle.height;
      }
      return {
        ...virtualStyle,
        borderTop: showSelectedDivider.value ? "1px solid #E7ECEF" : "none"
      };
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
      const { top, left, right, bottom } = getPadding(cellChild);
      const horizontalPadding = left + right;
      const verticalPadding = top + bottom;
      isTextOverflowing.value = isGreaterThan(rangeWidth + horizontalPadding, cellChildWidth) || isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || isGreaterThan(cellChild.scrollWidth, cellChildWidth);
    };
    return {
      ns,
      select,
      contentId,
      multiple,
      hasDefaultSlot,
      isTextOverflowing,
      currentTip,
      optionStyle,
      hoverItem,
      selectOptionClick,
      getLabel,
      handleCellMouseEnter
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_radio = resolveComponent("el-radio");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  return openBlock(), createElementBlock("li", {
    id: `${_ctx.contentId}-${_ctx.index}`,
    role: "option",
    "aria-selected": _ctx.selected,
    "aria-disabled": _ctx.disabled || void 0,
    style: normalizeStyle(_ctx.optionStyle),
    class: normalizeClass([
      _ctx.ns.be("dropdown", "item"),
      _ctx.ns.is("selected", _ctx.selected),
      _ctx.ns.is("disabled", _ctx.disabled),
      _ctx.ns.is("created", _ctx.created),
      _ctx.ns.is("hovering", _ctx.hovering),
      _ctx.ns.is("multiple", _ctx.multiple)
    ]),
    onMousemove: _ctx.hoverItem,
    onClick: withModifiers(_ctx.selectOptionClick, ["stop"]),
    onMouseenter: _ctx.handleCellMouseEnter
  }, [
    createElementVNode("div", { class: "option-wrap" }, [
      !_ctx.multiple ? (openBlock(), createBlock(_component_el_radio, {
        key: 0,
        "model-value": _ctx.selected,
        value: true,
        disabled: _ctx.disabled,
        onClick: withModifiers(() => {
        }, ["stop"]),
        onChange: _ctx.selectOptionClick
      }, null, 8, ["model-value", "disabled", "onClick", "onChange"])) : createCommentVNode("v-if", true),
      _ctx.multiple ? (openBlock(), createBlock(_component_el_checkbox, {
        key: 1,
        "model-value": _ctx.selected,
        disabled: _ctx.disabled
      }, null, 8, ["model-value", "disabled"])) : createCommentVNode("v-if", true),
      createVNode(_component_el_tooltip, {
        ref: "tooltipRef",
        effect: "light",
        disabled: _ctx.select.props.showOptionTooltip === false || !_ctx.isTextOverflowing,
        placement: "right",
        "popper-class": "tipPopperClass"
      }, {
        content: withCtx(() => [
          _ctx.isTextOverflowing ? (openBlock(), createElementBlock("div", { key: 0 }, toDisplayString(_ctx.getLabel(_ctx.item)), 1)) : createCommentVNode("v-if", true),
          _ctx.currentTip ? (openBlock(), createElementBlock("div", { key: 1 }, toDisplayString(_ctx.currentTip), 1)) : createCommentVNode("v-if", true)
        ]),
        default: withCtx(() => {
          var _a;
          return [
            createElementVNode("div", {
              class: normalizeClass(["option-wrap-content", { "option-wrap-custom-content": _ctx.hasDefaultSlot }])
            }, [
              _ctx.hasDefaultSlot ? renderSlot(_ctx.$slots, "default", {
                key: 0,
                item: _ctx.item,
                index: _ctx.index,
                disabled: _ctx.disabled
              }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                renderSlot(_ctx.$slots, "optionIcon"),
                createElementVNode("span", {
                  class: normalizeClass(["select-label", { "select-margin": (_a = _ctx.$slots) == null ? void 0 : _a.optionIcon }])
                }, toDisplayString(_ctx.getLabel(_ctx.item)), 3)
              ], 64))
            ], 2)
          ];
        }),
        _: 3
      }, 8, ["disabled"])
    ])
  ], 46, ["id", "aria-selected", "aria-disabled", "onMousemove", "onClick", "onMouseenter"]);
}
var OptionItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "option-item.vue"]]);

export { OptionItem as default };
//# sourceMappingURL=option-item.mjs.map
