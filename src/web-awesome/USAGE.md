# Web Awesome Pro

The zipped folder you have contains the both `dist/` and `dist-cdn/` Web Awesome Pro.

- `/dist-cdn` is "fully bundled" and does not require a frontend bundler like Vite, Webpack, Rollup, etc.
- `/dist` is **NOT** "fully bundled" and requires either a frontend bundler like Vite, Webpack, Rollup, etc., or using a setup involving importmaps to be able to use imports like `import "lit"`.

## Usage

Once you've extracted this zip to a location like "webawesome", you can use the pre-bundled directory by setting the basePath of Web Awesome to point to the `/dist-cdn` directory of your Web Awesome download. Like so:

```html
<link rel="stylesheet" href="/webawesome/dist-cdn/styles/webawesome.css">
<script type="module" src="/webawesome/dist-cdn/webawesome.loader.js" data-webawesome="/webawesome/dist-cdn"></script>
```

This assumes your Web Awesome directory is accessible at `/webawesome`. Feel free to adjust it to whatever path you saved this zip file to, or wherever it is accessible on your site.
