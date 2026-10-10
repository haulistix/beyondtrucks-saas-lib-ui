'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
var token = require('./token.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../hooks/use-namespace/index.js');
var lodashUnified = require('lodash-unified');
var shared = require('@vue/shared');

const _sfc_main = vue.defineComponent({
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: {
    label: String,
    disabled: Boolean
  },
  setup(props) {
    const select = vue.inject(token.selectKey);
    const ns = index.useNamespace("select");
    const groupRef = vue.ref();
    const instance = vue.getCurrentInstance();
    const children = vue.ref([]);
    vue.provide(token.selectGroupKey, vue.reactive({
      ...vue.toRefs(props)
    }));
    const visible = vue.computed(() => children.value.some((option) => option.visible === true));
    const hasVisibleSelectedOptions = vue.computed(() => children.value.some((option) => option.visible === true && vue.unref(option.itemSelected)));
    const hasVisibleUnselectedOptions = vue.computed(() => children.value.some((option) => option.visible === true && !vue.unref(option.itemSelected)));
    const isOption = (node) => {
      var _a;
      return node.type.name === "ElOption" && !!((_a = node.component) == null ? void 0 : _a.proxy);
    };
    const flattedChildren = (node) => {
      const nodes = lodashUnified.castArray(node);
      const children2 = [];
      nodes.forEach((child) => {
        var _a;
        if (!vue.isVNode(child))
          return;
        if (isOption(child)) {
          children2.push(child.component.proxy);
        } else if (shared.isArray(child.children) && child.children.length) {
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
    vue.onMounted(() => {
      updateChildren();
    });
    core.useMutationObserver(groupRef, updateChildren, {
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
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("ul", {
    ref: "groupRef",
    class: vue.normalizeClass([
      _ctx.ns.be("group", "wrap"),
      _ctx.ns.is("multiple", _ctx.select.props.multiple),
      _ctx.ns.is("selection-group", true)
    ])
  }, [
    _ctx.hasVisibleSelectedOptions ? (vue.openBlock(), vue.createElementBlock("li", {
      key: 0,
      class: vue.normalizeClass([_ctx.ns.be("group", "business-title"), _ctx.ns.is("selected-group")])
    }, vue.toDisplayString(_ctx.label), 3)) : vue.createCommentVNode("v-if", true),
    _ctx.hasVisibleUnselectedOptions ? (vue.openBlock(), vue.createElementBlock("li", {
      key: 1,
      class: vue.normalizeClass([_ctx.ns.be("group", "business-title"), _ctx.ns.is("unselected-group")])
    }, vue.toDisplayString(_ctx.label), 3)) : vue.createCommentVNode("v-if", true),
    vue.renderSlot(_ctx.$slots, "default")
  ], 2)), [
    [vue.vShow, _ctx.visible]
  ]);
}
var OptionGroup = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render], ["__file", "option-group.vue"]]);

exports["default"] = OptionGroup;
//# sourceMappingURL=option-group.js.map
