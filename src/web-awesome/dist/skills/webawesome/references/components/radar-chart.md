# Radar Chart [Pro]

**Full documentation:** https://webawesome.com/docs/components/radar-chart

> This component requires [Web Awesome Pro](https://webawesome.com/purchase).
`<wa-radar-chart>` Since 3.3 Experimental Pro Radar-chart requires access to Web Awesome Pro

Radar charts compare multiple variables at once by plotting data on a radial grid. They are well-suited for comparing profiles across several dimensions, such as skill assessments, product attributes, or performance metrics.

```html
<wa-radar-chart id="radar-hero" label="Employee Skills" description="A radar chart comparing skill levels across six categories">
</wa-radar-chart>
<script type="module">
  const chart = document.querySelector('#radar-hero');

  chart.config = {
    data: {
      labels: ['Communication', 'Technical', 'Leadership', 'Creativity', 'Teamwork', 'Problem Solving'],
      datasets: [{
        label: 'Alice',
        data: [85, 92, 70, 88, 95, 78],
        fill: true,
        backgroundColor: 'color-mix(in srgb, var(--wa-color-red-60) 20%, transparent)',
        borderColor: 'var(--wa-color-red-60)'
      }, {
        label: 'Bob',
        data: [72, 78, 90, 65, 80, 88],
        fill: true,
        backgroundColor: 'color-mix(in srgb, var(--wa-color-blue-60) 20%, transparent)',
        borderColor: 'var(--wa-color-blue-60)'
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
<wa-radar-chart id="radar-js-example" label="Feature Comparison" description="A radar chart comparing product features">
</wa-radar-chart>
<script type="module">
  const chart = document.querySelector('#radar-js-example');

  chart.config = {
    data: {
      labels: ['Speed', 'Reliability', 'Ease of Use', 'Features', 'Support'],
      datasets: [{
        label: 'Product A',
        data: [85, 90, 75, 80, 70]
      }]
    }
  };
</script>
```

Note that `config` is shallowly reactive. If you mutate the existing object in place, you must reassign it to trigger a re-render!

### Providing Data with JSON

Place a `<script type="application/json">` tag inside the component with your chart data. Each value in the `data` array maps to a label on the radial axis.

```html
<wa-radar-chart label="Feature Comparison" description="A radar chart comparing features of a product across five dimensions">
  <script type="application/json">
    {
      "data": {
        "labels": ["Speed", "Reliability", "Ease of Use", "Features", "Support"],
        "datasets": [{
          "label": "Product A",
          "data": [85, 90, 75, 80, 70]
        }]
      }
    }
  </script>
</wa-radar-chart>
```

### Multiple Datasets

Add multiple datasets to overlay profiles for direct comparison.

```html
<wa-radar-chart id="radar-multi" label="Product Comparison" description="A radar chart comparing two products across several dimensions">
</wa-radar-chart>
<script type="module">
  const chart = document.querySelector('#radar-multi');

  chart.config = {
    data: {
      labels: ['Speed', 'Reliability', 'Ease of Use', 'Features', 'Support', 'Value'],
      datasets: [
        { label: 'Product A', data: [85, 90, 75, 80, 70, 88] },
        { label: 'Product B', data: [70, 80, 90, 85, 92, 75] }
      ]
    }
  };
</script>
```

### Custom Colors

Override the default color palette using the `--fill-color-*` and `--border-color-*` CSS custom properties on the component.

```html
<wa-radar-chart
  id="radar-colors"
  label="Custom Colors"
  description="A radar chart with custom colors"
  style="
    --fill-color-1: color-mix(in srgb, var(--wa-color-purple-60) 50%, transparent);
    --border-color-1: var(--wa-color-purple-60);
    --fill-color-2: color-mix(in srgb, var(--wa-color-orange-60) 50%, transparent);
    --border-color-2: var(--wa-color-orange-60);
  "
>
</wa-radar-chart>
<script type="module">
  const chart = document.querySelector('#radar-colors');

  chart.config = {
    data: {
      labels: ['Offense', 'Defense', 'Speed', 'Stamina', 'Technique'],
      datasets: [
        { label: 'Player A', data: [90, 65, 80, 75, 85] },
        { label: 'Player B', data: [70, 88, 92, 80, 72] }
      ]
    }
  };
</script>
```

### Border Width

Use the `--line-border-width` CSS custom property to control the thickness of the radar lines.

```html
<wa-radar-chart id="radar-border" style="--line-border-width: 4px" label="Thick Lines" description="A radar chart with thicker lines">
</wa-radar-chart>
<script type="module">
  const chart = document.querySelector('#radar-border');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [{
        label: 'Values',
        data: [80, 60, 90, 70, 85]
      }]
    }
  };
</script>
```

### Point Radius

Use the `--point-radius` CSS custom property to control the size of the dots drawn at each vertex. Set it to `0` to hide them entirely.

```html
<wa-radar-chart id="radar-points" style="--point-radius: 6px" label="Large Points" description="A radar chart with larger vertex dots">
</wa-radar-chart>
<script type="module">
  const chart = document.querySelector('#radar-points');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [{
        label: 'Values',
        data: [80, 60, 90, 70, 85]
      }]
    }
  };
</script>
```

### Filled Areas

Set `fill` to `true` on each dataset to fill the area under the radar lines. This makes it easier to see the overall shape and overlap of each profile.

```html
<wa-radar-chart id="radar-filled" label="Team Assessment" description="A filled radar chart comparing two team members across skill areas">
</wa-radar-chart>
<script type="module">
  const chart = document.querySelector('#radar-filled');

  chart.config = {
    data: {
      labels: ['Frontend', 'Backend', 'DevOps', 'Testing', 'Design', 'Communication'],
      datasets: [
        {
          label: 'Alice',
          data: [90, 75, 60, 80, 85, 92],
          fill: true,
          backgroundColor: 'color-mix(in srgb, var(--wa-color-red-60) 20%, transparent)',
          borderColor: 'var(--wa-color-red-60)'
        },
        {
          label: 'Bob',
          data: [70, 92, 85, 88, 60, 78],
          fill: true,
          backgroundColor: 'color-mix(in srgb, var(--wa-color-blue-60) 20%, transparent)',
          borderColor: 'var(--wa-color-blue-60)'
        }
      ]
    }
  };
</script>
```

### Legend

Use the `legend-position` attribute to control where the legend appears. Add `without-legend` to hide it entirely.

```html
<wa-radar-chart id="radar-legend" legend-position="bottom" label="Legend at Bottom" description="A radar chart with the legend at the bottom">
</wa-radar-chart>
<script type="module">
  const chart = document.querySelector('#radar-legend');

  chart.config = {
    data: {
      labels: ['Strength', 'Agility', 'Intelligence', 'Wisdom', 'Charisma'],
      datasets: [
        { label: 'Warrior', data: [95, 70, 50, 60, 65] },
        { label: 'Mage', data: [40, 55, 95, 90, 70] }
      ]
    }
  };
</script>
```

### Disabling Tooltips

Use the `without-tooltip` attribute to hide the tooltips that appear when hovering over data points.

```html
<wa-radar-chart id="radar-tooltip" without-tooltip label="No Tooltips" description="A radar chart with tooltips disabled">
</wa-radar-chart>
<script type="module">
  const chart = document.querySelector('#radar-tooltip');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [{
        label: 'Values',
        data: [80, 60, 90, 70, 85]
      }]
    }
  };
</script>
```

### Disabling Animations

Use the `without-animation` attribute to disable chart transitions.

```html
<wa-radar-chart id="radar-anim" without-animation label="No Animation" description="A radar chart with animation disabled">
</wa-radar-chart>
<script type="module">
  const chart = document.querySelector('#radar-anim');

  chart.config = {
    data: {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [{
        label: 'Values',
        data: [80, 60, 90, 70, 85]
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
import '@awesome.me/webawesome/dist/components/radar-chart/radar-chart.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaRadarChart from '@awesome.me/webawesome/dist/react/radar-chart';
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
| \`type\` type | \`bar\` The type of chart to render. Valid types include , line, pie, doughnut, polarArea, radar, scatter, and bubble. Type ChartType Default 'radar' | | |
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