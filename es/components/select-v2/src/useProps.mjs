import { computed } from 'vue';
import { get } from 'lodash-unified';

const defaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled",
  options: "options",
  tip: "tip"
};
function useProps(props) {
  const aliasProps = computed(() => ({ ...defaultProps, ...props.props }));
  const getLabel = (option) => get(option, aliasProps.value.label);
  const getValue = (option) => get(option, aliasProps.value.value);
  const getDisabled = (option) => get(option, aliasProps.value.disabled);
  const getOptions = (option) => get(option, aliasProps.value.options);
  const getTip = (option) => get(option, aliasProps.value.tip);
  return {
    aliasProps,
    getLabel,
    getValue,
    getDisabled,
    getOptions,
    getTip
  };
}

export { defaultProps, useProps };
//# sourceMappingURL=useProps.mjs.map
