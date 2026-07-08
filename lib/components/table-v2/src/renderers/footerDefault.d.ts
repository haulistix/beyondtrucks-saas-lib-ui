import type { CSSProperties, FunctionalComponent } from 'vue';
type FooterRendererProps = {
    class?: JSX.IntrinsicAttributes['class'];
    style: CSSProperties;
    total?: number;
    updateTime?: string;
};
declare const FooterDefault: FunctionalComponent<FooterRendererProps>;
export default FooterDefault;
