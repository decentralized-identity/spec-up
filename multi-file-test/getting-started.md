## Getting Started

Using Spec-Up is easy peasy lemon squeezy:

1. `npm install spec-up`
2. Create a subdirectory in your project with two files:
    - `spec.json` - add some basic config values, like your desired HTML page title, etc.
    - `spec.md` - write the markdown version of your spec here (duh)
3. In your main node.js file, drop in this bad boy: `require('spec-up')()`

Boom! That's it. Spec-Up will auto-detect the location of your spec files and auto-generate your spec's HTML version every time you hit save after editing your `spec.md` files. Did I mention you can have multiple specs located at any depth in your project and Spec-Up will crawl up in there and render all those specs like a damn boss? Well it does, because why the hell not.