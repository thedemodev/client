---
metaTitle: Avatar сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwAvatar /&gt; component is used to render Avatar - UI Vue component for Awes.io.
title: Avatar
---
# Avatar

The `AwAvatar` component is used to render Avatar.


## Usage
Several examples how you can use `AwAvatar`.


### Live Example
<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-avatar&module=%2Fpages%2Faw-avatar.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwAvatar` component.
<!-- @vuese:AwAvatar:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|src|Full URL to the picture|`String`|`false`|-|
|name|User name|`String`|`false`|-|
|size|Size of the image|`Number` /  `String`|`false`|36|
|type|Type of the rendered image.|`String`|`false`|initials , empty, no-img|
|isColored|To bring the color to the rounded background.|`Boolean`|`false`|-|

<!-- @vuese:AwAvatar:props:end -->


## Slots
<!-- @vuese:AwAvatar:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|-|-|
|no-img|-|-|

<!-- @vuese:AwAvatar:slots:end -->
                            