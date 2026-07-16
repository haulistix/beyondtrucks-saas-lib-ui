import type { FunctionalComponent, UnwrapNestedRefs } from 'vue';
import type { UseNamespaceReturn } from 'element-plus/es/hooks';
import type { TableV2HeaderRowCellRendererParams } from '../components';
import type { UseTableReturn } from '../use-table';
import type { ColumnInsertParams, TableV2Props } from '../table';
type ColumnTriggerState = Omit<ColumnInsertParams<any>, 'event'> & {
    left: number;
};
export type HeaderCellRendererProps = TableV2HeaderRowCellRendererParams & UnwrapNestedRefs<Pick<UseTableReturn, 'onColumnSorted' | 'updateColumnWidth' | 'visibleColumns'>> & Pick<TableV2Props, 'sortBy' | 'sortState' | 'headerCellProps' | 'canEditTable' | 'editable' | 'editTable' | 'ghostTable' | 'showAddColumnTrigger' | 'addColumnButton'> & {
    onAddColumnTriggerChange?: (payload: ColumnTriggerState | null) => void;
    onTailAddColumn?: (payload: ColumnInsertParams<any>) => void;
    onHeaderDragend?: (newWidth: number, oldWidth: number, column: TableV2HeaderRowCellRendererParams['column'], event: MouseEvent) => void;
    ns: UseNamespaceReturn;
};
declare const HeaderCellRenderer: FunctionalComponent<HeaderCellRendererProps>;
export default HeaderCellRenderer;
export type HeaderCellSlotProps = HeaderCellRendererProps & {
    class: string;
};
