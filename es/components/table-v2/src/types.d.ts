import type { CSSProperties, FunctionalComponent, RendererElement, RendererNode, VNode } from 'vue';
import type { ColumnAlignment } from 'element-plus/es/constants';
import type { ElTooltipProps } from 'element-plus/es/components/tooltip';
import type { FixedDir, SortOrder } from './constants';
export type Alignment = ColumnAlignment;
export type FixedDirection = FixedDir;
export type KeyType = string | number | symbol;
export type TableV2OverflowTooltipOptions = Partial<Pick<ElTooltipProps, 'appendTo' | 'effect' | 'enterable' | 'hideAfter' | 'offset' | 'placement' | 'popperClass' | 'popperOptions' | 'showAfter' | 'showArrow' | 'transition'>>;
/**
 * Param types
 */
export type CellRendererParams<T> = {
    cellData: T;
} & RowCommonParams & ColumnCommonParams<T>;
export type ColumnCommonParams<T> = {
    columns: Column<T>[];
    column: Column<T>;
    columnIndex: number;
};
export type HeaderCellRendererParams<T> = {
    headerIndex: number;
} & ColumnCommonParams<T>;
export type RowCommonParams = {
    rowData: any;
    rowIndex: number;
};
export type TableV2RowActionSlotParams<T = any> = RowCommonParams & ColumnCommonParams<T> & {
    rowKey: KeyType;
};
export type ClassNameGetterParams<T> = {
    cellData: T;
} & RowCommonParams & ColumnCommonParams<T>;
export type DataGetterParams<T> = {
    columns: Column<T>[];
    column: Column<T>;
    columnIndex: number;
} & RowCommonParams;
export type DataGetter<T> = (params: DataGetterParams<T>) => T;
export type ClassNameGetter<T> = (params: ClassNameGetterParams<T>) => string;
export type HeaderClassGetter<T> = (params: ColumnCommonParams<T> & {
    headerIndex: number;
}) => string;
/**
 * Renderer/Getter types
 */
export type CellRenderer<T> = (params: CellRendererParams<T>) => VNode;
export type EditCellRenderer<T> = (params: CellRendererParams<T>) => VNode;
export type HeaderCellRenderer<T> = (params: HeaderCellRendererParams<T>) => VNode;
export type DiagonalHeaderConfig = {
    from: string;
    to: string;
};
export type ColumnWidth = number | string;
export type Column<T = any> = {
    /**
     * Attributes
     */
    align?: Alignment;
    class?: string | ClassNameGetter<T>;
    key?: KeyType;
    dataKey?: KeyType;
    fixed?: true | FixedDirection;
    flexGrow?: CSSProperties['flexGrow'];
    flexShrink?: CSSProperties['flexShrink'];
    title?: string;
    hidden?: boolean;
    headerClass?: HeaderClassGetter<T> | string;
    diagonalHeader?: DiagonalHeaderConfig;
    allowInsertBeforeFirstColumn?: boolean;
    maxWidth?: number;
    minWidth?: number;
    required?: boolean;
    resizable?: boolean;
    showOverflowTooltip?: boolean | TableV2OverflowTooltipOptions;
    style?: CSSProperties;
    sortable?: boolean;
    width?: ColumnWidth;
    /**
     * Renderers
     */
    cellRenderer?: CellRenderer<T>;
    editCellRenderer?: EditCellRenderer<T>;
    headerCellRenderer?: HeaderCellRenderer<T>;
    /**
     * Extendable sections
     */
    [key: string]: any;
};
export type Columns<T> = Column<T>[];
export type AnyColumns = Columns<any>;
export type SortBy = {
    key: KeyType;
    order: SortOrder;
};
export type SortState = {
    [key: KeyType]: SortOrder;
};
export type CustomizedCellsType = VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>[];
export type DefaultCellsType = VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>[][];
export type ColumnCellsType = DefaultCellsType | CustomizedCellsType;
export type TableV2CustomizedHeaderSlotParam<T = any> = {
    cells: VNode[];
    columns: Columns<T>;
    headerIndex: number;
};
export type SimpleFunctionalComponentProps<T extends object> = {
    class?: JSX.IntrinsicAttributes['class'];
    style?: CSSProperties;
} & T;
export type SimpleFunctionalComponent<E extends object = {
    [key: string]: any;
}> = FunctionalComponent<SimpleFunctionalComponentProps<E>>;
