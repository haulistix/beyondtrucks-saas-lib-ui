import { defineComponent, computed, resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, createBlock, createCommentVNode, createElementVNode, toDisplayString } from 'vue';
import { ElDivider } from '../../divider/index.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  components: {
    ElDivider
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    style: {
      type: Object
    },
    showDivider: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const ns = useNamespace("select");
    const groupStyle = computed(() => {
      const positionStyle = { ...props.style };
      delete positionStyle.height;
      delete positionStyle.lineHeight;
      return positionStyle;
    });
    return {
      ns,
      groupStyle
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_divider = resolveComponent("el-divider");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.ns.be("group", "wrap")),
    style: normalizeStyle(_ctx.groupStyle)
  }, [
    _ctx.showDivider ? (openBlock(), createBlock(_component_el_divider, {
      key: 0,
      margin: "8px 0"
    })) : createCommentVNode("v-if", true),
    createElementVNode("div", {
      class: normalizeClass(_ctx.ns.be("group", "title"))
    }, toDisplayString(_ctx.item.label), 3)
  ], 6);
}
var GroupItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "group-item.vue"]]);

export { GroupItem as default };
//# sourceMappingURL=group-item.mjs.map
