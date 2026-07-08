'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var useTable = require('./use-table.js');
var _private = require('./private.js');
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
      mainTableHeight,
      fixedTableHeight,
      leftTableWidth,
      rightTableWidth,
      data,
      depthMap,
      expandedRowKeys,
      hasFixedColumns,
      mainTableRef,
      leftTableRef,
      rightTableRef,
      isDynamic,
      isResetting,
      isScrolling,
      bodyWidth,
      addRowHeight,
      emptyStyle,
      rootStyle,
      footerHeight,
      showEmpty,
      scrollTo,
      scrollToLeft,
      scrollToTop,
      scrollToRow,
      getRowHeight,
      onColumnSorted,
      onRowHeightChange,
      onRowHovered,
      onRowExpanded,
      onRowsRendered,
      onScroll,
      onVerticalScroll,
      scrollPos
    } = useTable.useTable(props);
    expose({
      scrollTo,
      scrollToLeft,
      scrollToTop,
      scrollToRow
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
        vScrollbarSize,
        width
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
        width,
        getRowHeight,
        onRowsRendered,
        onScroll
      };
      const leftColumnsWidth = vue.unref(leftTableWidth);
      const _fixedTableHeight = vue.unref(fixedTableHeight);
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
        onScroll: onVerticalScroll
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
        onScroll: onVerticalScroll
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
        onRowHeightChange
      };
      const tableCellProps = {
        canEditTable: props.canEditTable,
        cellProps,
        editable: props.editable,
        expandColumnKey,
        indentSize,
        iconSize,
        onRowAdd,
        onRowDelete,
        rowKey,
        expandedRowKeys: vue.unref(expandedRowKeys),
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
        onColumnSorted
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
      const rootKls = [props.class, ns.b(), ns.e("root"), ns.is("dynamic", vue.unref(isDynamic))];
      const footerProps = {
        class: ns.e("footer"),
        style: vue.unref(footerHeight),
        total: props.total,
        updateTime: props.updateTime
      };
      const showAddRow = props.canEditTable && props.editable;
      const addRowData = {
        [rowKey]: _private.rowAddKey,
        [_private.rowAddSign]: true
      };
      const addRowHeaderProps = {
        fixedHeaderData: [addRowData],
        headerData: _data,
        headerHeight: [],
        rowHeight,
        height: vue.unref(addRowHeight)
      };
      const addRowWrapperStyle = {
        bottom: `${props.footerHeight}px`
      };
      return vue.createVNode("div", {
        "class": rootKls,
        "style": vue.unref(rootStyle)
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
        "class": ns.e("add-row-main-inner"),
        "rowWidth": width,
        "width": width
      }), {
        fixed: tableSlots.row
      })]), leftColumnsWidth > 0 && vue.createVNode("div", {
        "class": ns.e("add-row-left"),
        "style": addRowWrapperStyle
      }, [vue.createVNode(header["default"], vue.mergeProps(addRowHeaderProps, tableHeaderProps, {
        "columns": vue.unref(fixedColumnsOnLeft),
        "class": ns.e("add-row-left-inner"),
        "rowWidth": leftColumnsWidth,
        "width": leftColumnsWidth
      }), {
        fixed: tableSlots.row
      })]), rightColumnsWidth > 0 && vue.createVNode("div", {
        "class": ns.e("add-row-right"),
        "style": addRowWrapperStyle
      }, [vue.createVNode(header["default"], vue.mergeProps(addRowHeaderProps, tableHeaderProps, {
        "columns": vue.unref(fixedColumnsOnRight),
        "class": ns.e("add-row-right-inner"),
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
      })]);
    };
  }
});
var TableV2$1 = TableV2;

exports["default"] = TableV2$1;
//# sourceMappingURL=table-v2.js.map
