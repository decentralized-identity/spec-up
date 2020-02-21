
const fs = require('fs-extra');

let options = {};
process.argv.slice(2).forEach(arg => {
  let kv = arg.split('=');
  args[kv[0]] = kv[1] || true;
});

function copyFiles(path){
  fs.copy('./spec-up', path).then(() => {
    console.log('----- FILES COPIED -----');
  }).catch(e => console.log(e));
}

let writeResources = async () => {
  try{
    let resourcePath = '../../spec-up';
    if (options.event === 'start') {
      let config = await fs.readJson('../../specs.json');
      resourcePath = `../../${
        config.resource_path ? config.resource_path.trim().replace(/^\/|^[./]+/, '').replace(/\/$/g, '') + '/' : ''
      }spec-up`;
      fs.pathExists(resourcePath).then(exists => {
        if (!exists) copyFiles(resourcePath)
      }).catch(err => console.error(err))
    }
    else {
      copyFiles(resourcePath);
    }
  }
  catch(e) {
    console.log(e);
  }
}

writeResources();