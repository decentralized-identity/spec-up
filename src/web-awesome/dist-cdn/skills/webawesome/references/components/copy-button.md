# Copy Button

**Full documentation:** https://webawesome.com/docs/components/copy-button


`<wa-copy-button>` Since 2.7 Experimental

Copies text data to the clipboard when the user clicks the trigger.

```html
<wa-copy-button value="Web Awesome rocks!"></wa-copy-button>
```

Copy buttons use the browser's [`clipboard.writeText()`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) method, which requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (HTTPS) in most browsers.

## Examples

### Custom Labels

Copy Buttons display feedback in a tooltip. You can customize the labels using the `copy-label`, `success-label`, and `error-label` attributes.

```html
<wa-copy-button
  value="Custom labels are easy"
  copy-label="Click to copy"
  success-label="You did it!"
  error-label="Whoops, your browser doesn't support this!"
></wa-copy-button>
```

### Custom Icons

Use the `copy-icon`, `success-icon`, and `error-icon` slots to customize the icons that get displayed for each state. You can use [`<wa-icon>`](https://webawesome.com/docs/components/icon) or your own images.

```html
<wa-copy-button value="Copied from a custom button">
  <wa-icon slot="copy-icon" name="clipboard" variant="regular"></wa-icon>
  <wa-icon slot="success-icon" name="thumbs-up" variant="solid"></wa-icon>
  <wa-icon slot="error-icon" name="xmark" variant="solid"></wa-icon>
</wa-copy-button>
```

### Copying Values From Other Elements

Normally, the data that gets copied will come from the component's `value` attribute, but you can copy data from any element within the same document by providing its `id` to the `from` attribute.

When using the `from` attribute, the element's [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) will be copied by default. Passing an attribute or property modifier will let you copy data from one of the element's attributes or properties instead.

To copy data from an attribute, use `from="id[attr]"` where `id` is the id of the target element and `attr` is the name of the attribute you'd like to copy. To copy data from a property, use `from="id.prop"` where `id` is the id of the target element and `prop` is the name of the property you'd like to copy.

```html
<!-- Copies the span's textContent -->
<span id="my-phone">+1 (234) 456-7890</span>
<wa-copy-button from="my-phone"></wa-copy-button>

<br /><br />

<!-- Copies the input's "value" property -->
<span class="wa-align-items-center wa-gap-2xs">
  <wa-input id="my-input" type="text" value="User input" style="display: inline-block; max-width: 300px;"></wa-input>
  <wa-copy-button from="my-input.value"></wa-copy-button>
</span>

<br />

<!-- Copies the link's "href" attribute -->
<a id="my-link" href="https://shoelace.style/">Web Awesome Website</a>
<wa-copy-button from="my-link[href]"></wa-copy-button>
```

### Handling Errors

A copy error will occur if the value is an empty string, if the `from` attribute points to an id that doesn't exist, or if the browser rejects the operation for any reason. When this happens, the `wa-error` event will be emitted.

This example demonstrates what happens when a copy error occurs. You can customize the error label and icon using the `error-label` attribute and the `error-icon` slot, respectively.

```html
<wa-copy-button from="i-do-not-exist"></wa-copy-button>
```

### Disabled

Copy buttons can be disabled by adding the `disabled` attribute.

```html
<wa-copy-button value="You can't copy me" disabled></wa-copy-button>
```

### Changing Feedback Duration

A success indicator is briefly shown after copying. You can customize the length of time the indicator is shown using the `feedback-duration` attribute.

```html
<wa-copy-button value="Web Awesome rocks!" feedback-duration="250"></wa-copy-button>
```

### Custom Styles

You can customize the button to your liking with CSS.

```html
<wa-copy-button value="I'm so stylish" class="custom-styles">
  <wa-icon slot="copy-icon" name="clipboard"></wa-icon>
  <wa-icon slot="success-icon" name="thumbs-up"></wa-icon>
  <wa-icon slot="error-icon" name="thumbs-down"></wa-icon>
</wa-copy-button>

<style>
  .custom-styles,
  .custom-styles::part(success-icon),
  .custom-styles::part(error-icon) {
    color: white;
  }

  .custom-styles::part(button) {
    background-color: #ff1493;
    border: solid 2px #ff7ac1;
    border-right-color: #ad005c;
    border-bottom-color: #ad005c;
    border-radius: 6px;
    transition: all var(--wa-transition-slow) var(--wa-transition-easing);
  }

  .custom-styles::part(button):hover {
    transform: scale(1.05);
  }

  .custom-styles::part(button):active {
    transform: translateY(1px);
  }

  .custom-styles::part(button):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
</style>
```

## Importing

Autoloading components via [projects](https://webawesome.com/docs/#using-a-project) is the recommended way to import components. If you prefer to do it manually, use one of the following code snippets.

\*\*CDN\*\*

Let your project code do the work! [Sign up for free](https://webawesome.com/signup) to use a project with your very own CDN — it's the fastest and easiest way to use Web Awesome.

\*\*npm\*\*

To manually import this component from NPM, use the following code.

```js
import '@awesome.me/webawesome/dist/components/copy-button/copy-button.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaCopyButton from '@awesome.me/webawesome/dist/react/copy-button';
```

## Slots

Learn more about [using slots](https://webawesome.com/docs/usage/#slots).

| Name | Description |
| --- | --- |
| \`copy-icon\` | \`

## Attributes & Properties

Learn more about [attributes and properties](https://webawesome.com/docs/usage/#attributes-and-properties).

| Name | Description | Reflects |
| --- | --- | --- |
| \`copyLabel\` copy-label | \`string\` A custom label to show in the tooltip. Type Default '' | | |
| \`css\` | \`CSSResultGroup \\| undefined\` One or more CSSResultGroup to include in the component's shadow root. Host styles are automatically prepended. Type Default \[visuallyHidden, styles\] | | |
| \`disabled\` disabled | \`boolean\` Disables the copy button. Type Default false | | |
| \`errorLabel\` error-label | \`string\` A custom label to show in the tooltip when a copy error occurs. Type Default '' | | |
| \`feedbackDuration\` feedback-duration | \`number\` The length of time to show feedback before restoring the default trigger. Type Default 1000 | | |
| \`from\` from | \`value\` An id that references an element in the same document from which data will be copied. If both this and are present, this value will take precedence. By default, the target element's textContent will be copied. To copy an attribute, append the attribute name wrapped in square brackets, e.g. from="el\[value\]". To copy a property, append a dot and the property name, e.g. from="el.value". Type string Default '' | | |
| \`successLabel\` success-label | \`string\` A custom label to show in the tooltip after copying. Type Default '' | | |
| \`tooltipPlacement\` tooltip-placement | \`'top' \\| 'right' \\| 'bottom' \\| 'left'\` The preferred placement of the tooltip. Type Default 'top' | | |
| \`value\` value | \`string\` The text value to copy. Type Default '' | | |

## Events

Learn more about [events](https://webawesome.com/docs/usage/#events).

| Name | Description |
| --- | --- |
| \`wa-copy\` | Emitted when the data has been copied. |
| \`wa-error\` | Emitted when the data could not be copied. |

## CSS parts

Learn more about [CSS parts](https://webawesome.com/docs/customizing/#css-parts).

| Name | Description | CSS selector |
| --- | --- | --- |
| \`button\` | \`\` The internal element. | \`::part(button)\` |
| \`copy-icon\` | The container that holds the copy icon. | \`::part(copy-icon)\` |
| \`error-icon\` | The container that holds the error icon. | \`::part(error-icon)\` |
| \`success-icon\` | The container that holds the success icon. | \`::part(success-icon)\` |
| \`tooltip\_\_base\` | \`base\` The tooltip's exported part. | \`::part(tooltip\_\_base)\` |
| \`tooltip\_\_base\_\_arrow\` | \`arrow\` The tooltip's exported part. | \`::part(tooltip\_\_base\_\_arrow)\` |
| \`tooltip\_\_base\_\_popup\` | \`popup\` The tooltip's exported part. | \`::part(tooltip\_\_base\_\_popup)\` |
| \`tooltip\_\_body\` | \`body\` The tooltip's exported part. | \`::part(tooltip\_\_body)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)
-   [`<wa-popup>`](https://webawesome.com/docs/components/popup)
-   [`<wa-tooltip>`](https://webawesome.com/docs/components/tooltip)

**Need a hand?** Report a bug Ask for help