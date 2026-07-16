import { defineComponent, getCurrentInstance, provide, ref, shallowRef, computed, watch, onBeforeUnmount, toRaw, nextTick, resolveComponent, resolveDirective, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, renderSlot, withDirectives, createVNode, createCommentVNode, withCtx, createBlock, createTextVNode, toDisplayString, vShow, withModifiers } from 'vue';
import TableText from './table-footer/tableText.mjs';
import ElTooltip from '../../tooltip/src/tooltip2.mjs';
import { debounce, cloneDeep } from 'lodash-unified';
import { ElScrollbar } from '../../scrollbar/index.mjs';
import { createStore } from './store/helper.mjs';
import TableLayout from './table-layout.mjs';
import TableHeader from './table-header/index.mjs';
import TableBody from './table-body/index.mjs';
import TableFooter from './table-footer/index.mjs';
import useUtils from './table/utils-helper.mjs';
import { convertToRows } from './table-header/utils-helper.mjs';
import useStyle from './table/style-helper.mjs';
import useKeyRender from './table/key-render-helper.mjs';
import defaultProps from './table/defaults.mjs';
import { TABLE_INJECTION_KEY } from './tokens.mjs';
import { hColgroup } from './h-helper.mjs';
import { useScrollbar } from './composables/use-scrollbar.mjs';
import { ghostRowSign, ghostRowKey } from './private.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import Mousewheel from '../../../directives/mousewheel/index.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

let tableIdSeed = 1;
const _sfc_main = defineComponent({
  name: "ElTable",
  directives: {
    Mousewheel
  },
  components: {
    TableText,
    ElTooltip,
    TableHeader,
    TableBody,
    TableFooter,
    ElScrollbar,
    hColgroup
  },
  props: defaultProps,
  emits: [
    "select",
    "select-all",
    "selection-change",
    "cell-mouse-enter",
    "cell-mouse-leave",
    "cell-contextmenu",
    "cell-click",
    "cell-dblclick",
    "row-click",
    "row-contextmenu",
    "row-dblclick",
    "header-click",
    "header-contextmenu",
    "sort-change",
    "filter-change",
    "current-change",
    "header-dragend",
    "expand-change",
    "editable-cell-active-change",
    "scroll",
    "add-column",
    "add-row",
    "add-ghost-row"
  ],
  setup(props, { emit }) {
    const { t } = useLocale();
    const ns = useNamespace("table");
    const table = getCurrentInstance();
    provide(TABLE_INJECTION_KEY, table);
    const store = createStore(table, props);
    table.store = store;
    const editingRow = ref(null);
    const activeEditableCell = ref(null);
    const ghostRowData = ref({
      [ghostRowSign]: true,
      [ghostRowKey]: "ghost-row"
    });
    const addColumnTrigger = shallowRef(null);
    const addRowTrigger = ref(null);
    const startRowEdit = (row, prop, rowIndex, cellIndex) => {
      var _a, _b;
      const current = editingRow.value;
      if ((current == null ? void 0 : current.row) === row) {
        editingRow.value = {
          ...current,
          prop,
          rowIndex,
          cellIndex
        };
        return;
      }
      editingRow.value = {
        row,
        prop,
        rowIndex,
        cellIndex,
        draft: cloneDeep(toRaw(row))
      };
      activeEditableCell.value = editingRow.value ? {
        row: (_a = editingRow.value) == null ? void 0 : _a.row,
        prop: (_b = editingRow.value) == null ? void 0 : _b.prop,
        rowIndex: editingRow.value.rowIndex,
        cellIndex: editingRow.value.cellIndex
      } : null;
    };
    const clearEditingRow = () => {
      editingRow.value = null;
      activeEditableCell.value = null;
    };
    const applyEditingRow = () => {
      if (!editingRow.value)
        return null;
      Object.assign(editingRow.value.row, editingRow.value.draft);
      return editingRow.value;
    };
    const layout = new TableLayout({
      store: table.store,
      table,
      fit: props.fit,
      showHeader: props.showHeader
    });
    table.layout = layout;
    const isEmpty = computed(() => {
      const hasRows = (store.states.data.value || []).length > 0;
      return !hasRows && !(props.ghostTable && props.editTable);
    });
    const {
      setCurrentRow,
      getSelectionRows,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      updateSort,
      sort,
      updateKeyChildren
    } = useUtils(store);
    const {
      isHidden,
      renderExpanded,
      setDragVisible,
      isGroup,
      handleMouseLeave,
      handleHeaderFooterMousewheel,
      tableSize,
      emptyBlockStyle,
      resizeProxyVisible,
      bodyWidth,
      resizeState,
      doLayout,
      tableBodyStyles,
      tableLayout,
      scrollbarViewStyle,
      scrollbarStyle
    } = useStyle(props, layout, store, table);
    const clearAddColumnTrigger = () => {
      addColumnTrigger.value = null;
    };
    const updateAddColumnTrigger = (payload) => {
      addColumnTrigger.value = payload;
    };
    const handleAddColumnClick = (event) => {
      const trigger = addColumnTrigger.value;
      if (!trigger)
        return;
      emit("add-column", {
        column: trigger.column,
        columnIndex: trigger.columnIndex,
        insertIndex: trigger.insertIndex,
        event
      });
      clearAddColumnTrigger();
    };
    const handleAddColumnTailClick = (payload) => {
      emit("add-column", payload);
      clearAddColumnTrigger();
    };
    const clearAddRowTrigger = () => {
      addRowTrigger.value = null;
    };
    const updateAddRowTrigger = (payload) => {
      addRowTrigger.value = payload;
    };
    const handleAddRowClick = (event) => {
      const trigger = addRowTrigger.value;
      if (!trigger)
        return;
      emit("add-row", {
        row: trigger.row,
        rowIndex: trigger.rowIndex,
        insertIndex: trigger.insertIndex,
        event
      });
      clearAddRowTrigger();
    };
    const handleTableMouseLeave = () => {
      handleMouseLeave();
      clearAddColumnTrigger();
      clearAddRowTrigger();
    };
    const handleScrollbarScroll = (event) => {
      clearAddColumnTrigger();
      clearAddRowTrigger();
      emit("scroll", event);
    };
    const { scrollBarRef, scrollTo, setScrollLeft, setScrollTop } = useScrollbar();
    let stopPendingGhostRowScrollWatch;
    const clearPendingGhostRowScrollWatch = () => {
      stopPendingGhostRowScrollWatch == null ? void 0 : stopPendingGhostRowScrollWatch();
      stopPendingGhostRowScrollWatch = void 0;
    };
    const scheduleGhostRowScroll = () => {
      clearPendingGhostRowScrollWatch();
      const previousLength = props.data.length;
      stopPendingGhostRowScrollWatch = watch(() => props.data.length, async (length) => {
        var _a, _b;
        if (length <= previousLength)
          return;
        clearPendingGhostRowScrollWatch();
        await nextTick();
        const scrollHeight = (_b = (_a = scrollBarRef.value) == null ? void 0 : _a.wrapRef) == null ? void 0 : _b.scrollHeight;
        if (scrollHeight != null) {
          setScrollTop(scrollHeight);
        }
      }, {
        flush: "post"
      });
    };
    const debouncedUpdateLayout = debounce(doLayout, 50);
    table.editingRow = editingRow;
    table.activeEditableCell = activeEditableCell;
    table.ghostRowData = ghostRowData;
    table.scheduleGhostRowScroll = scheduleGhostRowScroll;
    table.startRowEdit = startRowEdit;
    table.clearEditingRow = clearEditingRow;
    table.applyEditingRow = applyEditingRow;
    const tableId = `${ns.namespace.value}-table_${tableIdSeed++}`;
    table.tableId = tableId;
    table.state = {
      isGroup,
      resizeState,
      doLayout,
      debouncedUpdateLayout
    };
    const hasEditingRow = computed(() => !!editingRow.value);
    const effectiveShowAddColumnTrigger = computed(() => props.editTable && props.showAddColumnTrigger);
    const effectiveShowAddRowTrigger = computed(() => props.editTable && props.showAddRowTrigger);
    const computedSumText = computed(() => {
      var _a;
      return (_a = props.sumText) != null ? _a : t("el.table.sumText");
    });
    const computedEmptyText = computed(() => {
      var _a;
      return (_a = props.emptyText) != null ? _a : t("el.table.emptyText");
    });
    const isEmptyRequiredValue = (value) => value === "" || value === null || value === void 0;
    const validateRequiredColumns = () => {
      const requiredColumns = store.states.columns.value.filter((column) => !!column.required && !!column.property);
      if (!requiredColumns.length)
        return true;
      return props.data.every((row) => {
        var _a;
        const source = ((_a = editingRow.value) == null ? void 0 : _a.row) === row ? editingRow.value.draft : row;
        return requiredColumns.every((column) => !isEmptyRequiredValue(source == null ? void 0 : source[column.property]));
      });
    };
    const addColumnTriggerStyle = computed(() => {
      if (!addColumnTrigger.value)
        return {};
      return {
        left: `${addColumnTrigger.value.left}px`
      };
    });
    const addRowTriggerStyle = computed(() => {
      if (!addRowTrigger.value)
        return {};
      return {
        top: `${addRowTrigger.value.top}px`
      };
    });
    watch(effectiveShowAddColumnTrigger, (enabled) => {
      if (!enabled) {
        clearAddColumnTrigger();
      }
    });
    watch(effectiveShowAddRowTrigger, (enabled) => {
      if (!enabled) {
        clearAddRowTrigger();
      }
    });
    const columns = computed(() => {
      return convertToRows(store.states.originColumns.value)[0];
    });
    useKeyRender(table);
    onBeforeUnmount(() => {
      clearPendingGhostRowScrollWatch();
      debouncedUpdateLayout.cancel();
    });
    return {
      ns,
      layout,
      store,
      columns,
      handleHeaderFooterMousewheel,
      handleTableMouseLeave,
      tableId,
      tableSize,
      isHidden,
      isEmpty,
      renderExpanded,
      resizeProxyVisible,
      resizeState,
      isGroup,
      bodyWidth,
      tableBodyStyles,
      emptyBlockStyle,
      debouncedUpdateLayout,
      setCurrentRow,
      getSelectionRows,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      updateSort,
      clearSort,
      doLayout,
      sort,
      updateKeyChildren,
      t,
      setDragVisible,
      context: table,
      editingRow,
      activeEditableCell,
      startRowEdit,
      clearEditingRow,
      applyEditingRow,
      hasEditingRow,
      effectiveShowAddColumnTrigger,
      effectiveShowAddRowTrigger,
      addColumnTrigger,
      addColumnTriggerStyle,
      handleAddColumnTailClick,
      handleAddColumnClick,
      updateAddColumnTrigger,
      addRowTrigger,
      addRowTriggerStyle,
      handleAddRowClick,
      updateAddRowTrigger,
      computedSumText,
      computedEmptyText,
      tableLayout,
      scrollbarViewStyle,
      scrollbarStyle,
      scrollBarRef,
      handleScrollbarScroll,
      scrollTo,
      setScrollLeft,
      setScrollTop,
      allowDragLastColumn: props.allowDragLastColumn,
      showAddColumnTrigger: effectiveShowAddColumnTrigger,
      showAddRowTrigger: effectiveShowAddRowTrigger,
      validateRequiredColumns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_hColgroup = resolveComponent("hColgroup");
  const _component_table_header = resolveComponent("table-header");
  const _component_table_body = resolveComponent("table-body");
  const _component_table_footer = resolveComponent("table-footer");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_table_text = resolveComponent("table-text");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _directive_mousewheel = resolveDirective("mousewheel");
  return openBlock(), createElementBlock("div", {
    ref: "tableWrapper",
    class: normalizeClass([
      {
        [_ctx.ns.m("fit")]: _ctx.fit,
        [_ctx.ns.m("striped")]: _ctx.stripe,
        [_ctx.ns.m("border")]: _ctx.border || _ctx.isGroup,
        [_ctx.ns.m("hidden")]: _ctx.isHidden,
        [_ctx.ns.is("row-editing")]: _ctx.hasEditingRow,
        [_ctx.ns.m("group")]: _ctx.isGroup,
        [_ctx.ns.m("fluid-height")]: _ctx.maxHeight,
        [_ctx.ns.m("scrollable-x")]: _ctx.layout.scrollX.value,
        [_ctx.ns.m("scrollable-y")]: _ctx.layout.scrollY.value,
        [_ctx.ns.m("with-add-column-trigger")]: _ctx.effectiveShowAddColumnTrigger,
        [_ctx.ns.m("with-add-row-trigger")]: _ctx.effectiveShowAddRowTrigger,
        [_ctx.ns.m("enable-row-hover")]: !_ctx.store.states.isComplex.value,
        [_ctx.ns.m("enable-row-transition")]: (_ctx.store.states.data.value || []).length !== 0 && (_ctx.store.states.data.value || []).length < 100,
        "has-footer": _ctx.showSummary
      },
      _ctx.ns.m(_ctx.tableSize),
      _ctx.className,
      _ctx.ns.b(),
      _ctx.ns.m(`layout-${_ctx.tableLayout}`)
    ]),
    style: normalizeStyle(_ctx.style),
    "data-prefix": _ctx.ns.namespace.value,
    onMouseleave: _ctx.handleTableMouseLeave
  }, [
    createElementVNode("div", {
      class: normalizeClass(_ctx.ns.e("inner-wrapper"))
    }, [
      createElementVNode("div", {
        ref: "hiddenColumns",
        class: "hidden-columns"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 512),
      _ctx.showHeader && _ctx.tableLayout === "fixed" ? withDirectives((openBlock(), createElementBlock("div", {
        key: 0,
        ref: "headerWrapper",
        class: normalizeClass(_ctx.ns.e("header-wrapper"))
      }, [
        createElementVNode("table", {
          ref: "tableHeader",
          class: normalizeClass(_ctx.ns.e("header")),
          style: normalizeStyle(_ctx.tableBodyStyles),
          border: "0",
          cellpadding: "0",
          cellspacing: "0"
        }, [
          createVNode(_component_hColgroup, {
            columns: _ctx.store.states.columns.value,
            "table-layout": _ctx.tableLayout
          }, null, 8, ["columns", "table-layout"]),
          createVNode(_component_table_header, {
            ref: "tableHeaderRef",
            border: _ctx.border,
            "default-sort": _ctx.defaultSort,
            store: _ctx.store,
            "append-filter-panel-to": _ctx.appendFilterPanelTo,
            "allow-drag-last-column": _ctx.allowDragLastColumn,
            "show-add-column-trigger": _ctx.effectiveShowAddColumnTrigger,
            "add-column-button": _ctx.addColumnButton,
            "edit-table": _ctx.editTable,
            onSetDragVisible: _ctx.setDragVisible,
            onUpdateAddColumnTrigger: _ctx.updateAddColumnTrigger,
            onTailAddColumn: _ctx.handleAddColumnTailClick
          }, null, 8, ["border", "default-sort", "store", "append-filter-panel-to", "allow-drag-last-column", "show-add-column-trigger", "add-column-button", "edit-table", "onSetDragVisible", "onUpdateAddColumnTrigger", "onTailAddColumn"])
        ], 6)
      ], 2)), [
        [_directive_mousewheel, _ctx.handleHeaderFooterMousewheel]
      ]) : createCommentVNode("v-if", true),
      createElementVNode("div", {
        ref: "bodyWrapper",
        class: normalizeClass(_ctx.ns.e("body-wrapper"))
      }, [
        createVNode(_component_el_scrollbar, {
          ref: "scrollBarRef",
          "view-style": _ctx.scrollbarViewStyle,
          "wrap-style": _ctx.scrollbarStyle,
          always: _ctx.scrollbarAlwaysOn,
          tabindex: _ctx.scrollbarTabindex,
          native: _ctx.nativeScrollbar,
          onScroll: _ctx.handleScrollbarScroll
        }, {
          default: withCtx(() => [
            createElementVNode("table", {
              ref: "tableBody",
              class: normalizeClass(_ctx.ns.e("body")),
              cellspacing: "0",
              cellpadding: "0",
              border: "0",
              style: normalizeStyle({
                width: _ctx.bodyWidth,
                tableLayout: _ctx.tableLayout
              })
            }, [
              createVNode(_component_hColgroup, {
                columns: _ctx.store.states.columns.value,
                "table-layout": _ctx.tableLayout
              }, null, 8, ["columns", "table-layout"]),
              _ctx.showHeader && _ctx.tableLayout === "auto" ? (openBlock(), createBlock(_component_table_header, {
                key: 0,
                ref: "tableHeaderRef",
                class: normalizeClass(_ctx.ns.e("body-header")),
                border: _ctx.border,
                "default-sort": _ctx.defaultSort,
                store: _ctx.store,
                "append-filter-panel-to": _ctx.appendFilterPanelTo,
                "allow-drag-last-column": _ctx.allowDragLastColumn,
                "show-add-column-trigger": _ctx.effectiveShowAddColumnTrigger,
                "add-column-button": _ctx.addColumnButton,
                "edit-table": _ctx.editTable,
                onSetDragVisible: _ctx.setDragVisible,
                onUpdateAddColumnTrigger: _ctx.updateAddColumnTrigger,
                onTailAddColumn: _ctx.handleAddColumnTailClick
              }, null, 8, ["class", "border", "default-sort", "store", "append-filter-panel-to", "allow-drag-last-column", "show-add-column-trigger", "add-column-button", "edit-table", "onSetDragVisible", "onUpdateAddColumnTrigger", "onTailAddColumn"])) : createCommentVNode("v-if", true),
              createVNode(_component_table_body, {
                context: _ctx.context,
                "row-draggable": _ctx.rowDraggable,
                "on-dragend": _ctx.onDragend,
                "on-dragstart": _ctx.onDragstart,
                highlight: _ctx.highlightCurrentRow,
                "row-class-name": _ctx.rowClassName,
                "tooltip-effect": _ctx.tooltipEffect,
                "tooltip-options": _ctx.tooltipOptions,
                "row-style": _ctx.rowStyle,
                store: _ctx.store,
                stripe: _ctx.stripe,
                "show-add-row-trigger": _ctx.effectiveShowAddRowTrigger,
                onUpdateAddRowTrigger: _ctx.updateAddRowTrigger
              }, null, 8, ["context", "row-draggable", "on-dragend", "on-dragstart", "highlight", "row-class-name", "tooltip-effect", "tooltip-options", "row-style", "store", "stripe", "show-add-row-trigger", "onUpdateAddRowTrigger"]),
              _ctx.showSummary && _ctx.tableLayout === "auto" ? (openBlock(), createBlock(_component_table_footer, {
                key: 1,
                class: normalizeClass(_ctx.ns.e("body-footer")),
                border: _ctx.border,
                "default-sort": _ctx.defaultSort,
                store: _ctx.store,
                "sum-text": _ctx.computedSumText,
                "summary-method": _ctx.summaryMethod
              }, null, 8, ["class", "border", "default-sort", "store", "sum-text", "summary-method"])) : createCommentVNode("v-if", true)
            ], 6),
            _ctx.isEmpty ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref: "emptyBlock",
              style: normalizeStyle(_ctx.emptyBlockStyle),
              class: normalizeClass(_ctx.ns.e("empty-block"))
            }, [
              createElementVNode("span", {
                class: normalizeClass(_ctx.ns.e("empty-text"))
              }, [
                renderSlot(_ctx.$slots, "empty", {}, () => [
                  createTextVNode(toDisplayString(_ctx.computedEmptyText), 1)
                ])
              ], 2)
            ], 6)) : createCommentVNode("v-if", true),
            _ctx.$slots.append ? (openBlock(), createElementBlock("div", {
              key: 1,
              ref: "appendWrapper",
              class: normalizeClass(_ctx.ns.e("append-wrapper"))
            }, [
              renderSlot(_ctx.$slots, "append")
            ], 2)) : createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 8, ["view-style", "wrap-style", "always", "tabindex", "native", "onScroll"])
      ], 2),
      _ctx.showSummary && _ctx.tableLayout === "fixed" ? withDirectives((openBlock(), createElementBlock("div", {
        key: 1,
        ref: "footerWrapper",
        class: normalizeClass(_ctx.ns.e("footer-wrapper"))
      }, [
        createElementVNode("table", {
          class: normalizeClass(_ctx.ns.e("footer")),
          cellspacing: "0",
          cellpadding: "0",
          border: "0",
          style: normalizeStyle(_ctx.tableBodyStyles)
        }, [
          createVNode(_component_hColgroup, {
            columns: _ctx.store.states.columns.value,
            "table-layout": _ctx.tableLayout
          }, null, 8, ["columns", "table-layout"]),
          createVNode(_component_table_footer, {
            border: _ctx.border,
            "default-sort": _ctx.defaultSort,
            store: _ctx.store,
            "sum-text": _ctx.computedSumText,
            "summary-method": _ctx.summaryMethod
          }, null, 8, ["border", "default-sort", "store", "sum-text", "summary-method"])
        ], 6)
      ], 2)), [
        [vShow, !_ctx.isEmpty],
        [_directive_mousewheel, _ctx.handleHeaderFooterMousewheel]
      ]) : createCommentVNode("v-if", true)
    ], 2),
    _ctx.haveTableText ? (openBlock(), createBlock(_component_table_text, {
      key: 0,
      total: _ctx.total,
      "update-time": _ctx.updateTime
    }, null, 8, ["total", "update-time"])) : createCommentVNode("v-if", true),
    withDirectives(createElementVNode("div", {
      ref: "resizeProxy",
      class: normalizeClass(_ctx.ns.e("column-resize-proxy"))
    }, null, 2), [
      [vShow, _ctx.resizeProxyVisible]
    ]),
    withDirectives(createElementVNode("div", {
      class: normalizeClass(_ctx.ns.e("add-column-trigger")),
      style: normalizeStyle(_ctx.addColumnTriggerStyle)
    }, [
      createVNode(_component_el_tooltip, {
        content: "Add Column",
        placement: "top"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_button, {
            class: normalizeClass(["icon-button", _ctx.ns.e("add-column-trigger-button")]),
            onClick: withModifiers(_ctx.handleAddColumnClick, ["stop"])
          }, {
            default: withCtx(() => [
              createVNode(_component_el_icon, {
                color: "#2A3F4D",
                size: "12px"
              }, {
                default: withCtx(() => [
                  (openBlock(), createElementBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12"
                  }, [
                    createElementVNode("g", { "clip-path": "url(#clip0_35669_24470)" }, [
                      createElementVNode("path", { d: "M12 5.25H6.75V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25Z" })
                    ]),
                    createElementVNode("defs", null, [
                      createElementVNode("clipPath", { id: "clip0_35669_24470" }, [
                        createElementVNode("rect", {
                          width: "12",
                          height: "12",
                          fill: "white"
                        })
                      ])
                    ])
                  ]))
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["class", "onClick"])
        ]),
        _: 1
      })
    ], 6), [
      [vShow, _ctx.effectiveShowAddColumnTrigger && _ctx.addColumnTrigger]
    ]),
    withDirectives(createElementVNode("div", {
      class: normalizeClass([_ctx.ns.e("add-row-trigger")]),
      style: normalizeStyle(_ctx.addRowTriggerStyle)
    }, [
      createVNode(_component_el_tooltip, {
        content: "Add Row",
        placement: "top"
      }, {
        default: withCtx(() => [
          createVNode(_component_el_button, {
            class: normalizeClass(["icon-button", _ctx.ns.e("add-row-trigger-button")]),
            "aria-label": "Add Row",
            onClick: withModifiers(_ctx.handleAddRowClick, ["stop"])
          }, {
            default: withCtx(() => [
              createVNode(_component_el_icon, {
                color: "#2A3F4D",
                size: "12px"
              }, {
                default: withCtx(() => [
                  (openBlock(), createElementBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12"
                  }, [
                    createElementVNode("g", { "clip-path": "url(#clip0_35669_24470)" }, [
                      createElementVNode("path", { d: "M12 5.25H6.75V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25Z" })
                    ]),
                    createElementVNode("defs", null, [
                      createElementVNode("clipPath", { id: "clip0_35669_24470" }, [
                        createElementVNode("rect", {
                          width: "12",
                          height: "12",
                          fill: "white"
                        })
                      ])
                    ])
                  ]))
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["class", "onClick"])
        ]),
        _: 1
      })
    ], 6), [
      [vShow, _ctx.effectiveShowAddRowTrigger && _ctx.addRowTrigger]
    ])
  ], 46, ["data-prefix", "onMouseleave"]);
}
var Table = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "table.vue"]]);

export { Table as default };
//# sourceMappingURL=table.mjs.map
