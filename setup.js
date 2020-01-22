
const fs = require('fs-extra');

let options = {};
process.argv.slice(2).forEach(arg => {
  let kv = arg.split('=');
  args[kv[0]] = kv[1] || true;
});

function copyFiles(){
  fs.copy('./spec-up', '../../spec-up').then(() => {
    console.log('----- FILES COPIED -----');
  }).catch(e => console.log(e));
}

if (options.event == 'start') {
  fs.pathExists('../../spec-up').then(exists => {
    if (!exists) copyFiles()
  }).catch(err => console.error(err))
}
else copyFiles();