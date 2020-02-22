
const fs = require('fs-extra');

function copyFiles(path){
  fs.copy('./spec-up', path).then(() => {
    console.log('----- FILES COPIED -----');
  }).catch(e => console.log(e));
}

let writeResources = async () => {
  try{
    console.log(process.env.npm_lifecycle_event, process.env.npm_package_version);
    let event = process.env.npm_lifecycle_event;
    let config = await fs.readJson('../../specs.json');
    let resourcePath = `../../${
      config.resource_path ? config.resource_path.trim().replace(/^\/|^[./]+/, '').replace(/\/$/g, '') + '/' : ''
    }spec-up`;
    if (event === 'postinstall') {
      copyFiles(resourcePath); 
    }
    else if (event === 'prestart'){
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