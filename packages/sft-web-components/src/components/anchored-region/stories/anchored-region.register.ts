import { css } from "@microsoft/fast-element";
import { SFTAnchoredRegion } from "../anchored-region.js";
import { anchoredRegionTemplate } from "../anchored-region.template.js";
import { registerDraggableAnchor } from "./examples/draggable-anchor.js";
import { registerAnchoredRegionPointer } from "./examples/anchored-region-pointer.js";
import { registerARPositionDemo } from "./examples/ar-position-demo.js";
import { registerARMenuPatterns } from "./examples/ar-menu-patterns.js";
import { registerARLockIntoView } from "./examples/ar-lockintoview.js";
import { registerARTiles } from "./examples/tiles/ar-tiles.js";

const styles = css`
    :host {
        display: block;
        will-change: transform;
    }
`;

SFTAnchoredRegion.define({
    name: "sft-anchored-region",
    template: anchoredRegionTemplate(),
    styles,
});

//components for examples
// registerDraggableAnchor();
// registerAnchoredRegionPointer();
// registerARPositionDemo();
// registerARMenuPatterns();
// registerARLockIntoView();
// registerARTiles();
