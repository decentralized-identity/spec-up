## Getting Started

Using Spec-Up is easy peasy lemon squeezy:

1. `npm install spec-up`
2. Create a subdirectory in your project with two files:
    - `spec.json` - add some basic config values, like your desired HTML page title, etc.
    - `spec.md` - write the markdown version of your spec here (duh)
3. In your main node.js file, drop in this bad boy: `require('spec-up')()`

Boom! That's it. Spec-Up will auto-detect the location of your spec files and auto-generate your spec's HTML version every time you hit save after editing your `spec.md` files. Did I mention you can have multiple specs located at any depth in your project and Spec-Up will crawl up in there and render all those specs like a damn boss? Well it does, because why the hell not.

**Usage**

If your `spec.json` and `package.json` and `package-lock.json` files are in working order, Spec-up can be called from the root of your repo in three different modes:

|command|behavior|
|---|---|
|`npm run edit`|after rendering, this will stay running and the `gulp` library will watch the source files in your spec directory/ies for changes and re-render any time you save a file. Opening these rendered files in a browser and refreshing them will keep you up to date.|
|`npm run render`|this renders the site once and does not keep a gulpy watch on the underlying files.|
|`npm run dev`|this enables debugging features.|