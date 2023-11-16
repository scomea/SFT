import type { ComposableStyles, FASTElementDefinition } from "@microsoft/fast-element";
import { componentBaseStyles } from "@adaptive-web/adaptive-ui";
import { DesignSystem } from "@adaptive-web/adaptive-web-components";
import { SFTAnchoredElement } from "./anchored-element.js";
import { aestheticStyles, templateStyles } from "./anchored-element.styles.js";
import { AnchoredElementAnatomy, template } from "./anchored-element.template.js";

const defaultStyles = [componentBaseStyles, templateStyles, aestheticStyles];


/**
 * @public
 */
export function composeAnchoredElement(
    ds: DesignSystem
): FASTElementDefinition {
    const styles: ComposableStyles[] = DesignSystem.assembleStyles(defaultStyles, AnchoredElementAnatomy.interactivity);

    return SFTAnchoredElement.compose({
        name: `${ds.prefix}-anchored-element`,
        template: template(ds),
        styles,
        registry: ds.registry
    });
}
