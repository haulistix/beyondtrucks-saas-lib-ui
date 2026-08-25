import type { FunctionalComponent, UnwrapNestedRefs, VNode } from 'vue';
import type { TableV2RowCellRenderParam } from '../components';
import type { UseNamespaceReturn } from 'element-plus/es/hooks';
import type { RowAddHandler, RowDeleteHandler } from '../row';
import type { UseTableReturn } from '../use-table';
import type { GhostRowAddParams, TableV2Props } from '../table';
import type { TableV2RowActionSlotParams } from '../types';
type CellRendererProps = TableV2RowCellRenderParam & Pick<TableV2Props, 'canEditTable' | 'cellProps' | 'editable' | 'editTable' | 'expandColumnKey' | 'ghostTable' | 'indentSize' | 'iconSize' | 'rowKey'> & UnwrapNestedRefs<Pick<UseTableReturn, 'expandedRowKeys' | 'visibleColumns'>> & {
    onRowAdd?: RowAddHandler;
    onAddGhostRow?: (params: GhostRowAddParams<any>) => void;
    onRowDelete?: RowDeleteHandler;
    rowActionRenderer?: (props: TableV2RowActionSlotParams) => VNode[];
    ns: UseNamespaceReturn;
};
declare const CellRenderer: FunctionalComponent<CellRendererProps>;
export default CellRenderer;
