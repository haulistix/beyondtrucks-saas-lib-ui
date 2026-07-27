function useOption(props, { emit }) {
  return {
    hoverItem: () => {
      emit("hover", props.disabled ? -1 : props.index);
    },
    selectOptionClick: () => {
      if (!props.disabled) {
        emit("select", props.item, props.index);
      }
    }
  };
}

export { useOption };
//# sourceMappingURL=useOption.mjs.map
