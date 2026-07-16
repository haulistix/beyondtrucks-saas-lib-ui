'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
var useColumns = require('./composables/use-columns.js');
var useScrollbar = require('./composables/use-scrollbar.js');
var useRow = require('./composables/use-row.js');
var useData = require('./composables/use-data.js');
var useStyles = require('./composables/use-styles.js');
var index = require('../../../hooks/use-namespace/index.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');

function useTable(props) {
  const mainTableRef = vue.ref();
  const leftTableRef = vue.ref();
  const rightTableRef = vue.ref();
  const containerRef = vue.ref();
  const observedWidth = vue.ref(0);
  const effectiveWidth = vue.computed(() => {
    var _a;
    return (_a = props.width) != null ? _a : observedWidth.value;
  });
  const reservedVScrollbarWidth = vue.computed(() => props.canEditTable && props.editable || props.ghostTable && props.editTable ? props.vScrollbarSize : 0);
  core.useResizeObserver(containerRef, ([entry]) => {
    observedWidth.value = entry.contentRect.width;
  });
  const {
    columns,
    columnsStyles,
    columnsTotalWidth,
    fixedColumnsOnLeft,
    fixedColumnsOnRight,
    hasFixedColumns,
    mainColumns,
    visibleColumns,
    updateColumnWidth,
    onColumnSorted
  } = useColumns.useColumns(props, vue.toRef(props, "columns"), vue.toRef(props, "fixed"), effectiveWidth, reservedVScrollbarWidth);
  const {
    scrollTo,
    scrollToLeft,
    scrollToTop,
    scrollToRow,
    onScroll,
    onVerticalScroll,
    scrollPos
  } = useScrollbar.useScrollbar(props, {
    mainTableRef,
    leftTableRef,
    rightTableRef,
    onMaybeEndReached
  });
  const ns = index.useNamespace("table-v2");
  const instance = vue.getCurrentInstance();
  const isScrolling = vue.shallowRef(false);
  const {
    expandedRowKeys,
    lastRenderedRowIndex,
    isDynamic,
    isResetting,
    rowHeights,
    resetAfterIndex,
    onRowExpanded,
    onRowHeightChange,
    onRowHovered,
    onRowsRendered
  } = useRow.useRow(props, {
    mainTableRef,
    leftTableRef,
    rightTableRef,
    tableInstance: instance,
    ns,
    isScrolling
  });
  const { data, depthMap } = useData.useData(props, {
    expandedRowKeys,
    lastRenderedRowIndex,
    resetAfterIndex
  });
  const showEmpty = vue.computed(() => {
    const noData = vue.unref(data).length === 0;
    return shared.isArray(props.fixedData) ? props.fixedData.length === 0 && noData : noData;
  });
  const rowsHeight = vue.computed(() => {
    const { estimatedRowHeight, rowHeight } = props;
    const _data = vue.unref(data);
    if (types.isNumber(estimatedRowHeight)) {
      return Object.values(vue.unref(rowHeights)).reduce((acc, curr) => acc + curr, 0);
    }
    return _data.length * rowHeight;
  });
  const {
    addRowHeight,
    bodyWidth,
    effectiveHScrollbarSize,
    fixedTableHeight,
    mainTableHeight,
    leftTableWidth,
    rightTableWidth,
    windowHeight,
    footerHeight,
    effectiveFooterHeight,
    emptyStyle,
    rootStyle,
    headerHeight
  } = useStyles.useStyles(props, {
    columnsTotalWidth,
    fixedColumnsOnLeft,
    fixedColumnsOnRight,
    rowsHeight,
    showEmpty,
    effectiveWidth,
    reservedVScrollbarWidth
  });
  function getRowHeight(rowIndex) {
    const { estimatedRowHeight, rowHeight, rowKey } = props;
    if (!estimatedRowHeight)
      return rowHeight;
    return vue.unref(rowHeights)[vue.unref(data)[rowIndex][rowKey]] || estimatedRowHeight;
  }
  const isEndReached = vue.ref(false);
  function onMaybeEndReached() {
    const { onEndReached } = props;
    if (!onEndReached)
      return;
    const { scrollTop } = vue.unref(scrollPos);
    const _totalHeight = vue.unref(rowsHeight);
    const clientHeight = vue.unref(windowHeight);
    const remainDistance = _totalHeight - (scrollTop + clientHeight) + vue.unref(effectiveHScrollbarSize);
    if (!isEndReached.value && vue.unref(lastRenderedRowIndex) >= 0 && _totalHeight <= scrollTop + vue.unref(mainTableHeight) - vue.unref(headerHeight)) {
      isEndReached.value = true;
      onEndReached(remainDistance);
    } else {
      isEndReached.value = false;
    }
  }
  vue.watch(() => vue.unref(rowsHeight), () => isEndReached.value = false);
  vue.watch(() => props.expandedRowKeys, (val) => expandedRowKeys.value = val, {
    deep: true
  });
  return {
    columns,
    containerRef,
    mainTableRef,
    leftTableRef,
    rightTableRef,
    isDynamic,
    isResetting,
    isScrolling,
    hasFixedColumns,
    columnsStyles,
    columnsTotalWidth,
    data,
    expandedRowKeys,
    depthMap,
    fixedColumnsOnLeft,
    fixedColumnsOnRight,
    mainColumns,
    visibleColumns,
    addRowHeight,
    bodyWidth,
    emptyStyle,
    effectiveHScrollbarSize,
    rootStyle,
    effectiveWidth,
    footerHeight,
    effectiveFooterHeight,
    mainTableHeight,
    fixedTableHeight,
    leftTableWidth,
    rightTableWidth,
    showEmpty,
    getRowHeight,
    updateColumnWidth,
    onColumnSorted,
    onRowHovered,
    onRowExpanded,
    onRowsRendered,
    onRowHeightChange,
    scrollTo,
    scrollToLeft,
    scrollToTop,
    scrollToRow,
    onScroll,
    onVerticalScroll,
    scrollPos
  };
}

exports.useTable = useTable;
//# sourceMappingURL=use-table.js.map
