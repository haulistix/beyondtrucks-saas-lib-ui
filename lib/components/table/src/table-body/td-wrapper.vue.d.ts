declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import("vue").DefineComponent<{
    colspan: {
        type: NumberConstructor;
        default: number;
    };
    rowspan: {
        type: NumberConstructor;
        default: number;
    };
    cellIndex: {
        type: NumberConstructor;
        default: number;
    };
    rowIndex: {
        type: NumberConstructor;
        default: number;
    };
    fullWidth: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    colspan: {
        type: NumberConstructor;
        default: number;
    };
    rowspan: {
        type: NumberConstructor;
        default: number;
    };
    cellIndex: {
        type: NumberConstructor;
        default: number;
    };
    rowIndex: {
        type: NumberConstructor;
        default: number;
    };
    fullWidth: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    rowIndex: number;
    rowspan: number;
    colspan: number;
    cellIndex: number;
    fullWidth: boolean;
}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
