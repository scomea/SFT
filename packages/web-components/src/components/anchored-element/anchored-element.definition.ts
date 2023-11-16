import { AdaptiveDesignSystem } from "@adaptive-web/adaptive-web-components";
import { composeAnchoredElement } from "./anchored-element.compose.js";

/**
 * The component definition.
 *
 * @remarks
 * HTML Element: \<anchored-element\>
 *
 * @public
 */
export const anchoredElementDefinition = composeAnchoredElement(
    AdaptiveDesignSystem,
);
