import { DesignToken } from "@microsoft/fast-foundation";
import { AdaptiveDesignSystem } from "@adaptive-web/adaptive-web-components";
import { AllComponents } from "@adaptive-web/adaptive-web-components/all-components"
import { SFTComponents } from "../src/custom-elements";
import { registerDraggableAnchor } from "../src/components/anchored-element/stories/examples/draggable-anchor.js";
import { registerAnchoredRegionPointer } from "../src/components/anchored-element/stories/examples/anchored-element-pointer.js";
import { registerAEPositionDemo } from "../src/components/anchored-element/stories/examples/ae-position-demo.js";
import { registerAELockIntoView } from "../src/components/anchored-element/stories/examples/ae-lockintoview.js";
import { registerAEBezier } from "../src/components/anchored-element/stories/examples/ae-bezier.js";
DesignToken.registerDefaultStyleTarget();

AdaptiveDesignSystem.defineComponents(AllComponents);
AdaptiveDesignSystem.defineComponents(SFTComponents);

registerDraggableAnchor();
registerAnchoredRegionPointer();
registerAEPositionDemo();
registerAELockIntoView();
registerAEBezier();
