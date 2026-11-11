'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('../../../utils/vue/props/runtime.js');

const dividerProps = runtime.buildProps({
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
    type: runtime.definePropType(String),
    default: "solid"
  },
  margin: {
    type: runtime.definePropType(String),
    default: "8px 0"
  }
});

exports.dividerProps = dividerProps;
//# sourceMappingURL=divider2.js.map
