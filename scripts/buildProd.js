const fs = require('fs');
const crypto = require('crypto');
const mkdirp = require('mkdirp');
const fse = require('fs-extra');
const replaceStream = require('replacestream');
const glob = require('glob-fs')({ gitignore: true });
class buildProd {
  constructor() {
    this.clearOldHash();
    this.createdocsDir();
    this.copyWeb();
    this.uglyFile();
  }
  clearOldHash(){
    const weatherfile = glob.readdirSync('docs/weather-web.*.js');
    glob.readdirSync('docs/weather-web.*.js.map');
    weatherfile.map((item)=>{
      if(item !== 'docs/weather-web.min.js' &&  item !== 'docs/weather-web.min.js.map'){
        console.log(`file name is ${item}`);
        fse.removeSync(item);
      }
    });
  }
  createdocsDir(){
    mkdirp.sync('docs');
  }
  copyWeb(){
    fse.copySync('web', 'docs');
    // fse.copySync('web/.htaccess', 'docs/.htaccess');
  }
  uglyFile(){
    const code = fs.readFileSync('.temp/weather-web.js','utf8');
    const fileHash = crypto.createHash('sha256').update(code).digest('hex');
    console.log(fileHash);
    fse.moveSync('docs/weather-web.min.js', `docs/weather-web.${fileHash}.js`);
    fse.moveSync('docs/weather-web.min.js.map', `docs/weather-web.${fileHash}.js.map`);
    fse.moveSync('docs/index.html', 'docs/temp.html');
    const writeStream = fs.createWriteStream('docs/index.html');
    fs.createReadStream('docs/temp.html')
      .pipe(replaceStream('weather-web.js', `weather-web.${fileHash}.js`))
      .pipe(writeStream);
    fse.removeSync('docs/temp.html');
  }
}
new buildProd();