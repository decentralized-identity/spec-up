# Line Chart [Pro]

**Full documentation:** https://webawesome.com/docs/components/line-chart

> This component requires [Web Awesome Pro](https://webawesome.com/purchase).
`<wa-line-chart>` Since 3.3 Experimental Pro Line-chart requires access to Web Awesome Pro

Line charts show trends over time by connecting data points with line segments. Use them when the x-axis represents a sequential dimension and you want to emphasize the shape and direction of the data.

```html
<wa-line-chart id="line-hero" label="Monthly Visitors" description="A line chart showing website visitors over seven months">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-hero');

  chart.config = {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Visitors',
        data: [4200, 4800, 5100, 4900, 5500, 6200, 5800]
      }]
    }
  };
</script>
```

For advanced configuration such as mixed chart types, custom plugins, and direct Chart.js access, see [`<wa-chart>`](https://webawesome.com/docs/components/chart).

## Examples

### Providing Data with JavaScript

For dynamic data, set the `config` property directly. The chart will re-render automatically.

```html
<wa-line-chart id="line-js-example" label="Weekly Signups" description="A line chart showing new user signups over one week">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-js-example');

  chart.config = {
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Signups',
        data: [120, 95, 140, 160, 130, 80, 65]
      }]
    }
  };
</script>
```

Note that `config` is shallowly reactive. If you mutate the existing object in place, you must reassign it to trigger a re-render!

### Providing Data with JSON

Place a `<script type="application/json">` tag inside the component with your chart data. The `type` field can be omitted since `wa-line-chart` already knows its chart type.

```html
<wa-line-chart label="Weekly Signups" description="A line chart showing new user signups over one week">
  <script type="application/json">
    {
      "data": {
        "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "datasets": [{
          "label": "Signups",
          "data": [120, 95, 140, 160, 130, 80, 65]
        }]
      }
    }
  </script>
</wa-line-chart>
```

### Multiple Lines

Add multiple datasets to compare trends across different series.

```html
<wa-line-chart id="line-multi" label="Traffic by Source" description="A line chart comparing website traffic from three different sources">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-multi');

  chart.config = {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        { label: 'Organic', data: [2200, 2800, 3100, 2900, 3500, 4200] },
        { label: 'Paid', data: [1800, 2100, 1900, 2400, 2200, 2600] },
        { label: 'Social', data: [800, 950, 1100, 1300, 1200, 1500] }
      ]
    }
  };
</script>
```

### Custom Colors

Override the default color palette using the `--fill-color-*` and `--border-color-*` CSS custom properties on the component.

```html
<wa-line-chart
  id="line-colors"
  label="Custom Colors"
  description="A line chart with custom purple and orange line colors"
  style="
    --fill-color-1: var(--wa-color-purple-60);
    --border-color-1: var(--wa-color-purple-60);
    --fill-color-2: var(--wa-color-orange-60);
    --border-color-2: var(--wa-color-orange-60);
  "
>
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-colors');

  chart.config = {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        { label: 'Revenue', data: [12, 19, 15, 25, 22, 30] },
        { label: 'Expenses', data: [8, 12, 10, 15, 14, 18] }
      ]
    }
  };
</script>
```

### Fill Area

Set `fill` to `true` on a dataset to fill the area beneath the line. This works well for emphasizing volume or magnitude.

```html
<wa-line-chart id="line-fill-example" label="Cumulative Signups" description="A line chart with a filled area showing cumulative signups">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-fill-example');

  chart.config = {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Cumulative Signups',
        data: [500, 1200, 2100, 3400, 4800, 6500],
        fill: true
      }]
    }
  };
</script>
```

### Stacked Area

Combine the `stacked` attribute with `fill: true` on each dataset to create a stacked area chart.

```html
<wa-line-chart id="line-stacked-example" stacked label="Traffic by Source" description="A stacked area chart showing traffic by source over time">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-stacked-example');

  chart.config = {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Organic',
          data: [2200, 2800, 3100, 2900, 3500, 4200],
          fill: true
        },
        {
          label: 'Paid',
          data: [1800, 2100, 1900, 2400, 2200, 2600],
          fill: true
        },
        {
          label: 'Social',
          data: [800, 950, 1100, 1300, 1200, 1500],
          fill: true
        }
      ]
    }
  };
</script>
```

### Border Width

Use the `--line-border-width` CSS custom property to control the thickness of the lines.

```html
<wa-line-chart id="line-border" style="--line-border-width: 5px" label="Thick Lines" description="A line chart with thicker lines">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-border');

  chart.config = {
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Response Time (ms)',
        data: [45, 52, 48, 55, 50]
      }]
    }
  };
</script>
```

### Point Radius

Use the `--point-radius` CSS custom property to control the size of the dots drawn at each data point. Set it to `0` to hide points entirely.

```html
<wa-line-chart id="line-points" style="--point-radius: 6px" label="Large Points" description="A line chart with larger data point dots">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-points');

  chart.config = {
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Response Time (ms)',
        data: [45, 52, 48, 55, 50]
      }]
    }
  };
</script>
```

### Legend

Use the `legend-position` attribute to control where the legend appears. Add `without-legend` to hide it entirely.

```html
<wa-line-chart id="line-legend" legend-position="bottom" label="Legend at Bottom" description="A line chart with the legend positioned at the bottom">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-legend');

  chart.config = {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        { label: 'Page Views', data: [1200, 1350, 1280, 1420, 1580, 1650] },
        { label: 'Unique Visitors', data: [800, 920, 870, 980, 1050, 1120] }
      ]
    }
  };
</script>
```

### Grid Lines

Use the `grid` attribute to control which axes show grid lines. Options are `both` (default), `x`, `y`, and `none`.

```html
<wa-line-chart id="line-grid" grid="x" label="X-Axis Grid Only" description="A line chart showing only vertical grid lines">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-grid');

  chart.config = {
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Orders',
        data: [42, 58, 35, 61, 48]
      }]
    }
  };
</script>
```

### Axis Labels

Use the `x-label` and `y-label` attributes to add descriptive labels to each axis.

```html
<wa-line-chart id="line-axis" x-label="Month" y-label="Visitors" label="Monthly Traffic" description="A line chart with labeled axes showing monthly visitors">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-axis');

  chart.config = {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Visitors',
        data: [4200, 4800, 5100, 4900, 5500, 6200]
      }]
    }
  };
</script>
```

### Axis Range

Use the `min` and `max` attributes to constrain the value axis.

```html
<wa-line-chart id="line-range" min="0" max="100" label="Completion Rate" description="A line chart with a constrained y-axis from 0 to 100">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-range');

  chart.config = {
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      datasets: [{
        label: 'Completion Rate (%)',
        data: [62, 71, 68, 85, 78]
      }]
    }
  };
</script>
```

### Disabling Tooltips

Use the `without-tooltip` attribute to hide the tooltips that appear when hovering over data points.

```html
<wa-line-chart id="line-tooltip" without-tooltip label="No Tooltips" description="A line chart with tooltips disabled">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-tooltip');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [{
        label: 'Values',
        data: [10, 40, 20, 50, 30]
      }]
    }
  };
</script>
```

### Disabling Animations

Use the `without-animation` attribute to disable chart transitions.

```html
<wa-line-chart id="line-anim" without-animation label="No Animation" description="A line chart with animation disabled">
</wa-line-chart>
<script type="module">
  const chart = document.querySelector('#line-anim');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [{
        label: 'Values',
        data: [10, 40, 20, 50, 30]
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
import '@awesome.me/webawesome/dist/components/line-chart/line-chart.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaLineChart from '@awesome.me/webawesome/dist/react/line-chart';
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
| \`type\` type | \`bar\` The type of chart to render. Valid types include , line, pie, doughnut, polarArea, radar, scatter, and bubble. Type ChartType Default 'line' | | |
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