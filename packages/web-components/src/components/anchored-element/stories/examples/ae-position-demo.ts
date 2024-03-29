import {
    css,
    ElementViewTemplate,
    FASTElement,
    html,
    observable,
    ref,
    when,
} from "@microsoft/fast-element";
import type { SFTAnchoredElement } from "../../anchored-element.js";
import type { DraggableAnchor } from "./draggable-anchor.js";

export const ArPositions = {
    dynamic: "dynamic",
    fillLocked: "fillLocked",
} as const;

export function registerAEPositionDemo() {
    AEPositionDemo.define({
        name: "ae-position-demo",
        template: aePositionDemoTemplate(),
        styles: aePositionDemoStyles,
    });
}

export type ArPositions = typeof ArPositions[keyof typeof ArPositions];

/**
 *
 *
 * @public
 */
export class AEPositionDemo extends FASTElement {
    @observable
    public anchorElement: DraggableAnchor | undefined;

    @observable
    public positions: ArPositions = "fillLocked";

    public connectedCallback(): void {
        super.connectedCallback();
        this.anchorElement?.addEventListener("positionchange", this.handleAnchorMove);
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
    }

    public handleAnchorMove = (): void => {
        const subelements = this.shadowRoot?.querySelectorAll(".subelement");
        subelements?.forEach(element => {
            ((element as any) as SFTAnchoredElement).update();
        });
    };
}

/**
 * The template
 * @public
 */
export function aePositionDemoTemplate<T extends AEPositionDemo>(): ElementViewTemplate<
    T
> {
    return html<T>`
        <template style="height:100%; width:100%;">
            ${when(
                x => x.positions === "fillLocked",
                html<T>`
                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-default-position="left"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="fill"
                        vertical-default-position="top"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="fill"
                    >
                        <div
                            style="background: green; opacity:0.5; padding: 10px; height: 100%; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                        >
                            top-left
                        </div>
                    </adaptive-anchored-element>

                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-default-position="right"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="fill"
                        vertical-default-position="top"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="fill"
                    >
                        <div
                            style="background: green; opacity:0.5; padding: 10px; height: 100%; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                        >
                            top-right
                        </div>
                    </adaptive-anchored-element>

                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-default-position="left"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="fill"
                        vertical-default-position="bottom"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="fill"
                    >
                        <div
                            style="background: green; opacity:0.5; padding: 10px; height: 100%; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                        >
                            bottom-left
                        </div>
                    </adaptive-anchored-element>

                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-default-position="right"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="fill"
                        vertical-default-position="bottom"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="fill"
                    >
                        <div
                            style="background: green; opacity:0.5; padding: 10px; height: 100%; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                        >
                            bottom-right
                        </div>
                    </adaptive-anchored-element>
                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-default-position="right"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="fill"
                        vertical-default-position="center"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="anchor"
                    >
                        <div
                            style="background: blue; opacity:0.5; padding: 10px; height: 100%; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                        >
                            center-right
                        </div>
                    </adaptive-anchored-element>

                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-default-position="left"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="fill"
                        vertical-default-position="center"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="anchor"
                    >
                        <div
                            style="background: blue; opacity:0.5; padding: 10px; height: 100%; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                        >
                            center-left
                        </div>
                    </adaptive-anchored-element>

                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-default-position="center"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="anchor"
                        vertical-default-position="top"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="fill"
                    >
                        <div
                            style="background: blue; opacity:0.5; padding: 10px; height: 100%; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                        >
                            top-center
                        </div>
                    </adaptive-anchored-element>

                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-default-position="center"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="anchor"
                        vertical-default-position="bottom"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="fill"
                    >
                        <div
                            style="background: blue; opacity:0.5; padding: 10px; height: 100%; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                        >
                            bottom-center
                        </div>
                    </adaptive-anchored-element>

                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-default-position="center"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="content"
                        vertical-default-position="center"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="content"
                    >
                        <div
                            style="background: orange; opacity:0.5; padding: 10px; height: 200px; width: 200px; box-sizing: border-box; border: solid 4px; border-color: black;"
                        >
                            centered
                        </div>
                    </adaptive-anchored-element>
                `
            )}
            ${when(
                x => x.positions === "dynamic",
                html<T>`
                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-positioning-mode="dynamic"
                        horizontal-scaling="content"
                        vertical-positioning-mode="dynamic"
                        vertical-inset="true'
                        vertical-scaling="content"
                    >
                    <div
                        style="background: blue; opacity:0.5; padding: 10px; height: 200px; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                    >
                        <br><br>
                        right or left, inset vertically
                    </div>
                </adaptive-anchored-element>

                <adaptive-anchored-element
                    anchor="anchor"
                    class="subelement"
                    fixed-placement="true"
                    auto-update-mode="auto"
                    horizontal-inset="true"
                    horizontal-positioning-mode="dynamic"
                    horizontal-scaling="content"
                    vertical-positioning-mode="dynamic"
                    vertical-scaling="content"
                >
                    <div
                        style="background: blue; opacity:0.5; padding: 10px; height: 200px; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                    >
                        <br><br>
                        top or bottom, inset horizontally
                    </div>
                </adaptive-anchored-element>
                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-positioning-mode="dynamic"
                        horizontal-scaling="content"
                        vertical-default-position="center"
                        vertical-positioning-mode="locktodefault"
                        vertical-scaling="content"
                    >
                        <div
                            style="background: green; opacity:0.5; padding: 10px; height: 100%; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                        >
                            right or left
                        </div>
                    </adaptive-anchored-element>

                    <adaptive-anchored-element
                        anchor="anchor"
                        class="subelement"
                        fixed-placement="true"
                        auto-update-mode="auto"
                        horizontal-default-position="center"
                        horizontal-positioning-mode="locktodefault"
                        horizontal-scaling="content"
                        vertical-positioning-mode="dynamic"
                        vertical-scaling="content"
                    >
                        <div
                            style="background: green; opacity:0.5; padding: 10px; height: 100%; width: 100%; box-sizing: border-box; border: solid 4px; border-color: black;"
                        >
                            top or bottom
                        </div>
                    </adaptive-anchored-element>
                `
            )}
            <draggable-anchor
                class="anchor"
                id="anchor"
                virtual-anchor-x="150"
                virtual-anchor-Y="150"
                ${ref("anchorElement")}
            >
                Anchor
                <br />
                Click to Drag
            </draggable-anchor>
        </template>
    `;
}

export const aePositionDemoStyles = css`
    :host {
        display: block;
    }
`;
