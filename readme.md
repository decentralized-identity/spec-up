

<p align="center">

<img src="./logo.png">

<h3 style="display: block; margin: 0 auto; text-align: center;">Markdown » Spec-Up</h3>

</p>



Spec-Up is a technical specification development tool that enables you to create rich specification documents for standards bodies and engineering projects by writing in an extended version of markdown that features all the bells and whistles - for example: advanced syntax highlighting, notice blocks, complex tables, charts, UML diagrams, and more.

Using Spec-Up is easy peasy lemon squeezy:

1. `npm install spec-up`
2. Create a `specs.json` file at the root of your project to specify configuration values used in the generation of your spec documents. The values in your `specs.json` file include things like where your spec's markdown files are located, where to output the generated spec document, and various metadata values used in rendering, such as the title, logo, and repo links for each of your specs. The following are the required/optional fields supported in the `specs.json` config file:
    - **`spec_directory`** _(STRING, required)_ - You must specify the project root relative location of your spec's markdown file directory. You MUST name your spec's markdown file `spec.md` and locate it in your `spec_directory` for the tool to automatically find and use it for rendering. If you want to use a different name for the markdown file, or you have multiple markdown files you would like the tool to assemble into one document, you must specify them using the optional`markdown_paths` field described below.
    - **`title`** _(STRING, required)_ - You must add a title for your spec, which will be rendered in the generated document's H1 text and page title.
    - **`markdown_paths`** _(ARRAY, optional)_ - If you want to name your spec's markdown file something other than `spec.md`, or you have multiple files you would like assembled into a single output document, you must specify their paths as array entries in the order you would like them assembled. The paths in this array are assumed to be based on the `spec_directory` you specified, so _DO NOT_ repeat the full root relative path. 
    - **`output_path`** _(STRING, optional)_ - If you want the generated spec document to be output to a different location than the `spec_directory` you specified (e.g. the project root for GitHub Pages publishing) you can specify another root relative path (use `./` for root), and the tool will write the document file there instead.
3. In your main node.js file, drop in this bad boy: `require('spec-up')()`

Boom! That's it. Spec-Up will auto-detect modifications to files in your `spec_directory` and auto-generate your spec's updated HTML document every time you save a change.