import type { PropType } from 'vue';
import type { DefaultRow } from './table/defaults';
type NumericLimit = boolean | number | {
    place?: number;
};
declare function __VLS_template(): {
    editor?(_: {
        modelValue: any;
        value: any;
        cellData: {
            row: DefaultRow;
            cellIndex: number;
            rowIndex: number;
        };
        property: string;
        editor: "input" | "select";
        isEditing: true;
        options: any[];
        inputProps: Record<string, any>;
        selectProps: Record<string, any>;
        updateModelValue: (value: any) => void;
        commitValue: () => void;
        submitEditing: (value?: any) => void;
    }): any;
};
declare const __VLS_component: import("vue").DefineComponent<{
    cellData: {
        type: PropType<{
            row: DefaultRow;
            cellIndex: number;
            rowIndex: number;
        }>;
        required: true;
    };
    property: {
        type: StringConstructor;
        required: true;
    };
    displayKey: StringConstructor;
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    isNumber: {
        type: PropType<NumericLimit>;
        default: boolean;
    };
    editor: {
        type: PropType<"input" | "select">;
        default: string;
    };
    inputProps: {
        type: PropType<Record<string, any>>;
        default: () => {};
    };
    selectProps: {
        type: PropType<Record<string, any>>;
        default: () => {};
    };
    selectKey: {
        type: PropType<string[]>;
        default: () => string[];
    };
    options: {
        type: PropType<any[]>;
        default: () => never[];
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    blur: (...args: any[]) => void;
    "visible-change": (...args: any[]) => void;
    "on-submit": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    cellData: {
        type: PropType<{
            row: DefaultRow;
            cellIndex: number;
            rowIndex: number;
        }>;
        required: true;
    };
    property: {
        type: StringConstructor;
        required: true;
    };
    displayKey: StringConstructor;
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    isNumber: {
        type: PropType<NumericLimit>;
        default: boolean;
    };
    editor: {
        type: PropType<"input" | "select">;
        default: string;
    };
    inputProps: {
        type: PropType<Record<string, any>>;
        default: () => {};
    };
    selectProps: {
        type: PropType<Record<string, any>>;
        default: () => {};
    };
    selectKey: {
        type: PropType<string[]>;
        default: () => string[];
    };
    options: {
        type: PropType<any[]>;
        default: () => never[];
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    "onVisible-change"?: ((...args: any[]) => any) | undefined;
    "onOn-submit"?: ((...args: any[]) => any) | undefined;
}, {
    options: any[];
    clearable: boolean;
    editor: "input" | "select";
    isNumber: NumericLimit;
    inputProps: Record<string, any>;
    selectProps: Record<string, any>;
    selectKey: string[];
}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
