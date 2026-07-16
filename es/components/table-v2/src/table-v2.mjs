import { defineComponent, shallowRef, ref, computed, watch, provide, unref, createVNode, isVNode, Fragment, mergeProps, nextTick } from 'vue';
import { useTable } from './use-table.mjs';
import { ghostRowKey, ghostRowFieldKey, ghostRowSign, ghostRowTouchedSign, rowDeleteColumnWidth, rowAddKey, rowAddSign } from './private.mjs';
import { ElButton } from '../../button/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import { ElTooltip } from '../../tooltip/index.mjs';
import { isEmptyRequiredValue, getGhostRowPayload } from './ghost-table.mjs';
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
    } = useTable(props);
    const addColumnTrigger = shallowRef(null);
    const addRowTrigger = ref(null);
    const createGhostRowData = () => {
      var _a;
      return {
        ...(_a = props.ghostRowTemplate) != null ? _a : {},
        [props.rowKey]: "ghost-row",
        [ghostRowKey]: "ghost-row",
        [ghostRowFieldKey]: props.rowKey,
        [ghostRowSign]: true,
        [ghostRowTouchedSign]: false
      };
    };
    const ghostRowDraft = ref(createGhostRowData());
    const isLegacyEditMode = computed(() => props.canEditTable && props.editable);
    const isGhostEditMode = computed(() => props.ghostTable && props.editTable);
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
      stopPendingGhostRowScrollWatch = watch(() => props.data.length, async (length) => {
        if (length <= previousLength)
          return;
        clearPendingGhostRowScrollWatch();
        await nextTick();
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
      return props.data.every((row) => requiredColumns.every((column) => !isEmptyRequiredValue(row == null ? void 0 : row[column.dataKey])));
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
    const effectiveShowAddColumnTrigger = computed(() => (isLegacyEditMode.value || isGhostEditMode.value) && props.showAddColumnTrigger);
    const effectiveShowAddRowTrigger = computed(() => (isLegacyEditMode.value || isGhostEditMode.value) && props.showAddRowTrigger);
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
      if (!enabled)
        clearAddColumnTrigger();
    });
    watch(effectiveShowAddRowTrigger, (enabled) => {
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
    const onAddGhostRow = (params) => {
      scheduleGhostRowScroll();
      emit("add-ghost-row", {
        ...params,
        row: getGhostRowPayload(params.row)
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
        width: unref(effectiveWidth),
        getRowHeight,
        onRowsRendered,
        onScroll: handleTableScroll
      };
      const leftColumnsWidth = unref(leftTableWidth);
      const _fixedTableHeight = unref(fixedTableHeight);
      const mainContentWidth = unref(bodyWidth);
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
        onScroll: handleVerticalTableScroll
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
        onScroll: handleVerticalTableScroll
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
        expandedRowKeys: unref(expandedRowKeys),
        visibleColumns: unref(visibleColumns),
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
        visibleColumns: unref(visibleColumns)
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
      const rootKls = [props.class, ns.b(), ns.e("root"), ns.is("dynamic", unref(isDynamic)), effectiveShowAddColumnTrigger.value && ns.m("with-add-column-trigger"), effectiveShowAddRowTrigger.value && ns.m("with-add-row-trigger"), (isLegacyEditMode.value || isGhostEditMode.value) && ns.m("with-ghost-row")];
      const footerProps = {
        class: ns.e("footer"),
        style: unref(footerHeight),
        total: props.total,
        updateTime: props.updateTime
      };
      const showAddRow = isLegacyEditMode.value && !isGhostEditMode.value;
      const showGhostRow = isGhostEditMode.value;
      const addRowData = {
        [rowKey]: rowAddKey,
        [rowAddSign]: true
      };
      const ghostRowData = unref(ghostRowDraft);
      const addRowHeaderProps = {
        fixedHeaderData: [addRowData],
        headerData: _data,
        headerHeight: [],
        rowHeight,
        height: unref(addRowHeight)
      };
      const ghostRowHeaderProps = {
        fixedHeaderData: [ghostRowData],
        headerData: _data,
        headerHeight: [],
        rowHeight,
        height: unref(addRowHeight)
      };
      const addRowWrapperStyle = {
        bottom: `${unref(effectiveFooterHeight) + unref(effectiveHScrollbarSize)}px`
      };
      const tableRootStyle = {
        ...unref(rootStyle),
        [ns.cssVarName("table-v2-ghost-row-height")]: `${unref(addRowHeight)}px`,
        [ns.cssVarName("table-v2-row-delete-width")]: `${rowDeleteColumnWidth}px`
      };
      return createVNode("div", {
        "ref": containerRef,
        "class": rootKls,
        "style": tableRootStyle,
        "onMouseleave": handleTableMouseLeave
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
        "class": `${ns.e("add-row-main-inner")} ${ns.e("header-wrapper")}`,
        "rowWidth": mainContentWidth,
        "width": unref(effectiveWidth)
      }), {
        fixed: tableSlots.row
      })]), leftColumnsWidth > 0 && createVNode("div", {
        "class": ns.e("add-row-left"),
        "style": addRowWrapperStyle
      }, [createVNode(Header, mergeProps(addRowHeaderProps, tableHeaderProps, {
        "columns": unref(fixedColumnsOnLeft),
        "class": `${ns.e("add-row-left-inner")} ${ns.e("header-wrapper")}`,
        "rowWidth": leftColumnsWidth,
        "width": leftColumnsWidth
      }), {
        fixed: tableSlots.row
      })]), rightColumnsWidth > 0 && createVNode("div", {
        "class": ns.e("add-row-right"),
        "style": addRowWrapperStyle
      }, [createVNode(Header, mergeProps(addRowHeaderProps, tableHeaderProps, {
        "columns": unref(fixedColumnsOnRight),
        "class": `${ns.e("add-row-right-inner")} ${ns.e("header-wrapper")}`,
        "rowWidth": rightColumnsWidth,
        "width": rightColumnsWidth
      }), {
        fixed: tableSlots.row
      })])]), showGhostRow && createVNode(Fragment, null, [createVNode("div", {
        "class": ns.e("add-row-main"),
        "style": addRowWrapperStyle
      }, [createVNode(Header, mergeProps(ghostRowHeaderProps, tableHeaderProps, {
        "columns": unref(mainColumns),
        "class": `${ns.e("add-row-main-inner")} ${ns.e("header-wrapper")}`,
        "rowWidth": mainContentWidth,
        "width": unref(effectiveWidth)
      }), {
        fixed: tableSlots.row
      })]), leftColumnsWidth > 0 && createVNode("div", {
        "class": ns.e("add-row-left"),
        "style": addRowWrapperStyle
      }, [createVNode(Header, mergeProps(ghostRowHeaderProps, tableHeaderProps, {
        "columns": unref(fixedColumnsOnLeft),
        "class": `${ns.e("add-row-left-inner")} ${ns.e("header-wrapper")}`,
        "rowWidth": leftColumnsWidth,
        "width": leftColumnsWidth
      }), {
        fixed: tableSlots.row
      })]), rightColumnsWidth > 0 && createVNode("div", {
        "class": ns.e("add-row-right"),
        "style": addRowWrapperStyle
      }, [createVNode(Header, mergeProps(ghostRowHeaderProps, tableHeaderProps, {
        "columns": unref(fixedColumnsOnRight),
        "class": `${ns.e("add-row-right-inner")} ${ns.e("header-wrapper")}`,
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
      }), effectiveShowAddColumnTrigger.value && addColumnTrigger.value && createVNode("div", {
        "class": ns.e("add-column-trigger"),
        "style": unref(addColumnTriggerStyle)
      }, [createVNode(ElTooltip, {
        "content": "Add Column",
        "placement": "top"
      }, {
        default: () => [createVNode(ElButton, {
          "class": [ns.e("add-column-trigger-button"), "icon-button"],
          "onClick": handleAddColumnClick
        }, {
          default: () => [createVNode(ElIcon, {
            "color": "#2A3F4D",
            "size": "12px"
          }, {
            default: () => [createVNode("svg", {
              "xmlns": "http://www.w3.org/2000/svg",
              "width": "12",
              "height": "12",
              "viewBox": "0 0 12 12"
            }, [createVNode("g", {
              "clip-path": "url(#clip0_35669_24470)"
            }, [createVNode("path", {
              "d": "M12 5.25H6.75V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25Z"
            }, null)]), createVNode("defs", null, [createVNode("clipPath", {
              "id": "clip0_35669_24470"
            }, [createVNode("rect", {
              "width": "12",
              "height": "12",
              "fill": "white"
            }, null)])])])]
          })]
        })]
      })]), effectiveShowAddRowTrigger.value && addRowTrigger.value && createVNode("div", {
        "class": ns.e("add-row-trigger"),
        "style": unref(addRowTriggerStyle)
      }, [createVNode(ElTooltip, {
        "content": "Add Row",
        "placement": "top"
      }, {
        default: () => [createVNode(ElButton, {
          "class": [ns.e("add-row-trigger-button"), "icon-button"],
          "aria-label": "Add Row",
          "onClick": handleAddRowClick
        }, {
          default: () => [createVNode(ElIcon, {
            "color": "#2A3F4D",
            "size": "12px"
          }, {
            default: () => [createVNode("svg", {
              "xmlns": "http://www.w3.org/2000/svg",
              "width": "12",
              "height": "12",
              "viewBox": "0 0 12 12"
            }, [createVNode("g", {
              "clip-path": "url(#clip0_35669_24470)"
            }, [createVNode("path", {
              "d": "M12 5.25H6.75V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25Z"
            }, null)]), createVNode("defs", null, [createVNode("clipPath", {
              "id": "clip0_35669_24470"
            }, [createVNode("rect", {
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

export { TableV2$1 as default };
//# sourceMappingURL=table-v2.mjs.map
