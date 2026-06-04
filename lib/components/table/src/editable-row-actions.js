'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../button/index.js');
var index$1 = require('../../icon/index.js');
var tokens = require('./tokens.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');

const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "editable-row-actions",
  props: {
    row: {
      type: Object,
      required: true
    },
    beforeSave: {
      type: Function,
      default: void 0
    }
  },
  emits: ["save", "cancel", "save-error"],
  setup(__props, { emit }) {
    const props = __props;
    const table = vue.inject(tokens.TABLE_INJECTION_KEY);
    const isSaving = vue.ref(false);
    const isEditing = vue.computed(() => {
      var _a, _b;
      return ((_b = (_a = table == null ? void 0 : table.editingRow) == null ? void 0 : _a.value) == null ? void 0 : _b.row) === props.row;
    });
    const handleSave = async () => {
      var _a, _b, _c, _d;
      const editingRow = (_a = table == null ? void 0 : table.editingRow) == null ? void 0 : _a.value;
      if (!editingRow || editingRow.row !== props.row || isSaving.value)
        return;
      isSaving.value = true;
      try {
        await ((_b = props.beforeSave) == null ? void 0 : _b.call(props, editingRow.draft));
        const saved = (_c = table == null ? void 0 : table.applyEditingRow) == null ? void 0 : _c.call(table);
        if (saved) {
          emit("save", saved.draft);
        }
        (_d = table == null ? void 0 : table.clearEditingRow) == null ? void 0 : _d.call(table);
      } catch (error) {
        emit("save-error", error);
      } finally {
        isSaving.value = false;
      }
    };
    const handleCancel = () => {
      var _a, _b;
      const editingRow = (_a = table == null ? void 0 : table.editingRow) == null ? void 0 : _a.value;
      if (!editingRow || editingRow.row !== props.row || isSaving.value)
        return;
      emit("cancel", {
        row: props.row,
        draft: editingRow.draft
      });
      (_b = table == null ? void 0 : table.clearEditingRow) == null ? void 0 : _b.call(table);
    };
    return (_ctx, _cache) => {
      return vue.unref(isEditing) ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: "editable-row-actions"
      }, [
        vue.createVNode(vue.unref(index.ElButton), {
          type: isSaving.value ? "text" : "default",
          class: "icon-button ml-2",
          onClick: handleSave
        }, {
          default: vue.withCtx(() => [
            isSaving.value ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), {
              key: 0,
              size: "12px",
              class: "is-loading",
              color: "#9FB1BD"
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createElementBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 16 16"
                }, [
                  vue.createElementVNode("path", { d: "M7.99992 3.33317C10.5772 3.33317 12.6666 5.42251 12.6666 7.99984C12.6666 10.5772 10.5772 12.6665 7.99992 12.6665C5.42259 12.6665 3.33325 10.5772 3.33325 7.99984L1.33325 7.99984C1.33325 11.6817 4.31802 14.6665 7.99992 14.6665C11.6818 14.6665 14.6666 11.6817 14.6666 7.99984C14.6666 4.31794 11.6818 1.33317 7.99992 1.33317L7.99992 3.33317Z" })
                ]))
              ]),
              _: 1
            })) : (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), {
              key: 1,
              size: "12px",
              color: "#2A3F4D"
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createElementBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "12",
                  height: "12",
                  viewBox: "0 0 12 12"
                }, [
                  vue.createElementVNode("path", { d: "M3.82026 11.0063C3.64674 11.0064 3.4749 10.9712 3.3146 10.9027C3.1543 10.8343 3.00868 10.7339 2.88608 10.6073L0 7.63422L1.10129 6.49966L3.82026 9.3021L10.8987 2.00635L12 3.14091L4.75443 10.6073C4.63183 10.7339 4.48621 10.8343 4.32591 10.9027C4.16561 10.9712 3.99378 11.0064 3.82026 11.0063Z" })
                ]))
              ]),
              _: 1
            }))
          ]),
          _: 1
        }, 8, ["type"]),
        vue.createVNode(vue.unref(index.ElButton), {
          disabled: isSaving.value,
          class: "icon-button mr-2 ml-0!",
          onClick: handleCancel
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(vue.unref(index$1.ElIcon), {
              size: "12px",
              color: isSaving.value ? "#DCE3E8" : "#2A3F4D"
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createElementBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "11",
                  height: "11",
                  viewBox: "0 0 11 11"
                }, [
                  vue.createElementVNode("path", { d: "M9.5 -3.86973e-06L10.6875 1.18749L1.18752 10.6875L2.18131e-05 9.49997L9.5 -3.86973e-06Z" }),
                  vue.createElementVNode("path", { d: "M10.6875 9.49998L9.50001 10.6875L1.45229e-05 1.18749L1.18751 -1.1465e-05L10.6875 9.49998Z" })
                ]))
              ]),
              _: 1
            }, 8, ["color"])
          ]),
          _: 1
        }, 8, ["disabled"])
      ])) : vue.renderSlot(_ctx.$slots, "default", { key: 1 });
    };
  }
});
var TableEditableRowActions = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "editable-row-actions.vue"]]);

exports["default"] = TableEditableRowActions;
//# sourceMappingURL=editable-row-actions.js.map
