import type { CSSProperties } from 'vue';
import type { ScrollStrategy } from './composables/use-scrollbar';
import type { KeyType } from './types';
import type { ColumnInsertParams, GhostRowAddParams, RowInsertParams } from './table';
declare const TableV2: import("vue").DefineComponent<{
    readonly cache: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, never, never, 2, false>;
    readonly estimatedRowHeight: {
        readonly default: undefined;
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        readonly __epPropKey: true;
    };
    readonly rowKey: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | ((new (...args: any[]) => string | number | symbol) | (() => KeyType))[], unknown, unknown, "id", boolean>;
    readonly headerClass: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("./table").HeaderClassNameGetter<any>) | (() => string | import("./table").HeaderClassNameGetter<any>) | ((new (...args: any[]) => string | import("./table").HeaderClassNameGetter<any>) | (() => string | import("./table").HeaderClassNameGetter<any>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly headerProps: {
        readonly type: import("vue").PropType<any>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly headerCellProps: {
        readonly type: import("vue").PropType<any>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly headerHeight: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => number | number[]) | ((new (...args: any[]) => number | number[]) | (() => number | number[]))[], unknown, unknown, 44, boolean>;
    readonly footerHeight: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly isFooterDefault: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly editable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly canEditTable: BooleanConstructor;
    readonly ghostTable: BooleanConstructor;
    readonly editTable: BooleanConstructor;
    readonly ghostRowTemplate: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Record<string, any>) | (() => Record<string, any>) | ((new (...args: any[]) => Record<string, any>) | (() => Record<string, any>))[], unknown, unknown, () => {}, boolean>;
    readonly showAddColumnTrigger: BooleanConstructor;
    readonly addColumnButton: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showAddRowTrigger: BooleanConstructor;
    readonly total: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly updateTime: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly rowClass: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("./table").RowClassNameGetter<any>) | (() => string | import("./table").RowClassNameGetter<any>) | ((new (...args: any[]) => string | import("./table").RowClassNameGetter<any>) | (() => string | import("./table").RowClassNameGetter<any>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly rowProps: {
        readonly type: import("vue").PropType<any>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly rowHeight: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 44, boolean>;
    readonly cellProps: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => Record<string, any> | import("./table").ExtraCellPropGetter<any>) | (() => Record<string, any> | import("./table").ExtraCellPropGetter<any>) | ((new (...args: any[]) => Record<string, any> | import("./table").ExtraCellPropGetter<any>) | (() => Record<string, any> | import("./table").ExtraCellPropGetter<any>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly columns: {
        readonly type: import("vue").PropType<import("./common").AnyColumn[]>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly data: {
        readonly type: import("vue").PropType<any[]>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly dataGetter: {
        readonly type: import("vue").PropType<import("./types").DataGetter<any>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly fixedData: {
        readonly type: import("vue").PropType<any[]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly expandColumnKey: StringConstructor;
    readonly expandedRowKeys: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => KeyType[]) | (() => KeyType[]) | ((new (...args: any[]) => KeyType[]) | (() => KeyType[]))[], unknown, unknown, () => never[], boolean>;
    readonly defaultExpandedRowKeys: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => KeyType[]) | (() => KeyType[]) | ((new (...args: any[]) => KeyType[]) | (() => KeyType[]))[], unknown, unknown, () => never[], boolean>;
    readonly class: StringConstructor;
    readonly fixed: BooleanConstructor;
    readonly style: {
        readonly type: import("vue").PropType<CSSProperties>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly width: {
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly height: {
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly maxHeight: NumberConstructor;
    readonly useIsScrolling: BooleanConstructor;
    readonly indentSize: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
    readonly iconSize: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
    readonly hScrollbarSize: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
    readonly vScrollbarSize: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
    readonly scrollbarAlwaysOn: BooleanConstructor;
    readonly sortBy: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./types").SortBy) | (() => import("./types").SortBy) | ((new (...args: any[]) => import("./types").SortBy) | (() => import("./types").SortBy))[], unknown, unknown, () => {
        key: KeyType;
        order: import("element-plus").TableV2SortOrder;
    }, boolean>;
    readonly sortState: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./types").SortState) | (() => import("./types").SortState) | ((new (...args: any[]) => import("./types").SortState) | (() => import("./types").SortState))[], unknown, unknown, undefined, boolean>;
    readonly onColumnSort: {
        readonly type: import("vue").PropType<import("./table").ColumnSortHandler<any>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onExpandedRowsChange: {
        readonly type: import("vue").PropType<import("./table").ExpandedRowsChangeHandler>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onEndReached: {
        readonly type: import("vue").PropType<(remainDistance: number) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onRowExpand: {
        readonly type: import("vue").PropType<import("./row").RowExpandHandler>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onScroll: {
        readonly type: import("vue").PropType<(...args: any[]) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onRowsRendered: {
        readonly type: import("vue").PropType<(params: import("./grid").onRowRenderedParams) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly rowEventHandlers: {
        readonly type: import("vue").PropType<import("./row").RowEventHandlers>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    'update:expandedRowKeys': (expandedRowKeys: KeyType[]) => boolean;
    'header-dragend': (newWidth: number, oldWidth: number, column: import("./types").Column<any>, event: MouseEvent) => boolean;
    'row-delete': (params: import("./row").RowDeleteParams) => boolean;
    'row-add': (params: import("./row").RowAddParams) => boolean;
    'add-column': (params: ColumnInsertParams<any>) => boolean;
    'add-row': (params: RowInsertParams<any>) => boolean;
    'add-ghost-row': (params: GhostRowAddParams<any>) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly cache: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, never, never, 2, false>;
    readonly estimatedRowHeight: {
        readonly default: undefined;
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        readonly __epPropKey: true;
    };
    readonly rowKey: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | ((new (...args: any[]) => string | number | symbol) | (() => KeyType))[], unknown, unknown, "id", boolean>;
    readonly headerClass: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("./table").HeaderClassNameGetter<any>) | (() => string | import("./table").HeaderClassNameGetter<any>) | ((new (...args: any[]) => string | import("./table").HeaderClassNameGetter<any>) | (() => string | import("./table").HeaderClassNameGetter<any>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly headerProps: {
        readonly type: import("vue").PropType<any>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly headerCellProps: {
        readonly type: import("vue").PropType<any>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly headerHeight: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => number | number[]) | ((new (...args: any[]) => number | number[]) | (() => number | number[]))[], unknown, unknown, 44, boolean>;
    readonly footerHeight: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly isFooterDefault: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly editable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly canEditTable: BooleanConstructor;
    readonly ghostTable: BooleanConstructor;
    readonly editTable: BooleanConstructor;
    readonly ghostRowTemplate: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Record<string, any>) | (() => Record<string, any>) | ((new (...args: any[]) => Record<string, any>) | (() => Record<string, any>))[], unknown, unknown, () => {}, boolean>;
    readonly showAddColumnTrigger: BooleanConstructor;
    readonly addColumnButton: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showAddRowTrigger: BooleanConstructor;
    readonly total: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly updateTime: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly rowClass: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("./table").RowClassNameGetter<any>) | (() => string | import("./table").RowClassNameGetter<any>) | ((new (...args: any[]) => string | import("./table").RowClassNameGetter<any>) | (() => string | import("./table").RowClassNameGetter<any>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly rowProps: {
        readonly type: import("vue").PropType<any>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly rowHeight: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 44, boolean>;
    readonly cellProps: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => Record<string, any> | import("./table").ExtraCellPropGetter<any>) | (() => Record<string, any> | import("./table").ExtraCellPropGetter<any>) | ((new (...args: any[]) => Record<string, any> | import("./table").ExtraCellPropGetter<any>) | (() => Record<string, any> | import("./table").ExtraCellPropGetter<any>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly columns: {
        readonly type: import("vue").PropType<import("./common").AnyColumn[]>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly data: {
        readonly type: import("vue").PropType<any[]>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly dataGetter: {
        readonly type: import("vue").PropType<import("./types").DataGetter<any>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly fixedData: {
        readonly type: import("vue").PropType<any[]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly expandColumnKey: StringConstructor;
    readonly expandedRowKeys: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => KeyType[]) | (() => KeyType[]) | ((new (...args: any[]) => KeyType[]) | (() => KeyType[]))[], unknown, unknown, () => never[], boolean>;
    readonly defaultExpandedRowKeys: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => KeyType[]) | (() => KeyType[]) | ((new (...args: any[]) => KeyType[]) | (() => KeyType[]))[], unknown, unknown, () => never[], boolean>;
    readonly class: StringConstructor;
    readonly fixed: BooleanConstructor;
    readonly style: {
        readonly type: import("vue").PropType<CSSProperties>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly width: {
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly height: {
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly maxHeight: NumberConstructor;
    readonly useIsScrolling: BooleanConstructor;
    readonly indentSize: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
    readonly iconSize: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
    readonly hScrollbarSize: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
    readonly vScrollbarSize: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
    readonly scrollbarAlwaysOn: BooleanConstructor;
    readonly sortBy: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./types").SortBy) | (() => import("./types").SortBy) | ((new (...args: any[]) => import("./types").SortBy) | (() => import("./types").SortBy))[], unknown, unknown, () => {
        key: KeyType;
        order: import("element-plus").TableV2SortOrder;
    }, boolean>;
    readonly sortState: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./types").SortState) | (() => import("./types").SortState) | ((new (...args: any[]) => import("./types").SortState) | (() => import("./types").SortState))[], unknown, unknown, undefined, boolean>;
    readonly onColumnSort: {
        readonly type: import("vue").PropType<import("./table").ColumnSortHandler<any>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onExpandedRowsChange: {
        readonly type: import("vue").PropType<import("./table").ExpandedRowsChangeHandler>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onEndReached: {
        readonly type: import("vue").PropType<(remainDistance: number) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onRowExpand: {
        readonly type: import("vue").PropType<import("./row").RowExpandHandler>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onScroll: {
        readonly type: import("vue").PropType<(...args: any[]) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onRowsRendered: {
        readonly type: import("vue").PropType<(params: import("./grid").onRowRenderedParams) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly rowEventHandlers: {
        readonly type: import("vue").PropType<import("./row").RowEventHandlers>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>> & {
    "onHeader-dragend"?: ((newWidth: number, oldWidth: number, column: import("./types").Column<any>, event: MouseEvent) => any) | undefined;
    "onAdd-column"?: ((params: ColumnInsertParams<any>) => any) | undefined;
    "onAdd-row"?: ((params: RowInsertParams<any>) => any) | undefined;
    "onAdd-ghost-row"?: ((params: GhostRowAddParams<any>) => any) | undefined;
    "onUpdate:expandedRowKeys"?: ((expandedRowKeys: KeyType[]) => any) | undefined;
    "onRow-delete"?: ((params: import("./row").RowDeleteParams) => any) | undefined;
    "onRow-add"?: ((params: import("./row").RowAddParams) => any) | undefined;
}, {
    readonly fixed: boolean;
    readonly total: number;
    readonly editable: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly rowKey: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | ((new (...args: any[]) => string | number | symbol) | (() => KeyType))[], unknown, unknown>;
    readonly useIsScrolling: boolean;
    readonly scrollbarAlwaysOn: boolean;
    readonly cache: number;
    readonly estimatedRowHeight: number;
    readonly rowHeight: number;
    readonly hScrollbarSize: number;
    readonly vScrollbarSize: number;
    readonly sortBy: import("./types").SortBy;
    readonly showAddColumnTrigger: boolean;
    readonly addColumnButton: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly editTable: boolean;
    readonly updateTime: string;
    readonly ghostTable: boolean;
    readonly showAddRowTrigger: boolean;
    readonly headerHeight: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => number | number[]) | (() => number | number[]) | ((new (...args: any[]) => number | number[]) | (() => number | number[]))[], unknown, unknown>;
    readonly footerHeight: number;
    readonly isFooterDefault: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly ghostRowTemplate: Record<string, any>;
    readonly indentSize: number;
    readonly iconSize: number;
    readonly sortState: import("./types").SortState;
    readonly canEditTable: boolean;
    readonly expandedRowKeys: KeyType[];
    readonly defaultExpandedRowKeys: KeyType[];
}>;
export default TableV2;
export type TableV2Instance = InstanceType<typeof TableV2> & {
    /**
     * @description scroll to a given position
     * @params params {{ scrollLeft?: number, scrollTop?: number }} where to scroll to.
     */
    scrollTo: (param: {
        scrollLeft?: number;
        scrollTop?: number;
    }) => void;
    /**
     * @description scroll to a given position horizontally
     * @params scrollLeft {Number} where to scroll to.
     */
    scrollToLeft: (scrollLeft: number) => void;
    /**
     * @description scroll to a given position vertically
     * @params scrollTop { Number } where to scroll to.
     */
    scrollToTop: (scrollTop: number) => void;
    /**
     * @description scroll to a given row
     * @params row {Number} which row to scroll to
     * @params strategy {ScrollStrategy} use what strategy to scroll to
     */
    scrollToRow(row: number, strategy?: ScrollStrategy): void;
    /**
     * @description validates current table data against required columns
     */
    validateRequiredColumns: () => boolean;
};
