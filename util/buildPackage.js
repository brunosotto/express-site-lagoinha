const fs = require('fs-extra');
const path = require('path');

module.exports = function () {
  // scripts
  const scripts = {
    start: 'node start.js'
  };

  function exec() {
    // pega o path para acessar o arquivo
    const packagePath = path.resolve('package.json');

    // lê o json
    const packageJson = fs.readJSONSync(packagePath);

    // exclui devDependencies
    delete packageJson.devDependencies;

    // substitui o scripts
    packageJson.scripts = scripts;

    // grava o json
    let data = JSON.stringify(packageJson, null, 2);
    fs.writeFileSync('dist/package.json', data);
  }

  return {
    exec
  };

}