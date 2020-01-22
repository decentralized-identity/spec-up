module.exports = () => {

  const fs = require('fs-extra');

  fs.copy('/spec-up', './spec-up')
    .then(() => {
      console.log('success!')
    })
    .catch(err => console.error(err))

}