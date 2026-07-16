import type { VNode } from 'vue';
import type { Column } from './types';
export declare const isEmptyRequiredValue: (value: unknown) => value is "" | null | undefined;
export declare const isGhostTableRow: (row: Record<string, any> | undefined) => boolean;
export declare const isGhostRowTouched: (row: Record<string, any> | undefined) => boolean;
export declare const getGhostRowPayload: <T extends Record<PropertyKey, any>>(row: T) => Partial<T>;
export declare const hasGhostRowValue: <T extends Record<string, any>>(row: T) => boolean;
export declare const applyRequiredInputState: <T extends Record<string, any>>(vnodes: VNode | VNode[], column: Column<T>, row: T) => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}> | VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[];
