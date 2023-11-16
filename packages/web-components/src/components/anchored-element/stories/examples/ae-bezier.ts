import {
    css,
    ElementViewTemplate,
    FASTElement,
    html,
    observable,
    ref,
    repeat,
    Updates,
    ViewTemplate,
} from "@microsoft/fast-element";
import type { SFTAnchoredElement } from "../../anchored-element.js";
import type { DraggableAnchor } from "./draggable-anchor.js";

export function registerAEBezier() {
    AEBezier.define({
        name: "ae-bezier",
        template: aeBezierTemplate(),
        styles: arLockIntoViewStyles,
    });
}

/**
 *
 *
 * @public
 */
export class AEBezier extends FASTElement {

    public canvasElement!: HTMLCanvasElement;
    private renderContext: CanvasRenderingContext2D | null = null;

    public connectedCallback(): void {
        super.connectedCallback();
        this.renderContext = this.canvasElement.getContext("2d");
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
    }

}

const sectionDividerTemplate = html`
    <fast-divider style="margin:20px;"></fast-divider>
`;

/**
 * The template
 * @public
 */
export function aeBezierTemplate<T extends AEBezier>(): ElementViewTemplate<
    T
> {
    return html<T>`
        <template>
            <canvas
                height=2000;
                width=2000;
                class="canvas"
                ${ref("canvasElement")}
            >

            </canvas>
            <h1>
                Beziers
            </h1>
            ${sectionDividerTemplate} 
            Look, bezier curves 
            ${sectionDividerTemplate}
           
        </template>
    `;
}

export const arLockIntoViewStyles = css`
    :host {
        display: block;
    }
    
    .canvas {
        position: fixed;
        z-index: 50;
        transform: translate(-16px, -36px);
    }
`;
