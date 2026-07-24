import type { ExtractPropTypes, __ExtractPublicPropTypes } from 'vue';
export declare const panelYearRangeProps: {
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
export declare const panelYearRangeEmits: string[];
export type PanelYearRangeProps = ExtractPropTypes<typeof panelYearRangeProps>;
export type PanelYearRangePropsPublic = __ExtractPublicPropTypes<typeof panelYearRangeProps>;
