---
metaTitle: Select сomponent | Awes.io
meta:
  - name: description
    content: The &lt;AwSelect /&gt; component is used to render Select - UI Vue component for Awes.io.
title: Select
---
# Select

The `AwSelect` component is used to render Select.


## Usage
Several examples how you can use `AwSelect`.

### Default example

<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-select&module=%2Fpages%2Faw-select.vue&theme=dark&view=editor'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Ajax usage

<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-select_ajax&module=%2Fpages%2Faw-select_ajax.vue&theme=dark'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

### Object usage

<iframe
     src='https://codesandbox.io/embed/github/awes-io/client/tree/master/examples/basic-ui?autoresize=1&fontsize=14&hidenavigation=1&initialpath=%2Faw-select_object&module=%2Fpages%2Faw-select_object.vue&theme=dark'
     style='width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;'
     title='basic-ui'
     allow='geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
     sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
   ></iframe>

## API
Select your desired component from below and see the available props, slots, events and functions.

### Props
Below is a collection of Vue **props** for the `AwSelect` component.
<!-- @vuese:AwSelect:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|options|-|`Array` /  `Function`|`false`|function means isAjax|
|label|-|`String`|`false`|-|
|value|-|—|`false`|-|
|optionLabel|-|`String`|`false`|-|
|trackBy|-|`String`|`false`|-|
|searchable|-|`Boolean`|`false`|-|
|clearable|Show clear button if value exists|`Boolean`|`false`|-|
|maxSearchItems|-|`Number`|`false`|100|
|multiple|name: { type: String, default: '' }, Allow select multiple values|`Boolean`|`false`|-|
|multipleSeparator|Separator for multiple values|`String`|`false`|, |
|searchPreload|ajax|`Array` /  `Object` /  `Boolean`|`false`|-|
|searchMin|-|`Number`|`false`|-|
|debounce|-|`Number`|`false`|400|

<!-- @vuese:AwSelect:props:end -->

### Slots
Below is a collection of Vue **slots** for the `AwSelect` component.
<!-- @vuese:AwSelect:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|dropdown|-|not equal|
|not-equal|-|-|
|option-label|-|-|
|not-found|-|-|

<!-- @vuese:AwSelect:slots:end -->

### Events
Below is a collection of Vue **events** for the `AwSelect` component.
<!-- @vuese:AwSelect:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|
|search|-|-|
|not-found|-|-|
|not-equal|-|-|
|preloaded|-|-|

<!-- @vuese:AwSelect:events:end -->
