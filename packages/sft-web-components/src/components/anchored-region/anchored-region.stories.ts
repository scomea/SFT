import { html } from "@microsoft/fast-element";
import { uniqueId } from "@microsoft/fast-web-utilities";
import { renderComponent } from "../../utilities/storybook-helpers.js";
import type { Meta, Story, StoryArgs } from "../../utilities/storybook-helpers.js";
import type { SFTAnchoredRegion } from "./anchored-region.js";
import {
    AutoUpdateMode,
    AxisPositioningMode,
    AxisScalingMode,
    HorizontalPosition,
    VerticalPosition,
} from "./anchored-region.options.js";
import type { DraggableAnchor } from "./stories/examples/draggable-anchor.js";
import { ArPositions } from "./stories/examples/ar-position-demo.js";
import type { GameConfig } from "./stories/examples/tiles/interfaces.js";

const gameConfig: GameConfig = {
    columnCount: 11,
    rowCount: 11,
    tileData: [
        { title: "E", value: 1, column: 6, row: 6, fixed: true },
        { title: "E", value: 1 },
        { title: "A", value: 1 },
        { title: "R", value: 1 },
        { title: "I", value: 1 },
        { title: "O", value: 1 },
        { title: "T", value: 2 },
        { title: "N", value: 2 },
        { title: "S", value: 2 },
        { title: "L", value: 2 },
        { title: "C", value: 2 },
        { title: "U", value: 3 },
        { title: "D", value: 3 },
        { title: "P", value: 3 },
        { title: "M", value: 3 },
        { title: "H", value: 3 },
        { title: "G", value: 3 },
        { title: "B", value: 4 },
        { title: "F", value: 4 },
        { title: "Y", value: 4 },
        { title: "W", value: 4 },
        { title: "K", value: 4 },
        { title: "V", value: 4 },
        { title: "X", value: 5 },
        { title: "Z", value: 5 },
        { title: "J", value: 5 },
        { title: "Q", value: 5 },
        { title: "A", value: 1 },
        { title: "E", value: 1 },
        { title: "I", value: 1 },
        { title: "O", value: 1 },
        { title: "U", value: 3 },
        { title: "R", value: 1 },
        { title: "T", value: 2 },
    ],
};

const storyTemplate = html<StoryArgs<SFTAnchoredRegion>>`
        <sft-anchored-region
            class="region"
            ?use-virtual-anchor="${x => x.useVirtualAnchor}"
            :virtualAnchorX="${x => x.virtualAnchorX}"
            :virtualAnchorY="${x => x.virtualAnchorY}"
            ?horizontal-inset="${x => x.horizontalInset}"
            ?horizontal-viewport-lock="${x => x.horizontalViewportLock}"
            ?vertical-inset="${x => x.verticalInset}"
            ?vertical-viewport-lock="${x => x.verticalViewportLock}"
            anchor="${x => x.anchor}"
            auto-update-mode="${x => x.autoUpdateMode}"
            fixed-placement="${x => x.fixedPlacement}"
            horizontal-default-position="${x => x.horizontalDefaultPosition}"
            horizontal-positioning-mode="${x => x.horizontalPositioningMode}"
            horizontal-scaling="${x => x.horizontalScaling}"
            horizontal-threshold="${x => x.horizontalThreshold}"
            vertical-default-position="${x => x.verticalDefaultPosition}"
            vertical-positioning-mode="${x => x.verticalPositioningMode}"
            vertical-scaling="${x => x.verticalScaling}"
            vertical-threshold="${x => x.verticalThreshold}"
            viewport="${x => x.viewport}"
        >
            ${x => x.storyContent}
        </sft-anchored-region>
    </div>
`;

export default {
    title: "Anchored Region",
    args: {
        storyContent: html`
            <div
                id="content"
                style="background:rgba(0, 255, 0, 0.2); height:100%; width:100%;"
            >
                <div style="background: var(--neutral-fill-rest); padding: 10px">
                    anchored region
                </div>
            </div>
        `,
        autoUpdateMode: "auto",
        fixedPlacement: true,
        horizontalViewportLock: false,
        verticalViewportLock: false,
        horizontalPositioningMode: "dynamic",
        verticalPositioningMode: "dynamic",
    },
    argTypes: {
        anchor: { control: "text" },
        anchorId: { table: { disable: true } },
        autoUpdateMode: {
            control: "select",
            options: Object.values(AutoUpdateMode),
        },
        useVirtualAnchor: { control: "boolean" },
        virtualAnchorX: { control: "number" },
        virtualAnchorY: { control: "number" },
        pointerTracking: { control: "boolean" },
        fixedPlacement: { control: "boolean" },
        horizontalDefaultPosition: {
            control: "select",
            options: Object.values(HorizontalPosition),
        },
        horizontalInset: { control: "boolean" },
        horizontalPositioningMode: {
            control: "select",
            options: Object.values(AxisPositioningMode),
        },
        horizontalScaling: {
            control: "select",
            options: Object.values(AxisScalingMode),
        },
        horizontalThreshold: { control: "number" },
        horizontalViewportLock: { control: "boolean" },
        storyContent: { table: { disable: true } },
        verticalDefaultPosition: {
            control: "select",
            options: Object.values(VerticalPosition),
        },
        verticalInset: { control: "boolean" },
        verticalPositioningMode: {
            control: "select",
            options: Object.values(AxisPositioningMode),
        },
        verticalScaling: {
            control: "select",
            options: Object.values(AxisScalingMode),
        },
        verticalThreshold: { control: "number" },
        verticalViewportLock: { control: "boolean" },
        viewport: { control: "text" },
    },
    decorators: [
        (Story, { args }) => {
            // IDs are generated to ensure that they're unique for the docs page
            const renderedStory = Story() as DocumentFragment;
            const anchor = (renderedStory.querySelector(
                ".anchor"
            ) as any) as DraggableAnchor;
            const region = (renderedStory.querySelector(
                ".region"
            ) as any) as SFTAnchoredRegion;

            const anchorId = args.anchorId ?? uniqueId("anchor");

            if (anchor) {
                anchor.id = anchorId;
                anchor.addEventListener("positionchange", () => {
                    region?.update();
                });

                if (region) {
                    region.id = uniqueId("region");
                    region?.setAttribute("anchor", anchorId);
                }
            }

            return renderedStory;
        },
    ],
} as Meta<SFTAnchoredRegion>;

export const AnchoredRegion: Story<SFTAnchoredRegion> = renderComponent(
    html<StoryArgs<SFTAnchoredRegion>>`
        <div style="min-height: 100px">
            ${storyTemplate}
            <draggable-anchor
                class="anchor"
                virtual-anchor-x="150"
                virtual-anchor-Y="150"
            >
                Anchor
                <br />
                Click to Drag
            </draggable-anchor>
        </div>
    `
).bind({});

export const PointAnchor: Story<SFTAnchoredRegion> = renderComponent(
    html<StoryArgs<SFTAnchoredRegion>>`
        <div style="min-height: 100px">
            ${storyTemplate}
        </div>
    `
).bind({});
PointAnchor.args = {
    useVirtualAnchor: true,
    virtualAnchorX: 200,
    virtualAnchorY: 200,
    storyContent: html`
        <div
            id="content"
            style="background:rgba(0, 255, 0, 0.2); height:100%; width:100%;"
        >
            <div style="background: var(--neutral-fill-rest); padding: 10px">
                Position controlled by
                <br />
                virtual-anchor-x and virtual-anchor-y
            </div>
        </div>
    `,
};

export const PositionsDemo: Story<SFTAnchoredRegion> = renderComponent(
    html<StoryArgs<SFTAnchoredRegion>>`
        <ar-position-demo :positions="${x => x.Positions}"></ar-position-demo>
    `
).bind({});
PositionsDemo.parameters = { controls: { include: ["Positions"] } };
PositionsDemo.argTypes = {
    Positions: {
        control: "select",
        options: Object.values(ArPositions),
    },
};
PositionsDemo.args = {
    Positions: "fillLocked",
};

export const MenuPatterns: Story<SFTAnchoredRegion> = renderComponent(
    html<StoryArgs<SFTAnchoredRegion>>`
        <ar-menu-patterns></ar-menu-patterns>
    `
).bind({});
MenuPatterns.parameters = { controls: { include: [], hideNoControlsWarning: true } };
MenuPatterns.argTypes = {};
MenuPatterns.args = {};

export const LockIntoView: Story<SFTAnchoredRegion> = renderComponent(
    html<StoryArgs<SFTAnchoredRegion>>`
        <ar-lock-into-view></ar-lock-into-view>
    `
).bind({});
LockIntoView.parameters = { controls: { include: [], hideNoControlsWarning: true } };
LockIntoView.argTypes = {};
LockIntoView.args = {};

export const Tiles: Story<SFTAnchoredRegion> = renderComponent(
    html<StoryArgs<SFTAnchoredRegion>>`
        <ar-tiles :gameConfig="${gameConfig}"></ar-tiles>
    `
).bind({});
Tiles.parameters = { controls: { include: [], hideNoControlsWarning: true } };
Tiles.argTypes = {};
Tiles.args = {};
