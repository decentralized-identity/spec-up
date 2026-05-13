# Rating

**Full documentation:** https://webawesome.com/docs/components/rating


`<wa-rating>` Since 2.0 Stable

Ratings give users a way to quickly view and provide feedback.

```html
<wa-rating label="Rating"></wa-rating>
```

## Examples

### Labels

Ratings are commonly identified contextually, so labels aren't displayed. However, you should always provide one for assistive devices using the `label` attribute.

```html
<wa-rating label="Rate this component"></wa-rating>
```

### Maximum Value

Ratings are 0-5 by default. To change the maximum possible value, use the `max` attribute.

```html
<wa-rating label="Rating" max="3"></wa-rating>
```

### Precision

Use the `precision` attribute to let users select fractional ratings.

```html
<wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
```

### Sizing

Use the `size` attribute to adjust the size of the rating.

```html
<wa-rating label="Rating" size="small"></wa-rating><br />
<wa-rating label="Rating" size="medium"></wa-rating><br />
<wa-rating label="Rating" size="large"></wa-rating>
```

For more granular sizing, you can use the `font-size` property.

```html
<wa-rating label="Rating" style="font-size: 2rem;"></wa-rating>
```

### Readonly

Use the `readonly` attribute to display a rating that users can't change.

```html
<wa-rating label="Rating" readonly value="3"></wa-rating>
```

### Disabled

Use the `disabled` attribute to disable the rating.

```html
<wa-rating label="Rating" disabled value="3"></wa-rating>
```

### Detecting Hover

Use the `wa-hover` event to detect when the user hovers over (or touch and drag) the rating. This lets you hook into values as the user interacts with the rating, but before they select a value.

The event has a payload with `phase` and `value` properties. The `phase` property tells when hovering starts, moves to a new value, and ends. The `value` property tells what the rating's value would be if the user were to commit to the hovered value.

```html
<div class="detect-hover">
  <wa-rating label="Rating"></wa-rating>
  <span></span>
</div>

<script>
  const rating = document.querySelector('.detect-hover > wa-rating');
  const span = rating.nextElementSibling;
  const terms = ['No rating', 'Terrible', 'Bad', 'OK', 'Good', 'Excellent'];

  rating.addEventListener('wa-hover', event => {
    span.textContent = terms[event.detail.value];

    // Clear feedback when hovering stops
    if (event.detail.phase === 'end') {
      span.textContent = '';
    }
  });
</script>

<style>
  .detect-hover span {
    position: relative;
    top: -4px;
    left: 8px;
    border-radius: var(--wa-border-radius-m);
    background: var(--wa-color-neutral-fill-loud);
    color: var(--wa-color-neutral-on-loud);
    text-align: center;
    padding: 4px 6px;
  }

  .detect-hover span:empty {
    display: none;
  }
</style>
```

### Custom Icons

You can provide custom icons by passing a function to the `getSymbol` property.

```html
<wa-rating label="Rating" class="rating-hearts" style="--symbol-color-active: #ff4136;"></wa-rating>

<script type="module">
  const rating = document.querySelector('.rating-hearts');

  await customElements.whenDefined('wa-rating');
  await rating.updateComplete;

  rating.getSymbol = () => '<wa-icon name="heart" variant="solid"></wa-icon>';
</script>
```

### Value-based Icons

You can also use the `getSymbol` property to render different icons based on value and/or whether the icon is currently selected.

```html
<wa-rating label="Rating" class="rating-emojis"></wa-rating>

<script type="module">
  const rating = document.querySelector('.rating-emojis');

  await customElements.whenDefined('wa-rating');
  await rating.updateComplete;

  rating.getSymbol = (value, isSelected) => {
    const icons = ['face-angry', 'face-frown', 'face-meh', 'face-smile', 'face-laugh'];
    return `<wa-icon name="${icons[value - 1]}"></wa-icon>`;
  };
</script>
```

## Importing

Autoloading components via [projects](https://webawesome.com/docs/#using-a-project) is the recommended way to import components. If you prefer to do it manually, use one of the following code snippets.

\*\*CDN\*\*

Let your project code do the work! [Sign up for free](https://webawesome.com/signup) to use a project with your very own CDN — it's the fastest and easiest way to use Web Awesome.

\*\*npm\*\*

To manually import this component from NPM, use the following code.

```js
import '@awesome.me/webawesome/dist/components/rating/rating.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaRating from '@awesome.me/webawesome/dist/react/rating';
```

## Attributes & Properties

Learn more about [attributes and properties](https://webawesome.com/docs/usage/#attributes-and-properties).

| Name | Description | Reflects |
| --- | --- | --- |
| \`css\` | \`CSSResultGroup \\| undefined\` One or more CSSResultGroup to include in the component's shadow root. Host styles are automatically prepended. Type Default \[sizeStyles, styles\] | | |
| \`disabled\` disabled | \`boolean\` Disables the rating. Type Default false | | |
| \`getSymbol\` getSymbol | \`

## Methods

Learn more about [methods](https://webawesome.com/docs/usage/#methods).

| Name | Description | Arguments |
| --- | --- | --- |
| \`blur()\` | Removes focus from the rating. | |
| \`focus()\` | Sets focus on the rating. | \`options: FocusOptions\` |

## Events

Learn more about [events](https://webawesome.com/docs/usage/#events).

| Name | Description |
| --- | --- |
| \`change\` | Emitted when the rating's value changes. |
| \`wa-hover\` | \`phase\` Emitted when the user hovers over a value. The property indicates when hovering starts, moves to a new value, or ends. The value property tells what the rating's value would be if the user were to commit to the hovered value. |

## CSS custom properties

Learn more about [CSS custom properties](https://webawesome.com/docs/customizing/#custom-properties).

| Name | Description |
| --- | --- |
| \`--symbol-color\` | The inactive color for symbols. |
| \`--symbol-color-active\` | The active color for symbols. |
| \`--symbol-spacing\` | The spacing to use around symbols. |

## CSS parts

Learn more about [CSS parts](https://webawesome.com/docs/customizing/#css-parts).

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's base wrapper. | \`::part(base)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)

**Need a hand?** Report a bug Ask for help