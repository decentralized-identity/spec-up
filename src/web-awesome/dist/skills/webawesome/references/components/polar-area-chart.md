# Polar Area Chart [Pro]

**Full documentation:** https://webawesome.com/docs/components/polar-area-chart

> This component requires [Web Awesome Pro](https://webawesome.com/purchase).
`<wa-polar-area-chart>` Since 3.3 Experimental Pro Polar-area-chart requires access to Web Awesome Pro

Polar area charts compare values using segments that radiate from a center point with varying radius. Unlike pie charts, each segment has an equal angle while the radius varies, making them useful for comparing magnitudes without visual bias.

```html
<wa-polar-area-chart id="polar-hero" label="Monthly Rainfall" description="A polar area chart showing monthly rainfall in millimeters">
</wa-polar-area-chart>
<script type="module">
  const chart = document.querySelector('#polar-hero');

  chart.config = {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        label: 'Rainfall (mm)',
        data: [78, 62, 85, 110, 95, 45]
      }]
    }
  };
</script>
```

For advanced configuration such as custom plugins and direct Chart.js access, see [`<wa-chart>`](https://webawesome.com/docs/components/chart).

## Examples

### Providing Data with JavaScript

For dynamic data, set the `config` property directly. The chart will re-render automatically.

```html
<wa-polar-area-chart id="polar-js-example" label="Energy Production" description="A polar area chart of energy output">
</wa-polar-area-chart>
<script type="module">
  const chart = document.querySelector('#polar-js-example');

  chart.config = {
    data: {
      labels: ['Solar', 'Wind', 'Hydro', 'Nuclear', 'Natural Gas'],
      datasets: [{
        label: 'Output (GW)',
        data: [85, 72, 110, 95, 130]
      }]
    }
  };
</script>
```

Note that `config` is shallowly reactive. If you mutate the existing object in place, you must reassign it to trigger a re-render!

### Providing Data with JSON

Place a `<script type="application/json">` tag inside the component with your chart data. Each value in the `data` array corresponds to a label, and the segment radius reflects its magnitude.

```html
<wa-polar-area-chart label="Energy Production" description="A polar area chart showing energy production by source in gigawatts">
  <script type="application/json">
    {
      "data": {
        "labels": ["Solar", "Wind", "Hydro", "Nuclear", "Natural Gas"],
        "datasets": [{
          "label": "Output (GW)",
          "data": [85, 72, 110, 95, 130]
        }]
      }
    }
  </script>
</wa-polar-area-chart>
```

### Custom Colors

Override the default color palette using the `--fill-color-*` and `--border-color-*` CSS custom properties.

```html
<wa-polar-area-chart
  id="polar-colors"
  label="Custom Colors"
  description="A polar area chart with custom segment colors"
  style="
    --fill-color-1: color-mix(in srgb, var(--wa-color-blue-60) 60%, transparent);
    --border-color-1: var(--wa-color-blue-60);
    --fill-color-2: color-mix(in srgb, var(--wa-color-cyan-60) 60%, transparent);
    --border-color-2: var(--wa-color-cyan-60);
    --fill-color-3: color-mix(in srgb, var(--wa-color-purple-60) 60%, transparent);
    --border-color-3: var(--wa-color-purple-60);
    --fill-color-4: color-mix(in srgb, var(--wa-color-orange-60) 60%, transparent);
    --border-color-4: var(--wa-color-orange-60);
  "
>
</wa-polar-area-chart>
<script type="module">
  const chart = document.querySelector('#polar-colors');

  chart.config = {
    data: {
      labels: ['North', 'South', 'East', 'West'],
      datasets: [{
        label: 'Sales',
        data: [85, 60, 92, 75]
      }]
    }
  };
</script>
```

### Legend

Use the `legend-position` attribute to control where the legend appears. Add `without-legend` to hide it entirely.

```html
<wa-polar-area-chart id="polar-legend" legend-position="right" label="Legend on Right" description="A polar area chart with the legend on the right side">
</wa-polar-area-chart>
<script type="module">
  const chart = document.querySelector('#polar-legend');

  chart.config = {
    data: {
      labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
      datasets: [{
        label: 'Rating',
        data: [80, 90, 70, 95, 85]
      }]
    }
  };
</script>
```

### Disabling Tooltips

Use the `without-tooltip` attribute to hide the tooltips that appear when hovering over segments.

```html
<wa-polar-area-chart id="polar-tooltip" without-tooltip label="No Tooltips" description="A polar area chart with tooltips disabled">
</wa-polar-area-chart>
<script type="module">
  const chart = document.querySelector('#polar-tooltip');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [{
        label: 'Values',
        data: [40, 70, 55, 85]
      }]
    }
  };
</script>
```

### Disabling Animations

Use the `without-animation` attribute to disable chart transitions.

```html
<wa-polar-area-chart id="polar-anim" without-animation label="No Animation" description="A polar area chart with animation disabled">
</wa-polar-area-chart>
<script type="module">
  const chart = document.querySelector('#polar-anim');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [{
        label: 'Values',
        data: [40, 70, 55, 85]
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
import '@awesome.me/webawesome/dist/components/polar-area-chart/polar-area-chart.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaPolarAreaChart from '@awesome.me/webawesome/dist/react/polar-area-chart';
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
| \`type\` type | \`bar\` The type of chart to render. Valid types include , line, pie, doughnut, polarArea, radar, scatter, and bubble. Type ChartType Default 'polarArea' | | |
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