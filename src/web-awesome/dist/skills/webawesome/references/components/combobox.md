# Combobox [Pro]

**Full documentation:** https://webawesome.com/docs/components/combobox

> This component requires [Web Awesome Pro](https://webawesome.com/purchase).
`<wa-combobox>` Since 3.1 Experimental Pro Combobox requires access to Web Awesome Pro

Comboboxes combine a text input with a listbox, allowing users to filter and select from predefined options or enter custom values.

This component follows the [ARIA APG Combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) and uses live region announcements for result filtering in screen readers.

```html
<wa-combobox name="foo" label="Type to filter...">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-combobox>
```

This component works with standard `<form>` elements. Please refer to the section on [form controls](https://webawesome.com/docs/form-controls) to learn more about form submission and client-side validation.

## Examples

### Labels

Use the `label` attribute to give the combobox an accessible label. For labels that contain HTML, use the `label` slot instead.

```html
<wa-combobox label="Choose a fruit">
  <wa-option value="apple">Apple</wa-option>
  <wa-option value="banana">Banana</wa-option>
  <wa-option value="orange">Orange</wa-option>
</wa-combobox>
```

### Hint

Add descriptive hint to a combobox with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html
<wa-combobox label="Favorite Fruit" hint="Start typing to filter options.">
  <wa-option value="apple">Apple</wa-option>
  <wa-option value="banana">Banana</wa-option>
  <wa-option value="cherry">Cherry</wa-option>
  <wa-option value="grape">Grape</wa-option>
  <wa-option value="orange">Orange</wa-option>
</wa-combobox>
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html
<wa-combobox placeholder="Type to search...">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
```

### Clearable

Use the `with-clear` attribute to make the control clearable. The clear button only appears when the combobox has a value or text input.

```html
<wa-combobox with-clear value="option-1">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
```

### Allow Custom Values

By default, the combobox only accepts values that match an option. Use `allow-custom-value` to let users enter arbitrary values.

```html
<wa-combobox allow-custom-value label="Enter or select a color" placeholder="Type a color...">
  <wa-option value="red">Red</wa-option>
  <wa-option value="green">Green</wa-option>
  <wa-option value="blue">Blue</wa-option>
</wa-combobox>
```

### Creating New Items

Use the `allow-create` attribute to let users create new options on the fly. When the user types text that doesn't match any existing option, a "Create \[value\]" option appears at the bottom of the listbox. Selecting it adds a new `<wa-option>` to the DOM and selects it.

```html
<wa-combobox allow-create label="Select or create a tag" placeholder="Type to search or create...">
  <wa-option value="bug">Bug</wa-option>
  <wa-option value="feature">Feature</wa-option>
  <wa-option value="docs">Docs</wa-option>
</wa-combobox>
```

This also works with `multiple` mode.

```html
<wa-combobox allow-create multiple with-clear label="Select or create tags" placeholder="Type to search or create...">
  <wa-option value="bug" selected>Bug</wa-option>
  <wa-option value="feature">Feature</wa-option>
  <wa-option value="docs">Docs</wa-option>
</wa-combobox>
```

For advanced use cases, listen for the `wa-create` event and call `preventDefault()` to handle creation yourself. This is useful when you need to normalize values, validate input, or call an API before creating the option.

```html
<wa-combobox allow-create label="Add a tag" placeholder="Type to create..." class="custom-create-combobox">
  <wa-option value="bug">Bug</wa-option>
  <wa-option value="feature">Feature</wa-option>
</wa-combobox>

<script type="module">
  await customElements.whenDefined('wa-combobox');
  const combobox = document.querySelector('.custom-create-combobox');

  combobox.addEventListener('wa-create', event => {
    event.preventDefault();

    const { inputValue } = event.detail;

    // Normalize the value (e.g. lowercase, slugify)
    const option = document.createElement('wa-option');
    option.value = inputValue.toLowerCase().replace(/\s+/g, '-');
    option.textContent = inputValue;
    combobox.appendChild(option);
    combobox.value = option.value;
  });
</script>
```

### Custom Filter Function

You can provide a custom filter function to control how options are matched. The function receives the option element and the current query string, and should return `true` to show the option or `false` to hide it.

By default, the combobox filters options that contain the query anywhere in the label, but you can customize this to implement fuzzy matching, prefix-only matching, or apply any other filtering logic.

```html
<wa-combobox label="Search (includes match)" placeholder="Search anywhere in text..." class="custom-filter">
  <wa-option value="apple">Apple</wa-option>
  <wa-option value="pineapple">Pineapple</wa-option>
  <wa-option value="banana">Banana</wa-option>
  <wa-option value="grape">Grape</wa-option>
  <wa-option value="grapefruit">Grapefruit</wa-option>
</wa-combobox>

<script type="module">
  await customElements.whenDefined('wa-combobox');
  const combobox = document.querySelector('.custom-filter');

  // Custom filter that matches anywhere in the label (not just the start)
  combobox.filter = (option, query) => {
    return option.label.toLowerCase().includes(query.toLowerCase());
  };
</script>
```

### Appearance

Use the `appearance` attribute to change the combobox's visual appearance.

```html
<wa-combobox appearance="filled" placeholder="Filled">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
<br />
<wa-combobox appearance="filled-outlined" placeholder="Filled Outlined">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
<br />
<wa-combobox appearance="outlined" placeholder="Outlined">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
```

### Pill

Use the `pill` attribute to give comboboxes rounded edges.

```html
<wa-combobox pill placeholder="Search...">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
```

### Disabled

Use the `disabled` attribute to disable a combobox.

```html
<wa-combobox placeholder="Disabled" disabled>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
```

### Multiple

To allow multiple options to be selected, use the `multiple` attribute. In multiple mode, selected options appear as tags and the input is used for filtering. It's a good practice to use `with-clear` when this option is enabled.

```html
<wa-combobox label="Select Multiple" multiple with-clear placeholder="Type to filter...">
  <wa-option value="option-1" selected>Option 1</wa-option>
  <wa-option value="option-2" selected>Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-combobox>
```

In multiple mode, the text input is used for filtering options only. After selecting an option, the input is cleared so you can continue filtering and selecting more options.

### Setting Initial Values

Use the `selected` attribute on individual options to set the initial selection, similar to native HTML.

```html
<wa-combobox label="Pre-selected option">
  <wa-option value="option-1" selected>Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
</wa-combobox>
```

For multiple selections, apply it to all selected options.

```html
<wa-combobox multiple with-clear>
  <wa-option value="option-1" selected>Option 1</wa-option>
  <wa-option value="option-2" selected>Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
</wa-combobox>
```

Framework users can bind directly to the `value` property for reactive data binding and form state management.

### Grouping Options

Use `<wa-divider>` to group listbox items visually. You can also use `<small>` to provide labels, but they won't be announced by most assistive devices.

```html
<wa-combobox label="Grouped Options">
  <small>Fruits</small>
  <wa-option value="apple">Apple</wa-option>
  <wa-option value="banana">Banana</wa-option>
  <wa-option value="orange">Orange</wa-option>
  <wa-divider></wa-divider>
  <small>Vegetables</small>
  <wa-option value="carrot">Carrot</wa-option>
  <wa-option value="broccoli">Broccoli</wa-option>
  <wa-option value="spinach">Spinach</wa-option>
</wa-combobox>
```

### Sizes

Use the `size` attribute to change a combobox's size.

```html
<wa-combobox placeholder="Small" size="small">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>

<br />

<wa-combobox placeholder="Medium" size="medium">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>

<br />

<wa-combobox placeholder="Large" size="large">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
```

### Placement

The preferred placement of the combobox's listbox can be set with the `placement` attribute. Note that the actual position may vary to ensure the panel remains in the viewport. Valid placements are `top` and `bottom`.

```html
<wa-combobox placement="top" placeholder="Opens above">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-combobox>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like `<wa-icon>` within the combobox.

```html
<wa-combobox placeholder="Search locations..." size="small" with-clear>
  <wa-icon slot="start" name="magnifying-glass"></wa-icon>
  <wa-icon slot="end" name="location-dot"></wa-icon>
  <wa-option value="new-york">New York</wa-option>
  <wa-option value="los-angeles">Los Angeles</wa-option>
  <wa-option value="chicago">Chicago</wa-option>
</wa-combobox>
<br />
<wa-combobox placeholder="Search locations..." size="medium" with-clear>
  <wa-icon slot="start" name="magnifying-glass"></wa-icon>
  <wa-icon slot="end" name="location-dot"></wa-icon>
  <wa-option value="new-york">New York</wa-option>
  <wa-option value="los-angeles">Los Angeles</wa-option>
  <wa-option value="chicago">Chicago</wa-option>
</wa-combobox>
<br />
<wa-combobox placeholder="Search locations..." size="large" with-clear>
  <wa-icon slot="start" name="magnifying-glass"></wa-icon>
  <wa-icon slot="end" name="location-dot"></wa-icon>
  <wa-option value="new-york">New York</wa-option>
  <wa-option value="los-angeles">Los Angeles</wa-option>
  <wa-option value="chicago">Chicago</wa-option>
</wa-combobox>
```

### Custom Tags

When multiple options can be selected, you can provide custom tags by passing a function to the `getTag` property. Your function can return a string of HTML, a [Lit Template](https://lit.dev/docs/templates/overview/), or an [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement). The `getTag()` function will be called for each option. The first argument is an `<wa-option>` element and the second argument is the tag's index (its position in the tag list).

Remember that custom tags are rendered in a shadow root. To style them, you can use the `style` attribute in your template or you can add your own [parts](https://webawesome.com/docs/customizing/#css-parts) and target them with the [`::part()`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) selector.

```html
<wa-combobox placeholder="Select contacts..." multiple with-clear class="custom-tag-combobox">
  <wa-option value="email" selected>
    <wa-icon slot="start" name="envelope" variant="solid"></wa-icon>
    Email
  </wa-option>
  <wa-option value="phone" selected>
    <wa-icon slot="start" name="phone" variant="solid"></wa-icon>
    Phone
  </wa-option>
  <wa-option value="chat">
    <wa-icon slot="start" name="comment" variant="solid"></wa-icon>
    Chat
  </wa-option>
</wa-combobox>

<script type="module">
  await customElements.whenDefined('wa-combobox');
  const combobox = document.querySelector('.custom-tag-combobox');
  await combobox.updateComplete;

  combobox.getTag = (option, index) => {
    // Use the same icon used in wa-option
    const name = option.querySelector('wa-icon[slot="start"]').name;

    // You can return a string, a Lit Template, or an HTMLElement here
    // Important: include data-value so the tag can be removed properly
    return `
      <wa-tag with-remove data-value="${option.value}">
        <wa-icon name="${name}"></wa-icon>
        ${option.label}
      </wa-tag>
    `;
  };
</script>
```

Be sure you trust the content you are outputting! Passing unsanitized user input to `getTag()` can result in XSS vulnerabilities.

When using custom tags with `with-remove`, you must include the `data-value` attribute set to the option's value. This allows the select to identify which option to deselect when the tag's remove button is clicked.

## Importing

Autoloading components via [projects](https://webawesome.com/docs/#using-a-project) is the recommended way to import components. If you prefer to do it manually, use one of the following code snippets.

\*\*CDN\*\*

Let your project code do the work! [Sign up for free](https://webawesome.com/signup) to use a project with your very own CDN — it's the fastest and easiest way to use Web Awesome.

\*\*npm\*\*

To manually import this component from NPM, use the following code.

```js
import '@awesome.me/webawesome/dist/components/combobox/combobox.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaCombobox from '@awesome.me/webawesome/dist/react/combobox';
```

## Slots

Learn more about [using slots](https://webawesome.com/docs/usage/#slots).

| Name | Description |
| --- | --- |
| (default) | \`\` The listbox options. Must be elements. You can use to group items visually. |
| \`clear-icon\` | An icon to use in lieu of the default clear icon. |
| \`end\` | \`\` An element, such as , placed at the start of the combobox. |

## Attributes & Properties

Learn more about [attributes and properties](https://webawesome.com/docs/usage/#attributes-and-properties).

| Name | Description | Reflects |
| --- | --- | --- |
| \`allowCreate\` allow-create | \`\` When true, if the user types text that doesn't match any existing option, a "Create \[value\]" option appears in the listbox. Selecting it creates a new in the DOM and selects it. A cancelable wa-create event fires before creation. Type boolean Default false | | |
| \`allowCustomValue\` allow-custom-value | \`boolean\` When true, allows the user to enter a value that doesn't match any of the options. Only applies to single-select comboboxes. When false, the combobox will only accept values that match an option. Type Default false | | |
| \`appearance\` appearance | \`'filled' \\| 'outlined' \\| 'filled-outlined'\` The combobox's visual appearance. Type Default 'outlined' | | |
| \`autocapitalize\` autocapitalize | \`'off' \\| 'none' \\| 'on' \\| 'sentences' \\| 'words' \\| 'characters'\` Controls whether and how text input is automatically capitalized as it is entered/edited by the user. Type | | |
| \`autocorrect\` autocorrect | \`"off"\` Indicates whether the browser's autocorrect feature is on or off. When set as an attribute, use or "on". When set as a property, use true or false. Type boolean | | |
| \`css\` | \`CSSResultGroup \\| undefined\` One or more CSSResultGroup to include in the component's shadow root. Host styles are automatically prepended. Type Default \[styles, formControlStyles, sizeStyles\] | | |
| \`disabled\` disabled | \`boolean\` Disables the combobox control. Type Default false | | |
| \`enterkeyhint\` enterkeyhint | \`'enter' \\| 'done' \\| 'go' \\| 'next' \\| 'previous' \\| 'search' \\| 'send'\` Used to customize the label or icon of the Enter key on virtual keyboards. Type | | |
| \`filter\` | \`true\` A function that customizes how options are filtered based on the input value. The function receives the option and the current input query string. Return to include the option in the filtered list, false to exclude. By default, options are filtered by checking if the option's label contains the query (case-insensitive). Type ((option: WaOption, query: string) => boolean) \\| null Default null | | |
| \`form\` | \`\` By default, form controls are associated with the nearest containing element. This attribute allows you to place the form control outside of a form and associate it with the form that has this id. The form must be in the same document or shadow root for this to work. Type HTMLFormElement \\| null | | |
| \`getTag\` | \`(option: WaOption, index: number) => TemplateResult \\| string \\| HTMLElement\` A function that customizes the tags to be rendered when multiple=true. The first argument is the option, the second is the current tag's index. The function should return either a Lit TemplateResult or a string containing trusted HTML of the symbol to render at the specified value. Type | | |
| \`hint\` hint | \`hint\` The combobox's . If you need to display HTML, use the hint slot instead. Type string Default '' | | |
| \`inputmode\` inputmode | \`'none' \\| 'text' \\| 'decimal' \\| 'numeric' \\| 'tel' \\| 'search' \\| 'email' \\| 'url'\` Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual keyboard on supportive devices. Type | | |
| \`inputValue\` | \`string\` The current text value in the input field. Type Default '' | | |
| \`label\` label | \`label\` The combobox's . If you need to display HTML, use the label slot instead. Type string Default '' | | |
| \`maxOptionsVisible\` max-options-visible | \`multiple\` The maximum number of selected options to show when is true. After the maximum, "+n" will be shown to indicate the number of additional items that are selected. Set to 0 to remove the limit. Type number Default 3 | | |
| \`multiple\` multiple | \`boolean\` Allows more than one option to be selected. Type Default false | | |
| \`name\` name | \`string \\| null\` The name of the combobox, submitted as a name/value pair with form data. Type Default '' | | |
| \`open\` open | \`show()\` Indicates whether or not the combobox is open. You can toggle this attribute to show and hide the menu, or you can use the and hide() methods and this attribute will reflect the combobox's open state. Type boolean Default false | | |
| \`pill\` pill | \`boolean\` Draws a pill-style combobox with rounded edges. Type Default false | | |
| \`placeholder\` placeholder | \`string\` Placeholder text to show as a hint when the combobox is empty. Type Default '' | | |
| \`placement\` placement | \`'top' \\| 'bottom'\` The preferred placement of the combobox's menu. Note that the actual placement may vary as needed to keep the listbox inside of the viewport. Type Default 'bottom' | | |
| \`required\` required | \`boolean\` The combobox's required attribute. Type Default false | | |
| \`size\` size | \`'small' \\| 'medium' \\| 'large'\` The combobox's size. Type Default 'medium' | | |
| \`spellcheck\` spellcheck | \`boolean\` Enables spell checking on the combobox. Type Default false | | |
| \`validationTarget\` | \`undefined \\| HTMLElement\` Where to anchor native constraint validation Type | | |
| \`validators\` | \`observedAttributes\` Validators are static because they have , essentially attributes to "watch" for changes. Whenever these attributes change, we want to be notified and update the validator. Type Validator\[\] Default \[\] | | |
| \`value\` value | The combobox's value. This will be a string for single select or an array for multi-select. | | |
| \`withClear\` with-clear | \`boolean\` Adds a clear button when the combobox is not empty. Type Default false | | |
| \`withHint\` with-hint | \`boolean\` Used for SSR purposes when hint is slotted in. Will show the hint on first render. Type Default false | | |
| \`withLabel\` with-label | \`boolean\` Used for SSR purposes when a label is slotted in. Will show the label on first render. Type Default false | | |

## Methods

Learn more about [methods](https://webawesome.com/docs/usage/#methods).

| Name | Description | Arguments |
| --- | --- | --- |
| \`blur()\` | Removes focus from the control. | |
| \`focus()\` | Sets focus on the control. | \`options: FocusOptions\` |
| \`formStateRestoreCallback()\` | Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue. | \`state: string \\| File \\| FormData \\| null, reason: 'autocomplete' \\| 'restore'\` |
| \`hide()\` | Hides the listbox. | |
| \`resetValidity()\` | Reset validity is a way of removing manual custom errors and native validation. | |
| \`setCustomValidity()\` | Do not use this when creating a "Validator". This is intended for end users of components. We track manually defined custom errors so we don't clear them on accident in our validators. | \`message: string\` |
| \`show()\` | Shows the listbox. | |

## Events

Learn more about [events](https://webawesome.com/docs/usage/#events).

| Name | Description |
| --- | --- |
| \`blur\` | Emitted when the control loses focus. |
| \`change\` | Emitted when the control's value changes. |
| \`focus\` | Emitted when the control gains focus. |
| \`input\` | Emitted when the control receives input. |
| \`wa-after-hide\` | Emitted after the combobox's menu closes and all animations are complete. |
| \`wa-after-show\` | Emitted after the combobox's menu opens and all animations are complete. |
| \`wa-clear\` | Emitted when the control's value is cleared. |
| \`wa-create\` | \`event.preventDefault()\` Emitted when the user selects the "create" option. Call to handle creation yourself. The event detail contains { inputValue: string }. |
| \`wa-hide\` | Emitted when the combobox's menu closes. |
| \`wa-invalid\` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |
| \`wa-show\` | Emitted when the combobox's menu opens. |

## CSS custom properties

Learn more about [CSS custom properties](https://webawesome.com/docs/customizing/#custom-properties).

| Name | Description |
| --- | --- |
| \`--hide-duration\` | \`100ms\` The duration of the hide animation. Default |
| \`--show-duration\` | \`100ms\` The duration of the show animation. Default |
| \`--tag-max-size\` | \`multiple\` When using , the max size of tags before their content is truncated. Default 10ch |

## Custom States

Learn more about [custom states](https://webawesome.com/docs/customizing/#custom-states).

| Name | Description | CSS selector |
| --- | --- | --- |
| \`blank\` | The combobox is empty. | \`:state(blank)\` |
| \`disabled\` | The combobox is disabled. | \`:state(disabled)\` |

## CSS parts

Learn more about [CSS parts](https://webawesome.com/docs/customizing/#css-parts).

| Name | Description | CSS selector |
| --- | --- | --- |
| \`clear-button\` | The clear button. | \`::part(clear-button)\` |
| \`combobox\` | The container the wraps the start, end, value, clear icon, and expand button. | \`::part(combobox)\` |
| \`combobox-input\` | The text input element. | \`::part(combobox-input)\` |
| \`end\` | \`end\` The container that wraps the slot. | \`::part(end)\` |
| \`expand-icon\` | The container that wraps the expand icon. | \`::part(expand-icon)\` |
| \`form-control\` | The form control that wraps the label, input, and hint. | \`::part(form-control)\` |
| \`form-control-input\` | The combobox's wrapper. | \`::part(form-control-input)\` |
| \`form-control-label\` | The label's wrapper. | \`::part(form-control-label)\` |
| \`hint\` | The hint's wrapper. | \`::part(hint)\` |
| \`listbox\` | The listbox container where options are slotted. | \`::part(listbox)\` |
| \`start\` | \`start\` The container that wraps the slot. | \`::part(start)\` |
| \`tag\` | The individual tags that represent each multiselect option. | \`::part(tag)\` |
| \`tag\_\_content\` | The tag's content part. | \`::part(tag\_\_content)\` |
| \`tag\_\_remove-button\` | The tag's remove button. | \`::part(tag\_\_remove-button)\` |
| \`tag\_\_remove-button\_\_base\` | The tag's remove button base part. | \`::part(tag\_\_remove-button\_\_base)\` |
| \`tags\` | \`multiselect\` The container that houses option tags when is used. | \`::part(tags)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-button>`](https://webawesome.com/docs/components/button)
-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)
-   [`<wa-option>`](https://webawesome.com/docs/components/option)
-   [`<wa-popup>`](https://webawesome.com/docs/components/popup)
-   [`<wa-spinner>`](https://webawesome.com/docs/components/spinner)
-   [`<wa-tag>`](https://webawesome.com/docs/components/tag)

**Need a hand?** Report a bug Ask for help