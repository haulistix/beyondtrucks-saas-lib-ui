import type { DirectiveArguments, ExtractPropTypes, __ExtractPublicPropTypes } from 'vue';
import type { InputPropsPublic } from 'element-plus/es/components/input';
import type { SelectV2PropsPublic } from 'element-plus/es/components/select-v2/src/defaults';
export declare const inputSelectControlTypes: readonly ["input", "select"];
export type InputSelectControl = (typeof inputSelectControlTypes)[number];
export type InputSelectLayout = ['input', 'select'] | ['select', 'select'] | ['select', 'input'] | ['input', 'input'];
export type InputSelectValue = InputPropsPublic['modelValue'] | SelectV2PropsPublic['modelValue'];
export type InputSelectControlProps = Partial<Omit<InputPropsPublic, 'modelValue'>> | Partial<Omit<SelectV2PropsPublic, 'modelValue'>>;
export type InputSelectDirectives = DirectiveArguments;
export declare const inputSelectProps: {
    readonly layout: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => ["input", "select"] | ["select", "select"] | ["select", "input"] | ["input", "input"]) | (() => InputSelectLayout) | ((new (...args: any[]) => ["input", "select"] | ["select", "select"] | ["select", "input"] | ["input", "input"]) | (() => InputSelectLayout))[], unknown, InputSelectLayout, () => InputSelectLayout, boolean>;
    readonly leftValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => any) | (() => any) | {
        (): any;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => any) | (() => any) | {
        (): any;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, undefined, boolean>;
    readonly rightValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => any) | (() => any) | {
        (): any;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => any) | (() => any) | {
        (): any;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, undefined, boolean>;
    readonly leftProps: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<Omit<InputPropsPublic, "modelValue">> | Partial<Omit<SelectV2PropsPublic, "modelValue">>) | (() => InputSelectControlProps) | ((new (...args: any[]) => Partial<Omit<InputPropsPublic, "modelValue">> | Partial<Omit<SelectV2PropsPublic, "modelValue">>) | (() => InputSelectControlProps))[], unknown, unknown, () => {}, boolean>;
    readonly rightProps: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<Omit<InputPropsPublic, "modelValue">> | Partial<Omit<SelectV2PropsPublic, "modelValue">>) | (() => InputSelectControlProps) | ((new (...args: any[]) => Partial<Omit<InputPropsPublic, "modelValue">> | Partial<Omit<SelectV2PropsPublic, "modelValue">>) | (() => InputSelectControlProps))[], unknown, unknown, () => {}, boolean>;
    readonly leftDirectives: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => DirectiveArguments) | (() => DirectiveArguments) | ((new (...args: any[]) => DirectiveArguments) | (() => DirectiveArguments))[], unknown, unknown, () => never[], boolean>;
    readonly rightDirectives: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => DirectiveArguments) | (() => DirectiveArguments) | ((new (...args: any[]) => DirectiveArguments) | (() => DirectiveArguments))[], unknown, unknown, () => never[], boolean>;
};
export declare const inputSelectEmits: {
    'update:leftValue': (_value: InputSelectValue) => boolean;
    'update:rightValue': (_value: InputSelectValue) => boolean;
    'left-change': (_value: InputSelectValue) => boolean;
    'right-change': (_value: InputSelectValue) => boolean;
    'left-focus': (event: FocusEvent) => boolean;
    'right-focus': (event: FocusEvent) => boolean;
    'left-blur': (event: FocusEvent) => boolean;
    'right-blur': (event: FocusEvent) => boolean;
    'left-clear': () => boolean;
    'right-clear': () => boolean;
    'left-visible-change': (visible: boolean) => boolean;
    'right-visible-change': (visible: boolean) => boolean;
};
export type InputSelectProps = ExtractPropTypes<typeof inputSelectProps>;
export type InputSelectPropsPublic = __ExtractPublicPropTypes<typeof inputSelectProps>;
export type InputSelectEmits = typeof inputSelectEmits;
