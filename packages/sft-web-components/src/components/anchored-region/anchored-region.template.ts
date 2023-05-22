import { ElementViewTemplate, html, when } from "@microsoft/fast-element";
import type { SFTAnchoredRegion } from "./anchored-region.js";

/**
 * The template for the {@link @microsoft/fast-foundation#(SFTAnchoredRegion:class)} component.
 * @public
 */
export function anchoredRegionTemplate<
    T extends SFTAnchoredRegion
>(): ElementViewTemplate<T> {
    return html<T>`
        <template data-loaded="${x => (x.initialLayoutComplete ? "loaded" : "")}">
            ${when(
                x => x.initialLayoutComplete,
                html<T>`
                    <slot></slot>
                `
            )}
        </template>
    `;
}
