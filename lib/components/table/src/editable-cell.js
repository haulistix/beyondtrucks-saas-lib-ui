'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../input/index.js');
var index = require('../../select/index.js');
var tokens = require('./tokens.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var objects = require('../../../utils/objects.js');
var types = require('../../../utils/types.js');

const DEFAULT_DECIMAL_PRECISION = 2;
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "editable-cell",
  props: {
    cellData: {
      type: Object,
      required: true
    },
    property: {
      type: String,
      required: true
    },
    displayKey: String,
    clearable: {
      type: Boolean,
      default: true
    },
    isNumber: {
      type: [Boolean, Number, Object],
      default: false
    },
    editor: {
      type: String,
      default: "input"
    },
    inputProps: {
      type: Object,
      default: () => ({})
    },
    selectProps: {
      type: Object,
      default: () => ({})
    },
    selectKey: {
      type: Array,
      default: () => ["value", "label"]
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ["on-submit", "blur", "change", "visible-change"],
  setup(__props, { emit }) {
    const props = __props;
    const resolvePrecision = (value) => {
      var _a;
      if (value === false || value === void 0 || value === null)
        return null;
      if (value === true)
        return DEFAULT_DECIMAL_PRECISION;
      if (typeof value === "number")
        return Math.max(0, value);
      if (typeof value === "object") {
        return Math.max(0, (_a = value.place) != null ? _a : DEFAULT_DECIMAL_PRECISION);
      }
      return null;
    };
    const sanitizeNumericValue = (value, precision) => {
      let next = value.replace(/[^\d.]/g, "");
      const firstDotIndex = next.indexOf(".");
      if (firstDotIndex !== -1) {
        const integerPart = next.slice(0, firstDotIndex);
        const decimalPart = next.slice(firstDotIndex + 1).replace(/\./g, "").slice(0, precision);
        next = precision === 0 ? integerPart : `${integerPart}.${decimalPart}`;
      }
      if (next.startsWith(".")) {
        next = `0${next}`;
      }
      return next;
    };
    const normalizeNumericValue = (value, precision) => {
      const normalized = sanitizeNumericValue(value, precision);
      return normalized.endsWith(".") ? normalized.slice(0, -1) : normalized;
    };
    const bindPriceDirective = (el, value) => {
      var _a;
      (_a = el._priceCleanup) == null ? void 0 : _a.call(el);
      const precision = resolvePrecision(value);
      if (precision === null)
        return;
      const input = el.querySelector("input");
      if (!input)
        return;
      const handleInput = (event) => {
        const target = event.target;
        const next = sanitizeNumericValue(target.value, precision);
        if (next !== target.value) {
          target.value = next;
        }
      };
      const handleBlur = (event) => {
        const target = event.target;
        const next = normalizeNumericValue(target.value, precision);
        if (next !== target.value) {
          target.value = next;
          target.dispatchEvent(new Event("input", { bubbles: true }));
        }
      };
      input.addEventListener("input", handleInput, true);
      input.addEventListener("blur", handleBlur, true);
      el._priceCleanup = () => {
        input.removeEventListener("input", handleInput, true);
        input.removeEventListener("blur", handleBlur, true);
      };
    };
    const vPrice = {
      mounted(el, binding) {
        bindPriceDirective(el, binding.value);
      },
      updated(el, binding) {
        bindPriceDirective(el, binding.value);
      },
      beforeUnmount(el) {
        var _a;
        (_a = el._priceCleanup) == null ? void 0 : _a.call(el);
      }
    };
    const slots = vue.useSlots();
    const table = vue.inject(tokens.TABLE_INJECTION_KEY);
    const cellRef = vue.ref();
    const inputRef = vue.ref();
    const selectRef = vue.ref();
    const draftValue = vue.ref(objects.getProp(props.cellData.row, props.property).value);
    const hasEditorSlot = vue.computed(() => !!slots.editor);
    const activeEditableCell = vue.computed(() => {
      var _a;
      return (_a = table == null ? void 0 : table.activeEditableCell) == null ? void 0 : _a.value;
    });
    const currentValue = vue.computed(() => {
      var _a;
      if (((_a = table == null ? void 0 : table.editingRow) == null ? void 0 : _a.value) && table.editingRow.value.row === props.cellData.row) {
        return objects.getProp(table.editingRow.value.draft, props.property).value;
      }
      return objects.getProp(props.cellData.row, props.property).value;
    });
    const isEditing = vue.computed(() => {
      var _a, _b;
      if (!(table == null ? void 0 : table.props.editable))
        return false;
      return ((_b = (_a = table == null ? void 0 : table.editingRow) == null ? void 0 : _a.value) == null ? void 0 : _b.row) === props.cellData.row;
    });
    const isActiveEditingCell = vue.computed(() => {
      var _a;
      if (!isEditing.value)
        return false;
      const editingRow = (_a = table == null ? void 0 : table.editingRow) == null ? void 0 : _a.value;
      return (editingRow == null ? void 0 : editingRow.row) === props.cellData.row && (editingRow == null ? void 0 : editingRow.prop) === props.property;
    });
    const isClickedEditingCell = vue.computed(() => {
      return (activeEditableCell == null ? void 0 : activeEditableCell.value) ? (activeEditableCell == null ? void 0 : activeEditableCell.value.cellIndex) === props.cellData.cellIndex && (activeEditableCell == null ? void 0 : activeEditableCell.value.rowIndex) === props.cellData.rowIndex : false;
    });
    const editorModel = vue.computed({
      get() {
        return currentValue.value;
      },
      set(value) {
        var _a;
        if (((_a = table == null ? void 0 : table.editingRow) == null ? void 0 : _a.value) && table.editingRow.value.row === props.cellData.row) {
          objects.getProp(table.editingRow.value.draft, props.property).value = value;
          return;
        }
        draftValue.value = value;
      }
    });
    const displayValue = vue.computed(() => {
      const displayValue2 = objects.getProp(props.cellData.row, props.displayKey).value;
      const propertyValue = objects.getProp(props.cellData.row, props.property).value;
      return types.isEmpty(displayValue2) ? propertyValue : displayValue2;
    });
    const syncDraftValue = () => {
      draftValue.value = currentValue.value;
    };
    const commitValue = () => {
      objects.getProp(props.cellData.row, props.property).value = draftValue.value;
      emit("on-submit", draftValue.value);
    };
    const updateModelValue = (value) => {
      editorModel.value = value;
    };
    const submitEditing = (value = editorModel.value) => {
      updateModelValue(value);
    };
    const handleInputBlur = () => {
      emit("blur", editorModel.value);
    };
    const handleInputChange = () => {
      emit("change", editorModel.value);
    };
    const handleSelectChange = (value) => {
      editorModel.value = value;
      emit("change", editorModel.value);
    };
    const handleSelectVisibleChange = (visible) => {
      emit("visible-change", visible);
    };
    const focusEditorFromCellClick = async () => {
      var _a, _b, _c, _d, _e, _f;
      if (hasEditorSlot.value || !isEditing.value)
        return;
      if (props.editor === "select") {
        (_b = (_a = selectRef.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
        (_d = (_c = selectRef.value) == null ? void 0 : _c.toggleMenu) == null ? void 0 : _d.call(_c);
      } else {
        (_f = (_e = inputRef.value) == null ? void 0 : _e.focus) == null ? void 0 : _f.call(_e);
      }
    };
    const handleExternalFocus = () => {
      focusEditorFromCellClick();
    };
    vue.watch(currentValue, () => {
      if (!isEditing.value) {
        syncDraftValue();
      }
    }, {
      immediate: true
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        ref_key: "cellRef",
        ref: cellRef,
        class: vue.normalizeClass(["editable-table-cell", {
          "is-editing": vue.unref(isEditing),
          "is-click": vue.unref(isClickedEditingCell)
        }]),
        onClick: vue.withModifiers(() => {
        }, ["prevent"]),
        onEditableCellFocus: handleExternalFocus
      }, [
        vue.unref(isEditing) && vue.unref(hasEditorSlot) ? vue.renderSlot(_ctx.$slots, "editor", {
          key: 0,
          modelValue: vue.unref(editorModel),
          value: vue.unref(editorModel),
          cellData: __props.cellData,
          property: __props.property,
          editor: __props.editor,
          isEditing: vue.unref(isEditing),
          options: __props.options,
          inputProps: __props.inputProps,
          selectProps: __props.selectProps,
          updateModelValue,
          commitValue,
          submitEditing
        }) : vue.unref(isEditing) && __props.editor === "select" ? (vue.openBlock(), vue.createBlock(vue.unref(index.ElSelect), vue.mergeProps({
          key: 1,
          ref_key: "selectRef",
          ref: selectRef,
          modelValue: vue.unref(editorModel),
          "onUpdate:modelValue": ($event) => vue.isRef(editorModel) ? editorModel.value = $event : null
        }, __props.selectProps, {
          "automatic-dropdown": vue.unref(isActiveEditingCell),
          clearable: __props.clearable,
          onChange: handleSelectChange,
          onVisibleChange: handleSelectVisibleChange
        }), {
          default: vue.withCtx(() => [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.options, (option) => {
              return vue.openBlock(), vue.createBlock(vue.unref(index.ElOption), {
                key: option[__props.selectKey[0]],
                label: option[__props.selectKey[1]],
                value: option[__props.selectKey[0]]
              }, null, 8, ["label", "value"]);
            }), 128))
          ]),
          _: 1
        }, 16, ["modelValue", "onUpdate:modelValue", "automatic-dropdown", "clearable"])) : vue.unref(isEditing) ? vue.withDirectives((vue.openBlock(), vue.createBlock(vue.unref(index$1.ElInput), vue.mergeProps({
          key: 2,
          ref_key: "inputRef",
          ref: inputRef,
          modelValue: vue.unref(editorModel),
          "onUpdate:modelValue": ($event) => vue.isRef(editorModel) ? editorModel.value = $event : null,
          clearable: __props.clearable
        }, __props.inputProps, {
          autofocus: vue.unref(isActiveEditingCell),
          onBlur: handleInputBlur,
          onChange: handleInputChange
        }), null, 16, ["modelValue", "onUpdate:modelValue", "clearable", "autofocus"])), [
          [vPrice, __props.isNumber]
        ]) : (vue.openBlock(), vue.createElementBlock("p", {
          key: 3,
          class: "editable-table-cell__text"
        }, vue.toDisplayString(vue.unref(displayValue)), 1))
      ], 42, ["onClick"]);
    };
  }
});
var TableEditableCell = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["__file", "editable-cell.vue"]]);

exports["default"] = TableEditableCell;
//# sourceMappingURL=editable-cell.js.map
