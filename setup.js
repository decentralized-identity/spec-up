
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
    console.log(process.env.npm_lifecycle_event, process.env.npm_package_version);
    let config = await fs.readJson('../../specs.json');
    let resourcePath = `../../${
      config.resource_path ? config.resource_path.trim().replace(/^\/|^[./]+/, '').replace(/\/$/g, '') + '/' : ''
    }spec-up`;
    if (process.env.npm_lifecycle_event === 'postinstall') {
      copyFiles(resourcePath); 
    }
    else {
      fs.pathExists(resourcePath).then(exists => {
        if (!exists) copyFiles(resourcePath)
      }).catch(err => console.error(err))
    }
  }
  catch(e) {
    console.log(e);
  }
}

writeResources();