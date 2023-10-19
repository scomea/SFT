import {
    css,
    ElementViewTemplate,
    FASTElement,
    html,
    observable,
    ref,
    Updates,
} from "@microsoft/fast-element";
import type { SFTAnchoredElement } from "../../anchored-element.js";
import type { DraggableAnchor } from "./draggable-anchor.js";
import { AnchoredElementPointer } from "./anchored-element-pointer.js";

export function registerARLockIntoView() {
    ARLockIntoView.define({
        name: "ar-lock-into-view",
        template: arLockIntoViewTemplate(),
        styles: arLockIntoViewStyles,
    });
}

/**
 *
 *
 * @public
 */
export class ARLockIntoView extends FASTElement {
    @observable
    public anchorElement: DraggableAnchor | undefined;

    public canvasElement!: HTMLCanvasElement;

    public connectedCallback(): void {
        super.connectedCallback();
        this.anchorElement?.addEventListener("positionchange", this.handleAnchorMove);
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
    }

    public drawConnections = (): void => {
        const ctx: CanvasRenderingContext2D | null = this.canvasElement.getContext("2d");
        if (!ctx) {
            return;
        }

        ctx.reset();

        const start = { x: 0, y: 0 };
        const cp1 = { x: 0, y: 0 };
        const cp2 = { x: 0, y: 0 };
        const end = { x: 0, y: 0 };

        let pointer: AnchoredElementPointer;

        const subRegions = this.shadowRoot?.querySelectorAll(".tracking-region");
        subRegions?.forEach((element) => {
            pointer = element as AnchoredElementPointer;

            if (!pointer.anchorRect || !pointer.regionRect) {
                return;
            }

            start.x = pointer.regionRect.x;
            start.y = pointer.regionRect.y;
            end.x = pointer.anchorRect.x;
            end.y = pointer.anchorRect.y;
            cp1.x = pointer.anchorRect.x;
            cp1.y = pointer.anchorRect.y;
            cp2.x = pointer.regionRect.x;
            cp2.y = pointer.regionRect.y;

            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            // ctx.lineTo(end.x, end.y);
            ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
            ctx.stroke();
        });
    }

    public handleAnchorMove = (): void => {
        const subRegions = this.shadowRoot?.querySelectorAll(".tracking-region");
        subRegions?.forEach(element => {
            ((element as any) as SFTAnchoredElement).update();
        });
        Updates.enqueue(() => this.drawConnections());
    };
}

const sectionDividerTemplate = html`
    <fast-divider style="margin:20px;"></fast-divider>
`;

const pointerElementTemplate = html`
    <div class="tracker"></div>
    <div class="pointer" slot="pointer">
        ↑
    </div>
`;

const trackerRegionTemplate = html`
    <div class="tracker-region-container">
        <anchored-region-pointer
            class="tracking-region many"
            anchor="anchor"
            auto-update-mode="auto"
            horizontal-positioning-mode="uncontrolled"
            horizontal-scaling="content"
            vertical-positioning-mode="uncontrolled"
            vertical-scaling="content"
        >
            <div class="manytracker"></div>
            <div class="manypointer" slot="pointer">
                ↑
            </div>
        </anchored-region-pointer>
    </div>
`;
/**
 * The template
 * @public
 */
export function arLockIntoViewTemplate<T extends ARLockIntoView>(): ElementViewTemplate<
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
                Lock into view
            </h1>
            ${sectionDividerTemplate} The "lock into view" attributes keep the region in
            the viewport on the specified axis. There is significant flexibility as to
            what other element is the viewport.
            <br />
            Anchored regions can be styled based on their placement by using the css
            classes put on the element based on position (ie. top/bottom/left/right). This
            is how the borders on the blue squares below are thicker on the anchored
            sides. ${sectionDividerTemplate}
            <draggable-anchor class="anchor" id="anchor" ${ref("anchorElement")}>
                Anchor
                <br />
                Click to Drag
            </draggable-anchor>

            <div class="grid">
                <div
                    style="grid-column: 1; grid-row: 1;"
                    class="grid-cell"
                    id="grid-cell-1-1"
                >
                    <anchored-region-pointer
                        class="tracking-region"
                        anchor="anchor"
                        viewport="grid-cell-1-1"
                        auto-update-mode="auto"
                        horizontal-viewport-lock="true"
                        vertical-viewport-lock="true"
                        horizontal-default-position="left"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="content"
                        vertical-default-position="top"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="content"
                    >
                        ${pointerElementTemplate}
                    </anchored-region-pointer>
                </div>
                <div
                    style="grid-column: 2; grid-row: 1;"
                    class="grid-cell"
                    id="grid-cell-1-2"
                >
                    <anchored-region-pointer
                        class="tracking-region"
                        anchor="anchor"
                        viewport="grid-cell-1-2"
                        auto-update-mode="auto"
                        horizontal-viewport-lock="true"
                        vertical-viewport-lock="true"
                        horizontal-default-position="center"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="content"
                        vertical-default-position="top"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="content"
                    >
                        ${pointerElementTemplate}
                    </anchored-region-pointer>
                </div>
                <div
                    style="grid-column: 3; grid-row: 1;"
                    class="grid-cell"
                    id="grid-cell-1-3"
                >
                    <anchored-region-pointer
                        class="tracking-region"
                        anchor="anchor"
                        viewport="grid-cell-1-3"
                        auto-update-mode="auto"
                        horizontal-viewport-lock="true"
                        vertical-viewport-lock="true"
                        horizontal-default-position="right"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="content"
                        vertical-default-position="top"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="content"
                    >
                        ${pointerElementTemplate}
                    </anchored-region-pointer>
                </div>
                <div
                    style="grid-column: 1; grid-row: 2;"
                    class="grid-cell"
                    id="grid-cell-2-1"
                >
                    <anchored-region-pointer
                        class="tracking-region"
                        anchor="anchor"
                        viewport="grid-cell-2-1"
                        auto-update-mode="auto"
                        horizontal-viewport-lock="true"
                        vertical-viewport-lock="true"
                        horizontal-default-position="left"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="content"
                        vertical-default-position="center"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="content"
                    >
                        ${pointerElementTemplate}
                    </anchored-region-pointer>
                </div>
                <div
                    style="grid-column: 2; grid-row: 2;"
                    class="grid-cell"
                    id="grid-cell-2-2"
                >
                    <anchored-region-pointer
                        class="tracking-region"
                        anchor="anchor"
                        viewport="grid-cell-2-2"
                        auto-update-mode="auto"
                        horizontal-viewport-lock="true"
                        vertical-viewport-lock="true"
                        horizontal-default-position="center"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="content"
                        vertical-default-position="center"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="content"
                    >
                        ${pointerElementTemplate}
                    </anchored-region-pointer>
                </div>
                <div
                    style="grid-column: 3; grid-row: 2;"
                    class="grid-cell"
                    id="grid-cell-2-3"
                >
                    <anchored-region-pointer
                        class="tracking-region"
                        anchor="anchor"
                        viewport="grid-cell-2-3"
                        auto-update-mode="auto"
                        horizontal-viewport-lock="true"
                        vertical-viewport-lock="true"
                        horizontal-default-position="right"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="content"
                        vertical-default-position="center"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="content"
                    >
                        ${pointerElementTemplate}
                    </anchored-region-pointer>
                </div>
                <div
                    style="grid-column: 1; grid-row: 3;"
                    class="grid-cell"
                    id="grid-cell-3-1"
                >
                    <anchored-region-pointer
                        class="tracking-region"
                        anchor="anchor"
                        viewport="grid-cell-3-1"
                        auto-update-mode="auto"
                        horizontal-viewport-lock="true"
                        vertical-viewport-lock="true"
                        horizontal-default-position="left"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="content"
                        vertical-default-position="bottom"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="content"
                    >
                        ${pointerElementTemplate}
                    </anchored-region-pointer>
                </div>
                <div
                    style="grid-column: 2; grid-row: 3;"
                    class="grid-cell"
                    id="grid-cell-3-2"
                >
                    <anchored-region-pointer
                        class="tracking-region"
                        anchor="anchor"
                        viewport="grid-cell-3-2"
                        auto-update-mode="auto"
                        horizontal-viewport-lock="true"
                        vertical-viewport-lock="true"
                        horizontal-default-position="center"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="content"
                        vertical-default-position="bottom"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="content"
                    >
                        ${pointerElementTemplate}
                    </anchored-region-pointer>
                </div>
                <div
                    style="grid-column: 3; grid-row: 3;"
                    class="grid-cell"
                    id="grid-cell-3-3"
                >
                    <anchored-region-pointer
                        class="tracking-region"
                        anchor="anchor"
                        viewport="grid-cell-3-3"
                        auto-update-mode="auto"
                        horizontal-viewport-lock="true"
                        vertical-viewport-lock="true"
                        horizontal-default-position="right"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="content"
                        vertical-default-position="bottom"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="content"
                    >
                        ${pointerElementTemplate}
                    </anchored-region-pointer>
                </div>
            </div>

            ${sectionDividerTemplate} Many, to test perf.${sectionDividerTemplate}

            <div class="many-trackers">
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
                ${trackerRegionTemplate} ${trackerRegionTemplate} ${trackerRegionTemplate}
            </div>
        </template>
    `;
}

export const arLockIntoViewStyles = css`
    :host {
        display: block;
    }
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        width: 600px;
        height: 600px;
        gap: 10px;
    }
    .grid-cell {
        background: grey;
        border: solid;
    }
    .anchor {
        z-index: 100;
    }
    .tracking-region {
        pointer-events: none;
        background: blue;
        opacity: 1;
        border: solid green 2px;
    }
    .tracking-region.many {
        pointer-events: none;
        background: blue;
        opacity: 1;
        border: none;
    }
    .tracking-region.top {
        border-bottom-width: 8px;
    }
    .tracking-region.bottom {
        border-top-width: 8px;
    }
    .tracking-region.left {
        border-right-width: 8px;
    }
    .tracking-region.right {
        border-left-width: 8px;
    }
    .tracker {
        height: 100px;
        width: 100px;
    }
    .pointer {
        font-size: 42px;
        grid-column: 2;
        grid-row: 2;
    }
    .many-trackers {
        display: flex;
        flex-wrap: wrap;
    }
    .tracker-region-container {
        height: 50px;
        width: 50px;
    }
    .manypointer {
        font-size: 20px;
        grid-column: 2;
        grid-row: 2;
    }
    .manytracker {
        height: 50px;
        width: 50px;
    }
    .canvas {
        position: fixed;
        z-index: 50;
        transform: translate(-16px, -36px);
    }
`;
