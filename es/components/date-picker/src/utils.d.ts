import dayjs from 'dayjs';
import type { ComputedRef } from 'vue';
import type { Dayjs } from 'dayjs';
import type { DateCell } from './date-picker.type';
import type { DisabledDateType } from './props/shared';
type DayRange = [Dayjs | undefined, Dayjs | undefined];
type PartialDateRange = [Date | null, Date | null];
export declare const isValidRange: (range: DayRange) => boolean;
export declare const normalizePartialRange: (range: Array<Dayjs | null>) => [Dayjs | undefined, Dayjs | undefined];
export declare const isValidPartialRange: (range: Array<Dayjs | null>, disabledDate?: DisabledDateType) => boolean;
export declare const getPartialRangePayload: (range: any) => {
    dayRange: [Dayjs | undefined, Dayjs | undefined];
    pickRange: [Dayjs | null, Dayjs | null];
    dateRange: PartialDateRange;
};
type GetDefaultValueParams = {
    lang: string;
    step?: number;
    unit: 'month' | 'year';
    unlinkPanels: boolean;
};
export type DefaultValue = [Date, Date] | Date | undefined;
export declare const getDefaultValue: (defaultValue: DefaultValue, { lang, step, unit, unlinkPanels }: GetDefaultValueParams) => dayjs.Dayjs[];
type Dimension = {
    row: number;
    column: number;
};
type BuildPickerTableMetadata = {
    startDate?: Dayjs | null;
    unit: 'month' | 'day';
    columnIndexOffset: number;
    now: Dayjs;
    nextEndDate: Dayjs | null;
    relativeDateGetter: (index: number) => Dayjs;
    setCellMetadata?: (cell: DateCell, dimension: {
        rowIndex: number;
        columnIndex: number;
    }) => void;
    setRowMetadata?: (row: DateCell[]) => void;
};
export declare const buildPickerTable: (dimension: Dimension, rows: DateCell[][], { columnIndexOffset, startDate, nextEndDate, now, unit, relativeDateGetter, setCellMetadata, setRowMetadata, }: BuildPickerTableMetadata) => void;
export declare const datesInMonth: (date: Dayjs, year: number, month: number, lang: string) => Date[];
export declare const getValidDateOfMonth: (date: Dayjs, year: number, month: number, lang: string, disabledDate?: DisabledDateType) => dayjs.Dayjs;
export declare const getValidDateOfYear: (value: Dayjs, lang: string, disabledDate?: DisabledDateType) => dayjs.Dayjs;
export declare const correctlyParseUserInput: (value: string | Dayjs | Dayjs[], format: string, lang: string, defaultFormat: ComputedRef<boolean>) => Dayjs | Dayjs[];
export {};
