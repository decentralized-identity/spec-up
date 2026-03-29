# Toast Item [Pro]

**Full documentation:** https://webawesome.com/docs/components/toast-item

> This component requires [Web Awesome Pro](https://webawesome.com/purchase).
`<wa-toast-item>` Since 3.3 Experimental Pro Toast-item requires access to Web Awesome Pro

Toast items are individual notifications displayed within a toast container.

Toast items are the individual notifications that appear within a `<wa-toast>` container. This page documents the toast item's anatomy and styling options.

```html
<wa-toast-item variant="brand" duration="0">
  <wa-icon slot="icon" name="bell"></wa-icon>
  This is how a toast item looks!
</wa-toast-item>
```

Toast items are designed to be used within a `<wa-toast>` container, which manages their lifecycle and positioning. For usage examples showing how to display notifications, see the [Toast documentation](https://webawesome.com/docs/components/toast).

## Examples

### Variants

Use the `variant` attribute to change the toast item's visual style. The variant determines the accent color on the left side and the icon color. Available variants are `neutral` (default), `brand`, `success`, `warning`, and `danger`.

```html
<div class="wa-stack">
  <wa-toast-item variant="neutral" duration="0">
    <wa-icon slot="icon" name="gear"></wa-icon>
    Neutral variant (default)
  </wa-toast-item>

  <wa-toast-item variant="brand" duration="0">
    <wa-icon slot="icon" name="circle-info"></wa-icon>
    Brand variant
  </wa-toast-item>

  <wa-toast-item variant="success" duration="0">
    <wa-icon slot="icon" name="check"></wa-icon>
    Success variant
  </wa-toast-item>

  <wa-toast-item variant="warning" duration="0">
    <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
    Warning variant
  </wa-toast-item>

  <wa-toast-item variant="danger" duration="0">
    <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
    Danger variant
  </wa-toast-item>
</div>
```

### Sizes

Use the `size` attribute to change the toast item's size.

```html
<div class="wa-stack">
  <wa-toast-item size="small" duration="0">
    <wa-icon slot="icon" name="mouse-field"></wa-icon>
    Small
  </wa-toast-item>

  <wa-toast-item size="medium" duration="0">
    <wa-icon slot="icon" name="horse"></wa-icon>
    Medium (default)
  </wa-toast-item>

  <wa-toast-item size="large" duration="0">
    <wa-icon slot="icon" name="elephant"></wa-icon>
    Large
  </wa-toast-item>
</div>
```

### Icons

Use the `icon` slot to display an icon at the start of the toast item. The icon color automatically matches the variant's accent color.

```html
<div class="wa-stack">
  <wa-toast-item variant="success" duration="0">
    <wa-icon slot="icon" name="check"></wa-icon>
    Your changes have been saved!
  </wa-toast-item>

  <wa-toast-item variant="brand" duration="0">
    <wa-icon slot="icon" name="envelope"></wa-icon>
    You have 3 new messages
  </wa-toast-item>

  <wa-toast-item variant="warning" duration="0">
    <wa-icon slot="icon" name="clock"></wa-icon>
    Your session will expire soon
  </wa-toast-item>
</div>
```

Toast items work fine without icons too.

```html
<wa-toast-item variant="neutral" duration="0">
  A simple notification without an icon.
</wa-toast-item>
```

### Rich Content

The default slot accepts any HTML content, allowing you to create rich notifications with formatted text, links, and interactive elements.

```html
<div class="wa-stack">
  <wa-toast-item variant="brand" duration="0">
    <wa-icon slot="icon" name="bell"></wa-icon>
    <strong>New message from Alex</strong><br>
    Hey, are you available for a quick call?
  </wa-toast-item>

  <wa-toast-item variant="success" duration="0">
    <wa-icon slot="icon" name="cloud-arrow-up"></wa-icon>
    <strong>Upload complete</strong><br>
    <a href="#">View file</a> · <a href="#">Share</a>
  </wa-toast-item>

  <wa-toast-item variant="brand" duration="0">
    <wa-icon slot="icon" name="gift"></wa-icon>
    You've earned a reward!
    <div style="margin-block-start: var(--wa-space-xs);">
      <wa-button variant="brand" size="small">Claim Now</wa-button>
      <wa-button appearance="filled" size="small">Later</wa-button>
    </div>
  </wa-toast-item>
</div>
```

### Duration

The `duration` attribute controls how long the toast item displays before automatically dismissing (in milliseconds). The default is `5000` (5 seconds). Set to `0` to disable auto-dismissal.

When a duration is set, a progress ring appears around the close button showing the remaining time.

```html
<wa-toast-item variant="brand" duration="5000">...</wa-toast-item>
<wa-toast-item variant="brand" duration="10000">...</wa-toast-item>
<wa-toast-item variant="brand" duration="0">...</wa-toast-item>
```

### Hover Behavior

Toast items automatically pause their countdown timer when the user hovers over them, giving more time to read the content. When the mouse leaves, the timer resets and begins counting down again.

### The Close Button

Every toast item includes a close button that allows users to dismiss the notification. When `duration` is greater than `0`, the close button displays a progress ring showing the remaining time.

```html
<wa-toast-item variant="neutral" duration="0">
  <wa-icon slot="icon" name="circle-info"></wa-icon>
  Click the close button on the right to dismiss →
</wa-toast-item>
```

### Customizing the Accent

Use the `--accent-width` custom property to adjust the width of the accent line, or hide it entirely.

```html
<div class="wa-stack">
  <wa-toast-item variant="brand" duration="0" style="--accent-width: 8px;">
    <wa-icon slot="icon" name="star"></wa-icon>
    Thicker accent line
  </wa-toast-item>

  <wa-toast-item variant="success" duration="0" style="--accent-width: 0;">
    <wa-icon slot="icon" name="check"></wa-icon>
    No accent line
  </wa-toast-item>
</div>
```

### Customizing the Padding

Use the `--padding` custom property to adjust the internal spacing.

```html
<div class="wa-stack">
  <wa-toast-item variant="brand" duration="0" style="--padding: var(--wa-space-xs);">
    <wa-icon slot="icon" name="compress"></wa-icon>
    Compact padding
  </wa-toast-item>

  <wa-toast-item variant="brand" duration="0" style="--padding: var(--wa-space-xl);">
    <wa-icon slot="icon" name="expand"></wa-icon>
    Spacious padding
  </wa-toast-item>
</div>
```

## Importing

Autoloading components via [projects](https://webawesome.com/docs/#using-a-project) is the recommended way to import components. If you prefer to do it manually, use one of the following code snippets.

\*\*CDN\*\*

Let your project code do the work! [Sign up for free](https://webawesome.com/signup) to use a project with your very own CDN — it's the fastest and easiest way to use Web Awesome.

\*\*npm\*\*

To manually import this component from NPM, use the following code.

```js
import '@awesome.me/webawesome/dist/components/toast-item/toast-item.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaToastItem from '@awesome.me/webawesome/dist/react/toast-item';
```

## Slots

Learn more about [using slots](https://webawesome.com/docs/usage/#slots).

| Name | Description |
| --- | --- |
| (default) | The toast item's message content. |
| \`icon\` | An optional icon to show at the start of the toast item. |

## Attributes & Properties

Learn more about [attributes and properties](https://webawesome.com/docs/usage/#attributes-and-properties).

| Name | Description | Reflects |
| --- | --- | --- |
| \`css\` | \`CSSResultGroup \\| undefined\` One or more CSSResultGroup to include in the component's shadow root. Host styles are automatically prepended. Type Default \[styles, variantStyles, sizeStyles\] | | |
| \`duration\` duration | \`number\` The length of time in milliseconds before the toast item is automatically dismissed. Set to 0 to keep the toast item open until the user dismisses it. Type Default 5000 | | |
| \`size\` size | \`'small' \\| 'medium' \\| 'large'\` The toast item's size. Type Default 'medium' | | |
| \`variant\` variant | \`'brand' \\| 'success' \\| 'warning' \\| 'danger' \\| 'neutral'\` The toast item's variant. Type Default 'neutral' | | |

## Methods

Learn more about [methods](https://webawesome.com/docs/usage/#methods).

| Name | Description | Arguments |
| --- | --- | --- |
| \`hide()\` | Hides the toast item with animation and removes it from the DOM. | |

## Events

Learn more about [events](https://webawesome.com/docs/usage/#events).

| Name | Description |
| --- | --- |
| \`wa-after-hide\` | Emitted after the toast item has finished hiding. |
| \`wa-after-show\` | Emitted after the toast item has finished showing. |
| \`wa-hide\` | Emitted when the toast item begins to hide. |
| \`wa-show\` | Emitted when the toast item begins to show. |

## CSS custom properties

Learn more about [CSS custom properties](https://webawesome.com/docs/customizing/#custom-properties).

| Name | Description |
| --- | --- |
| \`--accent-width\` | The width of the accent line. Defaults to 4px. |
| \`--hide-duration\` | The animation duration when hiding. Defaults to 200ms. |
| \`--show-duration\` | The animation duration when showing. Defaults to 200ms. |

## CSS parts

Learn more about [CSS parts](https://webawesome.com/docs/customizing/#css-parts).

| Name | Description | CSS selector |
| --- | --- | --- |
| \`accent\` | The colored accent line on the start side. | \`::part(accent)\` |
| \`close-button\` | The close button element. | \`::part(close-button)\` |
| \`close-icon\` | The close icon element. | \`::part(close-icon)\` |
| \`close-icon\_\_svg\` | The close icon's exported svg part. | \`::part(close-icon\_\_svg)\` |
| \`content\` | The message content container. | \`::part(content)\` |
| \`icon\` | The icon container. | \`::part(icon)\` |
| \`progress-ring\` | The progress ring component. | \`::part(progress-ring)\` |
| \`progress-ring\_\_base\` | The progress ring's exported base part. | \`::part(progress-ring\_\_base)\` |
| \`progress-ring\_\_indicator\` | The progress ring's exported indicator part. | \`::part(progress-ring\_\_indicator)\` |
| \`progress-ring\_\_label\` | The progress ring's exported label part. | \`::part(progress-ring\_\_label)\` |
| \`progress-ring\_\_track\` | The progress ring's exported track part. | \`::part(progress-ring\_\_track)\` |
| \`toast-item\` | The toast item's main container. | \`::part(toast-item)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)
-   [`<wa-progress-ring>`](https://webawesome.com/docs/components/progress-ring)

**Need a hand?** Report a bug Ask for help