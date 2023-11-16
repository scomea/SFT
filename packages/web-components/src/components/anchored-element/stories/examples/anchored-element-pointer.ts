import { css, ElementViewTemplate, html, observable, ref, when } from "@microsoft/fast-element";
import { SFTAnchoredElement } from "../../anchored-element.js";

export function registerAnchoredRegionPointer() {
    AnchoredElementPointer.define({
        name: "anchored-region-pointer",
        template: anchoredElementPointerTemplate(),
        styles: anchoredElementPointerStyles,
    });
}

/**
 *
 *
 * @public
 */
export class AnchoredElementPointer extends SFTAnchoredElement {
    @observable
    public distance: number = 0;
    public rotation: number = 0;

    public connectedCallback(): void {
        super.connectedCallback();
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
    }

    protected updateLayout = () => {
        super.updateLayout();
        this.rotation = this.getRotation(this.anchorRect, this.regionRect);
        this.distance = this.getDistance(this.anchorRect, this.regionRect);
    };

    private getRotation(
        anchorRect: DOMRect | undefined,
        regionRect: DOMRect | undefined
    ): number {
        if (!anchorRect || !regionRect) {
            return 0;
        }

        const anchorX: number = anchorRect.top + anchorRect.height / 2;
        const anchorY: number = anchorRect.left + anchorRect.width / 2;
        const regionX: number = regionRect.top + regionRect.height / 2;
        const regionY: number = regionRect.left + regionRect.width / 2;

        const dx = anchorX - regionX;
        const dy = regionY - anchorY;
        return (Math.atan2(dy, dx) * 180) / Math.PI + 180;
    }

    private getDistance(
        anchorRect: DOMRect | undefined,
        regionRect: DOMRect | undefined
    ): number {
        if (!anchorRect || !regionRect) {
            return 0;
        }

        const anchorX: number = anchorRect.top + anchorRect.height / 2;
        const anchorY: number = anchorRect.left + anchorRect.width / 2;
        const regionX: number = regionRect.top + regionRect.height / 2;
        const regionY: number = regionRect.left + regionRect.width / 2;

        return Math.hypot(anchorX - regionX, anchorY - regionY);
    }
}

/**
 * The template
 * @public
 */
export function anchoredElementPointerTemplate<
    T extends AnchoredElementPointer
>(): ElementViewTemplate<T> {
    return html<T>`
        <template data-loaded="${x => (x.initialLayoutComplete ? "loaded" : "")}">
            ${when(
                x => x.initialLayoutComplete,
                html<T>`
                    <div
                        class="pointer"
                        style="
                            transform:rotate(${x =>
                            x.rotation}deg);
                            opacity:${x =>
                            (1000 - x.distance) / 1000};
                        "
                    >
                        <slot name="pointer"></slot>
                    </div>
                    <slot></slot>
                `
            )}
        </template>
    `;
}

export const anchoredElementPointerStyles = css`
    :host {
        display: block;
        will-change: transform;
        box-sizing: border-box;
    }
    .pointer {
        will-change: transform, opacity;
        position: absolute;
        transform-origin: 50% 50%;
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        grid-template-rows: 1fr auto 1fr;
    }
`;
