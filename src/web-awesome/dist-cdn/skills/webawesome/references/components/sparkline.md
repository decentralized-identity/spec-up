# Sparkline [Pro]

**Full documentation:** https://webawesome.com/docs/components/sparkline

> This component requires [Web Awesome Pro](https://webawesome.com/purchase).
`<wa-sparkline>` Since 3.2 Experimental Pro Sparkline requires access to Web Awesome Pro

Sparklines display inline data trends as compact, visual charts.

```html
<wa-sparkline
  label="Weekly sales performance showing growth"
  data="10 25 15 40 30 45 35"
  style="height: 2rem;"
></wa-sparkline>
```

Sparklines are small, word-sized graphics designed to fit within text or table cells. They show data trends at a glance without requiring dedicated chart space.

Always include a descriptive `label` attribute for accessibility. The label won't be visible but will be announced by screen readers.

## Examples

### Basic Usage

Provide numeric data as space-separated values. At least two values are required to generate the sparkline.

```html
<p>
  Server response times
  <wa-sparkline
    label="Server response times showing stable performance"
    data="45 52 48 55 50 47 51"
  ></wa-sparkline>
  remain stable.
</p>
```

### Appearance

Use the `appearance` attribute to control how the sparkline fills. The default is `solid` which shows a filled area under the line. You can also choose `gradient` for a faded fill or `line` for stroke only.

```html
<div class="wa-cluster wa-gap-l">
    <wa-sparkline
      appearance="solid"
      data="10 20 15 25 20 30"
      label="Solid appearance example"
      style="height: 2rem;"
    ></wa-sparkline>

    <wa-sparkline
      appearance="gradient"
      data="10 20 15 25 20 30"
      label="Gradient appearance example"
      style="height: 2rem;"
    ></wa-sparkline>

    <wa-sparkline
      appearance="line"
      data="10 20 15 25 20 30"
      label="Line appearance example"
      style="height: 2rem;"
    ></wa-sparkline>
</div>
```

### Trend Colors

Apply semantic coloring with the `trend` attribute to visually indicate the nature of the data.

```html
<div class="wa-cluster wa-gap-l">
  <div>
    <wa-sparkline
      trend="positive"
      appearance="gradient"
      data="20 25 22 30 35 40 50"
      label="Revenue showing positive growth"
      style="height: 2rem;"
    ></wa-sparkline>
    <div class="wa-caption-s" style="text-align: center; margin-block-start: 1rem;">
      Revenue +25%
    </div>
  </div>
  <div>
    <wa-sparkline
      trend="negative"
      appearance="gradient"
      data="50 45 48 40 35 30 25"
      label="Churn rate showing negative trend"
      style="height: 2rem;"
    ></wa-sparkline>
    <div class="wa-caption-s" style="text-align: center; margin-block-start: 1rem;">
      Churn -15%
    </div>
  </div>
  <div>
    <wa-sparkline
      trend="neutral"
      appearance="gradient"
      data="30 32 28 31 29 30 31"
      label="Active users showing stable trend"
      style="height: 2rem;"
    ></wa-sparkline>
    <div class="wa-caption-s" style="text-align: center; margin-block-start: 1rem;">
      Users stable
    </div>
  </div>
</div>
```

### Curve Types

Control how data points connect with the `curve` attribute. Use `linear` (default), `natural`, or `step`.

```html
<div class="wa-cluster wa-gap-l">
  <wa-sparkline
    curve="linear"
    appearance="gradient"
    data="10 40 20 50 30 60"
    label="Linear interpolation example"
    style="height: 2rem;"
  ></wa-sparkline>

  <wa-sparkline
    curve="natural"
    appearance="gradient"
    data="10 40 20 50 30 60"
    label="Natural curve interpolation example"
    style="height: 2rem;"
  ></wa-sparkline>

  <wa-sparkline
    curve="step"
    appearance="gradient"
    data="10 40 20 50 30 60"
    label="Step interpolation example"
    style="height: 2rem;"
  ></wa-sparkline>
</div>
```

### Sizing

Sparklines default to `height: 1em` and `aspect-ratio: 4/1` so they fit naturally within text. Override these with CSS for larger displays.

```html
<wa-sparkline
  appearance="gradient"
  curve="natural"
  data="10 15 12 18 22 20 28 25 32 30 35"
  label="Full-width sparkline showing monthly metrics"
  style="width: 100%; height: 6rem;"
></wa-sparkline>
```

### Custom Colors

Override the default colors using CSS custom properties.

```html
<wa-sparkline
  appearance="gradient"
  data="10 20 15 25 20 30"
  label="Custom purple sparkline"
  style="
    height: 3rem;
    --line-color: var(--wa-color-purple-50);
    --fill-color: var(--wa-color-purple-50);
    --line-width: 3;
  "
></wa-sparkline>
```

### In Tables

Sparklines work well in data tables to visualize trends alongside other metrics.

```html
<table class="wa-native">
  <thead>
    <tr>
      <th>Metric</th>
      <th>Trend</th>
      <th>Change</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Page Views</td>
      <td>
        <wa-sparkline
          trend="positive"
          data="1200 1350 1280 1420 1580"
          label="Page views trend"
        ></wa-sparkline>
      </td>
      <td><wa-badge variant="success">+31%</wa-badge></td>
    </tr>
    <tr>
      <td>Bounce Rate</td>
      <td>
        <wa-sparkline
          trend="negative"
          data="45 42 48 38 35"
          label="Bounce rate trend"
        ></wa-sparkline>
      </td>
      <td><wa-badge variant="danger">+8%</wa-badge></td>
    </tr>
    <tr>
      <td>Avg. Session</td>
      <td>
        <wa-sparkline
          trend="neutral"
          data="180 175 182 178 180"
          label="Average session duration"
        ></wa-sparkline>
      </td>
      <td><wa-badge variant="neutral">0%</wa-badge></td>
    </tr>
  </tbody>
</table>
```

## Importing

Autoloading components via [projects](https://webawesome.com/docs/#using-a-project) is the recommended way to import components. If you prefer to do it manually, use one of the following code snippets.

\*\*CDN\*\*

Let your project code do the work! [Sign up for free](https://webawesome.com/signup) to use a project with your very own CDN — it's the fastest and easiest way to use Web Awesome.

\*\*npm\*\*

To manually import this component from NPM, use the following code.

```js
import '@awesome.me/webawesome/dist/components/sparkline/sparkline.js';
```

\*\*React\*\*

To manually import this component from React, use the following code.

```js
import WaSparkline from '@awesome.me/webawesome/dist/react/sparkline';
```

## Attributes & Properties

Learn more about [attributes and properties](https://webawesome.com/docs/usage/#attributes-and-properties).

| Name | Description | Reflects |
| --- | --- | --- |
| \`appearance\` appearance | \`'gradient' \\| 'line' \\| 'solid'\` The visual fill style of the sparkline. Type Default 'solid' | | |
| \`css\` | \`CSSResultGroup \\| undefined\` One or more CSSResultGroup to include in the component's shadow root. Host styles are automatically prepended. Type Default \[styles\] | | |
| \`curve\` curve | \`'linear' \\| 'natural' \\| 'step'\` The type of curve used to connect data points. Type Default 'linear' | | |
| \`data\` data | \`string\` Space-separated numeric values to visualize (e.g., "10 20 40 25 35"). Type Default '' | | |
| \`label\` label | \`string\` An accessible label describing the sparkline for screen readers. Type Default '' | | |
| \`trend\` trend | \`'positive' \\| 'negative' \\| 'neutral'\` A trend to indicate, which will affect the sparkline's default color. Type | | |

## CSS custom properties

Learn more about [CSS custom properties](https://webawesome.com/docs/customizing/#custom-properties).

| Name | Description |
| --- | --- |
| \`--fill-color\` | The fill color for the area under the line. |
| \`--line-color\` | The color of the sparkline stroke. |
| \`--line-width\` | The width of the sparkline stroke. |

## CSS parts

Learn more about [CSS parts](https://webawesome.com/docs/customizing/#css-parts).

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The SVG container element. | \`::part(base)\` |
| \`fill\` | The filled area under the line (visible with gradient or solid appearance). | \`::part(fill)\` |
| \`line\` | The sparkline stroke path. | \`::part(line)\` |

**Need a hand?** Report a bug Ask for help