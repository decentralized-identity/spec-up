# Pie Chart [Pro]

**Full documentation:** https://webawesome.com/docs/components/pie-chart

> This component requires [Web Awesome Pro](https://webawesome.com/purchase).
`<wa-pie-chart>` Since 3.3 Experimental Pro Pie-chart requires access to Web Awesome Pro

Pie charts show the proportional composition of a whole as slices of a circle. They work best with a small number of categories where the relative proportions matter more than exact values.

For a variation with a hollow center, see [Doughnut Chart](https://webawesome.com/docs/components/doughnut-chart).

```html
<wa-pie-chart id="pie-hero" label="Browser Market Share" description="A pie chart showing browser market share with Chrome leading at 65%">
</wa-pie-chart>
<script type="module">
  const chart = document.querySelector('#pie-hero');

  chart.config = {
    data: {
      labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'],
      datasets: [{
        label: 'Market Share',
        data: [65, 18, 8, 5, 4]
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
<wa-pie-chart id="pie-js-example" label="Budget Allocation" description="A pie chart of budget allocation">
</wa-pie-chart>
<script type="module">
  const chart = document.querySelector('#pie-js-example');

  chart.config = {
    data: {
      labels: ['Engineering', 'Marketing', 'Sales', 'Operations'],
      datasets: [{
        label: 'Budget',
        data: [40, 25, 20, 15]
      }]
    }
  };
</script>
```

Note that `config` is shallowly reactive. If you mutate the existing object in place, you must reassign it to trigger a re-render!

### Providing Data with JSON

Place a `<script type="application/json">` tag inside the component with your chart data. Each value in the `data` array corresponds to a label.

```html
<wa-pie-chart label="Budget Allocation" description="A pie chart showing how a budget is allocated across departments">
  <script type="application/json">
    {
      "data": {
        "labels": ["Engineering", "Marketing", "Sales", "Operations"],
        "datasets": [{
          "label": "Budget",
          "data": [40, 25, 20, 15]
        }]
      }
    }
  </script>
</wa-pie-chart>
```

### Custom Slice Colors

Override the default color palette using the `--fill-color-*` and `--border-color-*` CSS custom properties to apply custom colors to each slice.

```html
<wa-pie-chart
  id="pie-colors"
  label="Custom Colors"
  description="A pie chart with custom slice colors"
  style="
    --fill-color-1: color-mix(in srgb, var(--wa-color-blue-60) 70%, transparent);
    --border-color-1: var(--wa-color-blue-60);
    --fill-color-2: color-mix(in srgb, var(--wa-color-cyan-60) 70%, transparent);
    --border-color-2: var(--wa-color-cyan-60);
    --fill-color-3: color-mix(in srgb, var(--wa-color-purple-60) 70%, transparent);
    --border-color-3: var(--wa-color-purple-60);
  "
>
</wa-pie-chart>
<script type="module">
  const chart = document.querySelector('#pie-colors');

  chart.config = {
    data: {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [{
        label: 'Traffic',
        data: [55, 35, 10]
      }]
    }
  };
</script>
```

### Legend

Use the `legend-position` attribute to control where the legend appears. For pie charts, placing the legend on the side can help prevent overlap. Add `without-legend` to hide it entirely.

```html
<wa-pie-chart id="pie-legend" legend-position="right" label="Legend on Right" description="A pie chart with the legend on the right side">
</wa-pie-chart>
<script type="module">
  const chart = document.querySelector('#pie-legend');

  chart.config = {
    data: {
      labels: ['Rent', 'Food', 'Transport', 'Entertainment', 'Savings'],
      datasets: [{
        label: 'Monthly Spending',
        data: [35, 25, 15, 10, 15]
      }]
    }
  };
</script>
```

### Disabling Tooltips

Use the `without-tooltip` attribute to hide the tooltips that appear when hovering over slices.

```html
<wa-pie-chart id="pie-tooltip" without-tooltip label="No Tooltips" description="A pie chart with tooltips disabled">
</wa-pie-chart>
<script type="module">
  const chart = document.querySelector('#pie-tooltip');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C'],
      datasets: [{
        label: 'Values',
        data: [40, 35, 25]
      }]
    }
  };
</script>
```

### Disabling Animations

Use the `without-animation` attribute to disable chart transitions.

```html
<wa-pie-chart id="pie-anim" without-animation label="No Animation" description="A pie chart with animation disabled">
</wa-pie-chart>
<script type="module">
  const chart = document.querySelector('#pie-anim');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C'],
      datasets: [{
        label: 'Values',
        data: [40, 35, 25]
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
import '@awesome.me/webawesome/dist/components/pie-chart/pie-chart.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaPieChart from '@awesome.me/webawesome/dist/react/pie-chart';
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
| \`type\` type | \`bar\` The type of chart to render. Valid types include , line, pie, doughnut, polarArea, radar, scatter, and bubble. Type ChartType Default 'pie' | | |
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