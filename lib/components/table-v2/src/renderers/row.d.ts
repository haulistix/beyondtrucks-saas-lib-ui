import type { ComponentInternalInstance, FunctionalComponent, UnwrapNestedRefs } from 'vue';
import type { UseNamespaceReturn } from 'element-plus/es/hooks';
import type { RowAddHandler } from '../row';
import type { UseTableReturn } from '../use-table';
import type { RowInsertParams, TableV2Props } from '../table';
import type { TableGridRowSlotParams } from '../table-grid';
type RowTriggerState = Omit<RowInsertParams<any>, 'event'> & {
    top: number;
    placement: 'above' | 'below';
};
type RowRendererProps = TableGridRowSlotParams & Pick<TableV2Props, 'expandColumnKey' | 'estimatedRowHeight' | 'canEditTable' | 'editable' | 'editTable' | 'ghostTable' | 'rowProps' | 'rowClass' | 'rowKey' | 'rowEventHandlers' | 'showAddRowTrigger'> & UnwrapNestedRefs<Pick<UseTableReturn, 'depthMap' | 'expandedRowKeys' | 'hasFixedColumns' | 'onRowHovered' | 'onRowExpanded' | 'columnsStyles'>> & {
    onRowAdd?: RowAddHandler;
    onAddRowTriggerChange?: (payload: RowTriggerState | null) => void;
    ns: UseNamespaceReturn;
    tableInstance?: ComponentInternalInstance;
};
declare const RowRenderer: FunctionalComponent<RowRendererProps>;
export default RowRenderer;
