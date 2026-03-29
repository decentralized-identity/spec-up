# Bar Chart [Pro]

**Full documentation:** https://webawesome.com/docs/components/bar-chart

> This component requires [Web Awesome Pro](https://webawesome.com/purchase).
`<wa-bar-chart>` Since 3.3 Experimental Pro Bar-chart requires access to Web Awesome Pro

Bar charts compare quantities across categories using rectangular bars. They work well for showing rankings, highlighting differences between groups, and tracking changes across time periods.

```html
<wa-bar-chart id="bar-hero" label="Quarterly Revenue" description="A bar chart comparing online and in-store revenue across four quarters">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-hero');

  chart.config = {
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        { label: 'Online', data: [42, 58, 63, 71] },
        { label: 'In-Store', data: [65, 53, 48, 52] }
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
<wa-bar-chart id="bar-js-example" label="Survey Results" description="A bar chart of survey results by category">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-js-example');

  chart.config = {
    data: {
      labels: ['Excellent', 'Good', 'Average', 'Poor'],
      datasets: [{
        label: 'Responses',
        data: [45, 30, 18, 7]
      }]
    }
  };
</script>
```

Note that `config` is shallowly reactive. If you mutate the existing object in place, you must reassign it to trigger a re-render!

### Providing Data with JSON

Place a `<script type="application/json">` tag inside the component with your chart data. The `type` field can be omitted since `wa-bar-chart` already knows its chart type.

```html
<wa-bar-chart label="Survey Results" description="A bar chart of survey results by category">
  <script type="application/json">
    {
      "data": {
        "labels": ["Excellent", "Good", "Average", "Poor"],
        "datasets": [{
          "label": "Responses",
          "data": [45, 30, 18, 7]
        }]
      }
    }
  </script>
</wa-bar-chart>
```

### Multiple Datasets

Add multiple objects to the `datasets` array to compare groups side by side.

```html
<wa-bar-chart id="bar-multi" label="Quarterly Sales by Channel" description="A bar chart comparing three sales channels across four quarters">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-multi');

  chart.config = {
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        { label: 'Online', data: [42, 58, 63, 71] },
        { label: 'In-Store', data: [65, 53, 48, 52] },
        { label: 'Wholesale', data: [28, 32, 35, 40] }
      ]
    }
  };
</script>
```

### Custom Colors

Override the default color palette using the `--fill-color-*` and `--border-color-*` CSS custom properties on the component.

```html
<wa-bar-chart
  id="bar-colors"
  label="Custom Colors"
  description="A bar chart with custom purple and cyan colors"
  style="
    --fill-color-1: color-mix(in srgb, var(--wa-color-purple-60) 50%, transparent);
    --border-color-1: var(--wa-color-purple-60);
    --fill-color-2: color-mix(in srgb, var(--wa-color-cyan-60) 50%, transparent);
    --border-color-2: var(--wa-color-cyan-60);
  "
>
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-colors');

  chart.config = {
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        { label: 'Product A', data: [42, 58, 63, 71] },
        { label: 'Product B', data: [65, 53, 48, 52] }
      ]
    }
  };
</script>
```

### Horizontal Bars

Use the `orientation="horizontal"` attribute to render bars horizontally. This is useful when category labels are long or when you want to emphasize ranking.

```html
<wa-bar-chart id="bar-horizontal" orientation="horizontal" label="Department Satisfaction" description="A horizontal bar chart showing satisfaction scores by department">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-horizontal');

  chart.config = {
    data: {
      labels: ['Engineering', 'Marketing', 'Sales', 'Design', 'Support'],
      datasets: [{
        label: 'Satisfaction Score',
        data: [88, 76, 82, 91, 79]
      }]
    }
  };
</script>
```

### Stacked Bars

Use the `stacked` attribute to stack datasets on top of each other. This is helpful for showing how parts contribute to a total.

```html
<wa-bar-chart id="bar-stacked" stacked label="Monthly Expenses" description="A stacked bar chart showing expenses broken into categories">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-stacked');

  chart.config = {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        { label: 'Rent', data: [1200, 1200, 1200, 1200, 1200, 1200] },
        { label: 'Utilities', data: [180, 160, 150, 140, 170, 190] },
        { label: 'Groceries', data: [420, 380, 450, 400, 430, 410] }
      ]
    }
  };
</script>
```

### Border Width

Use the `--border-width` CSS custom property to control the thickness of bar borders.

```html
<wa-bar-chart id="bar-border" style="--border-width: 4px" label="Thick Borders" description="A bar chart with thicker bar borders">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-border');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [{
        label: 'Values',
        data: [30, 50, 20, 40]
      }]
    }
  };
</script>
```

### Legend

Use the `legend-position` attribute to control where the legend appears. Supported values include `top` (default), `bottom`, `left`, `right`, `start`, and `end`. The `start` and `end` values are direction-aware and will flip in RTL layouts. Add `without-legend` to hide it entirely.

```html
<wa-bar-chart id="bar-legend" legend-position="bottom" label="Legend at Bottom" description="A bar chart with the legend positioned at the bottom">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-legend');

  chart.config = {
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        { label: 'Completed', data: [12, 19, 8, 15, 22] },
        { label: 'Pending', data: [5, 3, 10, 7, 2] }
      ]
    }
  };
</script>
```

### Grid Lines

Use the `grid` attribute to control which axes show grid lines. Options are `both` (default), `x`, `y`, and `none`.

```html
<wa-bar-chart id="bar-grid" grid="y" label="Y-Axis Grid Only" description="A bar chart showing only horizontal grid lines">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-grid');

  chart.config = {
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Tasks Completed',
        data: [12, 19, 8, 15, 22]
      }]
    }
  };
</script>
```

### Axis Labels

Use the `x-label` and `y-label` attributes to add descriptive labels to each axis.

```html
<wa-bar-chart id="bar-axis" x-label="Product" y-label="Units Sold" label="Product Sales" description="A bar chart with labeled axes showing units sold per product">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-axis');

  chart.config = {
    data: {
      labels: ['Widget', 'Gadget', 'Gizmo', 'Doohickey'],
      datasets: [{
        label: 'Units Sold',
        data: [340, 220, 180, 95]
      }]
    }
  };
</script>
```

### Axis Range

Use the `min` and `max` attributes to constrain the value axis.

```html
<wa-bar-chart id="bar-range" min="0" max="100" label="Test Scores" description="A bar chart with a constrained y-axis from 0 to 100">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-range');

  chart.config = {
    data: {
      labels: ['Alice', 'Bob', 'Carol', 'Dave'],
      datasets: [{
        label: 'Score',
        data: [82, 91, 76, 88]
      }]
    }
  };
</script>
```

### Disabling Tooltips

Use the `without-tooltip` attribute to hide the tooltips that appear when hovering over data points.

```html
<wa-bar-chart id="bar-tooltip" without-tooltip label="No Tooltips" description="A bar chart with tooltips disabled">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-tooltip');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [{
        label: 'Values',
        data: [30, 50, 20, 40]
      }]
    }
  };
</script>
```

### Disabling Animations

Use the `without-animation` attribute to disable chart transitions.

```html
<wa-bar-chart id="bar-anim" without-animation label="No Animation" description="A bar chart with animation disabled">
</wa-bar-chart>
<script type="module">
  const chart = document.querySelector('#bar-anim');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [{
        label: 'Values',
        data: [30, 50, 20, 40]
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
import '@awesome.me/webawesome/dist/components/bar-chart/bar-chart.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaBarChart from '@awesome.me/webawesome/dist/react/bar-chart';
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
| \`type\` type | \`bar\` The type of chart to render. Valid types include , line, pie, doughnut, polarArea, radar, scatter, and bubble. Type ChartType Default 'bar' | | |
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