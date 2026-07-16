'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var columnWidth = require('../column-width.js');
var util = require('../util.js');
var shared = require('@vue/shared');

function getAllAliases(props, aliases) {
  return props.reduce((prev, cur) => {
    prev[cur] = cur;
    return prev;
  }, aliases);
}
function useWatcher(owner, props_) {
  const instance = vue.getCurrentInstance();
  const registerComplexWatchers = () => {
    const props = ["fixed"];
    const aliases = {
      realWidth: "width",
      realMinWidth: "minWidth"
    };
    const allAliases = getAllAliases(props, aliases);
    Object.keys(allAliases).forEach((key) => {
      const columnKey = aliases[key];
      if (shared.hasOwn(props_, columnKey)) {
        vue.watch(() => props_[columnKey], (newVal) => {
          var _a;
          let value = newVal;
          if (columnKey === "width" && key === "realWidth") {
            value = util.parseWidth(newVal);
          }
          if (columnKey === "minWidth" && key === "realMinWidth") {
            value = util.parseMinWidth(newVal);
          }
          const autoWidth = !util.parseWidth(props_.width) && !util.parseMinWidth((_a = props_.minWidth) != null ? _a : "");
          instance.columnConfig.value[columnKey] = value;
          instance.columnConfig.value[key] = value;
          instance.columnConfig.value.autoWidth = autoWidth;
          if (autoWidth) {
            const width = columnWidth.getAutoColumnWidth(instance.columnConfig.value.label);
            instance.columnConfig.value.minWidth = width;
          }
          const updateColumns = columnKey === "fixed";
          owner.value.store.scheduleLayout(updateColumns);
        });
      }
    });
  };
  const registerNormalWatchers = () => {
    const props = [
      "label",
      "filters",
      "filterMultiple",
      "filteredValue",
      "sortable",
      "index",
      "formatter",
      "className",
      "labelClassName",
      "diagonalHeader",
      "required",
      "allowInsertBeforeFirstColumn",
      "filterClassName",
      "showOverflowTooltip",
      "tooltipFormatter",
      "resizable"
    ];
    const parentProps = ["showOverflowTooltip"];
    const aliases = {
      property: "prop",
      align: "realAlign",
      headerAlign: "realHeaderAlign"
    };
    const allAliases = getAllAliases(props, aliases);
    Object.keys(allAliases).forEach((key) => {
      const columnKey = aliases[key];
      if (shared.hasOwn(props_, columnKey)) {
        vue.watch(() => props_[columnKey], (newVal) => {
          instance.columnConfig.value[key] = newVal;
          if (key === "label" && instance.columnConfig.value.autoWidth) {
            const width = columnWidth.getAutoColumnWidth(newVal);
            instance.columnConfig.value.minWidth = width;
            owner.value.store.scheduleLayout();
          }
        });
      }
    });
    parentProps.forEach((key) => {
      if (shared.hasOwn(owner.value.props, key)) {
        vue.watch(() => owner.value.props[key], (newVal) => {
          instance.columnConfig.value[key] = newVal;
        });
      }
    });
  };
  return {
    registerComplexWatchers,
    registerNormalWatchers
  };
}

exports["default"] = useWatcher;
//# sourceMappingURL=watcher-helper.js.map
