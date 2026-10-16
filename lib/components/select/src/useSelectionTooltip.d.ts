import type { Ref } from 'vue';
export declare const useSelectionTooltip: (selectionRef: Ref<HTMLElement | undefined>, collapseItemRef: Ref<HTMLElement | undefined>, multiple: Ref<boolean>, hasModelValue: Ref<boolean>) => {
    tooltip: {
        visible: boolean;
        content: string;
        reference: HTMLElement | undefined;
    };
    handleMouseMove: (event: MouseEvent) => void;
    hide: () => void;
};
