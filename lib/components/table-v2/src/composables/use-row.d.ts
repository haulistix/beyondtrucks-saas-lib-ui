import type { Ref, ShallowRef } from 'vue';
import type { TableV2Props } from '../table';
import type { RowExpandParams, RowHeightChangedParams, RowHoverParams } from '../row';
import type { FixedDirection, KeyType } from '../types';
import type { onRowRenderedParams } from '../grid';
import type { TableGridInstance } from '../table-grid';
type Heights = Record<KeyType, number>;
type GridInstanceRef = Ref<TableGridInstance | undefined>;
type UseRowProps = {
    mainTableRef: GridInstanceRef;
    leftTableRef: GridInstanceRef;
    rightTableRef: GridInstanceRef;
    isScrolling: ShallowRef<boolean>;
};
export declare const useRow: (props: TableV2Props, { mainTableRef, leftTableRef, rightTableRef, isScrolling }: UseRowProps) => {
    expandedRowKeys: Ref<KeyType[]>;
    hoveredRowIndex: ShallowRef<number | undefined>;
    lastRenderedRowIndex: Ref<number>;
    isDynamic: import("vue").ComputedRef<boolean>;
    isResetting: ShallowRef<boolean>;
    rowHeights: Ref<Heights>;
    resetAfterIndex: (index: number, forceUpdate?: boolean) => void;
    onRowExpanded: ({ expanded, rowData, rowIndex, rowKey, }: RowExpandParams) => void;
    onRowHovered: ({ hovered, rowIndex }: RowHoverParams) => void;
    onRowsRendered: (params: onRowRenderedParams) => void;
    onRowHeightChange: ({ rowKey, height, rowIndex }: RowHeightChangedParams, fixedDir: FixedDirection) => void;
};
export type UseRowReturn = ReturnType<typeof useRow>;
export {};
