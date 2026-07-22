'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var lodashUnified = require('lodash-unified');

const defaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled",
  options: "options",
  tip: "tip"
};
function useProps(props) {
  const aliasProps = vue.computed(() => ({ ...defaultProps, ...props.props }));
  const getLabel = (option) => lodashUnified.get(option, aliasProps.value.label);
  const getValue = (option) => lodashUnified.get(option, aliasProps.value.value);
  const getDisabled = (option) => lodashUnified.get(option, aliasProps.value.disabled);
  const getOptions = (option) => lodashUnified.get(option, aliasProps.value.options);
  const getTip = (option) => lodashUnified.get(option, aliasProps.value.tip);
  return {
    aliasProps,
    getLabel,
    getValue,
    getDisabled,
    getOptions,
    getTip
  };
}

exports.defaultProps = defaultProps;
exports.useProps = useProps;
//# sourceMappingURL=useProps.js.map
