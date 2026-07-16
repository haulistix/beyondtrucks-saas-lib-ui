import { getCurrentInstance, watch } from 'vue';
import { getAutoColumnWidth } from '../column-width.mjs';
import { parseWidth, parseMinWidth } from '../util.mjs';
import { hasOwn } from '@vue/shared';

function getAllAliases(props, aliases) {
  return props.reduce((prev, cur) => {
    prev[cur] = cur;
    return prev;
  }, aliases);
}
function useWatcher(owner, props_) {
  const instance = getCurrentInstance();
  const registerComplexWatchers = () => {
    const props = ["fixed"];
    const aliases = {
      realWidth: "width",
      realMinWidth: "minWidth"
    };
    const allAliases = getAllAliases(props, aliases);
    Object.keys(allAliases).forEach((key) => {
      const columnKey = aliases[key];
      if (hasOwn(props_, columnKey)) {
        watch(() => props_[columnKey], (newVal) => {
          var _a;
          let value = newVal;
          if (columnKey === "width" && key === "realWidth") {
            value = parseWidth(newVal);
          }
          if (columnKey === "minWidth" && key === "realMinWidth") {
            value = parseMinWidth(newVal);
          }
          const autoWidth = !parseWidth(props_.width) && !parseMinWidth((_a = props_.minWidth) != null ? _a : "");
          instance.columnConfig.value[columnKey] = value;
          instance.columnConfig.value[key] = value;
          instance.columnConfig.value.autoWidth = autoWidth;
          if (autoWidth) {
            const width = getAutoColumnWidth(instance.columnConfig.value.label);
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
      if (hasOwn(props_, columnKey)) {
        watch(() => props_[columnKey], (newVal) => {
          instance.columnConfig.value[key] = newVal;
          if (key === "label" && instance.columnConfig.value.autoWidth) {
            const width = getAutoColumnWidth(newVal);
            instance.columnConfig.value.minWidth = width;
            owner.value.store.scheduleLayout();
          }
        });
      }
    });
    parentProps.forEach((key) => {
      if (hasOwn(owner.value.props, key)) {
        watch(() => owner.value.props[key], (newVal) => {
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

export { useWatcher as default };
//# sourceMappingURL=watcher-helper.mjs.map
