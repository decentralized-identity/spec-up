## Getting Started

Using Spec-Up is easy peasy lemon squeezy:

1. `npm install spec-up`
2. Create a root-level `specs.json` file that points at the markdown files you want assembled into a spec:
    - `spec_directory` points at the directory that contains your spec source files
    - `markdown_paths` lists the files to assemble, in order
    - `output_path`, `assets`, `plugins`, and `katex` are available when you need them
3. Render programmatically with `require('spec-up')({ nowatch: true })`, or use the Vite-based workflow shown below.

Boom! That's it. For local authoring, `npm run edit` and `npm run dev` will watch your spec sources and re-render automatically when files change.

**Usage**

If your `specs.json`, `package.json`, and `vite.config.mjs` files are in working order, Spec-Up can be called from the root of your repo in four common modes:

|command|behavior|
|---|---|
|`npm run build`|runs `vite build`, rebuilds compiled frontend assets when needed, and renders the configured specs once.|
|`npm run edit`|runs `vite build --watch` so spec markdown, injected assets, plugin files, and frontend source are watched together.|
|`npm run render`|alias for `vite build` if you prefer the old command name.|
|`npm run dev`|runs the Vite dev server and reloads the rendered spec when watched sources change.|
