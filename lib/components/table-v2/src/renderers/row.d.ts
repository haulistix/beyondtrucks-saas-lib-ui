import type { ComponentInternalInstance, FunctionalComponent, UnwrapNestedRefs } from 'vue';
import type { UseNamespaceReturn } from 'element-plus/es/hooks';
import type { RowAddHandler } from '../row';
import type { UseTableReturn } from '../use-table';
import type { TableV2Props } from '../table';
import type { TableGridRowSlotParams } from '../table-grid';
type RowRendererProps = TableGridRowSlotParams & Pick<TableV2Props, 'expandColumnKey' | 'estimatedRowHeight' | 'rowProps' | 'rowClass' | 'rowKey' | 'rowEventHandlers'> & UnwrapNestedRefs<Pick<UseTableReturn, 'depthMap' | 'expandedRowKeys' | 'hasFixedColumns' | 'onRowHovered' | 'onRowExpanded' | 'columnsStyles'>> & {
    onRowAdd?: RowAddHandler;
    ns: UseNamespaceReturn;
    tableInstance?: ComponentInternalInstance;
};
declare const RowRenderer: FunctionalComponent<RowRendererProps>;
export default RowRenderer;
