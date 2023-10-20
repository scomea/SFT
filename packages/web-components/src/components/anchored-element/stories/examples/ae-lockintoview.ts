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
import { AnchoredElementPointer } from "./anchored-element-pointer.js";

export function registerAELockIntoView() {
    AELockIntoView.define({
        name: "ae-lock-into-view",
        template: aeLockIntoViewTemplate(),
        styles: arLockIntoViewStyles,
    });
}

/**
 *
 *
 * @public
 */
export class AELockIntoView extends FASTElement {
    @observable
    public anchorElement: DraggableAnchor | undefined;

    public canvasElement!: HTMLCanvasElement;
    private renderContext: CanvasRenderingContext2D | null = null;
    private trackingRegions: NodeListOf<Element> | undefined;

    public connectedCallback(): void {
        super.connectedCallback();
        this.anchorElement?.addEventListener("positionchange", this.handleAnchorMove);
        this.renderContext = this.canvasElement.getContext("2d");
        this.trackingRegions = this.shadowRoot?.querySelectorAll(".tracking-region");
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
    }

    public drawConnections = (): void => {
        
        if (!this.renderContext) {
            return;
        }

        this.renderContext.reset();

        const start = { x: 0, y: 0 };
        const cp1 = { x: 0, y: 0 };
        const cp2 = { x: 0, y: 0 };
        const end = { x: 0, y: 0 };

        let pointer: AnchoredElementPointer;
        this.renderContext!.lineWidth = 16;
        this.trackingRegions?.forEach((element) => {
            pointer = element as AnchoredElementPointer;

            if (pointer.anchorRect && pointer.regionRect && pointer.distance < 500) {
                start.x = pointer.regionRect.left + (pointer.regionRect.width / 2);
                start.y = pointer.regionRect.top + (pointer.regionRect.height / 2);
                end.x = pointer.anchorRect.left + (pointer.anchorRect.width / 2);
                end.y = pointer.anchorRect.top + (pointer.anchorRect.height / 2);
                cp1.x = end.x;
                cp1.y = end.y;
                cp2.x = start.x;
                cp2.y = start.y;
    
                this.renderContext!.strokeStyle = `rgba(
                    ${255 - (pointer.rotation/360 * 255)},${pointer.rotation/360 * 255},0,${(500 - pointer.distance) / 500 * 0.6})`;;
                this.renderContext!.beginPath();
                this.renderContext!.moveTo(start.x, start.y);
                this.renderContext!.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
                this.renderContext!.stroke();
            }
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

const manyTrackersTemplate = html`
    <div class="many-trackers">
        ${
            () => {
                let toReturn = html``;
                for (let i = 0; i < 500; i++) {
                    toReturn = html`${toReturn}${trackerRegionTemplate}`
                }

                return toReturn;
            }
        }
    </div>
`;


/**
 * The template
 * @public
 */
export function aeLockIntoViewTemplate<T extends AELockIntoView>(): ElementViewTemplate<
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

            ${manyTrackersTemplate}
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
        height: 60px;
        width: 60px;
    }
    .manypointer {
        font-size: 40px;
        grid-column: 2;
        grid-row: 2;
    }
    .manytracker {
        height: 60px;
        width: 60px;
    }
    .canvas {
        position: fixed;
        z-index: 50;
        transform: translate(-16px, -36px);
    }
`;
