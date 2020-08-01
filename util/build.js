const fs = require('fs-extra');
const childProcess = require('child_process');
const buildPackage = require('./buildPackage')();

console.log('iniciando o build...');

// remove current build, and create new one
fs.removeSync('./dist/');
fs.copySync('./src/public', './dist/public');
fs.copySync('./src/views', './dist/views');

const tsc = childProcess.exec('tsc --build --extendedDiagnostics tsconfig.prod.json');

tsc.stdout.on('data', (data) => {
  console.log(data);
});

tsc.stderr.on('data', (data) => {
  console.log('ERROR:');
  console.log(data);
});

tsc.on('close', (code) => {
  console.log('transpile concluído');

  // package dist
  console.log('buildPackage');
  buildPackage.exec();
  console.log('buildPackage concluído');

  console.log(`Processo concluído com código ${code}`);

  cpPm2();
});

function cpPm2(){
  console.log('copiando pm2-ecosystem.config');

  const pm2 = childProcess.exec('cp pm2-ecosystem.config.js ./dist');

  pm2.stdout.on('data', (data) => {
    console.log(data);
  });

  pm2.stderr.on('data', (data) => {
    console.log('ERROR:');
    console.log(data);
  });

  pm2.on('close', (code) => {
    console.log('PM@ ecosystem copiado');
    console.log(`Processo concluído com código ${code}`);

    inst();
  });
}

function inst() {
  console.log('instalando dependências');

  const install = childProcess.exec('cd dist && npm install');

  install.stdout.on('data', (data) => {
    console.log(data);
  });

  install.stderr.on('data', (data) => {
    console.log('ERROR:');
    console.log(data);
  });

  install.on('close', (code) => {
    console.log('Instalação do dist concluída');
    console.log(`Processo concluído com código ${code}`);
  });
}
