'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var tableText = require('./table-footer/tableText.js');
var tooltip = require('../../tooltip/src/tooltip2.js');
var lodashUnified = require('lodash-unified');
var index$4 = require('../../scrollbar/index.js');
var helper = require('./store/helper.js');
var tableLayout = require('./table-layout.js');
var index$1 = require('./table-header/index.js');
var index$2 = require('./table-body/index.js');
var index$3 = require('./table-footer/index.js');
var utilsHelper$1 = require('./table/utils-helper.js');
var utilsHelper = require('./table-header/utils-helper.js');
var styleHelper = require('./table/style-helper.js');
var keyRenderHelper = require('./table/key-render-helper.js');
var defaults = require('./table/defaults.js');
var tokens = require('./tokens.js');
var hHelper = require('./h-helper.js');
var useScrollbar = require('./composables/use-scrollbar.js');
var _private = require('./private.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');
var index = require('../../../directives/mousewheel/index.js');
var index$5 = require('../../../hooks/use-locale/index.js');
var index$6 = require('../../../hooks/use-namespace/index.js');

let tableIdSeed = 1;
const _sfc_main = vue.defineComponent({
  name: "ElTable",
  directives: {
    Mousewheel: index["default"]
  },
  components: {
    TableText: tableText["default"],
    ElTooltip: tooltip["default"],
    TableHeader: index$1["default"],
    TableBody: index$2["default"],
    TableFooter: index$3["default"],
    ElScrollbar: index$4.ElScrollbar,
    hColgroup: hHelper.hColgroup
  },
  props: defaults["default"],
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
    const { t } = index$5.useLocale();
    const ns = index$6.useNamespace("table");
    const table = vue.getCurrentInstance();
    vue.provide(tokens.TABLE_INJECTION_KEY, table);
    const store = helper.createStore(table, props);
    table.store = store;
    const editingRow = vue.ref(null);
    const activeEditableCell = vue.ref(null);
    const ghostRowData = vue.ref({
      [_private.ghostRowSign]: true,
      [_private.ghostRowKey]: "ghost-row"
    });
    const addColumnTrigger = vue.shallowRef(null);
    const addRowTrigger = vue.ref(null);
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
        draft: lodashUnified.cloneDeep(vue.toRaw(row))
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
    const layout = new tableLayout["default"]({
      store: table.store,
      table,
      fit: props.fit,
      showHeader: props.showHeader
    });
    table.layout = layout;
    const isEmpty = vue.computed(() => {
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
    } = utilsHelper$1["default"](store);
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
      tableLayout: tableLayout$1,
      scrollbarViewStyle,
      scrollbarStyle
    } = styleHelper["default"](props, layout, store, table);
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
    const { scrollBarRef, scrollTo, setScrollLeft, setScrollTop } = useScrollbar.useScrollbar();
    let stopPendingGhostRowScrollWatch;
    const clearPendingGhostRowScrollWatch = () => {
      stopPendingGhostRowScrollWatch == null ? void 0 : stopPendingGhostRowScrollWatch();
      stopPendingGhostRowScrollWatch = void 0;
    };
    const scheduleGhostRowScroll = () => {
      clearPendingGhostRowScrollWatch();
      const previousLength = props.data.length;
      stopPendingGhostRowScrollWatch = vue.watch(() => props.data.length, async (length) => {
        var _a, _b;
        if (length <= previousLength)
          return;
        clearPendingGhostRowScrollWatch();
        await vue.nextTick();
        const scrollHeight = (_b = (_a = scrollBarRef.value) == null ? void 0 : _a.wrapRef) == null ? void 0 : _b.scrollHeight;
        if (scrollHeight != null) {
          setScrollTop(scrollHeight);
        }
      }, {
        flush: "post"
      });
    };
    const debouncedUpdateLayout = lodashUnified.debounce(doLayout, 50);
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
    const hasEditingRow = vue.computed(() => !!editingRow.value);
    const effectiveShowAddColumnTrigger = vue.computed(() => props.editTable && props.showAddColumnTrigger);
    const effectiveShowAddRowTrigger = vue.computed(() => props.editTable && props.showAddRowTrigger);
    const computedSumText = vue.computed(() => {
      var _a;
      return (_a = props.sumText) != null ? _a : t("el.table.sumText");
    });
    const computedEmptyText = vue.computed(() => {
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
    const addColumnTriggerStyle = vue.computed(() => {
      if (!addColumnTrigger.value)
        return {};
      return {
        left: `${addColumnTrigger.value.left}px`
      };
    });
    const addRowTriggerStyle = vue.computed(() => {
      if (!addRowTrigger.value)
        return {};
      return {
        top: `${addRowTrigger.value.top}px`
      };
    });
    vue.watch(effectiveShowAddColumnTrigger, (enabled) => {
      if (!enabled) {
        clearAddColumnTrigger();
      }
    });
    vue.watch(effectiveShowAddRowTrigger, (enabled) => {
      if (!enabled) {
        clearAddRowTrigger();
      }
    });
    const columns = vue.computed(() => {
      return utilsHelper.convertToRows(store.states.originColumns.value)[0];
    });
    keyRenderHelper["default"](table);
    vue.onBeforeUnmount(() => {
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
      tableLayout: tableLayout$1,
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
  const _component_hColgroup = vue.resolveComponent("hColgroup");
  const _component_table_header = vue.resolveComponent("table-header");
  const _component_table_body = vue.resolveComponent("table-body");
  const _component_table_footer = vue.resolveComponent("table-footer");
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
  const _component_table_text = vue.resolveComponent("table-text");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  const _directive_mousewheel = vue.resolveDirective("mousewheel");
  return vue.openBlock(), vue.createElementBlock("div", {
    ref: "tableWrapper",
    class: vue.normalizeClass([
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
    style: vue.normalizeStyle(_ctx.style),
    "data-prefix": _ctx.ns.namespace.value,
    onMouseleave: _ctx.handleTableMouseLeave
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.ns.e("inner-wrapper"))
    }, [
      vue.createElementVNode("div", {
        ref: "hiddenColumns",
        class: "hidden-columns"
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 512),
      _ctx.showHeader && _ctx.tableLayout === "fixed" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        ref: "headerWrapper",
        class: vue.normalizeClass(_ctx.ns.e("header-wrapper"))
      }, [
        vue.createElementVNode("table", {
          ref: "tableHeader",
          class: vue.normalizeClass(_ctx.ns.e("header")),
          style: vue.normalizeStyle(_ctx.tableBodyStyles),
          border: "0",
          cellpadding: "0",
          cellspacing: "0"
        }, [
          vue.createVNode(_component_hColgroup, {
            columns: _ctx.store.states.columns.value,
            "table-layout": _ctx.tableLayout
          }, null, 8, ["columns", "table-layout"]),
          vue.createVNode(_component_table_header, {
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
      ]) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("div", {
        ref: "bodyWrapper",
        class: vue.normalizeClass(_ctx.ns.e("body-wrapper"))
      }, [
        vue.createVNode(_component_el_scrollbar, {
          ref: "scrollBarRef",
          "view-style": _ctx.scrollbarViewStyle,
          "wrap-style": _ctx.scrollbarStyle,
          always: _ctx.scrollbarAlwaysOn,
          tabindex: _ctx.scrollbarTabindex,
          native: _ctx.nativeScrollbar,
          onScroll: _ctx.handleScrollbarScroll
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("table", {
              ref: "tableBody",
              class: vue.normalizeClass(_ctx.ns.e("body")),
              cellspacing: "0",
              cellpadding: "0",
              border: "0",
              style: vue.normalizeStyle({
                width: _ctx.bodyWidth,
                tableLayout: _ctx.tableLayout
              })
            }, [
              vue.createVNode(_component_hColgroup, {
                columns: _ctx.store.states.columns.value,
                "table-layout": _ctx.tableLayout
              }, null, 8, ["columns", "table-layout"]),
              _ctx.showHeader && _ctx.tableLayout === "auto" ? (vue.openBlock(), vue.createBlock(_component_table_header, {
                key: 0,
                ref: "tableHeaderRef",
                class: vue.normalizeClass(_ctx.ns.e("body-header")),
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
              }, null, 8, ["class", "border", "default-sort", "store", "append-filter-panel-to", "allow-drag-last-column", "show-add-column-trigger", "add-column-button", "edit-table", "onSetDragVisible", "onUpdateAddColumnTrigger", "onTailAddColumn"])) : vue.createCommentVNode("v-if", true),
              vue.createVNode(_component_table_body, {
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
              _ctx.showSummary && _ctx.tableLayout === "auto" ? (vue.openBlock(), vue.createBlock(_component_table_footer, {
                key: 1,
                class: vue.normalizeClass(_ctx.ns.e("body-footer")),
                border: _ctx.border,
                "default-sort": _ctx.defaultSort,
                store: _ctx.store,
                "sum-text": _ctx.computedSumText,
                "summary-method": _ctx.summaryMethod
              }, null, 8, ["class", "border", "default-sort", "store", "sum-text", "summary-method"])) : vue.createCommentVNode("v-if", true)
            ], 6),
            _ctx.isEmpty ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              ref: "emptyBlock",
              style: vue.normalizeStyle(_ctx.emptyBlockStyle),
              class: vue.normalizeClass(_ctx.ns.e("empty-block"))
            }, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(_ctx.ns.e("empty-text"))
              }, [
                vue.renderSlot(_ctx.$slots, "empty", {}, () => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.computedEmptyText), 1)
                ])
              ], 2)
            ], 6)) : vue.createCommentVNode("v-if", true),
            _ctx.$slots.append ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 1,
              ref: "appendWrapper",
              class: vue.normalizeClass(_ctx.ns.e("append-wrapper"))
            }, [
              vue.renderSlot(_ctx.$slots, "append")
            ], 2)) : vue.createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 8, ["view-style", "wrap-style", "always", "tabindex", "native", "onScroll"])
      ], 2),
      _ctx.showSummary && _ctx.tableLayout === "fixed" ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
        key: 1,
        ref: "footerWrapper",
        class: vue.normalizeClass(_ctx.ns.e("footer-wrapper"))
      }, [
        vue.createElementVNode("table", {
          class: vue.normalizeClass(_ctx.ns.e("footer")),
          cellspacing: "0",
          cellpadding: "0",
          border: "0",
          style: vue.normalizeStyle(_ctx.tableBodyStyles)
        }, [
          vue.createVNode(_component_hColgroup, {
            columns: _ctx.store.states.columns.value,
            "table-layout": _ctx.tableLayout
          }, null, 8, ["columns", "table-layout"]),
          vue.createVNode(_component_table_footer, {
            border: _ctx.border,
            "default-sort": _ctx.defaultSort,
            store: _ctx.store,
            "sum-text": _ctx.computedSumText,
            "summary-method": _ctx.summaryMethod
          }, null, 8, ["border", "default-sort", "store", "sum-text", "summary-method"])
        ], 6)
      ], 2)), [
        [vue.vShow, !_ctx.isEmpty],
        [_directive_mousewheel, _ctx.handleHeaderFooterMousewheel]
      ]) : vue.createCommentVNode("v-if", true)
    ], 2),
    _ctx.haveTableText ? (vue.openBlock(), vue.createBlock(_component_table_text, {
      key: 0,
      total: _ctx.total,
      "update-time": _ctx.updateTime
    }, null, 8, ["total", "update-time"])) : vue.createCommentVNode("v-if", true),
    vue.withDirectives(vue.createElementVNode("div", {
      ref: "resizeProxy",
      class: vue.normalizeClass(_ctx.ns.e("column-resize-proxy"))
    }, null, 2), [
      [vue.vShow, _ctx.resizeProxyVisible]
    ]),
    vue.withDirectives(vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.ns.e("add-column-trigger")),
      style: vue.normalizeStyle(_ctx.addColumnTriggerStyle)
    }, [
      vue.createVNode(_component_el_tooltip, {
        content: "Add Column",
        placement: "top"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_el_button, {
            class: vue.normalizeClass(["icon-button", _ctx.ns.e("add-column-trigger-button")]),
            onClick: vue.withModifiers(_ctx.handleAddColumnClick, ["stop"])
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_icon, {
                color: "#2A3F4D",
                size: "12px"
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createElementBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12"
                  }, [
                    vue.createElementVNode("g", { "clip-path": "url(#clip0_35669_24470)" }, [
                      vue.createElementVNode("path", { d: "M12 5.25H6.75V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25Z" })
                    ]),
                    vue.createElementVNode("defs", null, [
                      vue.createElementVNode("clipPath", { id: "clip0_35669_24470" }, [
                        vue.createElementVNode("rect", {
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
      [vue.vShow, _ctx.effectiveShowAddColumnTrigger && _ctx.addColumnTrigger]
    ]),
    vue.withDirectives(vue.createElementVNode("div", {
      class: vue.normalizeClass([_ctx.ns.e("add-row-trigger")]),
      style: vue.normalizeStyle(_ctx.addRowTriggerStyle)
    }, [
      vue.createVNode(_component_el_tooltip, {
        content: "Add Row",
        placement: "top"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_el_button, {
            class: vue.normalizeClass(["icon-button", _ctx.ns.e("add-row-trigger-button")]),
            "aria-label": "Add Row",
            onClick: vue.withModifiers(_ctx.handleAddRowClick, ["stop"])
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_icon, {
                color: "#2A3F4D",
                size: "12px"
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createElementBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12"
                  }, [
                    vue.createElementVNode("g", { "clip-path": "url(#clip0_35669_24470)" }, [
                      vue.createElementVNode("path", { d: "M12 5.25H6.75V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25Z" })
                    ]),
                    vue.createElementVNode("defs", null, [
                      vue.createElementVNode("clipPath", { id: "clip0_35669_24470" }, [
                        vue.createElementVNode("rect", {
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
      [vue.vShow, _ctx.effectiveShowAddRowTrigger && _ctx.addRowTrigger]
    ])
  ], 46, ["data-prefix", "onMouseleave"]);
}
var Table = /* @__PURE__ */ pluginVue_exportHelper["default"](_sfc_main, [["render", _sfc_render], ["__file", "table.vue"]]);

exports["default"] = Table;
//# sourceMappingURL=table.js.map
