'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var inputSelect$1 = require('./src/input-select.js');
var inputSelect = require('./src/input-select2.js');
var install = require('../../utils/vue/install.js');

const ElInputSelect = install.withInstall(inputSelect$1["default"]);

exports.inputSelectControlTypes = inputSelect.inputSelectControlTypes;
exports.inputSelectEmits = inputSelect.inputSelectEmits;
exports.inputSelectProps = inputSelect.inputSelectProps;
exports.ElInputSelect = ElInputSelect;
exports["default"] = ElInputSelect;
//# sourceMappingURL=index.js.map
