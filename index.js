
module.exports = async (options = {}) => {

  const fs = require('fs-extra');
  const pkg = require('pkg-dir');
  const gulp = require('gulp');
  const axios = require('axios').default;
  const modulePath = await pkg(__dirname);
  let config = await fs.readJson('./specs.json');
  let assets = {
    head: {
      css: [
        '/assets/css/custom-elements.css',
        '/assets/css/prism.css',
        '/assets/css/chart.css',
        '/assets/css/font-awesome.css',
        
        '/assets/css/index.css'
      ],
      js: [
        '/assets/js/utils.js',
        '/assets/js/custom-elements.js'
      ]
    },
    body: {
      js: [
        '/assets/js/markdown-it.js',
        '/assets/js/prism.js',
        '/assets/js/mermaid.js',
        '/assets/js/chart.js',
        '/assets/js/popper.js',
        '/assets/js/tippy.js',
        '/assets/js/index.js'
      ]
    }
  };

  function normalizePath(path){
    return path.trim().replace(/\/$/g, '') + '/';
  }

  function renderRefGroup(type){
    let group = specGroups[type];
    if (!group) return '';
    let html = Object.keys(group).sort().reduce((html, name) => {
      let ref = group[name];
      return html += `
        <dt id="ref:${name}">${name}</dt>
        <dd>
          <cite><a href="${ref.href}">${ref.title}</a></cite>. 
          ${ref.authors.join('; ')}; ${ref.rawDate}. <span class="reference-status">Status: ${ref.status}</span>.
        </dd>
      `;
    }, '<dl class="reference-list">')
    return `\n${html}\n</dl>\n`;
  }

  try {

    var toc;
    var specGroups = {};
    const noticeTypes = {
      note: 1,
      issue: 1,
      example: 1,
      warning: 1,
      todo: 1
    };
    const spaceRegex = /\s+/g;
    const specNameRegex = /^spec$|^spec[-]*\w+$/i;
    const terminologyRegex = /^def$|^ref/i;
    const specCorpus = await fs.readJson(modulePath + '/assets/compiled/refs.json');
    const containers = require('markdown-it-container');
    const md = require('markdown-it')({
        html: true,
        linkify: true,
        typographer: true
      })
      .use(require('./markdown-it-plugins/templates.js'), [
        {
          filter: type => type.match(specNameRegex),
          parse(token, type, name){
            if (name) {
              let _name = name.toUpperCase();
              let spec = specCorpus[name.toLowerCase()] || specCorpus[_name] || specCorpus[name];
              if (spec) {
                spec._name = _name;
                let group = specGroups[type] = specGroups[type] || {};
                token.info.spec = group[_name] = spec;
              }
            }
          },
          render(token, type, name){
            if (name){
              let spec = token.info.spec;
              return spec ? `[<a class="spec-reference" href="#ref:${spec._name}">${spec._name}</a>]` : `[${spec._name}]`;
            }
            else return renderRefGroup(type);
          }
        },
        {
          filter: type => type.match(terminologyRegex),
          parse(token, type, primary){
            if (type === 'def'){
              token.content = token.info.args.reduce((acc, syn) => {
                return `<span id="term:${syn.replace(spaceRegex, '-').toLowerCase()}">${acc}</span>`;
              }, primary);
            }
            else {
              token.content = `<a class="term-reference" href="#term:${primary.replace(spaceRegex, '-').toLowerCase()}">${primary}</a>`;
            }
          }
        }
      ])
      .use(require('markdown-it-abbr'))
      .use(require('markdown-it-attrs'))
      .use(require('markdown-it-chart').default)
      .use(require('markdown-it-deflist'))
      .use(require('markdown-it-references'))
      //.use(require('markdown-it-footnote'))
      .use(require('markdown-it-icons').default, 'font-awesome')
      .use(require('markdown-it-ins'))
      .use(require('markdown-it-latex').default)
      .use(require('markdown-it-mark'))
      .use(require('markdown-it-textual-uml'))
      .use(require('markdown-it-sub'))
      .use(require('markdown-it-sup'))
      .use(require('markdown-it-task-lists'))
      .use(require('markdown-it-multimd-table'), {
        multiline:  true,
        rowspan:    true,
        headerless: true
      })
      .use(containers, 'notice', {
        validate: function(params) {
          let matches = params.match(/(\w+)\s?(.*)?/);
          return matches && noticeTypes[matches[1]];
        },
        render: function (tokens, idx) {
          let matches = tokens[idx].info.match(/(\w+)\s?(.*)?/);
          if (matches && tokens[idx].nesting === 1) {
            let id;
            let type = matches[1];
            if (matches[2]) {
              id = matches[2].trim().replace(/\s+/g , '-').toLowerCase();
              if (noticeTitles[id]) id += '-' + noticeTitles[id]++;
              else noticeTitles[id] = 1;
            }
            else id = type + '-' + noticeTypes[type]++;
            return `<div id="${id}" class="notice ${type}"><a class="notice-link" href="#${id}">${type.toUpperCase()}</a>`;
          }
          else return '</div>\n';
        }
      })
      .use(require('markdown-it-prism'), { plugins: ['copy-to-clipboard'] })
      .use(require('markdown-it-toc-and-anchor').default, {
        tocClassName: 'toc',
        tocFirstLevel: 2,
        tocLastLevel: 4,
        tocCallback: (md, tokens, html) => toc = html,
        anchorLinkSymbol: '§',
        anchorClassName: 'toc-anchor'
      })

    async function render(spec, assets) {
      try {
        noticeTitles = {};
        specGroups = { _: {} };
        console.log('Rendering: ' + spec.title);
        return new Promise(async (resolve, reject) => {
          Promise.all((spec.markdown_paths || ['spec.md']).map(path => {
            return fs.readFile(spec.spec_directory + path, 'utf8').catch(e => reject(e))
          })).then(async docs => {
            var features = (({ source, logo }) => ({ source, logo }))(spec);
            let doc = docs.join("\n");
            fs.writeFile(spec.destination + 'index.html', `
              <!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      
                  <title>${spec.title}</title>
                  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400&display=swap" rel="stylesheet">
                  ${assets.head}
                </head>
                <body features="${Object.keys(features).join(' ')}">
                  
                  ${assets.svg}
      
                  <main>
      
                    <header id="header" class="panel-header">
                      <span id="toc_toggle" panel-toggle="toc">
                        <svg icon><use xlink:href="#nested_list"></use></svg>
                      </span>
                      <a id="logo" href="${spec.logo_link ? spec.logo_link : '#_'}">
                        <img src="${spec.logo}" />
                      </a>
                      <span issue-count animate panel-toggle="repo_issues">
                        <svg icon><use xlink:href="#github"></use></svg>
                      </span>
                    </header>
      
                    <article id="content">
                      ${md.render(doc)}
                    </article>    
      
                  </main>
      
                  <slide-panels id="slidepanels">
                    <slide-panel id="repo_issues" options="right">
                      <header class="panel-header">
                        <span>
                          <svg icon><use xlink:href="#github"></use></svg>
                          <span issue-count></span>
                        </span>
                        <span class="repo-issue-toggle" panel-toggle="repo_issues">✕</span>
                      </header>
                      <ul id="repo_issue_list"></ul>
                    </slide-panel>
      
                    <slide-panel id="toc">
                      <header class="panel-header">
                        <span>Table of Contents</span>
                        <span panel-toggle="toc">✕</span>
                      </header>
                      <div id="toc_list">
                        ${toc}
                      </div>
                    </slide-panel>
                    
                  </slide-panels>
      
                </body>
                <script>window.specConfig = ${JSON.stringify(spec)}</script>
                ${assets.body}
              </html>
            `, function(err, data){
              if (err) {
                reject(err);
              }
              else {
                resolve();
              }
            }); 
          });
        });
      }
      catch(e) {
        console.log(e);
      }
    }

    config.specs.forEach(async spec => {
      spec.spec_directory = normalizePath(spec.spec_directory);    
      spec.destination = normalizePath(spec.output_path || spec.spec_directory);

      await fs.ensureDir(spec.destination).catch(err => console.error(err));

      var assetTags = {
        svg: await fs.readFile(modulePath + '/assets/icons.svg', 'utf8') || ''
      };

      if (options.dev) {

        assetTags.head = assets.head.css.map(path => `<link href="${path}" rel="stylesheet"/>`).join('') + 
                         assets.head.js.map(path =>  `<script src="${path}"></script>`).join('');
        assetTags.body = assets.body.js.map(path => `<script src="${path}" data-manual></script>`).join('');

      }
      else {
        assetTags.head = `
          <style>${await fs.readFile(modulePath + '/assets/compiled/head.css', 'utf8')}</style>
          <script>${await fs.readFile(modulePath + '/assets/compiled/head.js', 'utf8')}</script>
        `;
        assetTags.body = `<script>${await fs.readFile(modulePath + '/assets/compiled/body.js', 'utf8')}</script>`;
      }

      if (!options.nowatch) {
        gulp.watch(
          [spec.spec_directory + '**/*', '!' + spec.destination + 'index.html'],
          render.bind(null, spec, assetTags)
        )
      }

      render.call(null, spec, assetTags).then(() => {
        if (options.nowatch) process.exit(0)
      }).catch(() => process.exit(1));

    });

  }
  catch(e) {
    console.log(e);
  }

}