import { defineComponent, inject, ref, getCurrentInstance, provide, reactive, toRefs, computed, unref, onMounted, withDirectives, openBlock, createElementBlock, normalizeClass, toDisplayString, createCommentVNode, renderSlot, vShow, isVNode } from 'vue';
import { useMutationObserver } from '@vueuse/core';
import { selectKey, selectGroupKey } from './token.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { castArray } from 'lodash-unified';
import { isArray } from '@vue/shared';

const _sfc_main = defineComponent({
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: {
    label: String,
    disabled: Boolean
  },
  setup(props) {
    const select = inject(selectKey);
    const ns = useNamespace("select");
    const groupRef = ref();
    const instance = getCurrentInstance();
    const children = ref([]);
    provide(selectGroupKey, reactive({
      ...toRefs(props)
    }));
    const visible = computed(() => children.value.some((option) => option.visible === true));
    const hasVisibleSelectedOptions = computed(() => children.value.some((option) => option.visible === true && unref(option.itemSelected)));
    const hasVisibleUnselectedOptions = computed(() => children.value.some((option) => option.visible === true && !unref(option.itemSelected)));
    const isOption = (node) => {
      var _a;
      return node.type.name === "ElOption" && !!((_a = node.component) == null ? void 0 : _a.proxy);
    };
    const flattedChildren = (node) => {
      const nodes = castArray(node);
      const children2 = [];
      nodes.forEach((child) => {
        var _a;
        if (!isVNode(child))
          return;
        if (isOption(child)) {
          children2.push(child.component.proxy);
        } else if (isArray(child.children) && child.children.length) {
          children2.push(...flattedChildren(child.children));
        } else if ((_a = child.component) == null ? void 0 : _a.subTree) {
          children2.push(...flattedChildren(child.component.subTree));
        }
      });
      return children2;
    };
    const updateChildren = () => {
      children.value = flattedChildren(instance.subTree);
    };
    onMounted(() => {
      updateChildren();
    });
    useMutationObserver(groupRef, updateChildren, {
      attributes: true,
      subtree: true,
      childList: true
    });
    return {
      groupRef,
      select,
      visible,
      hasVisibleSelectedOptions,
      hasVisibleUnselectedOptions,
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("ul", {
    ref: "groupRef",
    class: normalizeClass([
      _ctx.ns.be("group", "wrap"),
      _ctx.ns.is("multiple", _ctx.select.props.multiple),
      _ctx.ns.is("selection-group", true)
    ])
  }, [
    _ctx.hasVisibleSelectedOptions ? (openBlock(), createElementBlock("li", {
      key: 0,
      class: normalizeClass([_ctx.ns.be("group", "business-title"), _ctx.ns.is("selected-group")])
    }, toDisplayString(_ctx.label), 3)) : createCommentVNode("v-if", true),
    _ctx.hasVisibleUnselectedOptions ? (openBlock(), createElementBlock("li", {
      key: 1,
      class: normalizeClass([_ctx.ns.be("group", "business-title"), _ctx.ns.is("unselected-group")])
    }, toDisplayString(_ctx.label), 3)) : createCommentVNode("v-if", true),
    renderSlot(_ctx.$slots, "default")
  ], 2)), [
    [vShow, _ctx.visible]
  ]);
}
var OptionGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "option-group.vue"]]);

export { OptionGroup as default };
//# sourceMappingURL=option-group.mjs.map
