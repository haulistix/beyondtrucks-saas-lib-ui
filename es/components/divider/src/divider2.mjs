import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const dividerProps = buildProps({
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  contentPosition: {
    type: String,
    values: ["left", "center", "right"],
    default: "center"
  },
  borderStyle: {
    type: definePropType(String),
    default: "solid"
  },
  margin: {
    type: definePropType(String),
    default: "8px 0"
  }
});

export { dividerProps };
//# sourceMappingURL=divider2.mjs.map
