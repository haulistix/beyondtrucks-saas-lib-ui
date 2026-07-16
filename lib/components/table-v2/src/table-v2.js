'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var useTable = require('./use-table.js');
var _private = require('./private.js');
var index$2 = require('../../button/index.js');
var index$3 = require('../../icon/index.js');
var index$1 = require('../../tooltip/index.js');
var ghostTable = require('./ghost-table.js');
var tokens = require('./tokens.js');
var table = require('./table.js');
var mainTable = require('./renderers/main-table.js');
var leftTable = require('./renderers/left-table.js');
var rightTable = require('./renderers/right-table.js');
var row = require('./renderers/row.js');
var cell = require('./renderers/cell.js');
var header$1 = require('./renderers/header.js');
var headerCell = require('./renderers/header-cell.js');
var footer = require('./renderers/footer.js');
var footerDefault = require('./renderers/footerDefault.js');
var empty = require('./renderers/empty.js');
var overlay = require('./renderers/overlay.js');
var header = require('./components/header.js');
var index = require('../../../hooks/use-namespace/index.js');

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const COMPONENT_NAME = "ElTableV2";
const TableV2 = vue.defineComponent({
  name: COMPONENT_NAME,
  props: table.tableV2Props,
  emits: table.tableV2Emits,
  setup(props, {
    slots,
    expose,
    emit
  }) {
    const ns = index.useNamespace("table-v2");
    const {
      columnsStyles,
      fixedColumnsOnLeft,
      fixedColumnsOnRight,
      mainColumns,
      visibleColumns,
      mainTableHeight,
      fixedTableHeight,
      leftTableWidth,
      rightTableWidth,
      data,
      depthMap,
      expandedRowKeys,
      hasFixedColumns,
      containerRef,
      mainTableRef,
      leftTableRef,
      rightTableRef,
      isDynamic,
      isResetting,
      isScrolling,
      bodyWidth,
      addRowHeight,
      effectiveHScrollbarSize,
      emptyStyle,
      rootStyle,
      footerHeight,
      effectiveFooterHeight,
      effectiveWidth,
      showEmpty,
      scrollTo,
      scrollToLeft,
      scrollToTop,
      scrollToRow,
      getRowHeight,
      updateColumnWidth,
      onColumnSorted,
      onRowHeightChange,
      onRowHovered,
      onRowExpanded,
      onRowsRendered,
      onScroll,
      onVerticalScroll,
      scrollPos
    } = useTable.useTable(props);
    const addColumnTrigger = vue.shallowRef(null);
    const addRowTrigger = vue.ref(null);
    const createGhostRowData = () => {
      var _a;
      return {
        ...(_a = props.ghostRowTemplate) != null ? _a : {},
        [props.rowKey]: "ghost-row",
        [_private.ghostRowKey]: "ghost-row",
        [_private.ghostRowFieldKey]: props.rowKey,
        [_private.ghostRowSign]: true,
        [_private.ghostRowTouchedSign]: false
      };
    };
    const ghostRowDraft = vue.ref(createGhostRowData());
    const isLegacyEditMode = vue.computed(() => props.canEditTable && props.editable);
    const isGhostEditMode = vue.computed(() => props.ghostTable && props.editTable);
    let stopPendingGhostRowScrollWatch;
    const clearAddColumnTrigger = () => {
      addColumnTrigger.value = null;
    };
    const updateAddColumnTrigger = (payload) => {
      addColumnTrigger.value = payload;
    };
    const clearAddRowTrigger = () => {
      addRowTrigger.value = null;
    };
    const updateAddRowTrigger = (payload) => {
      addRowTrigger.value = payload;
    };
    const clearPendingGhostRowScrollWatch = () => {
      stopPendingGhostRowScrollWatch == null ? void 0 : stopPendingGhostRowScrollWatch();
      stopPendingGhostRowScrollWatch = void 0;
    };
    const scheduleGhostRowScroll = () => {
      clearPendingGhostRowScrollWatch();
      const previousLength = props.data.length;
      stopPendingGhostRowScrollWatch = vue.watch(() => props.data.length, async (length) => {
        if (length <= previousLength)
          return;
        clearPendingGhostRowScrollWatch();
        await vue.nextTick();
        scrollToRow(length - 1, "end");
      }, {
        flush: "post"
      });
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
      clearAddColumnTrigger();
      clearAddRowTrigger();
    };
    const validateRequiredColumns = () => {
      const requiredColumns = props.columns.filter((column) => column.required && column.dataKey != null);
      if (!requiredColumns.length)
        return true;
      return props.data.every((row) => requiredColumns.every((column) => !ghostTable.isEmptyRequiredValue(row == null ? void 0 : row[column.dataKey])));
    };
    const handleTableScroll = (params) => {
      clearAddColumnTrigger();
      clearAddRowTrigger();
      onScroll(params);
    };
    const handleVerticalTableScroll = (params) => {
      clearAddColumnTrigger();
      clearAddRowTrigger();
      onVerticalScroll(params);
    };
    const effectiveShowAddColumnTrigger = vue.computed(() => (isLegacyEditMode.value || isGhostEditMode.value) && props.showAddColumnTrigger);
    const effectiveShowAddRowTrigger = vue.computed(() => (isLegacyEditMode.value || isGhostEditMode.value) && props.showAddRowTrigger);
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
      if (!enabled)
        clearAddColumnTrigger();
    });
    vue.watch(effectiveShowAddRowTrigger, (enabled) => {
      if (!enabled)
        clearAddRowTrigger();
    });
    expose({
      scrollTo,
      scrollToLeft,
      scrollToTop,
      scrollToRow,
      validateRequiredColumns
    });
    vue.provide(tokens.TableV2InjectionKey, {
      ns,
      isResetting,
      isScrolling
    });
    vue.provide(tokens.TABLE_V2_GRID_INJECTION_KEY, vue.computed(() => vue.unref(scrollPos).scrollLeft));
    const onRowDelete = (params) => {
      emit("row-delete", params);
    };
    const onRowAdd = (params) => {
      emit("row-add", params);
    };
    const onAddGhostRow = (params) => {
      scheduleGhostRowScroll();
      emit("add-ghost-row", {
        ...params,
        row: ghostTable.getGhostRowPayload(params.row)
      });
      ghostRowDraft.value = createGhostRowData();
    };
    const onHeaderDragend = (newWidth, oldWidth, column, event) => {
      emit("header-dragend", newWidth, oldWidth, column, event);
    };
    return () => {
      const {
        cache,
        cellProps,
        estimatedRowHeight,
        expandColumnKey,
        fixedData,
        headerHeight,
        headerClass,
        headerProps,
        headerCellProps,
        sortBy,
        sortState,
        rowHeight,
        rowClass,
        rowEventHandlers,
        rowKey,
        rowProps,
        scrollbarAlwaysOn,
        indentSize,
        iconSize,
        useIsScrolling,
        vScrollbarSize
      } = props;
      const _data = vue.unref(data);
      const mainTableProps = {
        cache,
        class: ns.e("main"),
        columns: vue.unref(mainColumns),
        data: _data,
        fixedData,
        estimatedRowHeight,
        bodyWidth: vue.unref(bodyWidth),
        headerHeight,
        headerWidth: vue.unref(bodyWidth),
        height: vue.unref(mainTableHeight),
        mainTableRef,
        rowKey,
        rowHeight,
        scrollbarAlwaysOn,
        scrollbarStartGap: 2,
        scrollbarEndGap: vScrollbarSize,
        useIsScrolling,
        width: vue.unref(effectiveWidth),
        getRowHeight,
        onRowsRendered,
        onScroll: handleTableScroll
      };
      const leftColumnsWidth = vue.unref(leftTableWidth);
      const _fixedTableHeight = vue.unref(fixedTableHeight);
      const mainContentWidth = vue.unref(bodyWidth);
      const leftTableProps = {
        cache,
        class: ns.e("left"),
        columns: vue.unref(fixedColumnsOnLeft),
        data: _data,
        fixedData,
        estimatedRowHeight,
        leftTableRef,
        rowHeight,
        bodyWidth: leftColumnsWidth,
        headerWidth: leftColumnsWidth,
        headerHeight,
        height: _fixedTableHeight,
        rowKey,
        scrollbarAlwaysOn,
        scrollbarStartGap: 2,
        scrollbarEndGap: vScrollbarSize,
        useIsScrolling,
        width: leftColumnsWidth,
        getRowHeight,
        onScroll: handleVerticalTableScroll
      };
      const rightColumnsWidth = vue.unref(rightTableWidth);
      const rightTableProps = {
        cache,
        class: ns.e("right"),
        columns: vue.unref(fixedColumnsOnRight),
        data: _data,
        fixedData,
        estimatedRowHeight,
        rightTableRef,
        rowHeight,
        bodyWidth: rightColumnsWidth,
        headerWidth: rightColumnsWidth,
        headerHeight,
        height: _fixedTableHeight,
        rowKey,
        scrollbarAlwaysOn,
        scrollbarStartGap: 2,
        scrollbarEndGap: vScrollbarSize,
        width: rightColumnsWidth,
        style: `${ns.cssVarName("table-scrollbar-size")}: ${vScrollbarSize}px`,
        useIsScrolling,
        getRowHeight,
        onScroll: handleVerticalTableScroll
      };
      const _columnsStyles = vue.unref(columnsStyles);
      const tableRowProps = {
        ns,
        depthMap: vue.unref(depthMap),
        columnsStyles: _columnsStyles,
        expandColumnKey,
        expandedRowKeys: vue.unref(expandedRowKeys),
        estimatedRowHeight,
        hasFixedColumns: vue.unref(hasFixedColumns),
        rowProps,
        rowClass,
        rowKey,
        rowEventHandlers,
        onRowAdd,
        onRowHovered,
        onRowExpanded,
        onRowHeightChange,
        onAddRowTriggerChange: updateAddRowTrigger,
        canEditTable: props.canEditTable,
        editable: props.editable,
        editTable: props.editTable,
        ghostTable: props.ghostTable,
        showAddRowTrigger: effectiveShowAddRowTrigger.value
      };
      const tableCellProps = {
        canEditTable: props.canEditTable,
        cellProps,
        editable: props.editable,
        editTable: props.editTable,
        expandColumnKey,
        ghostTable: props.ghostTable,
        indentSize,
        iconSize,
        onAddGhostRow,
        onRowAdd,
        onRowDelete,
        rowActionRenderer: slots["row-action"],
        rowKey,
        expandedRowKeys: vue.unref(expandedRowKeys),
        visibleColumns: vue.unref(visibleColumns),
        ns
      };
      const tableHeaderProps = {
        ns,
        headerClass,
        headerProps,
        columnsStyles: _columnsStyles
      };
      const tableHeaderCellProps = {
        ns,
        sortBy,
        sortState,
        headerCellProps,
        canEditTable: props.canEditTable,
        editable: props.editable,
        editTable: props.editTable,
        ghostTable: props.ghostTable,
        showAddColumnTrigger: effectiveShowAddColumnTrigger.value,
        addColumnButton: props.addColumnButton,
        onHeaderDragend,
        onAddColumnTriggerChange: updateAddColumnTrigger,
        onTailAddColumn: handleAddColumnTailClick,
        onColumnSorted,
        updateColumnWidth,
        visibleColumns: vue.unref(visibleColumns)
      };
      const tableSlots = {
        row: (props2) => vue.createVNode(row["default"], vue.mergeProps(props2, tableRowProps), {
          row: slots.row,
          cell: (props3) => {
            let _slot;
            return slots.cell ? vue.createVNode(cell["default"], vue.mergeProps(props3, tableCellProps, {
              "style": _columnsStyles[props3.column.key]
            }), _isSlot(_slot = slots.cell(props3)) ? _slot : {
              default: () => [_slot]
            }) : vue.createVNode(cell["default"], vue.mergeProps(props3, tableCellProps, {
              "style": _columnsStyles[props3.column.key]
            }), null);
          }
        }),
        header: (props2) => vue.createVNode(header$1["default"], vue.mergeProps(props2, tableHeaderProps), {
          header: slots.header,
          cell: (props3) => {
            let _slot2;
            return slots["header-cell"] ? vue.createVNode(headerCell["default"], vue.mergeProps(props3, tableHeaderCellProps, {
              "style": _columnsStyles[props3.column.key]
            }), _isSlot(_slot2 = slots["header-cell"](props3)) ? _slot2 : {
              default: () => [_slot2]
            }) : vue.createVNode(headerCell["default"], vue.mergeProps(props3, tableHeaderCellProps, {
              "style": _columnsStyles[props3.column.key]
            }), null);
          }
        })
      };
      const rootKls = [props.class, ns.b(), ns.e("root"), ns.is("dynamic", vue.unref(isDynamic)), effectiveShowAddColumnTrigger.value && ns.m("with-add-column-trigger"), effectiveShowAddRowTrigger.value && ns.m("with-add-row-trigger"), (isLegacyEditMode.value || isGhostEditMode.value) && ns.m("with-ghost-row")];
      const footerProps = {
        class: ns.e("footer"),
        style: vue.unref(footerHeight),
        total: props.total,
        updateTime: props.updateTime
      };
      const showAddRow = isLegacyEditMode.value && !isGhostEditMode.value;
      const showGhostRow = isGhostEditMode.value;
      const addRowData = {
        [rowKey]: _private.rowAddKey,
        [_private.rowAddSign]: true
      };
      const ghostRowData = vue.unref(ghostRowDraft);
      const addRowHeaderProps = {
        fixedHeaderData: [addRowData],
        headerData: _data,
        headerHeight: [],
        rowHeight,
        height: vue.unref(addRowHeight)
      };
      const ghostRowHeaderProps = {
        fixedHeaderData: [ghostRowData],
        headerData: _data,
        headerHeight: [],
        rowHeight,
        height: vue.unref(addRowHeight)
      };
      const addRowWrapperStyle = {
        bottom: `${vue.unref(effectiveFooterHeight) + vue.unref(effectiveHScrollbarSize)}px`
      };
      const tableRootStyle = {
        ...vue.unref(rootStyle),
        [ns.cssVarName("table-v2-ghost-row-height")]: `${vue.unref(addRowHeight)}px`,
        [ns.cssVarName("table-v2-row-delete-width")]: `${_private.rowDeleteColumnWidth}px`
      };
      return vue.createVNode("div", {
        "ref": containerRef,
        "class": rootKls,
        "style": tableRootStyle,
        "onMouseleave": handleTableMouseLeave
      }, [vue.createVNode(mainTable["default"], mainTableProps, _isSlot(tableSlots) ? tableSlots : {
        default: () => [tableSlots]
      }), vue.createVNode(leftTable["default"], leftTableProps, _isSlot(tableSlots) ? tableSlots : {
        default: () => [tableSlots]
      }), vue.createVNode(rightTable["default"], rightTableProps, _isSlot(tableSlots) ? tableSlots : {
        default: () => [tableSlots]
      }), showAddRow && vue.createVNode(vue.Fragment, null, [vue.createVNode("div", {
        "class": ns.e("add-row-main"),
        "style": addRowWrapperStyle
      }, [vue.createVNode(header["default"], vue.mergeProps(addRowHeaderProps, tableHeaderProps, {
        "columns": vue.unref(mainColumns),
        "class": `${ns.e("add-row-main-inner")} ${ns.e("header-wrapper")}`,
        "rowWidth": mainContentWidth,
        "width": vue.unref(effectiveWidth)
      }), {
        fixed: tableSlots.row
      })]), leftColumnsWidth > 0 && vue.createVNode("div", {
        "class": ns.e("add-row-left"),
        "style": addRowWrapperStyle
      }, [vue.createVNode(header["default"], vue.mergeProps(addRowHeaderProps, tableHeaderProps, {
        "columns": vue.unref(fixedColumnsOnLeft),
        "class": `${ns.e("add-row-left-inner")} ${ns.e("header-wrapper")}`,
        "rowWidth": leftColumnsWidth,
        "width": leftColumnsWidth
      }), {
        fixed: tableSlots.row
      })]), rightColumnsWidth > 0 && vue.createVNode("div", {
        "class": ns.e("add-row-right"),
        "style": addRowWrapperStyle
      }, [vue.createVNode(header["default"], vue.mergeProps(addRowHeaderProps, tableHeaderProps, {
        "columns": vue.unref(fixedColumnsOnRight),
        "class": `${ns.e("add-row-right-inner")} ${ns.e("header-wrapper")}`,
        "rowWidth": rightColumnsWidth,
        "width": rightColumnsWidth
      }), {
        fixed: tableSlots.row
      })])]), showGhostRow && vue.createVNode(vue.Fragment, null, [vue.createVNode("div", {
        "class": ns.e("add-row-main"),
        "style": addRowWrapperStyle
      }, [vue.createVNode(header["default"], vue.mergeProps(ghostRowHeaderProps, tableHeaderProps, {
        "columns": vue.unref(mainColumns),
        "class": `${ns.e("add-row-main-inner")} ${ns.e("header-wrapper")}`,
        "rowWidth": mainContentWidth,
        "width": vue.unref(effectiveWidth)
      }), {
        fixed: tableSlots.row
      })]), leftColumnsWidth > 0 && vue.createVNode("div", {
        "class": ns.e("add-row-left"),
        "style": addRowWrapperStyle
      }, [vue.createVNode(header["default"], vue.mergeProps(ghostRowHeaderProps, tableHeaderProps, {
        "columns": vue.unref(fixedColumnsOnLeft),
        "class": `${ns.e("add-row-left-inner")} ${ns.e("header-wrapper")}`,
        "rowWidth": leftColumnsWidth,
        "width": leftColumnsWidth
      }), {
        fixed: tableSlots.row
      })]), rightColumnsWidth > 0 && vue.createVNode("div", {
        "class": ns.e("add-row-right"),
        "style": addRowWrapperStyle
      }, [vue.createVNode(header["default"], vue.mergeProps(ghostRowHeaderProps, tableHeaderProps, {
        "columns": vue.unref(fixedColumnsOnRight),
        "class": `${ns.e("add-row-right-inner")} ${ns.e("header-wrapper")}`,
        "rowWidth": rightColumnsWidth,
        "width": rightColumnsWidth
      }), {
        fixed: tableSlots.row
      })])]), slots.footer ? vue.createVNode(footer["default"], footerProps, {
        default: slots.footer
      }) : props.isFooterDefault ? vue.createVNode(footerDefault["default"], footerProps, {
        default: slots.footer
      }) : null, vue.unref(showEmpty) && vue.createVNode(empty["default"], {
        "class": ns.e("empty"),
        "style": vue.unref(emptyStyle)
      }, {
        default: slots.empty
      }), slots.overlay && vue.createVNode(overlay["default"], {
        "class": ns.e("overlay")
      }, {
        default: slots.overlay
      }), effectiveShowAddColumnTrigger.value && addColumnTrigger.value && vue.createVNode("div", {
        "class": ns.e("add-column-trigger"),
        "style": vue.unref(addColumnTriggerStyle)
      }, [vue.createVNode(index$1.ElTooltip, {
        "content": "Add Column",
        "placement": "top"
      }, {
        default: () => [vue.createVNode(index$2.ElButton, {
          "class": [ns.e("add-column-trigger-button"), "icon-button"],
          "onClick": handleAddColumnClick
        }, {
          default: () => [vue.createVNode(index$3.ElIcon, {
            "color": "#2A3F4D",
            "size": "12px"
          }, {
            default: () => [vue.createVNode("svg", {
              "xmlns": "http://www.w3.org/2000/svg",
              "width": "12",
              "height": "12",
              "viewBox": "0 0 12 12"
            }, [vue.createVNode("g", {
              "clip-path": "url(#clip0_35669_24470)"
            }, [vue.createVNode("path", {
              "d": "M12 5.25H6.75V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25Z"
            }, null)]), vue.createVNode("defs", null, [vue.createVNode("clipPath", {
              "id": "clip0_35669_24470"
            }, [vue.createVNode("rect", {
              "width": "12",
              "height": "12",
              "fill": "white"
            }, null)])])])]
          })]
        })]
      })]), effectiveShowAddRowTrigger.value && addRowTrigger.value && vue.createVNode("div", {
        "class": ns.e("add-row-trigger"),
        "style": vue.unref(addRowTriggerStyle)
      }, [vue.createVNode(index$1.ElTooltip, {
        "content": "Add Row",
        "placement": "top"
      }, {
        default: () => [vue.createVNode(index$2.ElButton, {
          "class": [ns.e("add-row-trigger-button"), "icon-button"],
          "aria-label": "Add Row",
          "onClick": handleAddRowClick
        }, {
          default: () => [vue.createVNode(index$3.ElIcon, {
            "color": "#2A3F4D",
            "size": "12px"
          }, {
            default: () => [vue.createVNode("svg", {
              "xmlns": "http://www.w3.org/2000/svg",
              "width": "12",
              "height": "12",
              "viewBox": "0 0 12 12"
            }, [vue.createVNode("g", {
              "clip-path": "url(#clip0_35669_24470)"
            }, [vue.createVNode("path", {
              "d": "M12 5.25H6.75V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25Z"
            }, null)]), vue.createVNode("defs", null, [vue.createVNode("clipPath", {
              "id": "clip0_35669_24470"
            }, [vue.createVNode("rect", {
              "width": "12",
              "height": "12",
              "fill": "white"
            }, null)])])])]
          })]
        })]
      })])]);
    };
  }
});
var TableV2$1 = TableV2;

exports["default"] = TableV2$1;
//# sourceMappingURL=table-v2.js.map
