import type { Option } from './select.types';
declare const _default: import("vue").DefineComponent<{
    readonly data: ArrayConstructor;
    readonly disabled: BooleanConstructor;
    readonly hovering: BooleanConstructor;
    readonly item: {
        readonly type: import("vue").PropType<Option>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly index: NumberConstructor;
    readonly style: ObjectConstructor;
    readonly selected: BooleanConstructor;
    readonly created: BooleanConstructor;
}, {
    ns: {
        namespace: import("vue").ComputedRef<string>;
        b: (blockSuffix?: string) => string;
        e: (element?: string) => string;
        m: (modifier?: string) => string;
        be: (blockSuffix?: string, element?: string) => string;
        em: (element?: string, modifier?: string) => string;
        bm: (blockSuffix?: string, modifier?: string) => string;
        bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
        is: {
            (name: string, state: boolean | undefined): string;
            (name: string): string;
        };
        cssVar: (object: Record<string, string>) => Record<string, string>;
        cssVarName: (name: string) => string;
        cssVarBlock: (object: Record<string, string>) => Record<string, string>;
        cssVarBlockName: (name: string) => string;
    };
    contentId: import("vue").Ref<string>;
    multiple: import("vue").ComputedRef<boolean>;
    isTextOverflowing: import("vue").Ref<boolean>;
    currentTip: import("vue").ComputedRef<any>;
    optionStyle: import("vue").ComputedRef<{
        borderTop: string;
    }>;
    hoverItem: () => void;
    selectOptionClick: () => void;
    getLabel: (option: Option) => any;
    handleCellMouseEnter: (event: MouseEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    hover: (index?: number) => index is number;
    select: (val: Option, index?: number) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly data: ArrayConstructor;
    readonly disabled: BooleanConstructor;
    readonly hovering: BooleanConstructor;
    readonly item: {
        readonly type: import("vue").PropType<Option>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly index: NumberConstructor;
    readonly style: ObjectConstructor;
    readonly selected: BooleanConstructor;
    readonly created: BooleanConstructor;
}>> & {
    onSelect?: ((val: Option, index?: number | undefined) => any) | undefined;
    onHover?: ((index?: number | undefined) => any) | undefined;
}, {
    readonly disabled: boolean;
    readonly created: boolean;
    readonly hovering: boolean;
    readonly selected: boolean;
}>;
export default _default;
