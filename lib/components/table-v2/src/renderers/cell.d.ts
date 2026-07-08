import type { FunctionalComponent, UnwrapNestedRefs } from 'vue';
import type { TableV2RowCellRenderParam } from '../components';
import type { UseNamespaceReturn } from 'element-plus/es/hooks';
import type { RowAddHandler, RowDeleteHandler } from '../row';
import type { UseTableReturn } from '../use-table';
import type { TableV2Props } from '../table';
type CellRendererProps = TableV2RowCellRenderParam & Pick<TableV2Props, 'canEditTable' | 'cellProps' | 'editable' | 'expandColumnKey' | 'indentSize' | 'iconSize' | 'rowKey'> & UnwrapNestedRefs<Pick<UseTableReturn, 'expandedRowKeys'>> & {
    onRowAdd?: RowAddHandler;
    onRowDelete?: RowDeleteHandler;
    ns: UseNamespaceReturn;
};
declare const CellRenderer: FunctionalComponent<CellRendererProps>;
export default CellRenderer;
