
module.exports = () => {

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
      let prefix = '';
      let postinstall = process.env.npm_lifecycle_event === 'postinstall';
      if (postinstall) prefix = '../.';
      let config = await fs.readJson(prefix + './specs.json');
      let resourcePath = prefix + `./${
        config.resource_path ? config.resource_path.trim().replace(/^\/|^[./]+/, '').replace(/\/$/g, '') + '/' : ''
      }spec-up`;

      console.log(postinstall, resourcePath);
      if (postinstall || !(await fs.pathExists(resourcePath))) await copyFiles(resourcePath);
      if (!postinstall) startModule(resourcePath)
    }
    catch(e) {
      console.log(e);
    }
  }
  
  writeResources();

}