import { defineComponent, provide, computed, unref, createVNode, isVNode, Fragment, mergeProps } from 'vue';
import { useTable } from './use-table.mjs';
import { rowAddKey, rowAddSign } from './private.mjs';
import { TableV2InjectionKey, TABLE_V2_GRID_INJECTION_KEY } from './tokens.mjs';
import { tableV2Props, tableV2Emits } from './table.mjs';
import MainTable from './renderers/main-table.mjs';
import LeftTable from './renderers/left-table.mjs';
import RightTable from './renderers/right-table.mjs';
import Row from './renderers/row.mjs';
import Cell from './renderers/cell.mjs';
import HeaderRenderer from './renderers/header.mjs';
import HeaderCell from './renderers/header-cell.mjs';
import Footer from './renderers/footer.mjs';
import FooterDefault from './renderers/footerDefault.mjs';
import Empty from './renderers/empty.mjs';
import Overlay from './renderers/overlay.mjs';
import Header from './components/header.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const COMPONENT_NAME = "ElTableV2";
const TableV2 = defineComponent({
  name: COMPONENT_NAME,
  props: tableV2Props,
  emits: tableV2Emits,
  setup(props, {
    slots,
    expose,
    emit
  }) {
    const ns = useNamespace("table-v2");
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
    } = useTable(props);
    expose({
      scrollTo,
      scrollToLeft,
      scrollToTop,
      scrollToRow
    });
    provide(TableV2InjectionKey, {
      ns,
      isResetting,
      isScrolling
    });
    provide(TABLE_V2_GRID_INJECTION_KEY, computed(() => unref(scrollPos).scrollLeft));
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
      const _data = unref(data);
      const mainTableProps = {
        cache,
        class: ns.e("main"),
        columns: unref(mainColumns),
        data: _data,
        fixedData,
        estimatedRowHeight,
        bodyWidth: unref(bodyWidth),
        headerHeight,
        headerWidth: unref(bodyWidth),
        height: unref(mainTableHeight),
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
      const leftColumnsWidth = unref(leftTableWidth);
      const _fixedTableHeight = unref(fixedTableHeight);
      const leftTableProps = {
        cache,
        class: ns.e("left"),
        columns: unref(fixedColumnsOnLeft),
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
      const rightColumnsWidth = unref(rightTableWidth);
      const rightTableProps = {
        cache,
        class: ns.e("right"),
        columns: unref(fixedColumnsOnRight),
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
      const _columnsStyles = unref(columnsStyles);
      const tableRowProps = {
        ns,
        depthMap: unref(depthMap),
        columnsStyles: _columnsStyles,
        expandColumnKey,
        expandedRowKeys: unref(expandedRowKeys),
        estimatedRowHeight,
        hasFixedColumns: unref(hasFixedColumns),
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
        expandedRowKeys: unref(expandedRowKeys),
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
        row: (props2) => createVNode(Row, mergeProps(props2, tableRowProps), {
          row: slots.row,
          cell: (props3) => {
            let _slot;
            return slots.cell ? createVNode(Cell, mergeProps(props3, tableCellProps, {
              "style": _columnsStyles[props3.column.key]
            }), _isSlot(_slot = slots.cell(props3)) ? _slot : {
              default: () => [_slot]
            }) : createVNode(Cell, mergeProps(props3, tableCellProps, {
              "style": _columnsStyles[props3.column.key]
            }), null);
          }
        }),
        header: (props2) => createVNode(HeaderRenderer, mergeProps(props2, tableHeaderProps), {
          header: slots.header,
          cell: (props3) => {
            let _slot2;
            return slots["header-cell"] ? createVNode(HeaderCell, mergeProps(props3, tableHeaderCellProps, {
              "style": _columnsStyles[props3.column.key]
            }), _isSlot(_slot2 = slots["header-cell"](props3)) ? _slot2 : {
              default: () => [_slot2]
            }) : createVNode(HeaderCell, mergeProps(props3, tableHeaderCellProps, {
              "style": _columnsStyles[props3.column.key]
            }), null);
          }
        })
      };
      const rootKls = [props.class, ns.b(), ns.e("root"), ns.is("dynamic", unref(isDynamic))];
      const footerProps = {
        class: ns.e("footer"),
        style: unref(footerHeight),
        total: props.total,
        updateTime: props.updateTime
      };
      const showAddRow = props.canEditTable && props.editable;
      const addRowData = {
        [rowKey]: rowAddKey,
        [rowAddSign]: true
      };
      const addRowHeaderProps = {
        fixedHeaderData: [addRowData],
        headerData: _data,
        headerHeight: [],
        rowHeight,
        height: unref(addRowHeight)
      };
      const addRowWrapperStyle = {
        bottom: `${props.footerHeight}px`
      };
      return createVNode("div", {
        "class": rootKls,
        "style": unref(rootStyle)
      }, [createVNode(MainTable, mainTableProps, _isSlot(tableSlots) ? tableSlots : {
        default: () => [tableSlots]
      }), createVNode(LeftTable, leftTableProps, _isSlot(tableSlots) ? tableSlots : {
        default: () => [tableSlots]
      }), createVNode(RightTable, rightTableProps, _isSlot(tableSlots) ? tableSlots : {
        default: () => [tableSlots]
      }), showAddRow && createVNode(Fragment, null, [createVNode("div", {
        "class": ns.e("add-row-main"),
        "style": addRowWrapperStyle
      }, [createVNode(Header, mergeProps(addRowHeaderProps, tableHeaderProps, {
        "columns": unref(mainColumns),
        "class": ns.e("add-row-main-inner"),
        "rowWidth": width,
        "width": width
      }), {
        fixed: tableSlots.row
      })]), leftColumnsWidth > 0 && createVNode("div", {
        "class": ns.e("add-row-left"),
        "style": addRowWrapperStyle
      }, [createVNode(Header, mergeProps(addRowHeaderProps, tableHeaderProps, {
        "columns": unref(fixedColumnsOnLeft),
        "class": ns.e("add-row-left-inner"),
        "rowWidth": leftColumnsWidth,
        "width": leftColumnsWidth
      }), {
        fixed: tableSlots.row
      })]), rightColumnsWidth > 0 && createVNode("div", {
        "class": ns.e("add-row-right"),
        "style": addRowWrapperStyle
      }, [createVNode(Header, mergeProps(addRowHeaderProps, tableHeaderProps, {
        "columns": unref(fixedColumnsOnRight),
        "class": ns.e("add-row-right-inner"),
        "rowWidth": rightColumnsWidth,
        "width": rightColumnsWidth
      }), {
        fixed: tableSlots.row
      })])]), slots.footer ? createVNode(Footer, footerProps, {
        default: slots.footer
      }) : props.isFooterDefault ? createVNode(FooterDefault, footerProps, {
        default: slots.footer
      }) : null, unref(showEmpty) && createVNode(Empty, {
        "class": ns.e("empty"),
        "style": unref(emptyStyle)
      }, {
        default: slots.empty
      }), slots.overlay && createVNode(Overlay, {
        "class": ns.e("overlay")
      }, {
        default: slots.overlay
      })]);
    };
  }
});
var TableV2$1 = TableV2;

export { TableV2$1 as default };
//# sourceMappingURL=table-v2.mjs.map
