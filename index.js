
module.exports = async () => {

  const fs = require('fs-extra');
  const pkg = require('pkg-dir');

  async function copyFiles(){
    return fs.copy(await pkg(__dirname) + '/spec-up', './spec-up').then(() => {
      console.log('----- FILES COPIED -----');
    }).catch(e => console.log(e));
  }

  function startModule(){
    require('child_process').fork('./spec-up/start.js');
  }

  fs.pathExists('./spec-up').then(exists => {
    exists ? startModule() : copyFiles().then(() => startModule())
  }).catch(err => console.error(err))

}