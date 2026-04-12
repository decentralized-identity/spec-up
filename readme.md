

<p align="center">

<img src="./specup_logo.png">

<h3 style="display: block; margin: 0 auto; text-align: center;">Markdown » Spec-Up</h3>

</p>



Spec-Up is a technical specification development tool that enables you to create rich specification documents for standards bodies and engineering projects by writing in an extended version of markdown that features all the bells and whistles - for example: advanced syntax highlighting, notice blocks, complex tables, charts, UML diagrams, and more.

## Setup

Installing Spec-Up is easy peasy lemon squeezy:

0. Node.js 18+ and `npm` are required to run spec-up. WSL2 users should look [here](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm) for specific instructions. 
1. Run `npm install spec-up` in the root directory of the repo to install all dependencies.
2. Create a `specs.json` file **in the root folder of your repository** to specify configuration values used to render your spec documents. The following fields are currently supported:

    - **`plugins`** _(ARRAY, optional)_ - Plugins that should run for every spec in the project. These use the same plugin entry formats described below in the Plugins section.
    - **`specs`** _(ARRAY, required)_ - The `specs` array contains descriptor objects for each spec you are generating in your project:
        - **`spec_directory`** _(STRING, required)_ - The **repo-root-relative** location of your spec's markdown file directory. If you do not provide `markdown_paths`, Spec-Up reads `spec.md` from this directory by default.
        - **`title`** _(STRING, required)_ - The title rendered in the generated document's H1 text and page title.
        - **`logo`** _(PATH/URI STRING, optional)_ - A logo asset path or URI.
        - **`logo_link`** _(URI STRING, optional)_ - The URI you want your logo to point to in the rendered page.
        - **`markdown_paths`** _(ARRAY, optional)_ - If you want to use files other than `spec.md`, list them here in the order you want them assembled. Paths are resolved relative to `spec_directory`.
        - **`katex`** _(BOOLEAN, optional)_ - Enables TeX support via KaTeX. KaTeX assets are bundled automatically from the installed dependency.
        - **`output_path`** _(STRING, optional)_ - If you want the generated spec document written somewhere other than `spec_directory` (for example the project root for GitHub Pages publishing), specify another repo-root-relative path here.
        - **`source`** _(OBJECT, optional)_ - Configures repo-specific data used by repo-aware UI features. Today this supports GitHub repositories via `host`, `account`, and `repo`:

            ```
            {
                "host": "github",
                "account": "decentralized-identity",
                "repo": "sidetree"
            }
            ```
        - **`external_specs`** _(ARRAY, optional)_ - Enables `[[xref: ...]]` references to terms from other Spec-Up outputs. Each entry is a single-key object mapping a short handle to the external spec URL.
        - **`assets`** _(ARRAY, optional)_ - Injects extra CSS or JS assets into the rendered page when you need custom page-level behavior or styling. Asset objects support `path`, optional `inject` (`"head"` or `"body"` for JS), and optional `module` for JS modules.
        - **`content_security_policy`** _(BOOLEAN or STRING, optional)_ - By default, Spec-Up does not emit a CSP meta tag. Set this to `true` to emit Spec-Up's generated CSP, or set it to a string to inject a custom CSP value.
        - **`plugins`** _(ARRAY, optional)_ - Plugins that should run only for this spec.
3. Render either programmatically or through the Vite-based workflow used by this repo:

    - Programmatic: `require('spec-up')({ nowatch: true })` renders once, while `require('spec-up')()` renders and keeps file watchers running.
    - Vite workflow: use the `vite.config.mjs` pattern in this repo and the package scripts shown below.

Boom! That's it. You're ready to start rendering specs as HTML sites locally and/or pushing them to github pages however you see fit to automate.

## Running the scripts locally

If your `specs.json`, `package.json`, and `vite.config.mjs` files are in the project root, Spec-Up can be run from the root of your repo in four common modes:

|command|behavior|
|---|---|
|`npm run build`|runs `vite build`, rebuilds compiled frontend assets when needed, and renders the configured specs once.|
|`npm run edit`|runs `vite build --watch` so spec markdown, injected assets, plugin files, and frontend source are watched in one Vite-hosted loop.|
|`npm run render`|alias for `vite build` if you prefer the old command name.|
|`npm run dev`|runs the Vite dev server; Spec-Up renders through a Vite plugin and triggers reloads when your spec sources change.|
|`npm run dev:dns`|creates a local TLS cert if needed and starts the Vite dev server at `https://specup.localhost:5173` so the browser sees a hostname-based HTTPS origin instead of `127.0.0.1`.|

### Local DNS-style HTTPS dev

If you need browser behavior that is closer to production CORS/origin handling, run:

```bash
npm run dev:dns
```

This starts Spec-Up at `https://specup.localhost:5173` with a generated self-signed certificate stored under `.local-dev/tls/`.

- `specup.localhost` resolves locally without editing `/etc/hosts` on modern systems.
- The certificate is self-signed, so your browser may warn until you trust it.
- Override the hostname or port if needed with `SPEC_UP_DEV_HOST` and `SPEC_UP_DEV_PORT`, for example:

```bash
SPEC_UP_DEV_HOST=docs.localhost SPEC_UP_DEV_PORT=4443 npm run dev:dns
```

## Plugins

Spec-Up now supports plugins at the top level of `specs.json`, per-spec via `plugins`, or programmatically via `require('spec-up')({ plugins: [...] })`.

Plugin entries can be either:

- a relative module path string such as `"./plugins/my-plugin.js"`
- an object with `resolve` and `options`
- a plugin object or factory passed through `options.plugins`

Plugins can hook into the render lifecycle with methods like:

- `beforeRender`
- `transformMarkdown`
- `markdownTemplates`
- `configureMarkdownIt`
- `transformRenderedHtml`
- `afterRender`
- `transformPageHtml`
- `extendAssetTags`
- `afterWrite`

## Automation

The above scripts can easily be triggered by github actions.  See [this repo's example](https://github.com/decentralized-identity/spec-up/blob/master/.github/workflows/render-specs.yml)

## Versioning

The recommended method for hosting multiple historical versions of a given specification at the same URL is simply to duplicate the source file(s) in a subdirectory and to host each version in a fixed subdirectory of the output target (i.e., the GitHub-Pages site). These multiple set-up and output directories can be set by multiple `spec` objects in the `specs` array of the `specs.json` file. For example:

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
- Spec-Up now targets Node.js 18 and newer.
