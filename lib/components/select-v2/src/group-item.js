'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../divider/index.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index$1 = require('../../../hooks/use-namespace/index.js');

const _sfc_main = vue.defineComponent({
  components: {
    ElDivider: index.ElDivider
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
    const ns = index$1.useNamespace("select");
    const groupStyle = vue.computed(() => {
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
  const _component_el_divider = vue.resolveComponent("el-divider");
  return vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.ns.be("group", "wrap")),
    style: vue.normalizeStyle(_ctx.groupStyle)
  }, [
    _ctx.showDivider ? (vue.openBlock(), vue.createBlock(_component_el_divider, {
      key: 0,
      margin: "8px 0"
    })) : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.ns.be("group", "title"))
    }, vue.toDisplayString(_ctx.item.label), 3)
  ], 6);
}
var GroupItem = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render], ["__file", "group-item.vue"]]);

exports["default"] = GroupItem;
//# sourceMappingURL=group-item.js.map
