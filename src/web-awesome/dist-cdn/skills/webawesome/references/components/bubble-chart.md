# Bubble Chart [Pro]

**Full documentation:** https://webawesome.com/docs/components/bubble-chart

> This component requires [Web Awesome Pro](https://webawesome.com/purchase).
`<wa-bubble-chart>` Since 3.3 Experimental Pro Bubble-chart requires access to Web Awesome Pro

Bubble charts add a third dimension to scatter plots by varying the size of each data point. They are useful for visualizing relationships where a third variable adds meaning beyond a simple x/y correlation.

Bubble chart data uses `{x, y, r}` objects. The `r` value controls the bubble radius in pixels and is not tied to chart scales.

```html
<wa-bubble-chart id="bubble-hero" label="City Comparison" description="A bubble chart comparing cities by cost of living, quality of life, and population">
</wa-bubble-chart>
<script type="module">
  const chart = document.querySelector('#bubble-hero');

  chart.config = {
    data: {
      datasets: [
        {
          label: 'North America',
          data: [
            { x: 65, y: 7.8, r: 18 },
            { x: 50, y: 7.0, r: 12 },
            { x: 55, y: 7.5, r: 14 }
          ]
        },
        {
          label: 'Europe',
          data: [
            { x: 40, y: 8.2, r: 16 },
            { x: 30, y: 7.6, r: 10 },
            { x: 45, y: 8.0, r: 13 }
          ]
        }
      ]
    }
  };
</script>
```

For advanced configuration such as mixed chart types, custom plugins, and direct Chart.js access, see [`<wa-chart>`](https://webawesome.com/docs/components/chart).

## Examples

### Providing Data with JavaScript

For dynamic data, set the `config` property directly. The chart will re-render automatically.

```html
<wa-bubble-chart id="bubble-js-example" label="Product Analysis" description="A bubble chart of products by price, rating, and volume">
</wa-bubble-chart>
<script type="module">
  const chart = document.querySelector('#bubble-js-example');

  chart.config = {
    data: {
      datasets: [{
        label: 'Products',
        data: [
          { x: 30, y: 4.2, r: 18 },
          { x: 50, y: 4.5, r: 14 },
          { x: 25, y: 3.9, r: 22 },
          { x: 55, y: 4.7, r: 10 },
          { x: 40, y: 4.0, r: 16 }
        ]
      }]
    }
  };
</script>
```

Note that `config` is shallowly reactive. If you mutate the existing object in place, you must reassign it to trigger a re-render!

### Providing Data with JSON

Place a `<script type="application/json">` tag inside the component. Each data point is an object with `x`, `y`, and `r` properties.

```html
<wa-bubble-chart label="Product Analysis" description="A bubble chart showing products by price, rating, and sales volume">
  <script type="application/json">
    {
      "data": {
        "datasets": [{
          "label": "Products",
          "data": [
            {"x": 30, "y": 4.2, "r": 18},
            {"x": 50, "y": 4.5, "r": 14},
            {"x": 25, "y": 3.9, "r": 22},
            {"x": 55, "y": 4.7, "r": 10},
            {"x": 40, "y": 4.0, "r": 16}
          ]
        }]
      }
    }
  </script>
</wa-bubble-chart>
```

### Bubble Sizes

The `r` property on each data point sets the bubble radius in pixels. Unlike x and y, this value is absolute and not mapped to a chart scale. Use larger values to represent greater magnitude.

```html
<wa-bubble-chart id="bubble-sizes" label="Investment Portfolio" description="A bubble chart where bubble size represents investment amount">
</wa-bubble-chart>
<script type="module">
  const chart = document.querySelector('#bubble-sizes');

  chart.config = {
    data: {
      datasets: [{
        label: 'Investments',
        data: [
          { x: 4, y: 12, r: 28 },
          { x: 6, y: 8, r: 14 },
          { x: 7, y: 14, r: 22 },
          { x: 3, y: 7, r: 10 },
          { x: 8, y: 16, r: 18 }
        ]
      }]
    }
  };
</script>
```

### Multiple Datasets

Use multiple datasets to compare groups of bubbles. Each group gets its own color.

```html
<wa-bubble-chart id="bubble-multi" label="Industry Comparison" description="A bubble chart comparing metrics across two industry sectors">
</wa-bubble-chart>
<script type="module">
  const chart = document.querySelector('#bubble-multi');

  chart.config = {
    data: {
      datasets: [
        {
          label: 'Technology',
          data: [
            { x: 70, y: 8.5, r: 18 },
            { x: 55, y: 7.8, r: 14 },
            { x: 65, y: 8.2, r: 12 }
          ]
        },
        {
          label: 'Healthcare',
          data: [
            { x: 40, y: 7.2, r: 16 },
            { x: 50, y: 7.6, r: 18 },
            { x: 35, y: 7.5, r: 12 }
          ]
        }
      ]
    }
  };
</script>
```

### Custom Colors

Override the default color palette using the `--fill-color-*` and `--border-color-*` CSS custom properties on the component.

```html
<wa-bubble-chart
  id="bubble-colors"
  label="Custom Colors"
  description="A bubble chart with custom colors"
  style="
    --fill-color-1: color-mix(in srgb, var(--wa-color-orange-60) 50%, transparent);
    --border-color-1: var(--wa-color-orange-60);
  "
>
</wa-bubble-chart>
<script type="module">
  const chart = document.querySelector('#bubble-colors');

  chart.config = {
    data: {
      datasets: [{
        label: 'Data Points',
        data: [
          { x: 25, y: 35, r: 16 },
          { x: 45, y: 50, r: 12 },
          { x: 55, y: 40, r: 18 },
          { x: 35, y: 55, r: 14 }
        ]
      }]
    }
  };
</script>
```

### Legend

Use the `legend-position` attribute to control where the legend appears. Add `without-legend` to hide it entirely.

```html
<wa-bubble-chart id="bubble-legend" legend-position="bottom" label="Legend at Bottom" description="A bubble chart with the legend at the bottom">
</wa-bubble-chart>
<script type="module">
  const chart = document.querySelector('#bubble-legend');

  chart.config = {
    data: {
      datasets: [
        {
          label: 'Group A',
          data: [
            { x: 20, y: 30, r: 14 },
            { x: 40, y: 45, r: 18 }
          ]
        },
        {
          label: 'Group B',
          data: [
            { x: 30, y: 50, r: 14 },
            { x: 50, y: 35, r: 12 }
          ]
        }
      ]
    }
  };
</script>
```

### Grid Lines

Use the `grid` attribute to control which axes show grid lines. Options are `both` (default), `x`, `y`, and `none`.

```html
<wa-bubble-chart id="bubble-grid" grid="none" label="No Grid" description="A bubble chart with grid lines hidden">
</wa-bubble-chart>
<script type="module">
  const chart = document.querySelector('#bubble-grid');

  chart.config = {
    data: {
      datasets: [{
        label: 'Observations',
        data: [
          { x: 20, y: 30, r: 12 },
          { x: 40, y: 50, r: 16 },
          { x: 50, y: 38, r: 14 },
          { x: 60, y: 52, r: 18 }
        ]
      }]
    }
  };
</script>
```

### Axis Labels

Use the `x-label` and `y-label` attributes to add descriptive labels to each axis.

```html
<wa-bubble-chart id="bubble-axis" x-label="Cost Index" y-label="Quality Score" label="City Analysis" description="A bubble chart with labeled axes comparing city cost and quality">
</wa-bubble-chart>
<script type="module">
  const chart = document.querySelector('#bubble-axis');

  chart.config = {
    data: {
      datasets: [{
        label: 'Cities',
        data: [
          { x: 40, y: 7.2, r: 16 },
          { x: 55, y: 8.2, r: 18 },
          { x: 50, y: 7.8, r: 12 },
          { x: 60, y: 7.6, r: 10 }
        ]
      }]
    }
  };
</script>
```

### Disabling Tooltips

Use the `without-tooltip` attribute to hide the tooltips that appear when hovering over bubbles.

```html
<wa-bubble-chart id="bubble-tooltip" without-tooltip label="No Tooltips" description="A bubble chart with tooltips disabled">
</wa-bubble-chart>
<script type="module">
  const chart = document.querySelector('#bubble-tooltip');

  chart.config = {
    data: {
      datasets: [{
        label: 'Data',
        data: [
          { x: 25, y: 30, r: 12 },
          { x: 40, y: 42, r: 16 },
          { x: 50, y: 35, r: 14 }
        ]
      }]
    }
  };
</script>
```

### Disabling Animations

Use the `without-animation` attribute to disable chart transitions.

```html
<wa-bubble-chart id="bubble-anim" without-animation label="No Animation" description="A bubble chart with animation disabled">
</wa-bubble-chart>
<script type="module">
  const chart = document.querySelector('#bubble-anim');

  chart.config = {
    data: {
      datasets: [{
        label: 'Data',
        data: [
          { x: 25, y: 30, r: 12 },
          { x: 40, y: 42, r: 16 },
          { x: 50, y: 35, r: 14 }
        ]
      }]
    }
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
import '@awesome.me/webawesome/dist/components/bubble-chart/bubble-chart.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaBubbleChart from '@awesome.me/webawesome/dist/react/bubble-chart';
```

## Slots

Learn more about [using slots](https://webawesome.com/docs/usage/#slots).

| Name | Description |
| --- | --- |
| (default) | \`

## Attributes & Properties

Learn more about [attributes and properties](https://webawesome.com/docs/usage/#attributes-and-properties).

| Name | Description | Reflects |
| --- | --- | --- |
| \`config\` | \`ChartJS\['config'\]\` The Chart.js configuration object. Setting this property will automatically re-render the chart. Type | | |
| \`css\` | \`CSSResultGroup \\| undefined\` One or more CSSResultGroup to include in the component's shadow root. Host styles are automatically prepended. Type Default \[styles\] | | |
| \`description\` description | \`string \\| null\` A description of the chart, used for accessibility. Type Default null | | |
| \`grid\` grid | \`'x' \\| 'y' \\| 'both' \\| 'none'\` Which axes to show grid lines on. Type Default 'both' | | |
| \`indexAxis\` index-axis | \`'x' \\| 'y'\` The base axis of the dataset. 'x' for vertical bars and 'y' for horizontal bars. Type Default 'x' | | |
| \`label\` label | \`string \\| null\` A label for the chart, used for accessibility. Type Default null | | |
| \`legendPosition\` legend-position | \`LayoutPosition \\| 'start' \\| 'end'\` The position of the legend relative to the chart. Type Default 'top' | | |
| \`max\` max | \`number \\| null\` The maximum value for the value axis. Type Default null | | |
| \`min\` min | \`number \\| null\` The minimum value for the value axis. Type Default null | | |
| \`plugins\` plugins | \`array\` Additional Chart.js plugins to register for this chart instance. Type Default \[\] | | |
| \`stacked\` stacked | \`boolean\` Stacks datasets on top of each other along the value axis. Type Default false | | |
| \`type\` type | \`bar\` The type of chart to render. Valid types include , line, pie, doughnut, polarArea, radar, scatter, and bubble. Type ChartType Default 'bubble' | | |
| \`withoutAnimation\` without-animation | \`boolean\` Disables chart animations Type Default false | | |
| \`withoutLegend\` without-legend | \`boolean\` Hides the legend Type Default false | | |
| \`withoutTooltip\` without-tooltip | \`boolean\` Hides tooltips over data points Type Default false | | |
| \`xLabel\` xLabel | \`string \\| null\` A label for the x-axis. Type Default null | | |
| \`yLabel\` yLabel | \`string \\| null\` A label for the y-axis. Type Default null | | |

## CSS custom properties

Learn more about [CSS custom properties](https://webawesome.com/docs/customizing/#custom-properties).

| Name | Description |
| --- | --- |
| \`--border-color-1\` | \`var(--wa-color-blue-60)\` Border color for the first dataset. Default |
| \`--border-color-2\` | \`var(--wa-color-pink-60)\` Border color for the second dataset. Default |
| \`--border-color-3\` | \`var(--wa-color-green-60)\` Border color for the third dataset. Default |
| \`--border-color-4\` | \`var(--wa-color-yellow-60)\` Border color for the fourth dataset. Default |
| \`--border-color-5\` | \`var(--wa-color-purple-60)\` Border color for the fifth dataset. Default |
| \`--border-color-6\` | \`var(--wa-color-orange-60)\` Border color for the sixth dataset. Default |
| \`--border-radius\` | \`var(--wa-border-radius-s)\` Border radius for bar charts. Default |
| \`--border-width\` | \`var(--wa-border-width-s)\` Border width for bars and arcs. Default |
| \`--fill-color-1\` | \`color-mix(in srgb, var(--wa-color-blue-60) 40%, transparent)\` Fill color for the first dataset. Default |
| \`--fill-color-2\` | \`color-mix(in srgb, var(--wa-color-pink-60) 40%, transparent)\` Fill color for the second dataset. Default |
| \`--fill-color-3\` | \`color-mix(in srgb, var(--wa-color-green-60) 40%, transparent)\` Fill color for the third dataset. Default |
| \`--fill-color-4\` | \`color-mix(in srgb, var(--wa-color-yellow-60) 40%, transparent)\` Fill color for the fourth dataset. Default |
| \`--fill-color-5\` | \`color-mix(in srgb, var(--wa-color-purple-60) 40%, transparent)\` Fill color for the fifth dataset. Default |
| \`--fill-color-6\` | \`color-mix(in srgb, var(--wa-color-orange-60) 40%, transparent)\` Fill color for the sixth dataset. Default |
| \`--grid-border-width\` | \`var(--wa-border-width-s)\` Border width for chart grid lines and axis borders. Default |
| \`--grid-color\` | \`var(--wa-color-neutral-border-quiet)\` Color of the chart grid lines and axis borders. Default |
| \`--line-border-width\` | \`var(--wa-border-width-m)\` Border width for line and radar charts. Default |
| \`--point-radius\` | \`var(--wa-border-width-m)\` Radius of data point dots. Default |

**Need a hand?** Report a bug Ask for help