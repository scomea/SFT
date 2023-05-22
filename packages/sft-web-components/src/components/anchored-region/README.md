---
id: anchored-region
title: fast-anchored-region
sidebar_label: anchored-region
custom_edit_url: https://github.com/microsoft/fast/edit/master/packages/web-components/fast-foundation/src/anchored-region/README.md
description: fast-anchored-region is a container web component in which the contents of the anchored region can be positioned relative to another "anchor" element.
---

An *anchored region* is a container component which enables authors to create layouts where the contents of the anchored region can be positioned relative to another "anchor" element.  Additionally, the *anchored region* can react to the available space between the anchor and a parent ["viewport"](https://developer.mozilla.org/en-US/docs/Glossary/viewport) element such that the region is placed on the side of the anchor with the most available space, or even resize itself based on that space.

## Setup

```ts
import {
    provideFASTDesignSystem,
    fastAnchoredRegion
} from "@microsoft/fast-components";

provideFASTDesignSystem()
    .register(
        fastAnchoredRegion()
    );
```

## Usage

A region that always renders above the anchor element.

```html live
<div id="viewport">
    <button id="anchor">
        Button is an anchor
    </button>
    <fast-anchored-region
        anchor="anchor"
        vertical-positioning-mode="locktodefault"
        vertical-default-position="top">
      This shows up above the button
    </fast-anchored-region>
</div>
```

## Create your own design

```ts
import {
    AnchoredRegion,
    anchoredRegionTemplate as template,
} from "@microsoft/fast-foundation";
import { anchoredRegionStyles as styles } from "./my-anchored-region.styles";

export const myAnchoredRegion = AnchoredRegion.compose({
    baseName: "anchored-region",
    template,
    styles,
});
```

## API



### Variables

| Name                   | Description                                                                                                                                                 | Type                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `FlyoutPosTop`         | A region that always places itself above the anchor, has a width to match the anchor, and is sized vertically by content                                    | `AnchoredRegionConfig` |
| `FlyoutPosBottom`      | A region that always places itself below the anchor, has a width to match the anchor, and is sized vertically by content                                    | `AnchoredRegionConfig` |
| `FlyoutPosTallest`     | A region that places itself above or below the anchor based on available space, has a width to match the anchor, and is sized vertically by content         | `AnchoredRegionConfig` |
| `FlyoutPosTopFill`     | A region that always places itself above the anchor, has a width to match the anchor, and is sized vertically by available space                            | `AnchoredRegionConfig` |
| `FlyoutPosBottomFill`  | A region that always places itself below the anchor, has a width to match the anchor, and is sized vertically by available space                            | `AnchoredRegionConfig` |
| `FlyoutPosTallestFill` | A region that places itself above or below the anchor based on available space, has a width to match the anchor, and is sized vertically by available space | `AnchoredRegionConfig` |

<hr/>



### Variables

| Name                          | Description                                                                                                                                                                                                                                                                                                                                                          | Type                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `AxisPositioningMode`         | Values to define the base behavior of an anchored region on a particular axis                                                                                                                                                                                                                                                                                        | `{ uncontrolled: "uncontrolled", locktodefault: "locktodefault", dynamic: "dynamic", }`             |
| `AxisScalingMode`             | Values to define the scaling behavior of an anchored region on a particular axis                                                                                                                                                                                                                                                                                     | `{ anchor: "anchor", content: "content", fill: "fill", }`                                           |
| `HorizontalPosition`          | Values for the horizontal positioning options for an anchored region                                                                                                                                                                                                                                                                                                 | `{ start: "start", end: "end", left: "left", right: "right", center: "center", unset: "unset", }`   |
| `VerticalPosition`            | Values for the vertical positioning options for an anchored region                                                                                                                                                                                                                                                                                                   | `{ top: "top", bottom: "bottom", center: "center", unset: "unset", }`                               |
| `AutoUpdateMode`              | Defines if the component updates its position automatically. Calling update() always provokes an update. anchor - the component only updates its position when the anchor resizes (default) auto - the component updates its position when: - update() is called - the anchor resizes - the window resizes - the viewport resizes - any scroll event in the document | `{ anchor: "anchor", auto: "auto", }`                                                               |
| `AnchoredRegionPositionLabel` | Values to describe the possible positions of the region relative to its anchor. Depending on the axis start = left/top, end = right/bottom                                                                                                                                                                                                                           | `{ start: "start", insetStart: "insetStart", insetEnd: "insetEnd", end: "end", center: "center", }` |

<hr/>



### class: `FASTAnchoredRegion`

#### Superclass

| Name          | Module | Package                 |
| ------------- | ------ | ----------------------- |
| `FASTElement` |        | @microsoft/fast-element |

#### Fields

| Name                        | Privacy   | Type                                       | Default          | Description                                                                                                                                                                                                                             | Inherited From |
| --------------------------- | --------- | ------------------------------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `anchor`                    | public    | `string`                                   | `""`             | The HTML ID of the anchor element this region is positioned relative to                                                                                                                                                                 |                |
| `viewport`                  | public    | `string`                                   | `""`             | The HTML ID of the viewport element this region is positioned relative to                                                                                                                                                               |                |
| `useVirtualAnchor`          | public    | `boolean`                                  | `false`          | When true the virtual anchor is used                                                                                                                                                                                                    |                |
| `virtualAnchorX`            | public    | `number`                                   | `0`              | Initial X coordinate when using virtual anchor                                                                                                                                                                                          |                |
| `virtualAnchorY`            | public    | `number`                                   | `0`              | Initial y coordinate when using virtual anchor                                                                                                                                                                                          |                |
| `virtualAnchorWidth`        | public    | `number`                                   | `0`              |                                                                                                                                                                                                                                         |                |
| `virtualAnchorHeight`       | public    | `number`                                   | `0`              |                                                                                                                                                                                                                                         |                |
| `horizontalPositioningMode` | public    | `AxisPositioningMode`                      | `"uncontrolled"` | Sets what logic the component uses to determine horizontal placement. 'locktodefault' forces the default position 'dynamic' decides placement based on available space 'uncontrolled' does not control placement on the horizontal axis |                |
| `horizontalDefaultPosition` | public    | `HorizontalPosition`                       | `"unset"`        | The default horizontal position of the region relative to the anchor element                                                                                                                                                            |                |
| `horizontalViewportLock`    | public    | `boolean`                                  | `false`          | Whether the region remains in the viewport (ie. detaches from the anchor) on the horizontal axis                                                                                                                                        |                |
| `horizontalInset`           | public    | `boolean`                                  | `false`          | Whether the region overlaps the anchor on the horizontal axis                                                                                                                                                                           |                |
| `horizontalThreshold`       | public    | `number`                                   |                  | How narrow the space allocated to the default position has to be before the widest area is selected for layout                                                                                                                          |                |
| `horizontalScaling`         | public    | `AxisScalingMode`                          | `"content"`      | Defines how the width of the region is calculated                                                                                                                                                                                       |                |
| `verticalPositioningMode`   | public    | `AxisPositioningMode`                      | `"uncontrolled"` | Sets what logic the component uses to determine vertical placement. 'locktodefault' forces the default position 'dynamic' decides placement based on available space 'uncontrolled' does not control placement on the vertical axis     |                |
| `verticalDefaultPosition`   | public    | `VerticalPosition`                         | `"unset"`        | The default vertical position of the region relative to the anchor element                                                                                                                                                              |                |
| `verticalViewportLock`      | public    | `boolean`                                  | `false`          | Whether the region remains in the viewport (ie. detaches from the anchor) on the vertical axis                                                                                                                                          |                |
| `verticalInset`             | public    | `boolean`                                  | `false`          | Whether the region overlaps the anchor on the vertical axis                                                                                                                                                                             |                |
| `verticalThreshold`         | public    | `number`                                   |                  | How short the space allocated to the default position has to be before the tallest area is selected for layout                                                                                                                          |                |
| `verticalScaling`           | public    | `AxisScalingMode`                          | `"content"`      | Defines how the height of the region is calculated                                                                                                                                                                                      |                |
| `fixedPlacement`            | public    | `boolean`                                  | `false`          | Whether the region is positioned using css "position: fixed". Otherwise the region uses "position: absolute". Fixed placement allows the region to break out of parent containers,                                                      |                |
| `autoUpdateMode`            | public    | `AutoUpdateMode`                           | `"anchor"`       | Defines what triggers the anchored region to revaluate positioning                                                                                                                                                                      |                |
| `anchorElement`             | public    | `Element or null`                          | `null`           | The element being used as the anchor                                                                                                                                                                                                    |                |
| `viewportElement`           | public    | `Element or null`                          | `null`           | The HTML element being used as the viewport                                                                                                                                                                                             |                |
| `verticalPosition`          | public    | `AnchoredRegionPositionLabel or undefined` |                  | indicates the current horizontal position of the region                                                                                                                                                                                 |                |
| `horizontalPosition`        | public    | `AnchoredRegionPositionLabel or undefined` |                  | indicates the current vertical position of the region                                                                                                                                                                                   |                |
| `translateX`                | protected | `number`                                   |                  | values to be applied to the component's transform on render                                                                                                                                                                             |                |
| `translateY`                | protected | `number`                                   |                  |                                                                                                                                                                                                                                         |                |
| `update`                    | public    |                                            |                  | update position                                                                                                                                                                                                                         |                |

#### Methods

| Name                               | Privacy   | Description | Parameters                                          | Return | Inherited From |
| ---------------------------------- | --------- | ----------- | --------------------------------------------------- | ------ | -------------- |
| `anchorChanged`                    | protected |             |                                                     | `void` |                |
| `viewportChanged`                  | protected |             |                                                     | `void` |                |
| `useVirtualAnchorChanged`          | protected |             |                                                     | `void` |                |
| `virtualAnchorXChanged`            | protected |             |                                                     | `void` |                |
| `virtualAnchorYChanged`            | protected |             |                                                     | `void` |                |
| `virtualAnchorWidthChanged`        | protected |             |                                                     | `void` |                |
| `virtualAnchorHeightChanged`       | protected |             |                                                     | `void` |                |
| `horizontalPositioningModeChanged` | protected |             |                                                     | `void` |                |
| `horizontalDefaultPositionChanged` | protected |             |                                                     | `void` |                |
| `horizontalViewportLockChanged`    | protected |             |                                                     | `void` |                |
| `horizontalInsetChanged`           | protected |             |                                                     | `void` |                |
| `horizontalThresholdChanged`       | protected |             |                                                     | `void` |                |
| `horizontalScalingChanged`         | protected |             |                                                     | `void` |                |
| `verticalPositioningModeChanged`   | protected |             |                                                     | `void` |                |
| `verticalDefaultPositionChanged`   | protected |             |                                                     | `void` |                |
| `verticalViewportLockChanged`      | protected |             |                                                     | `void` |                |
| `verticalInsetChanged`             | protected |             |                                                     | `void` |                |
| `verticalThresholdChanged`         | protected |             |                                                     | `void` |                |
| `verticalScalingChanged`           | protected |             |                                                     | `void` |                |
| `fixedPlacementChanged`            | protected |             |                                                     | `void` |                |
| `autoUpdateModeChanged`            | protected |             | `prevMode: AutoUpdateMode, newMode: AutoUpdateMode` | `void` |                |
| `anchorElementChanged`             | protected |             |                                                     | `void` |                |
| `viewportElementChanged`           | protected |             |                                                     | `void` |                |

#### Events

| Name             | Type | Description                                                         | Inherited From |
| ---------------- | ---- | ------------------------------------------------------------------- | -------------- |
| `loaded`         |      | Fires a custom 'loaded' event when the region is loaded and visible |                |
| `positionchange` |      | Fires a custom 'positionchange' event when the position has changed |                |

#### Attributes

| Name                          | Field                     | Inherited From |
| ----------------------------- | ------------------------- | -------------- |
| `anchor`                      | anchor                    |                |
| `viewport`                    | viewport                  |                |
| `use-virtual-anchor`          | useVirtualAnchor          |                |
| `virtual-anchor-x`            | virtualAnchorX            |                |
| `virtual-anchor-y`            | virtualAnchorY            |                |
| `virtual-anchor-width`        | virtualAnchorWidth        |                |
| `virtual-anchor-height`       | virtualAnchorHeight       |                |
| `horizontal-positioning-mode` | horizontalPositioningMode |                |
| `horizontal-default-position` | horizontalDefaultPosition |                |
| `horizontal-viewport-lock`    | horizontalViewportLock    |                |
| `horizontal-inset`            | horizontalInset           |                |
| `horizontal-threshold`        | horizontalThreshold       |                |
| `horizontal-scaling`          | horizontalScaling         |                |
| `vertical-positioning-mode`   | verticalPositioningMode   |                |
| `vertical-default-position`   | verticalDefaultPosition   |                |
| `vertical-viewport-lock`      | verticalViewportLock      |                |
| `vertical-inset`              | verticalInset             |                |
| `vertical-threshold`          | verticalThreshold         |                |
| `vertical-scaling`            | verticalScaling           |                |
| `fixed-placement`             | fixedPlacement            |                |
| `auto-update-mode`            | autoUpdateMode            |                |

#### Slots

| Name | Description                      |
| ---- | -------------------------------- |
|      | The default slot for the content |

<hr/>



### class: `AnchoredRegionPointer`

#### Superclass

| Name                 | Module                                  | Package |
| -------------------- | --------------------------------------- | ------- |
| `FASTAnchoredRegion` | /src/anchored-region/anchored-region.js |         |

#### Fields

| Name                        | Privacy   | Type                                       | Default          | Description                                                                                                                                                                                                                             | Inherited From     |
| --------------------------- | --------- | ------------------------------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `anchor`                    | public    | `string`                                   | `""`             | The HTML ID of the anchor element this region is positioned relative to                                                                                                                                                                 | FASTAnchoredRegion |
| `viewport`                  | public    | `string`                                   | `""`             | The HTML ID of the viewport element this region is positioned relative to                                                                                                                                                               | FASTAnchoredRegion |
| `useVirtualAnchor`          | public    | `boolean`                                  | `false`          | When true the virtual anchor is used                                                                                                                                                                                                    | FASTAnchoredRegion |
| `virtualAnchorX`            | public    | `number`                                   | `0`              | Initial X coordinate when using virtual anchor                                                                                                                                                                                          | FASTAnchoredRegion |
| `virtualAnchorY`            | public    | `number`                                   | `0`              | Initial y coordinate when using virtual anchor                                                                                                                                                                                          | FASTAnchoredRegion |
| `virtualAnchorWidth`        | public    | `number`                                   | `0`              |                                                                                                                                                                                                                                         | FASTAnchoredRegion |
| `virtualAnchorHeight`       | public    | `number`                                   | `0`              |                                                                                                                                                                                                                                         | FASTAnchoredRegion |
| `horizontalPositioningMode` | public    | `AxisPositioningMode`                      | `"uncontrolled"` | Sets what logic the component uses to determine horizontal placement. 'locktodefault' forces the default position 'dynamic' decides placement based on available space 'uncontrolled' does not control placement on the horizontal axis | FASTAnchoredRegion |
| `horizontalDefaultPosition` | public    | `HorizontalPosition`                       | `"unset"`        | The default horizontal position of the region relative to the anchor element                                                                                                                                                            | FASTAnchoredRegion |
| `horizontalViewportLock`    | public    | `boolean`                                  | `false`          | Whether the region remains in the viewport (ie. detaches from the anchor) on the horizontal axis                                                                                                                                        | FASTAnchoredRegion |
| `horizontalInset`           | public    | `boolean`                                  | `false`          | Whether the region overlaps the anchor on the horizontal axis                                                                                                                                                                           | FASTAnchoredRegion |
| `horizontalThreshold`       | public    | `number`                                   |                  | How narrow the space allocated to the default position has to be before the widest area is selected for layout                                                                                                                          | FASTAnchoredRegion |
| `horizontalScaling`         | public    | `AxisScalingMode`                          | `"content"`      | Defines how the width of the region is calculated                                                                                                                                                                                       | FASTAnchoredRegion |
| `verticalPositioningMode`   | public    | `AxisPositioningMode`                      | `"uncontrolled"` | Sets what logic the component uses to determine vertical placement. 'locktodefault' forces the default position 'dynamic' decides placement based on available space 'uncontrolled' does not control placement on the vertical axis     | FASTAnchoredRegion |
| `verticalDefaultPosition`   | public    | `VerticalPosition`                         | `"unset"`        | The default vertical position of the region relative to the anchor element                                                                                                                                                              | FASTAnchoredRegion |
| `verticalViewportLock`      | public    | `boolean`                                  | `false`          | Whether the region remains in the viewport (ie. detaches from the anchor) on the vertical axis                                                                                                                                          | FASTAnchoredRegion |
| `verticalInset`             | public    | `boolean`                                  | `false`          | Whether the region overlaps the anchor on the vertical axis                                                                                                                                                                             | FASTAnchoredRegion |
| `verticalThreshold`         | public    | `number`                                   |                  | How short the space allocated to the default position has to be before the tallest area is selected for layout                                                                                                                          | FASTAnchoredRegion |
| `verticalScaling`           | public    | `AxisScalingMode`                          | `"content"`      | Defines how the height of the region is calculated                                                                                                                                                                                      | FASTAnchoredRegion |
| `fixedPlacement`            | public    | `boolean`                                  | `false`          | Whether the region is positioned using css "position: fixed". Otherwise the region uses "position: absolute". Fixed placement allows the region to break out of parent containers,                                                      | FASTAnchoredRegion |
| `autoUpdateMode`            | public    | `AutoUpdateMode`                           | `"anchor"`       | Defines what triggers the anchored region to revaluate positioning                                                                                                                                                                      | FASTAnchoredRegion |
| `anchorElement`             | public    | `Element or null`                          | `null`           | The element being used as the anchor                                                                                                                                                                                                    | FASTAnchoredRegion |
| `viewportElement`           | public    | `Element or null`                          | `null`           | The HTML element being used as the viewport                                                                                                                                                                                             | FASTAnchoredRegion |
| `verticalPosition`          | public    | `AnchoredRegionPositionLabel or undefined` |                  | indicates the current horizontal position of the region                                                                                                                                                                                 | FASTAnchoredRegion |
| `horizontalPosition`        | public    | `AnchoredRegionPositionLabel or undefined` |                  | indicates the current vertical position of the region                                                                                                                                                                                   | FASTAnchoredRegion |
| `translateX`                | protected | `number`                                   |                  | values to be applied to the component's transform on render                                                                                                                                                                             | FASTAnchoredRegion |
| `translateY`                | protected | `number`                                   |                  |                                                                                                                                                                                                                                         | FASTAnchoredRegion |
| `update`                    | public    |                                            |                  | update position                                                                                                                                                                                                                         | FASTAnchoredRegion |

#### Methods

| Name                               | Privacy   | Description | Parameters                                                           | Return   | Inherited From     |
| ---------------------------------- | --------- | ----------- | -------------------------------------------------------------------- | -------- | ------------------ |
| `getRotation`                      | public    |             | `anchorRect: DOMRect or undefined, regionRect: DOMRect or undefined` | `number` |                    |
| `getDistance`                      | public    |             | `anchorRect: DOMRect or undefined, regionRect: DOMRect or undefined` | `number` |                    |
| `anchorChanged`                    | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `viewportChanged`                  | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `useVirtualAnchorChanged`          | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `virtualAnchorXChanged`            | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `virtualAnchorYChanged`            | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `virtualAnchorWidthChanged`        | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `virtualAnchorHeightChanged`       | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalPositioningModeChanged` | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalDefaultPositionChanged` | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalViewportLockChanged`    | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalInsetChanged`           | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalThresholdChanged`       | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalScalingChanged`         | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalPositioningModeChanged`   | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalDefaultPositionChanged`   | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalViewportLockChanged`      | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalInsetChanged`             | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalThresholdChanged`         | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalScalingChanged`           | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `fixedPlacementChanged`            | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `autoUpdateModeChanged`            | protected |             | `prevMode: AutoUpdateMode, newMode: AutoUpdateMode`                  | `void`   | FASTAnchoredRegion |
| `anchorElementChanged`             | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `viewportElementChanged`           | protected |             |                                                                      | `void`   | FASTAnchoredRegion |

#### Events

| Name             | Type | Description                                                         | Inherited From     |
| ---------------- | ---- | ------------------------------------------------------------------- | ------------------ |
| `loaded`         |      | Fires a custom 'loaded' event when the region is loaded and visible | FASTAnchoredRegion |
| `positionchange` |      | Fires a custom 'positionchange' event when the position has changed | FASTAnchoredRegion |

#### Attributes

| Name                          | Field                     | Inherited From     |
| ----------------------------- | ------------------------- | ------------------ |
| `anchor`                      | anchor                    | FASTAnchoredRegion |
| `viewport`                    | viewport                  | FASTAnchoredRegion |
| `use-virtual-anchor`          | useVirtualAnchor          | FASTAnchoredRegion |
| `virtual-anchor-x`            | virtualAnchorX            | FASTAnchoredRegion |
| `virtual-anchor-y`            | virtualAnchorY            | FASTAnchoredRegion |
| `virtual-anchor-width`        | virtualAnchorWidth        | FASTAnchoredRegion |
| `virtual-anchor-height`       | virtualAnchorHeight       | FASTAnchoredRegion |
| `horizontal-positioning-mode` | horizontalPositioningMode | FASTAnchoredRegion |
| `horizontal-default-position` | horizontalDefaultPosition | FASTAnchoredRegion |
| `horizontal-viewport-lock`    | horizontalViewportLock    | FASTAnchoredRegion |
| `horizontal-inset`            | horizontalInset           | FASTAnchoredRegion |
| `horizontal-threshold`        | horizontalThreshold       | FASTAnchoredRegion |
| `horizontal-scaling`          | horizontalScaling         | FASTAnchoredRegion |
| `vertical-positioning-mode`   | verticalPositioningMode   | FASTAnchoredRegion |
| `vertical-default-position`   | verticalDefaultPosition   | FASTAnchoredRegion |
| `vertical-viewport-lock`      | verticalViewportLock      | FASTAnchoredRegion |
| `vertical-inset`              | verticalInset             | FASTAnchoredRegion |
| `vertical-threshold`          | verticalThreshold         | FASTAnchoredRegion |
| `vertical-scaling`            | verticalScaling           | FASTAnchoredRegion |
| `fixed-placement`             | fixedPlacement            | FASTAnchoredRegion |
| `auto-update-mode`            | autoUpdateMode            | FASTAnchoredRegion |

<hr/>

### Variables

| Name                          | Description | Type |
| ----------------------------- | ----------- | ---- |
| `anchoredRegionPointerStyles` |             |      |

<hr/>

### Functions

| Name                            | Description  | Parameters | Return                   |
| ------------------------------- | ------------ | ---------- | ------------------------ |
| `registerAnchoredRegionPointer` |              |            |                          |
| `anchoredRegionPointerTemplate` | The template |            | `ElementViewTemplate<T>` |

<hr/>



### class: `ARLockIntoView`

#### Superclass

| Name          | Module | Package                 |
| ------------- | ------ | ----------------------- |
| `FASTElement` |        | @microsoft/fast-element |

#### Fields

| Name               | Privacy | Type              | Default | Description | Inherited From |
| ------------------ | ------- | ----------------- | ------- | ----------- | -------------- |
| `anchorElement`    | public  | `DraggableAnchor` |         |             |                |
| `handleAnchorMove` | public  |                   |         |             |                |

<hr/>

### Variables

| Name                   | Description | Type |
| ---------------------- | ----------- | ---- |
| `arLockIntoViewStyles` |             |      |

<hr/>

### Functions

| Name                     | Description  | Parameters | Return                          |
| ------------------------ | ------------ | ---------- | ------------------------------- |
| `registerARLockIntoView` |              |            |                                 |
| `arLockIntoViewTemplate` | The template |            | `ElementViewTemplate<
    T >` |

<hr/>



### class: `ARMenuPatterns`

#### Superclass

| Name          | Module | Package                 |
| ------------- | ------ | ----------------------- |
| `FASTElement` |        | @microsoft/fast-element |

#### Fields

| Name                       | Privacy | Type          | Default | Description | Inherited From |
| -------------------------- | ------- | ------------- | ------- | ----------- | -------------- |
| `basicDropdownOpen`        |         | `boolean`     | `false` |             |                |
| `sideDropdownOpen`         |         | `boolean`     | `false` |             |                |
| `basicDropdownDynamicOpen` |         | `boolean`     | `false` |             |                |
| `sideDropdownDynamicOpen`  |         | `boolean`     | `false` |             |                |
| `basicDropdownFillOpen`    |         | `boolean`     | `false` |             |                |
| `sideDropdownFillOpen`     |         | `boolean`     | `false` |             |                |
| `fixedDropDownOpen`        |         | `boolean`     | `false` |             |                |
| `absoluteDropDownOpen`     |         | `boolean`     | `false` |             |                |
| `contextMenuOpen`          |         | `boolean`     | `false` |             |                |
| `virtualAnchorX`           |         | `number`      | `0`     |             |                |
| `virtualAnchorY`           |         | `number`      | `0`     |             |                |
| `contextElement`           | public  | `HTMLElement` |         |             |                |
| `handleContext`            | public  |               |         |             |                |
| `handleContextClose`       | public  |               |         |             |                |

<hr/>

### Variables

| Name                   | Description | Type |
| ---------------------- | ----------- | ---- |
| `arMenuPatternsStyles` |             |      |

<hr/>

### Functions

| Name                     | Description  | Parameters | Return                          |
| ------------------------ | ------------ | ---------- | ------------------------------- |
| `registerARMenuPatterns` |              |            |                                 |
| `arMenuPatternsTemplate` | The template |            | `ElementViewTemplate<
    T >` |

<hr/>



### class: `ARPositionDemo`

#### Superclass

| Name          | Module | Package                 |
| ------------- | ------ | ----------------------- |
| `FASTElement` |        | @microsoft/fast-element |

#### Fields

| Name               | Privacy | Type              | Default        | Description | Inherited From |
| ------------------ | ------- | ----------------- | -------------- | ----------- | -------------- |
| `anchorElement`    | public  | `DraggableAnchor` |                |             |                |
| `positions`        | public  | `ArPositions`     | `"fillLocked"` |             |                |
| `handleAnchorMove` | public  |                   |                |             |                |

<hr/>

### Variables

| Name                   | Description | Type                                                |
| ---------------------- | ----------- | --------------------------------------------------- |
| `ArPositions`          |             | `{ dynamic: "dynamic", fillLocked: "fillLocked", }` |
| `arPositionDemoStyles` |             |                                                     |

<hr/>

### Functions

| Name                     | Description  | Parameters | Return                          |
| ------------------------ | ------------ | ---------- | ------------------------------- |
| `registerARPositionDemo` |              |            |                                 |
| `arPositionDemoTemplate` | The template |            | `ElementViewTemplate<
    T >` |

<hr/>



### class: `DraggableAnchor`

#### Superclass

| Name          | Module | Package                 |
| ------------- | ------ | ----------------------- |
| `FASTElement` |        | @microsoft/fast-element |

#### Fields

| Name              | Privacy | Type      | Default | Description                                           | Inherited From |
| ----------------- | ------- | --------- | ------- | ----------------------------------------------------- | -------------- |
| `isDragging`      | public  | `boolean` | `false` |                                                       |                |
| `handleMouseDown` | public  |           |         |                                                       |                |
| `handleMouseUp`   | public  |           |         |                                                       |                |
| `handleMouseMove` | public  |           |         | handles mouse move events when in mouse tracking mode |                |

<hr/>

### Variables

| Name                    | Description | Type |
| ----------------------- | ----------- | ---- |
| `draggableAnchorStyles` |             |      |

<hr/>

### Functions

| Name                      | Description  | Parameters | Return                          |
| ------------------------- | ------------ | ---------- | ------------------------------- |
| `registerDraggableAnchor` |              |            |                                 |
| `draggableAnchorTemplate` | The template |            | `ElementViewTemplate<
    T >` |

<hr/>



### class: `ARSocket`

#### Superclass

| Name                 | Module                                  | Package |
| -------------------- | --------------------------------------- | ------- |
| `FASTAnchoredRegion` | /src/anchored-region/anchored-region.js |         |

#### Fields

| Name                        | Privacy   | Type                                       | Default          | Description                                                                                                                                                                                                                             | Inherited From     |
| --------------------------- | --------- | ------------------------------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `socketFacing`              | public    | `SocketFacing`                             | `"right"`        |                                                                                                                                                                                                                                         |                    |
| `socketActive`              | public    | `boolean`                                  | `false`          |                                                                                                                                                                                                                                         |                    |
| `socketHovered`             | public    | `boolean`                                  | `false`          |                                                                                                                                                                                                                                         |                    |
| `parentTile`                | public    | `ARTile or undefined`                      |                  |                                                                                                                                                                                                                                         |                    |
| `connectedTile`             | public    | `ARTile or undefined`                      |                  |                                                                                                                                                                                                                                         |                    |
| `handleMouseEnter`          | public    |                                            |                  |                                                                                                                                                                                                                                         |                    |
| `handleMouseLeave`          | public    |                                            |                  |                                                                                                                                                                                                                                         |                    |
| `anchor`                    | public    | `string`                                   | `""`             | The HTML ID of the anchor element this region is positioned relative to                                                                                                                                                                 | FASTAnchoredRegion |
| `viewport`                  | public    | `string`                                   | `""`             | The HTML ID of the viewport element this region is positioned relative to                                                                                                                                                               | FASTAnchoredRegion |
| `useVirtualAnchor`          | public    | `boolean`                                  | `false`          | When true the virtual anchor is used                                                                                                                                                                                                    | FASTAnchoredRegion |
| `virtualAnchorX`            | public    | `number`                                   | `0`              | Initial X coordinate when using virtual anchor                                                                                                                                                                                          | FASTAnchoredRegion |
| `virtualAnchorY`            | public    | `number`                                   | `0`              | Initial y coordinate when using virtual anchor                                                                                                                                                                                          | FASTAnchoredRegion |
| `virtualAnchorWidth`        | public    | `number`                                   | `0`              |                                                                                                                                                                                                                                         | FASTAnchoredRegion |
| `virtualAnchorHeight`       | public    | `number`                                   | `0`              |                                                                                                                                                                                                                                         | FASTAnchoredRegion |
| `horizontalPositioningMode` | public    | `AxisPositioningMode`                      | `"uncontrolled"` | Sets what logic the component uses to determine horizontal placement. 'locktodefault' forces the default position 'dynamic' decides placement based on available space 'uncontrolled' does not control placement on the horizontal axis | FASTAnchoredRegion |
| `horizontalDefaultPosition` | public    | `HorizontalPosition`                       | `"unset"`        | The default horizontal position of the region relative to the anchor element                                                                                                                                                            | FASTAnchoredRegion |
| `horizontalViewportLock`    | public    | `boolean`                                  | `false`          | Whether the region remains in the viewport (ie. detaches from the anchor) on the horizontal axis                                                                                                                                        | FASTAnchoredRegion |
| `horizontalInset`           | public    | `boolean`                                  | `false`          | Whether the region overlaps the anchor on the horizontal axis                                                                                                                                                                           | FASTAnchoredRegion |
| `horizontalThreshold`       | public    | `number`                                   |                  | How narrow the space allocated to the default position has to be before the widest area is selected for layout                                                                                                                          | FASTAnchoredRegion |
| `horizontalScaling`         | public    | `AxisScalingMode`                          | `"content"`      | Defines how the width of the region is calculated                                                                                                                                                                                       | FASTAnchoredRegion |
| `verticalPositioningMode`   | public    | `AxisPositioningMode`                      | `"uncontrolled"` | Sets what logic the component uses to determine vertical placement. 'locktodefault' forces the default position 'dynamic' decides placement based on available space 'uncontrolled' does not control placement on the vertical axis     | FASTAnchoredRegion |
| `verticalDefaultPosition`   | public    | `VerticalPosition`                         | `"unset"`        | The default vertical position of the region relative to the anchor element                                                                                                                                                              | FASTAnchoredRegion |
| `verticalViewportLock`      | public    | `boolean`                                  | `false`          | Whether the region remains in the viewport (ie. detaches from the anchor) on the vertical axis                                                                                                                                          | FASTAnchoredRegion |
| `verticalInset`             | public    | `boolean`                                  | `false`          | Whether the region overlaps the anchor on the vertical axis                                                                                                                                                                             | FASTAnchoredRegion |
| `verticalThreshold`         | public    | `number`                                   |                  | How short the space allocated to the default position has to be before the tallest area is selected for layout                                                                                                                          | FASTAnchoredRegion |
| `verticalScaling`           | public    | `AxisScalingMode`                          | `"content"`      | Defines how the height of the region is calculated                                                                                                                                                                                      | FASTAnchoredRegion |
| `fixedPlacement`            | public    | `boolean`                                  | `false`          | Whether the region is positioned using css "position: fixed". Otherwise the region uses "position: absolute". Fixed placement allows the region to break out of parent containers,                                                      | FASTAnchoredRegion |
| `autoUpdateMode`            | public    | `AutoUpdateMode`                           | `"anchor"`       | Defines what triggers the anchored region to revaluate positioning                                                                                                                                                                      | FASTAnchoredRegion |
| `anchorElement`             | public    | `Element or null`                          | `null`           | The element being used as the anchor                                                                                                                                                                                                    | FASTAnchoredRegion |
| `viewportElement`           | public    | `Element or null`                          | `null`           | The HTML element being used as the viewport                                                                                                                                                                                             | FASTAnchoredRegion |
| `verticalPosition`          | public    | `AnchoredRegionPositionLabel or undefined` |                  | indicates the current horizontal position of the region                                                                                                                                                                                 | FASTAnchoredRegion |
| `horizontalPosition`        | public    | `AnchoredRegionPositionLabel or undefined` |                  | indicates the current vertical position of the region                                                                                                                                                                                   | FASTAnchoredRegion |
| `translateX`                | protected | `number`                                   |                  | values to be applied to the component's transform on render                                                                                                                                                                             | FASTAnchoredRegion |
| `translateY`                | protected | `number`                                   |                  |                                                                                                                                                                                                                                         | FASTAnchoredRegion |
| `update`                    | public    |                                            |                  | update position                                                                                                                                                                                                                         | FASTAnchoredRegion |

#### Methods

| Name                               | Privacy   | Description | Parameters                                                           | Return   | Inherited From     |
| ---------------------------------- | --------- | ----------- | -------------------------------------------------------------------- | -------- | ------------------ |
| `socketActiveChanged`              | public    |             |                                                                      | `void`   |                    |
| `socketHoveredChanged`             | public    |             |                                                                      | `void`   |                    |
| `getRotation`                      | public    |             | `anchorRect: DOMRect or undefined, regionRect: DOMRect or undefined` | `number` |                    |
| `getDistance`                      | public    |             | `anchorRect: DOMRect or undefined, regionRect: DOMRect or undefined` | `number` |                    |
| `anchorChanged`                    | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `viewportChanged`                  | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `useVirtualAnchorChanged`          | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `virtualAnchorXChanged`            | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `virtualAnchorYChanged`            | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `virtualAnchorWidthChanged`        | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `virtualAnchorHeightChanged`       | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalPositioningModeChanged` | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalDefaultPositionChanged` | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalViewportLockChanged`    | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalInsetChanged`           | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalThresholdChanged`       | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `horizontalScalingChanged`         | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalPositioningModeChanged`   | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalDefaultPositionChanged`   | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalViewportLockChanged`      | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalInsetChanged`             | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalThresholdChanged`         | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `verticalScalingChanged`           | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `fixedPlacementChanged`            | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `autoUpdateModeChanged`            | protected |             | `prevMode: AutoUpdateMode, newMode: AutoUpdateMode`                  | `void`   | FASTAnchoredRegion |
| `anchorElementChanged`             | protected |             |                                                                      | `void`   | FASTAnchoredRegion |
| `viewportElementChanged`           | protected |             |                                                                      | `void`   | FASTAnchoredRegion |

#### Events

| Name             | Type | Description                                                         | Inherited From     |
| ---------------- | ---- | ------------------------------------------------------------------- | ------------------ |
| `loaded`         |      | Fires a custom 'loaded' event when the region is loaded and visible | FASTAnchoredRegion |
| `positionchange` |      | Fires a custom 'positionchange' event when the position has changed | FASTAnchoredRegion |

#### Attributes

| Name                          | Field                     | Inherited From     |
| ----------------------------- | ------------------------- | ------------------ |
| `socket-facing`               | socketFacing              |                    |
| `anchor`                      | anchor                    | FASTAnchoredRegion |
| `viewport`                    | viewport                  | FASTAnchoredRegion |
| `use-virtual-anchor`          | useVirtualAnchor          | FASTAnchoredRegion |
| `virtual-anchor-x`            | virtualAnchorX            | FASTAnchoredRegion |
| `virtual-anchor-y`            | virtualAnchorY            | FASTAnchoredRegion |
| `virtual-anchor-width`        | virtualAnchorWidth        | FASTAnchoredRegion |
| `virtual-anchor-height`       | virtualAnchorHeight       | FASTAnchoredRegion |
| `horizontal-positioning-mode` | horizontalPositioningMode | FASTAnchoredRegion |
| `horizontal-default-position` | horizontalDefaultPosition | FASTAnchoredRegion |
| `horizontal-viewport-lock`    | horizontalViewportLock    | FASTAnchoredRegion |
| `horizontal-inset`            | horizontalInset           | FASTAnchoredRegion |
| `horizontal-threshold`        | horizontalThreshold       | FASTAnchoredRegion |
| `horizontal-scaling`          | horizontalScaling         | FASTAnchoredRegion |
| `vertical-positioning-mode`   | verticalPositioningMode   | FASTAnchoredRegion |
| `vertical-default-position`   | verticalDefaultPosition   | FASTAnchoredRegion |
| `vertical-viewport-lock`      | verticalViewportLock      | FASTAnchoredRegion |
| `vertical-inset`              | verticalInset             | FASTAnchoredRegion |
| `vertical-threshold`          | verticalThreshold         | FASTAnchoredRegion |
| `vertical-scaling`            | verticalScaling           | FASTAnchoredRegion |
| `fixed-placement`             | fixedPlacement            | FASTAnchoredRegion |
| `auto-update-mode`            | autoUpdateMode            | FASTAnchoredRegion |

<hr/>

### Variables

| Name             | Description | Type                                                                                |
| ---------------- | ----------- | ----------------------------------------------------------------------------------- |
| `SocketFacing`   |             | `{ top: "top", bottom: "bottom", left: "left", right: "right", center: "center", }` |
| `arSocketStyles` |             |                                                                                     |

<hr/>

### Functions

| Name               | Description  | Parameters | Return                   |
| ------------------ | ------------ | ---------- | ------------------------ |
| `registerARSocket` |              |            |                          |
| `arSocketTemplate` | The template |            | `ElementViewTemplate<T>` |

<hr/>



### class: `ARTile`

#### Superclass

| Name                 | Module                                  | Package |
| -------------------- | --------------------------------------- | ------- |
| `FASTAnchoredRegion` | /src/anchored-region/anchored-region.js |         |

#### Fields

| Name                        | Privacy   | Type                                       | Default           | Description                                                                                                                                                                                                                             | Inherited From     |
| --------------------------- | --------- | ------------------------------------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `tileData`                  | public    | `TileData`                                 |                   |                                                                                                                                                                                                                                         |                    |
| `horizontalPositioningMode` | public    | `AxisPositioningMode`                      | `"locktodefault"` | Sets what logic the component uses to determine horizontal placement. 'locktodefault' forces the default position 'dynamic' decides placement based on available space 'uncontrolled' does not control placement on the horizontal axis | FASTAnchoredRegion |
| `verticalPositioningMode`   | public    | `AxisPositioningMode`                      | `"locktodefault"` | Sets what logic the component uses to determine vertical placement. 'locktodefault' forces the default position 'dynamic' decides placement based on available space 'uncontrolled' does not control placement on the vertical axis     | FASTAnchoredRegion |
| `verticalDefaultPosition`   | public    | `VerticalPosition`                         | `"center"`        | The default vertical position of the region relative to the anchor element                                                                                                                                                              | FASTAnchoredRegion |
| `horizontalDefaultPosition` | public    | `HorizontalPosition`                       | `"center"`        | The default horizontal position of the region relative to the anchor element                                                                                                                                                            | FASTAnchoredRegion |
| `horizontalScaling`         | public    | `AxisScalingMode`                          | `"anchor"`        | Defines how the width of the region is calculated                                                                                                                                                                                       | FASTAnchoredRegion |
| `verticalScaling`           | public    | `AxisScalingMode`                          | `"anchor"`        | Defines how the height of the region is calculated                                                                                                                                                                                      | FASTAnchoredRegion |
| `dragging`                  | public    | `boolean`                                  | `false`           |                                                                                                                                                                                                                                         |                    |
| `socketTop`                 | public    | `ARSocket`                                 |                   |                                                                                                                                                                                                                                         |                    |
| `socketRight`               | public    | `ARSocket`                                 |                   |                                                                                                                                                                                                                                         |                    |
| `socketBottom`              | public    | `ARSocket`                                 |                   |                                                                                                                                                                                                                                         |                    |
| `socketLeft`                | public    | `ARSocket`                                 |                   |                                                                                                                                                                                                                                         |                    |
| `sockets`                   | public    | `ARSocket[]`                               | `[]`              |                                                                                                                                                                                                                                         |                    |
| `handleMouseDown`           | public    |                                            |                   |                                                                                                                                                                                                                                         |                    |
| `handleMouseUp`             | public    |                                            |                   |                                                                                                                                                                                                                                         |                    |
| `handleMouseMove`           | public    |                                            |                   | handles mouse move events when in mouse tracking mode                                                                                                                                                                                   |                    |
| `handleTransitionEnd`       | public    |                                            |                   |                                                                                                                                                                                                                                         |                    |
| `anchor`                    | public    | `string`                                   | `""`              | The HTML ID of the anchor element this region is positioned relative to                                                                                                                                                                 | FASTAnchoredRegion |
| `viewport`                  | public    | `string`                                   | `""`              | The HTML ID of the viewport element this region is positioned relative to                                                                                                                                                               | FASTAnchoredRegion |
| `useVirtualAnchor`          | public    | `boolean`                                  | `false`           | When true the virtual anchor is used                                                                                                                                                                                                    | FASTAnchoredRegion |
| `virtualAnchorX`            | public    | `number`                                   | `0`               | Initial X coordinate when using virtual anchor                                                                                                                                                                                          | FASTAnchoredRegion |
| `virtualAnchorY`            | public    | `number`                                   | `0`               | Initial y coordinate when using virtual anchor                                                                                                                                                                                          | FASTAnchoredRegion |
| `virtualAnchorWidth`        | public    | `number`                                   | `0`               |                                                                                                                                                                                                                                         | FASTAnchoredRegion |
| `virtualAnchorHeight`       | public    | `number`                                   | `0`               |                                                                                                                                                                                                                                         | FASTAnchoredRegion |
| `horizontalViewportLock`    | public    | `boolean`                                  | `false`           | Whether the region remains in the viewport (ie. detaches from the anchor) on the horizontal axis                                                                                                                                        | FASTAnchoredRegion |
| `horizontalInset`           | public    | `boolean`                                  | `false`           | Whether the region overlaps the anchor on the horizontal axis                                                                                                                                                                           | FASTAnchoredRegion |
| `horizontalThreshold`       | public    | `number`                                   |                   | How narrow the space allocated to the default position has to be before the widest area is selected for layout                                                                                                                          | FASTAnchoredRegion |
| `verticalViewportLock`      | public    | `boolean`                                  | `false`           | Whether the region remains in the viewport (ie. detaches from the anchor) on the vertical axis                                                                                                                                          | FASTAnchoredRegion |
| `verticalInset`             | public    | `boolean`                                  | `false`           | Whether the region overlaps the anchor on the vertical axis                                                                                                                                                                             | FASTAnchoredRegion |
| `verticalThreshold`         | public    | `number`                                   |                   | How short the space allocated to the default position has to be before the tallest area is selected for layout                                                                                                                          | FASTAnchoredRegion |
| `fixedPlacement`            | public    | `boolean`                                  | `false`           | Whether the region is positioned using css "position: fixed". Otherwise the region uses "position: absolute". Fixed placement allows the region to break out of parent containers,                                                      | FASTAnchoredRegion |
| `autoUpdateMode`            | public    | `AutoUpdateMode`                           | `"anchor"`        | Defines what triggers the anchored region to revaluate positioning                                                                                                                                                                      | FASTAnchoredRegion |
| `anchorElement`             | public    | `Element or null`                          | `null`            | The element being used as the anchor                                                                                                                                                                                                    | FASTAnchoredRegion |
| `viewportElement`           | public    | `Element or null`                          | `null`            | The HTML element being used as the viewport                                                                                                                                                                                             | FASTAnchoredRegion |
| `verticalPosition`          | public    | `AnchoredRegionPositionLabel or undefined` |                   | indicates the current horizontal position of the region                                                                                                                                                                                 | FASTAnchoredRegion |
| `horizontalPosition`        | public    | `AnchoredRegionPositionLabel or undefined` |                   | indicates the current vertical position of the region                                                                                                                                                                                   | FASTAnchoredRegion |
| `translateX`                | protected | `number`                                   |                   | values to be applied to the component's transform on render                                                                                                                                                                             | FASTAnchoredRegion |
| `translateY`                | protected | `number`                                   |                   |                                                                                                                                                                                                                                         | FASTAnchoredRegion |
| `update`                    | public    |                                            |                   | update position                                                                                                                                                                                                                         | FASTAnchoredRegion |

#### Methods

| Name                               | Privacy   | Description | Parameters                                          | Return | Inherited From     |
| ---------------------------------- | --------- | ----------- | --------------------------------------------------- | ------ | ------------------ |
| `draggingChanged`                  | public    |             |                                                     | `void` |                    |
| `anchorChanged`                    | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `viewportChanged`                  | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `useVirtualAnchorChanged`          | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `virtualAnchorXChanged`            | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `virtualAnchorYChanged`            | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `virtualAnchorWidthChanged`        | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `virtualAnchorHeightChanged`       | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `horizontalPositioningModeChanged` | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `horizontalDefaultPositionChanged` | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `horizontalViewportLockChanged`    | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `horizontalInsetChanged`           | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `horizontalThresholdChanged`       | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `horizontalScalingChanged`         | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `verticalPositioningModeChanged`   | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `verticalDefaultPositionChanged`   | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `verticalViewportLockChanged`      | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `verticalInsetChanged`             | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `verticalThresholdChanged`         | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `verticalScalingChanged`           | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `fixedPlacementChanged`            | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `autoUpdateModeChanged`            | protected |             | `prevMode: AutoUpdateMode, newMode: AutoUpdateMode` | `void` | FASTAnchoredRegion |
| `anchorElementChanged`             | protected |             |                                                     | `void` | FASTAnchoredRegion |
| `viewportElementChanged`           | protected |             |                                                     | `void` | FASTAnchoredRegion |

#### Events

| Name             | Type | Description                                                         | Inherited From     |
| ---------------- | ---- | ------------------------------------------------------------------- | ------------------ |
| `loaded`         |      | Fires a custom 'loaded' event when the region is loaded and visible | FASTAnchoredRegion |
| `positionchange` |      | Fires a custom 'positionchange' event when the position has changed | FASTAnchoredRegion |

#### Attributes

| Name                          | Field                     | Inherited From     |
| ----------------------------- | ------------------------- | ------------------ |
| `anchor`                      | anchor                    | FASTAnchoredRegion |
| `viewport`                    | viewport                  | FASTAnchoredRegion |
| `use-virtual-anchor`          | useVirtualAnchor          | FASTAnchoredRegion |
| `virtual-anchor-x`            | virtualAnchorX            | FASTAnchoredRegion |
| `virtual-anchor-y`            | virtualAnchorY            | FASTAnchoredRegion |
| `virtual-anchor-width`        | virtualAnchorWidth        | FASTAnchoredRegion |
| `virtual-anchor-height`       | virtualAnchorHeight       | FASTAnchoredRegion |
| `horizontal-positioning-mode` | horizontalPositioningMode | FASTAnchoredRegion |
| `horizontal-default-position` | horizontalDefaultPosition | FASTAnchoredRegion |
| `horizontal-viewport-lock`    | horizontalViewportLock    | FASTAnchoredRegion |
| `horizontal-inset`            | horizontalInset           | FASTAnchoredRegion |
| `horizontal-threshold`        | horizontalThreshold       | FASTAnchoredRegion |
| `horizontal-scaling`          | horizontalScaling         | FASTAnchoredRegion |
| `vertical-positioning-mode`   | verticalPositioningMode   | FASTAnchoredRegion |
| `vertical-default-position`   | verticalDefaultPosition   | FASTAnchoredRegion |
| `vertical-viewport-lock`      | verticalViewportLock      | FASTAnchoredRegion |
| `vertical-inset`              | verticalInset             | FASTAnchoredRegion |
| `vertical-threshold`          | verticalThreshold         | FASTAnchoredRegion |
| `vertical-scaling`            | verticalScaling           | FASTAnchoredRegion |
| `fixed-placement`             | fixedPlacement            | FASTAnchoredRegion |
| `auto-update-mode`            | autoUpdateMode            | FASTAnchoredRegion |

<hr/>

### Variables

| Name           | Description | Type |
| -------------- | ----------- | ---- |
| `arTileStyles` |             |      |

<hr/>

### Functions

| Name             | Description  | Parameters | Return                   |
| ---------------- | ------------ | ---------- | ------------------------ |
| `registerARTile` |              |            |                          |
| `arTileTemplate` | The template |            | `ElementViewTemplate<T>` |

<hr/>



### class: `ARTiles`

#### Superclass

| Name          | Module | Package                 |
| ------------- | ------ | ----------------------- |
| `FASTElement` |        | @microsoft/fast-element |

#### Fields

| Name                           | Privacy | Type                   | Default | Description | Inherited From |
| ------------------------------ | ------- | ---------------------- | ------- | ----------- | -------------- |
| `tileData`                     | public  | `TileData[]`           | `[]`    |             |                |
| `gameConfig`                   | public  | `GameConfig`           |         |             |                |
| `boardData`                    | public  | `object[]`             | `[]`    |             |                |
| `dispensersData`               | public  | `object[]`             | `[]`    |             |                |
| `boardColumnDefinitions`       | public  | `ColumnDefinition[]`   | `[]`    |             |                |
| `dispensersColumnDefinitions`  | public  | `ColumnDefinition[]`   | `[]`    |             |                |
| `score`                        | public  | `number`               | `0`     |             |                |
| `bestGame`                     | public  | `GameState`            |         |             |                |
| `layout`                       | public  | `HTMLDivElement`       |         |             |                |
| `board`                        | public  | `FASTDataGrid`         |         |             |                |
| `hand`                         | public  | `HTMLDivElement`       |         |             |                |
| `savedGameDisplay`             | public  | `HTMLDivElement`       |         |             |                |
| `scorePanel`                   | public  | `ScorePanel`           |         |             |                |
| `allTiles`                     | public  | `ARTile[]`             | `[]`    |             |                |
| `enablePrevious`               | public  | `boolean`              | `false` |             |                |
| `enableNext`                   | public  | `boolean`              | `false` |             |                |
| `enableLoad`                   | public  | `boolean`              | `false` |             |                |
| `showLoadMenu`                 | public  | `boolean`              | `false` |             |                |
| `showTiles`                    | public  | `boolean`              | `false` |             |                |
| `showScoring`                  | public  | `boolean`              | `false` |             |                |
| `savedGames`                   | public  | `GameState[]`          | `[]`    |             |                |
| `currentBoardValid`            | public  | `boolean or undefined` |         |             |                |
| `boardGridTemplateColumns`     | public  | `string`               |         |             |                |
| `tileSize`                     | public  | `number`               |         |             |                |
| `playableTileData`             | public  | `TileData[]`           | `[]`    |             |                |
| `handleBoardDispenserInvoked`  | public  |                        |         |             |                |
| `handleHandDispenserInovoked`  | public  |                        |         |             |                |
| `handleDragTileStart`          | public  |                        |         |             |                |
| `handleDragTilePositionChange` | public  |                        |         |             |                |
| `handleDragTileEnd`            | public  |                        |         |             |                |
| `handleTileDrag`               | public  |                        |         |             |                |
| `handleDispenserConnected`     | public  |                        |         |             |                |
| `handleDispenserDisconnected`  | public  |                        |         |             |                |
| `handleSocketConnected`        | public  |                        |         |             |                |
| `handleSocketDisconnected`     | public  |                        |         |             |                |
| `handleSocketHovered`          | public  |                        |         |             |                |
| `handlePreviousClick`          | public  |                        |         |             |                |
| `handleNextClick`              | public  |                        |         |             |                |
| `handleSocketUnhovered`        | public  |                        |         |             |                |
| `handleSaveGameClick`          | public  |                        |         |             |                |
| `handleLoadGameClick`          | public  |                        |         |             |                |
| `handleLoadSaveGameClick`      | public  |                        |         |             |                |
| `handleShowScoringClick`       | public  |                        |         |             |                |
| `handleValidateClick`          | public  |                        |         |             |                |
| `loadBestGame`                 | public  |                        |         |             |                |

#### Methods

| Name                | Privacy | Description | Parameters | Return | Inherited From |
| ------------------- | ------- | ----------- | ---------- | ------ | -------------- |
| `gameConfigChanged` | public  |             |            | `void` |                |

<hr/>

### Variables

| Name            | Description | Type |
| --------------- | ----------- | ---- |
| `arTilesStyles` |             |      |

<hr/>

### Functions

| Name              | Description  | Parameters | Return                   |
| ----------------- | ------------ | ---------- | ------------------------ |
| `registerARTiles` |              |            |                          |
| `arTilesTemplate` | The template |            | `ElementViewTemplate<T>` |

<hr/>



### class: `HandPane`

#### Superclass

| Name          | Module | Package                 |
| ------------- | ------ | ----------------------- |
| `FASTElement` |        | @microsoft/fast-element |

#### Fields

| Name             | Privacy | Type            | Default | Description | Inherited From |
| ---------------- | ------- | --------------- | ------- | ----------- | -------------- |
| `tileDispensers` | public  | `HTMLElement[]` | `[]`    |             |                |

<hr/>

### Variables

| Name             | Description | Type |
| ---------------- | ----------- | ---- |
| `handPaneStyles` |             |      |

<hr/>

### Functions

| Name               | Description  | Parameters | Return                   |
| ------------------ | ------------ | ---------- | ------------------------ |
| `registerHandPane` |              |            |                          |
| `handPaneTemplate` | The template |            | `ElementViewTemplate<T>` |

<hr/>



### class: `ScorePanel`

#### Superclass

| Name          | Module | Package                 |
| ------------- | ------ | ----------------------- |
| `FASTElement` |        | @microsoft/fast-element |

#### Fields

| Name                       | Privacy | Type          | Default | Description | Inherited From |
| -------------------------- | ------- | ------------- | ------- | ----------- | -------------- |
| `horizontalWords`          | public  | `ScoreWord[]` | `[]`    |             |                |
| `verticalWords`            | public  | `ScoreWord[]` | `[]`    |             |                |
| `bestGame`                 | public  | `GameState`   |         |             |                |
| `wordDisplay`              | public  | `FASTMenu`    |         |             |                |
| `menuTooltip`              | public  | `FASTTooltip` |         |             |                |
| `handleMenuItemMouseEnter` | public  |               |         |             |                |
| `handleMenuItemMouseLeave` | public  |               |         |             |                |
| `handleMenuItemFocusIn`    | public  |               |         |             |                |
| `handleMenuItemFocusOut`   | public  |               |         |             |                |

<hr/>

### Variables

| Name               | Description | Type |
| ------------------ | ----------- | ---- |
| `scorePanelStyles` |             |      |

<hr/>

### Functions

| Name                 | Description  | Parameters | Return                   |
| -------------------- | ------------ | ---------- | ------------------------ |
| `registerScorePanel` |              |            |                          |
| `scorePanelTemplate` | The template |            | `ElementViewTemplate<T>` |

<hr/>



### class: `TileDispenser`

#### Superclass

| Name               | Module        | Package |
| ------------------ | ------------- | ------- |
| `FASTDataGridCell` | /src/index.js |         |

#### Fields

| Name               | Privacy | Type                       | Default | Description                                                                                               | Inherited From   |
| ------------------ | ------- | -------------------------- | ------- | --------------------------------------------------------------------------------------------------------- | ---------------- |
| `connectedTile`    | public  | `ARTile or undefined`      |         |                                                                                                           |                  |
| `active`           | public  | `boolean`                  | `false` |                                                                                                           |                  |
| `cellType`         | public  | `DataGridCellTypes`        |         | The type of cell                                                                                          | FASTDataGridCell |
| `gridColumn`       | public  | `string`                   |         | The column index of the cell. This will be applied to the css grid-column-index value applied to the cell | FASTDataGridCell |
| `rowData`          | public  | `object or null`           | `null`  | The base data for the parent row                                                                          | FASTDataGridCell |
| `columnDefinition` | public  | `ColumnDefinition or null` | `null`  | The base data for the column                                                                              | FASTDataGridCell |

#### Methods

| Name                      | Privacy   | Description | Parameters                                                               | Return | Inherited From   |
| ------------------------- | --------- | ----------- | ------------------------------------------------------------------------ | ------ | ---------------- |
| `handleKeydown`           | public    |             | `e: KeyboardEvent`                                                       | `void` | FASTDataGridCell |
| `gridColumnChanged`       | protected |             |                                                                          | `void` | FASTDataGridCell |
| `columnDefinitionChanged` | protected |             | `oldValue: ColumnDefinition or null, newValue: ColumnDefinition or null` | `void` | FASTDataGridCell |
| `handleFocusin`           | public    |             | `e: FocusEvent`                                                          | `void` | FASTDataGridCell |
| `handleFocusout`          | public    |             | `e: FocusEvent`                                                          | `void` | FASTDataGridCell |

#### Events

| Name           | Type | Description                                                                   | Inherited From   |
| -------------- | ---- | ----------------------------------------------------------------------------- | ---------------- |
| `cell-focused` |      | Fires a custom 'cell-focused' event when focus is on the cell or its contents | FASTDataGridCell |

#### Attributes

| Name          | Field      | Inherited From   |
| ------------- | ---------- | ---------------- |
| `cell-type`   | cellType   | FASTDataGridCell |
| `grid-column` | gridColumn | FASTDataGridCell |

<hr/>

### Variables

| Name                  | Description | Type |
| --------------------- | ----------- | ---- |
| `tileDispenserStyles` |             |      |

<hr/>

### Functions

| Name                    | Description  | Parameters | Return                   |
| ----------------------- | ------------ | ---------- | ------------------------ |
| `registerTileDispenser` |              |            |                          |
| `tileDispenserTemplate` | The template |            | `ElementViewTemplate<T>` |

<hr/>


## Additional resources

* [Component explorer examples](https://explore.fast.design/components/fast-anchored-region)
* [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/anchored-region/anchored-region.spec.md)