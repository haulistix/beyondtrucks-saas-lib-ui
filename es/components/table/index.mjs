import Table from './src/table.mjs';
import ElTableColumn$1 from './src/table-column/index.mjs';
import TableEditableCell from './src/editable-cell.mjs';
import TableEditableRowActions from './src/editable-row-actions.mjs';
import { withInstall, withNoopInstall } from '../../utils/vue/install.mjs';

const ElTable = withInstall(Table, {
  TableColumn: ElTableColumn$1,
  TableEditableCell,
  TableEditableRowActions
});
const ElTableColumn = withNoopInstall(ElTableColumn$1);
const ElTableEditableCell = withNoopInstall(TableEditableCell);
const ElTableEditableRowActions = withNoopInstall(TableEditableRowActions);

export { ElTable, ElTableColumn, ElTableEditableCell, ElTableEditableRowActions, ElTable as default };
//# sourceMappingURL=index.mjs.map
