
module.exports = async () => {

  const fs = require('fs-extra');
  const pkg = require('pkg-dir');

  function startModule(path){
    require('child_process').fork(path + '/start.js');
  }

  async function copyFiles(path){
    return fs.copy(await pkg(__dirname) + '/spec-up', path).then(() => {
      console.log('--- Spec-Up files copied ---');
    }).catch(e => console.log(e));
  }
  
  let writeResources = async () => {
    try{
      let event = process.env.npm_lifecycle_event;
      let prefix = '';
      if (event === 'postinstall') prefix = '../.';
      let config = await fs.readJson(prefix + './specs.json');
      let resourcePath = prefix + `./${
        config.resource_path ? config.resource_path.trim().replace(/^\/|^[./]+/, '').replace(/\/$/g, '') + '/' : ''
      }spec-up`;
      if (event === 'postinstall') copyFiles(resourcePath); 
      else {
        fs.pathExists(resourcePath).then(exists => {
          exists ? startModule(resourcePath) : copyFiles(resourcePath).then(() => startModule(resourcePath))
        }).catch(err => console.error(err))
      }
    }
    catch(e) {
      console.log(e);
    }
  }
  
  writeResources();

}