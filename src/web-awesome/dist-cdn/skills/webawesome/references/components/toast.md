# Toast [Pro]

**Full documentation:** https://webawesome.com/docs/components/toast

> This component requires [Web Awesome Pro](https://webawesome.com/purchase).
`<wa-toast>` Since 3.3 Experimental Pro Toast requires access to Web Awesome Pro

Toasts display brief, non-blocking notifications that appear temporarily above the page content.

Adding a single `<wa-toast>` element to the page gives you the ability to dispatch notifications at any time. Toast notifications appear in a stack that renders in the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer), showing above everything else on the page.

You can put the `<wa-toast>` element anywhere in the DOM, as long as it's somewhere inside the `<body>`. In most apps, a single toast element is optimal.

```html
<div id="toast-basic">
  <wa-button appearance="filled">Show notification</wa-button>
  <wa-toast></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-basic');
  const toast = container.querySelector('wa-toast');
  const button = container.querySelector('wa-button');

  button.addEventListener('click', () => {
    toast.create('This is a toast notification!');
  });
</script>
```

Toasts have unique accessibility challenges, but these can be mitigated with thoughtful implementation. Read our [Accessibility Considerations](#accessibility-considerations) before using toasts.

This documentation page features numerous toast elements for demonstrative purposes. As a result, it's possible to trigger overlapping toast items. This isn't a bug! Most apps should only have a single `<wa-toast>` element on the page. We're just showing off the many features of this component.

## Examples

### Variants

Set the `variant` option to `brand`, `success`, `warning`, `danger`, or `neutral` to change the type of notification.

```html
<div id="toast-variant">
  <div class="wa-cluster wa-gap-xs">
    <wa-button appearance="filled" data-variant="neutral" data-icon="gear">Neutral</wa-button>
    <wa-button appearance="filled" data-variant="brand" data-icon="circle-info">Brand</wa-button>
    <wa-button appearance="filled" data-variant="success" data-icon="check">Success</wa-button>
    <wa-button appearance="filled" data-variant="warning" data-icon="circle-exclamation">Warning</wa-button>
    <wa-button appearance="filled" data-variant="danger" data-icon="triangle-exclamation">Danger</wa-button>
  </div>
  <wa-toast></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-variant');
  const toast = container.querySelector('wa-toast');

  container.addEventListener('click', event => {
    const button = event.target.closest('[data-variant]');
    if (!button) return;

    const variant = button.getAttribute('data-variant');
    const icon = button.getAttribute('data-icon');

    toast.create(`This is a ${variant} notification`, {
      variant,
      icon
    });
  });
</script>
```

### Sizes

Set the `size` option to `small`, `medium`, or `large` to change the size of the toast item.

```html
<div id="toast-size">
  <div class="wa-cluster wa-gap-xs">
    <wa-button appearance="filled" data-size="small" data-icon="mouse-field">Small</wa-button>
    <wa-button appearance="filled" data-size="medium" data-icon="horse">Medium</wa-button>
    <wa-button appearance="filled" data-size="large" data-icon="elephant">Large</wa-button>
  </div>
  <wa-toast></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-size');
  const toast = container.querySelector('wa-toast');

  container.addEventListener('click', event => {
    const button = event.target.closest('[data-size]');
    if (!button) return;

    const size = button.getAttribute('data-size');
    const icon = button.getAttribute('data-icon');

    toast.create(`This is a ${size} notification`, {
      size,
      icon
    });
  });
</script>
```

### With Icons

Pass an `icon` option to display an icon at the start of the toast item. You can pass a simple string for the icon name, or an object with additional options like `library`, `family`, and `variant`.

```html
<div id="toast-icons">
  <wa-button appearance="filled">Show notification with icon</wa-button>
  <wa-toast></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-icons');
  const toast = container.querySelector('wa-toast');
  const button = container.querySelector('wa-button');

  button.addEventListener('click', () => {
    toast.create('Your message has been sent successfully!', {
      variant: 'success',
      icon: 'paper-plane'
    });
  });
</script>
```

For more control over the icon, pass an object with `name` and optional `library`, `family`, or `variant` properties.

```html
<div id="toast-icons-advanced">
  <div class="wa-cluster wa-gap-xs">
    <wa-button appearance="filled">Duotone icon</wa-button>
    <wa-button appearance="filled">Brand icon</wa-button>
  </div>
  <wa-toast></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-icons-advanced');
  const toast = container.querySelector('wa-toast');
  const buttons = container.querySelectorAll('wa-button');

  buttons[0].addEventListener('click', () => {
    toast.create('This uses a duotone icon!', {
      variant: 'brand',
      icon: {
        name: 'bell',
        family: 'duotone',
        variant: 'solid'
      }
    });
  });

  buttons[1].addEventListener('click', () => {
    toast.create('Follow us on GitHub!', {
      variant: 'neutral',
      icon: {
        name: 'github',
        family: 'brands'
      }
    });
  });
</script>
```

### Duration

Set the `duration` option to control how long notifications show before disappearing. The value is in milliseconds and defaults to `5000` (5 seconds). A value of `0` will keep the notification open until the user dismisses it.

```html
<div id="toast-duration">
  <div class="wa-cluster wa-gap-xs">
    <wa-button appearance="filled" data-duration="3000">3 seconds</wa-button>
    <wa-button appearance="filled" data-duration="10000">10 seconds</wa-button>
    <wa-button appearance="filled" data-duration="0">Until dismissed</wa-button>
  </div>
  <wa-toast></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-duration');
  const toast = container.querySelector('wa-toast');

  container.addEventListener('click', event => {
    const button = event.target.closest('[data-duration]');
    if (!button) return;

    const duration = parseInt(button.getAttribute('data-duration'));

    toast.create(duration > 0 ? `This will disappear in ${duration / 1000} seconds` : 'Dismiss me manually!', {
      duration,
      variant: 'brand'
    });
  });
</script>
```

### Placement

Use the `placement` attribute to set the position of the toast stack on the screen.

```html
<div id="toast-placement">
  <wa-select label="Placement" value="top-end">
    <wa-option value="top-start">top-start</wa-option>
    <wa-option value="top-center">top-center</wa-option>
    <wa-option value="top-end">top-end</wa-option>
    <wa-option value="bottom-start">bottom-start</wa-option>
    <wa-option value="bottom-center">bottom-center</wa-option>
    <wa-option value="bottom-end">bottom-end</wa-option>
  </wa-select>
  <br>
  <wa-button appearance="filled">Show notification</wa-button>
  <wa-toast placement="top-end"></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-placement');
  const toast = container.querySelector('wa-toast');
  const select = container.querySelector('wa-select');
  const button = container.querySelector('wa-button');

  select.addEventListener('change', () => {
    toast.placement = select.value;
  });

  button.addEventListener('click', () => {
    toast.create('This notification appears at ' + toast.placement, {
      variant: 'brand',
      icon: 'location-dot'
    });
  });
</script>
```

### Hover and Focus Behavior

Toast items automatically pause their countdown timer when you hover over them or when the close button receives focus. This gives users more time to read the content before it disappears. When the mouse leaves or focus moves away, the timer resets and starts counting down again.

```html
<div id="toast-pause">
  <wa-button appearance="filled">Show notification (hover to pause)</wa-button>
  <wa-toast></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-pause');
  const toast = container.querySelector('wa-toast');
  const button = container.querySelector('wa-button');

  button.addEventListener('click', () => {
    toast.create('Hover over me to pause the countdown timer!', {
      duration: 5000,
      variant: 'brand',
      icon: 'clock'
    });
  });
</script>
```

### Using HTML Content

Set `allowHtml` to `true` to render HTML content in notifications. Make sure you trust the content to avoid XSS vulnerabilities.

```html
<div id="toast-html">
  <wa-button appearance="filled">Show notification with HTML</wa-button>
  <wa-toast></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-html');
  const toast = container.querySelector('wa-toast');
  const button = container.querySelector('wa-button');

  button.addEventListener('click', () => {
    toast.create(`
      <wa-icon slot="icon" name="bell"></wa-icon>
      <strong>New message!</strong><br>
      You have <em>3 unread messages</em> in your inbox.
    `, {
      allowHtml: true,
      variant: 'brand',
      duration: 0
    });
  });
</script>
```

### Responding to Custom Buttons

You can add custom buttons or other interactive elements to a toast item using `allowHtml`. Use the returned toast item reference to query for your elements and attach event listeners.

```html
<div id="toast-custom-button">
  <wa-button appearance="filled">Show notification with button</wa-button>
  <wa-toast></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-custom-button');
  const toast = container.querySelector('wa-toast');
  const showButton = container.querySelector('wa-button');

  showButton.addEventListener('click', async () => {
    const toastItem = await toast.create(`
      <wa-icon slot="icon" name="gift"></wa-icon>
      You have a new reward!
      <div style="margin-block-start: var(--wa-space-xs);">
        <wa-button class="claim-button" variant="brand" size="small">Claim</wa-button>
        <wa-button class="dismiss-button" appearance="filled" size="small">No Thanks</wa-button>
      </div>
    `, {
      allowHtml: true,
      variant: 'brand',
      duration: 0
    });

    const claimButton = toastItem.querySelector('.claim-button');
    const dismissButton = toastItem.querySelector('.dismiss-button');

    // When the claim button is clicked
    claimButton.addEventListener('click', () => {
      //
      // Add custom claim logic here
      //
      toastItem.hide();
    });

    // When the dismiss button is clicked
    dismissButton.addEventListener('click', () => {
      toastItem.hide();
    });
  });
</script>
```

### Responding to Events

The `create()` method returns a promise that resolves to the generated toast item. You can use this reference to add event listeners.

```html
<div id="toast-events">
  <wa-button appearance="filled">Show notification</wa-button>
  <wa-toast></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-events');
  const toast = container.querySelector('wa-toast');
  const button = container.querySelector('wa-button');

  button.addEventListener('click', async () => {
    const toastItem = await toast.create('Click me or let me disappear...', {
      variant: 'brand',
      icon: 'hand-pointer'
    });

    toastItem.addEventListener('click', () => {
      console.log('Toast item was clicked!');
    });

    toastItem.addEventListener('wa-after-hide', () => {
      console.log('Toast item was dismissed');
    });
  });
</script>
```

### Creating Toast Items Manually

While `toast.create()` is the easiest way to show notifications, you can also create `<wa-toast-item>` elements manually. This approach gives you full control over the toast item's content and is useful when you need to add custom elements or complex layouts.

```html
<div id="toast-append">
  <wa-button appearance="filled">Create toast item manually</wa-button>
  <wa-toast></wa-toast>
</div>

<script>
  const container = document.getElementById('toast-append');
  const toast = container.querySelector('wa-toast');
  const button = container.querySelector('wa-button');

  button.addEventListener('click', () => {
    const toastItem = document.createElement('wa-toast-item');
    toastItem.variant = 'brand';
    toastItem.innerHTML = `
      <wa-icon slot="icon" name="paw"></wa-icon>
      This notification was created manually!
    `;

    toast.prepend(toastItem);
  });
</script>
```

## Accessibility Considerations

Toasts have a number of accessibility limitations. For example:

-   Due to their transient nature, toasts can be missed entirely by screen magnifier users and difficult to perceive for others depending on their visual and cognitive abilities.
-   Due to their DOM placement and vague position in a page's reading order, toasts can be difficult for keyboard users to navigate to.
-   Due to their positioning on the page, toasts can obscure other essential elements, especially for users who use browser or OS zooming features.

Rarely will toasts offer the best usability for all of your users, so consider if other UX patterns, like dialogs or inline messages, offer a better experience. If toasts are the right fit for your use case, consider these tips:

-   Keep toasts short and sweet.
-   Set the `duration` to `5000` ms (5 seconds) or longer to give users enough time to locate and understand the toast item.
-   Consider allowing users to adjust the timing. While the duration of a toast item resets on hover (see [Hover Behavior](#hover-behavior)), a setting in your application can allow users to control the timing of toasts to best suit their needs and abilities.
-   Choose a consistent placement for toasts in your application and stick with it. Otherwise, users need to guess where transient notifications will appear and risk missing them entirely.
-   If a transient toast item contains an action, ensure that action is available elsewhere on the page. This ensures that users can still execute the action even if they miss the toast.

## Importing

Autoloading components via [projects](https://webawesome.com/docs/#using-a-project) is the recommended way to import components. If you prefer to do it manually, use one of the following code snippets.

\*\*CDN\*\*

Let your project code do the work! [Sign up for free](https://webawesome.com/signup) to use a project with your very own CDN — it's the fastest and easiest way to use Web Awesome.

\*\*npm\*\*

To manually import this component from NPM, use the following code.

```js
import '@awesome.me/webawesome/dist/components/toast/toast.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaToast from '@awesome.me/webawesome/dist/react/toast';
```

## Slots

Learn more about [using slots](https://webawesome.com/docs/usage/#slots).

| Name | Description |
| --- | --- |
| (default) | \`\` Place elements here to show them as notifications. |

## Attributes & Properties

Learn more about [attributes and properties](https://webawesome.com/docs/usage/#attributes-and-properties).

| Name | Description | Reflects |
| --- | --- | --- |
| \`css\` | \`CSSResultGroup \\| undefined\` One or more CSSResultGroup to include in the component's shadow root. Host styles are automatically prepended. Type Default styles | | |
| \`placement\` placement | \`'top-start' \\| 'top-center' \\| 'top-end' \\| 'bottom-start' \\| 'bottom-center' \\| 'bottom-end'\` The placement of the toast stack on the screen. Type Default 'top-end' | | |

## Methods

Learn more about [methods](https://webawesome.com/docs/usage/#methods).

| Name | Description | Arguments |
| --- | --- | --- |
| \`create()\` | Creates a toast notification programmatically and adds it to the stack. Returns a reference to the created toast item element. | \`message: string, options: ToastCreateOptions\` |

## CSS custom properties

Learn more about [CSS custom properties](https://webawesome.com/docs/customizing/#custom-properties).

| Name | Description |
| --- | --- |
| \`--gap\` | \`var(--wa-space-s)\` The gap between stacked toast items. Default |
| \`--width\` | \`28rem\` The width of the toast stack. Default |

## Custom States

Learn more about [custom states](https://webawesome.com/docs/customizing/#custom-states).

| Name | Description | CSS selector |
| --- | --- | --- |
| \`visible\` | Applied when the toast stack has one or more visible toast items. | \`:state(visible)\` |

## CSS parts

Learn more about [CSS parts](https://webawesome.com/docs/customizing/#css-parts).

| Name | Description | CSS selector |
| --- | --- | --- |
| \`stack\` | The container that holds the toast items. | \`::part(stack)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)
-   [`<wa-progress-ring>`](https://webawesome.com/docs/components/progress-ring)
-   [`<wa-toast-item>`](https://webawesome.com/docs/components/toast-item)

**Need a hand?** Report a bug Ask for help