import { computed, unref } from 'vue';
import { sum, enforceUnit } from '../utils.mjs';
import { isNumber } from '../../../../utils/types.mjs';
import { addUnit } from '../../../../utils/dom/style.mjs';

const useStyles = (props, {
  columnsTotalWidth,
  rowsHeight,
  fixedColumnsOnLeft,
  fixedColumnsOnRight,
  effectiveWidth,
  reservedVScrollbarWidth,
  showEmpty
}) => {
  const availableBodyWidth = computed(() => Math.max(unref(effectiveWidth) - unref(reservedVScrollbarWidth), 0));
  const hasHorizontalScrollbar = computed(() => props.fixed && unref(columnsTotalWidth) > unref(availableBodyWidth));
  const effectiveHScrollbarSize = computed(() => hasHorizontalScrollbar.value ? props.hScrollbarSize : 0);
  const addRowHeight = computed(() => props.canEditTable && props.editable || props.ghostTable && props.editTable ? props.rowHeight : 0);
  const shouldUseDefaultFooterHeight = computed(() => props.isFooterDefault && props.footerHeight === 0);
  const effectiveFooterHeight = computed(() => shouldUseDefaultFooterHeight.value ? 44 : props.footerHeight);
  const contentHeight = computed(() => {
    const _fixedRowsHeight = unref(fixedRowsHeight);
    const _rowsHeight = unref(rowsHeight);
    const _headerHeight = unref(headerHeight);
    return _headerHeight + _fixedRowsHeight + _rowsHeight + (unref(showEmpty) ? props.rowHeight : 0) + unref(effectiveHScrollbarSize);
  });
  const bodyWidth = computed(() => {
    const { fixed } = props;
    const ret = unref(availableBodyWidth);
    return fixed ? Math.max(Math.round(unref(columnsTotalWidth)), ret) : ret;
  });
  const mainTableHeight = computed(() => {
    const { height, maxHeight = 0 } = props;
    const footerHeight2 = unref(effectiveFooterHeight);
    const addRowSpace = unref(addRowHeight);
    const availableMaxHeight = Math.max(maxHeight - footerHeight2 - addRowSpace, 0);
    if (maxHeight > 0) {
      return Math.min(unref(contentHeight), availableMaxHeight);
    }
    if (isNumber(height)) {
      return Math.max(height - footerHeight2 - addRowSpace, 0);
    }
    return unref(contentHeight);
  });
  const fixedTableHeight = computed(() => {
    const { maxHeight } = props;
    const tableHeight = unref(mainTableHeight);
    if (isNumber(maxHeight) && maxHeight > 0)
      return tableHeight;
    const totalHeight = unref(rowsHeight) + unref(headerHeight) + unref(fixedRowsHeight);
    return Math.min(tableHeight, totalHeight);
  });
  const mapColumn = (column) => typeof column.width === "number" ? column.width : 0;
  const leftTableWidth = computed(() => sum(unref(fixedColumnsOnLeft).map(mapColumn)));
  const rightTableWidth = computed(() => sum(unref(fixedColumnsOnRight).map(mapColumn)));
  const headerHeight = computed(() => sum(props.headerHeight));
  const fixedRowsHeight = computed(() => {
    var _a;
    return (((_a = props.fixedData) == null ? void 0 : _a.length) || 0) * props.rowHeight;
  });
  const windowHeight = computed(() => {
    return unref(mainTableHeight) - unref(headerHeight) - unref(fixedRowsHeight);
  });
  const rootHeight = computed(() => {
    return unref(mainTableHeight) + unref(effectiveFooterHeight) + unref(addRowHeight);
  });
  const rootStyle = computed(() => {
    const { style = {}, height, maxHeight, width } = props;
    return enforceUnit({
      ...style,
      height: height != null ? height : unref(rootHeight),
      maxHeight: height == null ? addUnit(maxHeight) : void 0,
      width: width != null ? width : "100%"
    });
  });
  const footerHeight = computed(() => enforceUnit({ height: unref(effectiveFooterHeight) }));
  const emptyStyle = computed(() => ({
    top: addUnit(unref(headerHeight)),
    height: addUnit(props.rowHeight),
    width: addUnit(unref(effectiveWidth))
  }));
  return {
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
    headerHeight,
    effectiveWidth,
    rootHeight
  };
};

export { useStyles };
//# sourceMappingURL=use-styles.mjs.map
