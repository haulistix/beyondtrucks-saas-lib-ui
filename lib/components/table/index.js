'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var table = require('./src/table.js');
var index = require('./src/table-column/index.js');
var editableCell = require('./src/editable-cell.js');
var editableRowActions = require('./src/editable-row-actions.js');
var install = require('../../utils/vue/install.js');

const ElTable = install.withInstall(table["default"], {
  TableColumn: index["default"],
  TableEditableCell: editableCell["default"],
  TableEditableRowActions: editableRowActions["default"]
});
const ElTableColumn = install.withNoopInstall(index["default"]);
const ElTableEditableCell = install.withNoopInstall(editableCell["default"]);
const ElTableEditableRowActions = install.withNoopInstall(editableRowActions["default"]);

exports.ElTable = ElTable;
exports.ElTableColumn = ElTableColumn;
exports.ElTableEditableCell = ElTableEditableCell;
exports.ElTableEditableRowActions = ElTableEditableRowActions;
exports["default"] = ElTable;
//# sourceMappingURL=index.js.map
