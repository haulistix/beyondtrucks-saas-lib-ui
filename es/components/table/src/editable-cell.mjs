import { defineComponent, useSlots, inject, ref, computed, watch, openBlock, createElementBlock, normalizeClass, unref, withModifiers, renderSlot, createBlock, mergeProps, isRef, withCtx, Fragment, renderList, withDirectives, toDisplayString } from 'vue';
import { ElInput } from '../../input/index.mjs';
import { ElSelect, ElOption } from '../../select/index.mjs';
import { TABLE_INJECTION_KEY } from './tokens.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { getProp } from '../../../utils/objects.mjs';
import { isEmpty } from '../../../utils/types.mjs';

const DEFAULT_DECIMAL_PRECISION = 2;
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    const slots = useSlots();
    const table = inject(TABLE_INJECTION_KEY);
    const cellRef = ref();
    const inputRef = ref();
    const selectRef = ref();
    const draftValue = ref(getProp(props.cellData.row, props.property).value);
    const hasEditorSlot = computed(() => !!slots.editor);
    const activeEditableCell = computed(() => {
      var _a;
      return (_a = table == null ? void 0 : table.activeEditableCell) == null ? void 0 : _a.value;
    });
    const currentColumn = computed(() => {
      var _a, _b, _c, _d;
      const columns = (_c = (_b = (_a = table == null ? void 0 : table.store) == null ? void 0 : _a.states) == null ? void 0 : _b.columns) == null ? void 0 : _c.value;
      if (!(columns == null ? void 0 : columns.length))
        return void 0;
      return (_d = columns.find((column) => column.property === props.property)) != null ? _d : columns[props.cellData.cellIndex];
    });
    const isRequiredEmptyInput = computed(() => {
      var _a;
      if (props.editor !== "input")
        return false;
      if (!((_a = currentColumn.value) == null ? void 0 : _a.required))
        return false;
      return currentValue.value === "" || currentValue.value === null || currentValue.value === void 0;
    });
    const resolvedInputProps = computed(() => {
      var _a, _b;
      if (!isRequiredEmptyInput.value)
        return props.inputProps;
      return {
        ...props.inputProps,
        inputType: (_a = props.inputProps.inputType) != null ? _a : "error",
        infoTip: (_b = props.inputProps.infoTip) != null ? _b : "Required"
      };
    });
    const currentValue = computed(() => {
      var _a;
      if (((_a = table == null ? void 0 : table.editingRow) == null ? void 0 : _a.value) && table.editingRow.value.row === props.cellData.row) {
        return getProp(table.editingRow.value.draft, props.property).value;
      }
      return getProp(props.cellData.row, props.property).value;
    });
    const isEditing = computed(() => {
      var _a, _b;
      if (!(table == null ? void 0 : table.props.editable))
        return false;
      return ((_b = (_a = table == null ? void 0 : table.editingRow) == null ? void 0 : _a.value) == null ? void 0 : _b.row) === props.cellData.row;
    });
    const isActiveEditingCell = computed(() => {
      var _a;
      if (!isEditing.value)
        return false;
      const editingRow = (_a = table == null ? void 0 : table.editingRow) == null ? void 0 : _a.value;
      return (editingRow == null ? void 0 : editingRow.row) === props.cellData.row && (editingRow == null ? void 0 : editingRow.prop) === props.property;
    });
    const isClickedEditingCell = computed(() => {
      return (activeEditableCell == null ? void 0 : activeEditableCell.value) ? (activeEditableCell == null ? void 0 : activeEditableCell.value.cellIndex) === props.cellData.cellIndex && (activeEditableCell == null ? void 0 : activeEditableCell.value.rowIndex) === props.cellData.rowIndex : false;
    });
    const editorModel = computed({
      get() {
        return currentValue.value;
      },
      set(value) {
        var _a;
        if (((_a = table == null ? void 0 : table.editingRow) == null ? void 0 : _a.value) && table.editingRow.value.row === props.cellData.row) {
          getProp(table.editingRow.value.draft, props.property).value = value;
          return;
        }
        draftValue.value = value;
      }
    });
    const displayValue = computed(() => {
      const displayValue2 = getProp(props.cellData.row, props.displayKey).value;
      const propertyValue = getProp(props.cellData.row, props.property).value;
      return isEmpty(displayValue2) ? propertyValue : displayValue2;
    });
    const syncDraftValue = () => {
      draftValue.value = currentValue.value;
    };
    const commitValue = () => {
      getProp(props.cellData.row, props.property).value = draftValue.value;
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
    watch(currentValue, () => {
      if (!isEditing.value) {
        syncDraftValue();
      }
    }, {
      immediate: true
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "cellRef",
        ref: cellRef,
        class: normalizeClass(["editable-table-cell", {
          "is-editing": unref(isEditing),
          "is-click": unref(isClickedEditingCell)
        }]),
        onClick: withModifiers(() => {
        }, ["prevent"]),
        onEditableCellFocus: handleExternalFocus
      }, [
        unref(isEditing) && unref(hasEditorSlot) ? renderSlot(_ctx.$slots, "editor", {
          key: 0,
          modelValue: unref(editorModel),
          value: unref(editorModel),
          cellData: __props.cellData,
          property: __props.property,
          editor: __props.editor,
          isEditing: unref(isEditing),
          options: __props.options,
          inputProps: unref(resolvedInputProps),
          selectProps: __props.selectProps,
          updateModelValue,
          commitValue,
          submitEditing
        }) : unref(isEditing) && __props.editor === "select" ? (openBlock(), createBlock(unref(ElSelect), mergeProps({
          key: 1,
          ref_key: "selectRef",
          ref: selectRef,
          modelValue: unref(editorModel),
          "onUpdate:modelValue": ($event) => isRef(editorModel) ? editorModel.value = $event : null
        }, __props.selectProps, {
          "automatic-dropdown": unref(isActiveEditingCell),
          clearable: __props.clearable,
          onChange: handleSelectChange,
          onVisibleChange: handleSelectVisibleChange
        }), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
              return openBlock(), createBlock(unref(ElOption), {
                key: option[__props.selectKey[0]],
                label: option[__props.selectKey[1]],
                value: option[__props.selectKey[0]]
              }, null, 8, ["label", "value"]);
            }), 128))
          ]),
          _: 1
        }, 16, ["modelValue", "onUpdate:modelValue", "automatic-dropdown", "clearable"])) : unref(isEditing) ? withDirectives((openBlock(), createBlock(unref(ElInput), mergeProps({
          key: 2,
          ref_key: "inputRef",
          ref: inputRef,
          modelValue: unref(editorModel),
          "onUpdate:modelValue": ($event) => isRef(editorModel) ? editorModel.value = $event : null,
          clearable: __props.clearable
        }, unref(resolvedInputProps), {
          autofocus: unref(isActiveEditingCell),
          onBlur: handleInputBlur,
          onChange: handleInputChange
        }), null, 16, ["modelValue", "onUpdate:modelValue", "clearable", "autofocus"])), [
          [vPrice, __props.isNumber]
        ]) : (openBlock(), createElementBlock("p", {
          key: 3,
          class: "editable-table-cell__text"
        }, toDisplayString(unref(displayValue)), 1))
      ], 42, ["onClick"]);
    };
  }
});
var TableEditableCell = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "editable-cell.vue"]]);

export { TableEditableCell as default };
//# sourceMappingURL=editable-cell.mjs.map
