import type { PropType } from 'vue';
import type { DefaultRow } from './table/defaults';
declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import("vue").DefineComponent<{
    row: {
        type: PropType<DefaultRow>;
        required: true;
    };
    beforeSave: {
        type: PropType<(payload: DefaultRow) => Promise<void> | void>;
        default: undefined;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    save: (payload: DefaultRow) => void;
    cancel: (payload: {
        row: DefaultRow;
        draft: DefaultRow;
    }) => void;
    "save-error": (error: unknown) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    row: {
        type: PropType<DefaultRow>;
        required: true;
    };
    beforeSave: {
        type: PropType<(payload: DefaultRow) => Promise<void> | void>;
        default: undefined;
    };
}>> & {
    onCancel?: ((payload: {
        row: DefaultRow;
        draft: DefaultRow;
    }) => any) | undefined;
    onSave?: ((payload: DefaultRow) => any) | undefined;
    "onSave-error"?: ((error: unknown) => any) | undefined;
}, {
    beforeSave: (payload: DefaultRow) => Promise<void> | void;
}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
