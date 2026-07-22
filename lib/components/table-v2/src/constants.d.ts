export declare enum SortOrder {
    DEFAULT = "",
    ASC = "asc",
    DESC = "desc"
}
export declare enum Alignment {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}
export declare enum FixedDir {
    LEFT = "left",
    RIGHT = "right"
}
export declare const nextSortOrderMap: {
    "": SortOrder;
    asc: SortOrder;
    desc: SortOrder;
};
export declare const sortOrders: readonly [SortOrder.DEFAULT, SortOrder.ASC, SortOrder.DESC];
