import type { ExtractPropTypes, __ExtractPublicPropTypes } from 'vue';
export declare const panelMonthRangeProps: {
    readonly rangePickType: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => "end" | "start") | (() => "end" | "start") | ((new (...args: any[]) => "end" | "start") | (() => "end" | "start"))[], "end" | "start", unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly unlinkPanels: BooleanConstructor;
    readonly visible: BooleanConstructor;
    readonly parsedValue: {
        readonly type: import("vue").PropType<import("dayjs").Dayjs[]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
export declare const panelMonthRangeEmits: string[];
export type PanelMonthRangeProps = ExtractPropTypes<typeof panelMonthRangeProps>;
export type PanelMonthRangePropsPublic = __ExtractPublicPropTypes<typeof panelMonthRangeProps>;
