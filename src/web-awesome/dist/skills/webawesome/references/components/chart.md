# Chart [Pro]

**Full documentation:** https://webawesome.com/docs/components/chart

> This component requires [Web Awesome Pro](https://webawesome.com/purchase).
`<wa-chart>` Since 3.3 Experimental Pro Chart requires access to Web Awesome Pro

Charts provide a flexible wrapper around Chart.js for building themed data visualizations. Use this component for advanced configuration such as mixed chart types, custom plugins, and direct Chart.js instance access.

Web Awesome charts are built on [Chart.js](https://www.chartjs.org/), an open-source JavaScript charting library. They wrap Chart.js with opinionated defaults, automatic theming through CSS custom properties, and a simplified API that makes data visualization accessible with minimal configuration. Charts automatically adapt to light and dark modes with no extra code.

```html
<wa-chart label="Monthly Performance" description="A chart comparing monthly revenue and expenses over six months">
  <script type="application/json">
    {
      "type": "bar",
      "data": {
        "labels": ["January", "February", "March", "April", "May", "June"],
        "datasets": [
          {
            "label": "Revenue",
            "data": [48, 56, 62, 58, 71, 68]
          },
          {
            "label": "Expenses",
            "data": [35, 38, 40, 42, 45, 43]
          }
        ]
      }
    }
  </script>
</wa-chart>
```

For quick, type-specific examples see the individual component pages: [Bar Chart](https://webawesome.com/docs/components/bar-chart), [Line Chart](https://webawesome.com/docs/components/line-chart), [Pie Chart](https://webawesome.com/docs/components/pie-chart), [Doughnut Chart](https://webawesome.com/docs/components/doughnut-chart), [Scatter Chart](https://webawesome.com/docs/components/scatter-chart), [Bubble Chart](https://webawesome.com/docs/components/bubble-chart), [Radar Chart](https://webawesome.com/docs/components/radar-chart), [Polar Area Chart](https://webawesome.com/docs/components/polar-area-chart).

## Examples

### Chart Types

The `wa-chart` element supports all Chart.js types by setting `type` in the config. Web Awesome also provides dedicated elements for each type — such as `<wa-bar-chart>`, `<wa-line-chart>`, and `<wa-pie-chart>` — that set the type automatically.

```html
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr)); gap: 1rem;">
  <wa-chart label="Line Chart" description="A line chart showing monthly visitors">
    <script type="application/json">
      {
        "type": "line",
        "data": {
          "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          "datasets": [{
            "label": "Visitors",
            "data": [4200, 4800, 5100, 4900, 5500, 6200]
          }]
        }
      }
    </script>
  </wa-chart>

  <wa-chart label="Doughnut Chart" description="A doughnut chart showing time allocation" without-legend>
    <script type="application/json">
      {
        "type": "doughnut",
        "data": {
          "labels": ["Development", "Design", "Testing", "Meetings"],
          "datasets": [{
            "label": "Hours",
            "data": [35, 20, 15, 18]
          }]
        }
      }
    </script>
  </wa-chart>

  <wa-chart label="Radar Chart" description="A radar chart showing skill levels">
    <script type="application/json">
      {
        "type": "radar",
        "data": {
          "labels": ["Speed", "Reliability", "Ease of Use", "Features", "Support"],
          "datasets": [{
            "label": "Product A",
            "data": [85, 90, 75, 80, 70]
          }, {
            "label": "Product B",
            "data": [70, 78, 92, 85, 88]
          }]
        }
      }
    </script>
  </wa-chart>

  <wa-chart label="Polar Area Chart" description="A polar area chart showing energy output by source" without-legend>
    <script type="application/json">
      {
        "type": "polarArea",
        "data": {
          "labels": ["Solar", "Wind", "Hydro", "Nuclear"],
          "datasets": [{
            "label": "Output (GW)",
            "data": [85, 72, 110, 95]
          }]
        }
      }
    </script>
  </wa-chart>
</div>
```

### Providing Data with JSON

The simplest way to provide chart data is with a `<script type="application/json">` tag inside the component. The JSON follows the [Chart.js configuration format](https://www.chartjs.org/docs/latest/configuration/).

```html
<wa-chart label="Quarterly Results" description="A bar chart showing quarterly results">
  <script type="application/json">
    {
      "type": "bar",
      "data": {
        "labels": ["Q1", "Q2", "Q3", "Q4"],
        "datasets": [{
          "label": "Sales",
          "data": [420, 580, 630, 710]
        }]
      }
    }
  </script>
</wa-chart>
```

### Providing Data with JavaScript

For dynamic data, set the `config` property and call `renderChart()`. This approach works well when data comes from an API or needs to be computed at runtime.

```html
<wa-chart id="chart-js-data" label="Quarterly Results" description="A bar chart showing quarterly results">
</wa-chart>
<script type="module">
  const chart = document.querySelector('#chart-js-data');
  await customElements.whenDefined('wa-chart');
  await chart.updateComplete;

  chart.config = {
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        label: 'Sales',
        data: [420, 580, 630, 710]
      }]
    }
  };

  chart.renderChart();
</script>
```

### Theming

Charts use six pairs of CSS custom properties for dataset colors: `--fill-color-1` through `--fill-color-6` for backgrounds and `--border-color-1` through `--border-color-6` for borders. Background colors default to semi-transparent fills using `color-mix()`, while border colors default to the solid variant of each color. The `--grid-color` property controls the color of grid lines and axis borders.

Override them to apply a custom color palette.

```html
<wa-chart
  label="Custom Palette"
  description="A line chart with a custom purple and cyan color palette"
  style="
    --fill-color-1: var(--wa-color-purple-60);
    --border-color-1: var(--wa-color-purple-60);
    --fill-color-2: var(--wa-color-cyan-60);
    --border-color-2: var(--wa-color-cyan-60);
  "
>
  <script type="application/json">
    {
      "type": "line",
      "data": {
        "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "datasets": [
          {
            "label": "Organic Traffic",
            "data": [2200, 2800, 3100, 2900, 3500, 4200]
          },
          {
            "label": "Paid Traffic",
            "data": [1800, 2100, 1900, 2400, 2200, 2600]
          }
        ]
      }
    }
  </script>
</wa-chart>
```

### Dark Mode

Charts automatically respond to theme changes. Because chart colors are derived from CSS custom properties, switching between light and dark mode triggers a re-render with updated colors. No additional code is required.

### Using CSS Variables in Data

You can use CSS variables such as `var(--wa-color-*)` and `color-mix()` directly in dataset `backgroundColor` and `borderColor` values. The component resolves these automatically at render time.

```html
<wa-chart label="CSS Variable Colors" description="A doughnut chart demonstrating CSS variable usage in dataset colors">
  <script type="application/json">
    {
      "type": "doughnut",
      "data": {
        "labels": ["Desktop", "Mobile", "Tablet"],
        "datasets": [{
          "label": "Traffic",
          "data": [55, 35, 10],
          "backgroundColor": [
            "var(--wa-color-purple-60)",
            "var(--wa-color-cyan-60)",
            "var(--wa-color-orange-60)"
          ],
          "borderColor": [
            "var(--wa-color-purple-60)",
            "var(--wa-color-cyan-60)",
            "var(--wa-color-orange-60)"
          ]
        }]
      }
    }
  </script>
</wa-chart>
```

### Mixed Charts

Use the `wa-chart` element directly to combine different chart types in a single visualization. Set the `type` on each dataset to control how it renders.

```html
<wa-chart id="chart-mixed" label="Revenue and Growth" description="A mixed chart with revenue as bars and growth rate as a line">
</wa-chart>
<script type="module">
  const chart = document.querySelector('#chart-mixed');
  await customElements.whenDefined('wa-chart');
  await chart.updateComplete;

  chart.config = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          type: 'bar',
          label: 'Revenue',
          data: [48, 56, 62, 58, 71, 68]
        },
        {
          type: 'line',
          label: 'Profit',
          data: [32, 38, 45, 40, 52, 48],
          backgroundColor: 'var(--wa-color-purple-60)',
          borderColor: 'var(--wa-color-purple-60)'
        },
        {
          type: 'line',
          label: 'Expenses',
          data: [16, 18, 17, 18, 19, 20],
          backgroundColor: 'var(--wa-color-red-60)',
          borderColor: 'var(--wa-color-red-60)'
        },
        {
          type: 'line',
          label: 'Forecast',
          data: [50, 58, 65, 62, 74, 72],
          backgroundColor: 'var(--wa-color-green-60)',
          borderColor: 'var(--wa-color-green-60)',
          borderDash: [6, 3]
        }
      ]
    }
  };

  chart.renderChart();
</script>
```

### Legend Position

Use the `legend-position` attribute to control where the legend appears. Supported values include `top`, `bottom`, `left`, and `right`. The `start` and `end` values are direction-aware and will flip in RTL layouts.

```html
<wa-chart legend-position="bottom" label="Legend at Bottom" description="A bar chart with the legend positioned at the bottom">
  <script type="application/json">
    {
      "type": "bar",
      "data": {
        "labels": ["Mon", "Tue", "Wed", "Thu", "Fri"],
        "datasets": [
          {
            "label": "Completed",
            "data": [12, 19, 8, 15, 22]
          },
          {
            "label": "Pending",
            "data": [5, 3, 10, 7, 2]
          }
        ]
      }
    }
  </script>
</wa-chart>
```

### Axis Labels

Use the `x-label` and `y-label` attributes to add labels to the chart axes.

```html
<wa-chart x-label="Month" y-label="Revenue (USD)" label="Monthly Revenue" description="A line chart with axis labels showing monthly revenue">
  <script type="application/json">
    {
      "type": "line",
      "data": {
        "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "datasets": [
          {
            "label": "Revenue",
            "data": [12000, 15000, 13500, 17000, 16000, 19000]
          },
          {
            "label": "Expenses",
            "data": [8000, 9200, 8800, 10500, 9800, 11000]
          },
          {
            "label": "Profit",
            "data": [4000, 5800, 4700, 6500, 6200, 8000]
          }
        ]
      }
    }
  </script>
</wa-chart>
```

### Grid Lines

Use the `grid` attribute to control which axes show grid lines. Options are `both` (default), `x`, `y`, and `none`.

```html
<wa-chart grid="none" label="No Grid Lines" description="A line chart with grid lines hidden">
  <script type="application/json">
    {
      "type": "line",
      "data": {
        "labels": ["Mon", "Tue", "Wed", "Thu", "Fri"],
        "datasets": [
          {
            "label": "Response Time (ms)",
            "data": [45, 52, 48, 55, 50]
          },
          {
            "label": "Error Rate (%)",
            "data": [2, 4, 3, 6, 3]
          },
          {
            "label": "Throughput (req/s)",
            "data": [320, 295, 310, 280, 305]
          }
        ]
      }
    }
  </script>
</wa-chart>
```

### Disabling Features

Use `without-animation` to disable transitions, `without-legend` to hide the legend, and `without-tooltip` to remove hover tooltips.

```html
<wa-chart without-animation without-legend label="Minimal Chart" description="A pie chart with animation and legend disabled">
  <script type="application/json">
    {
      "type": "pie",
      "data": {
        "labels": ["Rent", "Food", "Transport", "Savings"],
        "datasets": [{
          "label": "Budget",
          "data": [35, 25, 15, 25]
        }]
      }
    }
  </script>
</wa-chart>
```

### Stacked Data

Use the `stacked` attribute to stack datasets on top of each other instead of placing them side by side.

```html
<wa-chart stacked label="Stacked Revenue" description="A stacked bar chart showing revenue by source">
  <script type="application/json">
    {
      "type": "bar",
      "data": {
        "labels": ["Q1", "Q2", "Q3", "Q4"],
        "datasets": [
          {
            "label": "Online",
            "data": [42, 58, 63, 71]
          },
          {
            "label": "In-Store",
            "data": [65, 53, 48, 52]
          },
          {
            "label": "Wholesale",
            "data": [28, 32, 35, 40]
          }
        ]
      }
    }
  </script>
</wa-chart>
```

### Axis Range

Use the `min` and `max` attributes to constrain the value axis.

```html
<wa-chart min="0" max="100" label="Test Scores" description="A line chart with a constrained y-axis from 0 to 100">
  <script type="application/json">
    {
      "type": "line",
      "data": {
        "labels": ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        "datasets": [
          {
            "label": "Completion Rate (%)",
            "data": [62, 71, 68, 85, 78]
          },
          {
            "label": "Pass Rate (%)",
            "data": [48, 55, 60, 72, 65]
          },
          {
            "label": "Satisfaction (%)",
            "data": [74, 80, 76, 88, 83]
          }
        ]
      }
    }
  </script>
</wa-chart>
```

### Accessing the Chart.js Instance

After calling `renderChart()`, the underlying Chart.js instance is available on the `chart` property. Use it for programmatic updates, exporting images, or any [Chart.js API method](https://www.chartjs.org/docs/latest/api/classes/Chart.html).

```html
<wa-chart id="chart-instance" label="Live Updates" description="A chart demonstrating programmatic data updates">
</wa-chart>

<wa-button appearance="filled" id="chart-instance-btn" variant="brand">Randomize Data</wa-button>

<script type="module">
  const el = document.querySelector('#chart-instance');
  await customElements.whenDefined('wa-chart');
  await el.updateComplete;

  el.config = {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Tasks',
        data: [12, 19, 8, 15, 22]
      }]
    }
  };

  el.renderChart();

  document.querySelector('#chart-instance-btn').addEventListener('click', () => {
    el.chart.data.datasets[0].data = Array.from({ length: 5 }, () => Math.floor(Math.random() * 30));
    el.chart.update();
  });
</script>
```

### Using Plugins

Pass [Chart.js plugins](https://www.chartjs.org/docs/latest/developers/plugins.html) through the `plugins` property. A plugin is an object with an `id` and one or more hook methods. This example draws a dashed target line across the chart by hooking into `afterDraw`.

```html
<wa-chart id="chart-plugin" label="Sales with Target" description="A bar chart with a dashed line showing the sales target">
</wa-chart>
<script type="module">
  const chart = document.querySelector('#chart-plugin');
  await customElements.whenDefined('wa-chart');
  await chart.updateComplete;

  // A custom plugin that draws a horizontal target line
  const targetLinePlugin = {
    id: 'targetLine',
    afterDraw(chart) {
      const target = chart.options.plugins.targetLine?.value;
      if (target == null) return;

      const { ctx } = chart;
      const yScale = chart.scales.y;
      const y = yScale.getPixelForValue(target);

      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([6, 4]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#228822';
      ctx.moveTo(chart.chartArea.left, y);
      ctx.lineTo(chart.chartArea.right, y);
      ctx.stroke();

      ctx.fillStyle = ctx.strokeStyle;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Target: ${target}`, chart.chartArea.left + 6, y - 8);
      ctx.restore();
    }
  };

  chart.plugins = [targetLinePlugin];
  chart.config = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales',
        data: [42, 58, 35, 71, 63, 80]
      }]
    },
    options: {
      plugins: {
        targetLine: { value: 60 }
      }
    }
  };

  chart.renderChart();
</script>
```

### Accessibility

Charts are rendered on a `<canvas>` element, which is not accessible to screen readers by default. Web Awesome addresses this with two built-in attributes.

Use `label` to give the chart a short, descriptive name. This maps to `aria-label` on the canvas with `role="img"`, which is the pattern [recommended by Chart.js](https://www.chartjs.org/docs/latest/general/accessibility.html) and ARIA authoring guidelines. Use `description` for a longer explanation of what the chart shows, ideally including the key insight or takeaway, not just a restatement of the chart type. A description like _"Sales grew 40% quarter over quarter, with Q4 reaching a record $710K"_ is more useful than _"A bar chart with four bars."_

For complex charts where the underlying numbers matter, consider including a visually-hidden or expandable data table alongside the chart. The canvas element cannot expose tabular data to screen readers, so a table is the most robust way to make precise values available when necessary.

## Importing

Autoloading components via [projects](https://webawesome.com/docs/#using-a-project) is the recommended way to import components. If you prefer to do it manually, use one of the following code snippets.

\*\*CDN\*\*

Let your project code do the work! [Sign up for free](https://webawesome.com/signup) to use a project with your very own CDN — it's the fastest and easiest way to use Web Awesome.

\*\*npm\*\*

To manually import this component from NPM, use the following code.

```js
import '@awesome.me/webawesome/dist/components/chart/chart.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaChart from '@awesome.me/webawesome/dist/react/chart';
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