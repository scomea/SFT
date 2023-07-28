import { DesignToken } from "@microsoft/fast-foundation";
import { AdaptiveDesignSystem } from "@adaptive-web/adaptive-web-components";
import { AllComponents } from "@adaptive-web/adaptive-web-components/all-components"
import { SFTComponents } from "../src/custom-elements";
import { registerDraggableAnchor } from "../src/components/anchored-element/stories/examples/draggable-anchor.js";
import { registerAnchoredRegionPointer } from "../src/components/anchored-element/stories/examples/anchored-region-pointer.js";
import { registerARPositionDemo } from "../src/components/anchored-element/stories/examples/ar-position-demo.js";
import { registerARLockIntoView } from "../src/components/anchored-element/stories/examples/ar-lockintoview.js";
DesignToken.registerDefaultStyleTarget();

AdaptiveDesignSystem.defineComponents(AllComponents);
AdaptiveDesignSystem.defineComponents(SFTComponents);

registerDraggableAnchor();
registerAnchoredRegionPointer();
registerARPositionDemo();
registerARLockIntoView();
