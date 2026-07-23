declare const TableV2Cell: import("vue").DefineComponent<{
    readonly class: StringConstructor;
    readonly cellData: {
        readonly type: import("vue").PropType<any>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly column: {
        readonly type: import("vue").PropType<import("../common").AnyColumn>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly columnIndex: NumberConstructor;
    readonly style: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | import("vue").StyleValue[]) | (() => import("vue").StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | import("vue").StyleValue[]) | (() => import("vue").StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly rowData: {
        readonly type: import("vue").PropType<any>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly rowIndex: NumberConstructor;
    readonly showOverflowTooltip: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>) | (() => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>) | ((new (...args: any[]) => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>) | (() => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>))[], unknown, unknown, false, boolean>;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly class: StringConstructor;
    readonly cellData: {
        readonly type: import("vue").PropType<any>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly column: {
        readonly type: import("vue").PropType<import("../common").AnyColumn>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly columnIndex: NumberConstructor;
    readonly style: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue").CSSProperties | import("vue").StyleValue[]) | (() => import("vue").StyleValue) | ((new (...args: any[]) => string | import("vue").CSSProperties | import("vue").StyleValue[]) | (() => import("vue").StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly rowData: {
        readonly type: import("vue").PropType<any>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly rowIndex: NumberConstructor;
    readonly showOverflowTooltip: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>) | (() => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>) | ((new (...args: any[]) => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>) | (() => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>))[], unknown, unknown, false, boolean>;
}>>, {
    readonly showOverflowTooltip: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>) | (() => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>) | ((new (...args: any[]) => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>) | (() => boolean | Partial<Pick<import("element-plus/es/components/tooltip").ElTooltipProps, "offset" | "transition" | "placement" | "effect" | "showAfter" | "hideAfter" | "popperOptions" | "enterable" | "popperClass" | "appendTo" | "showArrow">>))[], unknown, unknown>;
}>;
export default TableV2Cell;
