import { SortOrder } from '../constants';
import type { FunctionalComponent } from 'vue';
export type SortIconProps = {
    sortOrder: SortOrder;
    sorting?: boolean;
    class?: JSX.IntrinsicAttributes['class'];
};
declare const SortIcon: FunctionalComponent<SortIconProps>;
export default SortIcon;
