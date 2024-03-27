

<p align="center">

<img src="./specup_logo.png">

<h3 style="display: block; margin: 0 auto; text-align: center;">Markdown » Spec-Up</h3>

</p>



Spec-Up is a technical specification development tool that enables you to create rich specification documents for standards bodies and engineering projects by writing in an extended version of markdown that features all the bells and whistles - for example: advanced syntax highlighting, notice blocks, complex tables, charts, UML diagrams, and more.

## Setup

Installing Spec-Up is easy peasy lemon squeezy:

0. Node.JS, i.e. `nvm` and its package manager `npm`, are required to run spec-up. WSL2 users should look [here](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm) for specific instructions. 
1. Run `npm install spec-up` in the root directory of the repo to install all dependencies.
2. Create a `specs.json` file **in the root folder of your repository** to specify configuration values used in the generation of your spec documents. The values in your `specs.json` file include things like where your spec's markdown files are located, where to output the generated spec document, and various metadata values used in rendering, such as the title, logo, and repo links for each of your specs. The following are the required/optional fields supported in the `specs.json` config file:

    - **`public_root`** _(PATH STRING, optional)_ - For some platforms and services where you may want to output your rendered spec, the pathing may differ from the directory structure of your local project. To account for this, you can use the `public_root` property to specify the insertion of a path segment to account for the different in pathing between your local renders and wherever you publish your spec to.
    - **`specs`** _(ARRAY, required)_ - the `specs` array contains descriptor objects for each of the specs you are generating in your project, and are composed of the following required and optional properties:
        - **`spec_directory`** _(STRING, required)_ - You must specify the **repo-root-relative** location of your spec's markdown file directory. You ****MUST**** name your spec's markdown file `spec.md` and locate it in your `spec_directory` for the tool to automatically find and use it for rendering. If you want to use a different name for the markdown file, or you have multiple markdown files you would like the tool to assemble into one document, you must specify them using the optional`markdown_paths` field described below. See the "multi-file" example in the spec-up repo.
        - **`title`** _(STRING, required)_ - You must add a title for your spec, which will be rendered in the generated document's H1 text and page title.
        - **`logo`** _(PATH/URI STRING, optional)_ - You may add a reference to a logo asset, either via a path to the asset or a URI
        - **`logo_link`** _(URI STRING, optional)_ - The URI you want your logo to point to in the rendered page.
        - **`markdown_paths`** _(ARRAY, optional)_ - If you want to name your spec's markdown file something other than `spec.md`, or you have multiple files you would like assembled into a single output document, you must specify their paths as array entries in the order you would like them assembled. The paths in this array are assumed to be based on the `spec_directory` you specified, so _DO NOT_ repeat the full root relative path.
        - **`katex`** _(BOOLEAN, optional)_ - To enable TeX support via KaTeX, set this property to `true`. After rendering, be sure to copy the `fonts/` subdirectory, containing the necessary web fonts.
        - **`output_path`** _(STRING, optional)_ - If you want the generated spec document to be output to a different location than the `spec_directory` you specified (e.g. the project root for GitHub Pages publishing) you can specify another root relative path (use `./` for root), and the tool will write the document file there instead.
        - **`source`** _(OBJECT, optional)_ - this object allows you to configure where repo-specific data is pulled from to power some of the more advanced repo-related features. To do this, specify the code hosting service by adding a service ID string to `host` (currently Spec-Up only supports `"github"`, but this is extensible), add the account/org the repo is located within via the `account` property, and add the repo name under the `repo` property. Here is an example configuration:

            ```
            {
                "host": "github",
                "account": "decentralized-identity",
                "repo": "sidetree"
            }
            ```
3. In your main node.js file, or as a package.json script entry, use this invocation call: `require('spec-up')()`

Boom! That's it. You're ready to start rendering specs as HTML sites locally and/or pushing them to github pages however you see fit to automate.

## Running the scripts locally

If your `spec.json` and `package.json` and `package-lock.json` files are in working order and in the root folder of the repo from which it will be deployed, Spec-up can be called by command line (from the root of your repo) in three different modes:

|command|behavior|
|---|---|
|`npm run edit`|after rendering, this will stay running and the `gulp` library will watch the source files in your spec directory/ies for changes and re-render any time you save a file. Opening these rendered files in a browser and refreshing them will keep you up to date.|
|`npm run render`|this renders the site once and does not keep a gulpy watch on the underlying files.|
|`npm run dev`|this enables debugging features.|

## Automation

The above scripts can easily be triggered by github actions.  See [this repo's example](https://github.com/decentralized-identity/spec-up/blob/master/.github/workflows/render-specs.yml)

## Versioning

The recommended method for hosting multiple historical versions of a given specification at the same URL is simply to duplicate the source file(s) in a subdirectory and to host each version in a fixed subdirectory of the output target (i.e., the GitHub-Pages site). These multiple set-up and output directories can be set by multiple `spec` objects in the `specs` array of the `spec.json` file. For example:

```json
{
  "specs": [
    {
      "title": "Wallet And Credential Interactions",
      "spec_directory": "./",
      "output_path": "./build",
      "logo": "https://rawcdn.githack.com/decentralized-identity/decentralized-identity.github.io/a3ca39717e440302d1fd99a796e7f00e1c42eb2d/images/logo-flat.svg",
      "logo_link": "https://identity.foundation",
      "source": {
        "host": "github",
        "account": "decentralized-identity",
        "repo": "waci-presentation-exchange"
      }
    },
    {
      "title": "Wallet And Credential Interactions",
      "spec_directory": "./v0.1.0",
      "output_path": "./build/v0.1.0",
      "logo": "https://rawcdn.githack.com/decentralized-identity/decentralized-identity.github.io/a3ca39717e440302d1fd99a796e7f00e1c42eb2d/images/logo-flat.svg",
      "logo_link": "https://identity.foundation",
      "source": {
        "host": "github",
        "account": "decentralized-identity",
        "repo": "waci-presentation-exchange"
      }
    }   
  ]
}
```
*Note: when copying a version into a subdirectory, relative references, including image links or [[include]] blocks that copy in example files or test vectors, may break; a quick CTRL-F "../" is recommended*

In the above example, the files in `./v0.1.0` will not be rendered by the build process that searches "./" for markdown files and vice versa-- changing either will not trigger a new build of the other in each PR.

### Version numbering

DIF Recommends 3-decimal versions à la SemVer (i.e., v0.1.0 instead of v0.1).

### Cross-linking across versions

Links from the currently/nightly/unstable spec to stable/archival versions and vice versa are not automatically generated by the current version of spec-up, so the recommended best practice is to manually add links above the "Editors" section.  See:

<details><summary>Examples from Presentation Exchange</summary>

Unstable version:
```
Presentation Exchange 2.0.0
==================

**Specification Status:** Working Group Draft

**Latest Draft:**
  [identity.foundation/presentation-exchange](https://identity.foundation/presentation-exchange)

**Ratified Versions:**
~ **v1.0.0** - [https://identity.foundation/presentation-exchange/spec/v1.0.0](https://identity.foundation/presentation-exchange/spec/v1.0.0)

```

Stable Version:
```
Presentation Exchange v1.0.0
==================

**Specification Status:** DIF Ratified Specification

**Latest Draft:**
  [identity.foundation/presentation-exchange](https://identity.foundation/presentation-exchange)
```
</details>

### Archiving stable versions beyond github

Additionally, some editors may prefer to keep an immutable archive in a system like web.archive.org.  For example:

```
**Specification Status:** Draft V0.1 (snapshotted and archived on [web.archive.org](https://web.archive.org/web/20211206215823/https://identity.foundation/waci-presentation-exchange/))
```

## Troubleshooting

- WSL2 users are recommended to use the `bash` option rather than `PowerShell` in the terminal of Visual Studio Code.
- Some users have reported problems using spec-up with node versions 15+; to pin to an older version, simple run:
```
nvm install 14
nvm use 14
npm i npm@6.14.16 -g
```
