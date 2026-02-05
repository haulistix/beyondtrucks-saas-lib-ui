import type { ComponentPublicInstance, Ref } from 'vue';
import type { DatePickerProps, SelectTypeKey } from './props/date-picker';
export type DatePickerExpose = {
    selectType: Ref<SelectTypeKey | undefined>;
    focus: () => void;
    blur: () => void;
    handleOpen: () => void;
    handleClose: () => void;
    selectingDate: any;
};
export type DatePickerInstance = ComponentPublicInstance<DatePickerProps, DatePickerExpose>;
