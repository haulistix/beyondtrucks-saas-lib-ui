'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../button/index.js');
var index$1 = require('../../icon/index.js');
var tokens = require('./tokens.js');
var _private = require('./private.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "ghost-row-add-button",
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const table = vue.inject(tokens.TABLE_INJECTION_KEY);
    const isEmptyValue = (value) => value === "" || value === null || value === void 0;
    const requiredColumns = vue.computed(() => {
      var _a, _b, _c, _d;
      const columns = (_d = (_c = (_b = (_a = table == null ? void 0 : table.store) == null ? void 0 : _a.states) == null ? void 0 : _b.columns) == null ? void 0 : _c.value) != null ? _d : [];
      return columns.filter((column) => !!column.required && !!column.property);
    });
    const isDisabled = vue.computed(() => requiredColumns.value.some((column) => {
      var _a;
      return isEmptyValue((_a = props.row) == null ? void 0 : _a[column.property]);
    }));
    const handleAdd = (event) => {
      var _a, _b;
      if (isDisabled.value)
        return;
      (_a = table == null ? void 0 : table.scheduleGhostRowScroll) == null ? void 0 : _a.call(table);
      table == null ? void 0 : table.emit("add-ghost-row", {
        event,
        row: props.row,
        rowIndex: -1,
        rowKey: (_b = props.row) == null ? void 0 : _b[_private.ghostRowKey]
      });
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index.ElButton), {
        class: "icon-button",
        text: "",
        disabled: vue.unref(isDisabled),
        onClick: handleAdd
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.unref(index$1.ElIcon), { size: "12" }, {
            default: vue.withCtx(() => [
              (vue.openBlock(), vue.createElementBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "12",
                height: "12",
                viewBox: "0 0 12 12"
              }, [
                vue.createElementVNode("path", { d: "M3.82026 11.0062C3.64674 11.0063 3.4749 10.9711 3.3146 10.9026C3.1543 10.8341 3.00868 10.7337 2.88608 10.6072L0 7.6341L1.10129 6.49954L3.82026 9.30198L10.8987 2.00623L12 3.14079L4.75443 10.6072C4.63183 10.7337 4.48621 10.8341 4.32591 10.9026C4.16561 10.9711 3.99378 11.0063 3.82026 11.0062Z" })
              ]))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["disabled"]);
    };
  }
});
var GhostRowAddButton = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "ghost-row-add-button.vue"]]);

exports["default"] = GhostRowAddButton;
//# sourceMappingURL=ghost-row-add-button.js.map
