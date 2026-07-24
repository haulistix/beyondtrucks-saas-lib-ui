'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('./shared.js');
var props = require('../../../time-picker/src/common/props.js');
var runtime = require('../../../../utils/vue/props/runtime.js');

const datePickerProps = runtime.buildProps({
  ...props.timePickerDefaultProps,
  rangePickType: shared.rangePickTypeProp,
  type: {
    type: runtime.definePropType(String),
    default: "date"
  },
  typeList: {
    type: Array,
    default: () => []
  }
});

exports.datePickerProps = datePickerProps;
//# sourceMappingURL=date-picker.js.map
