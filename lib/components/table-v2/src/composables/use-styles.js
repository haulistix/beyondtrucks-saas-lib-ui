'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var utils = require('../utils.js');
var types = require('../../../../utils/types.js');
var style = require('../../../../utils/dom/style.js');

const useStyles = (props, {
  columnsTotalWidth,
  rowsHeight,
  fixedColumnsOnLeft,
  fixedColumnsOnRight,
  effectiveWidth,
  reservedVScrollbarWidth,
  showEmpty
}) => {
  const availableBodyWidth = vue.computed(() => Math.max(vue.unref(effectiveWidth) - vue.unref(reservedVScrollbarWidth), 0));
  const hasHorizontalScrollbar = vue.computed(() => props.fixed && vue.unref(columnsTotalWidth) > vue.unref(availableBodyWidth));
  const effectiveHScrollbarSize = vue.computed(() => hasHorizontalScrollbar.value ? props.hScrollbarSize : 0);
  const addRowHeight = vue.computed(() => props.canEditTable && props.editable || props.ghostTable && props.editTable ? props.rowHeight : 0);
  const shouldUseDefaultFooterHeight = vue.computed(() => props.isFooterDefault && props.footerHeight === 0);
  const effectiveFooterHeight = vue.computed(() => shouldUseDefaultFooterHeight.value ? 44 : props.footerHeight);
  const contentHeight = vue.computed(() => {
    const _fixedRowsHeight = vue.unref(fixedRowsHeight);
    const _rowsHeight = vue.unref(rowsHeight);
    const _headerHeight = vue.unref(headerHeight);
    return _headerHeight + _fixedRowsHeight + _rowsHeight + (vue.unref(showEmpty) ? props.rowHeight : 0) + vue.unref(effectiveHScrollbarSize);
  });
  const bodyWidth = vue.computed(() => {
    const { fixed } = props;
    const ret = vue.unref(availableBodyWidth);
    return fixed ? Math.max(Math.round(vue.unref(columnsTotalWidth)), ret) : ret;
  });
  const mainTableHeight = vue.computed(() => {
    const { height, maxHeight = 0 } = props;
    const footerHeight2 = vue.unref(effectiveFooterHeight);
    const addRowSpace = vue.unref(addRowHeight);
    const availableMaxHeight = Math.max(maxHeight - footerHeight2 - addRowSpace, 0);
    if (maxHeight > 0) {
      return Math.min(vue.unref(contentHeight), availableMaxHeight);
    }
    if (types.isNumber(height)) {
      return Math.max(height - footerHeight2 - addRowSpace, 0);
    }
    return vue.unref(contentHeight);
  });
  const fixedTableHeight = vue.computed(() => {
    const { maxHeight } = props;
    const tableHeight = vue.unref(mainTableHeight);
    if (types.isNumber(maxHeight) && maxHeight > 0)
      return tableHeight;
    const totalHeight = vue.unref(rowsHeight) + vue.unref(headerHeight) + vue.unref(fixedRowsHeight);
    return Math.min(tableHeight, totalHeight);
  });
  const mapColumn = (column) => typeof column.width === "number" ? column.width : 0;
  const leftTableWidth = vue.computed(() => utils.sum(vue.unref(fixedColumnsOnLeft).map(mapColumn)));
  const rightTableWidth = vue.computed(() => utils.sum(vue.unref(fixedColumnsOnRight).map(mapColumn)));
  const headerHeight = vue.computed(() => utils.sum(props.headerHeight));
  const fixedRowsHeight = vue.computed(() => {
    var _a;
    return (((_a = props.fixedData) == null ? void 0 : _a.length) || 0) * props.rowHeight;
  });
  const windowHeight = vue.computed(() => {
    return vue.unref(mainTableHeight) - vue.unref(headerHeight) - vue.unref(fixedRowsHeight);
  });
  const rootHeight = vue.computed(() => {
    return vue.unref(mainTableHeight) + vue.unref(effectiveFooterHeight) + vue.unref(addRowHeight);
  });
  const rootStyle = vue.computed(() => {
    const { style: style$1 = {}, height, maxHeight, width } = props;
    return utils.enforceUnit({
      ...style$1,
      height: height != null ? height : vue.unref(rootHeight),
      maxHeight: height == null ? style.addUnit(maxHeight) : void 0,
      width: width != null ? width : "100%"
    });
  });
  const footerHeight = vue.computed(() => utils.enforceUnit({ height: vue.unref(effectiveFooterHeight) }));
  const emptyStyle = vue.computed(() => ({
    top: style.addUnit(vue.unref(headerHeight)),
    height: style.addUnit(props.rowHeight),
    width: style.addUnit(vue.unref(effectiveWidth))
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

exports.useStyles = useStyles;
//# sourceMappingURL=use-styles.js.map
