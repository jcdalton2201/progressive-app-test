const fs = require('fs');
const sass = require('node-sass');
const glob = require('glob-fs')({ gitignore: true });
const files = glob.readdirSync('src/**/*.js');
const replaceStream = require('replacestream');
const mkdirp = require('mkdirp');

function buildSassFile(fileName) {
  var srcIndex = fileName.indexOf('src');
  var partFile = fileName.substring(srcIndex);
  return partFile.replace('.js', '.scss');
}
function buildHtmlFile(fileName) {
  var srcIndex = fileName.indexOf('src');
  var partFile = fileName.substring(srcIndex);
  return partFile.replace('.js', '.html');
}
function buildOutputFile(fileName) {
  var srcIndex = fileName.lastIndexOf('/');
  var partFile = fileName.substring(srcIndex);
  return `.temp${partFile}`;
}

function init() {
  files.map((file)=> {
    if(file === 'src/build.js') {
      return;
    }
    mkdirp.sync('.temp');
    if(fs.existsSync(buildHtmlFile(file))){
      const htmlData = fs.readFileSync(buildHtmlFile(file));
      let temp ='';
      if(fs.existsSync(buildSassFile(file))){
        let render = sass.renderSync({
          file: buildSassFile(file), //'src/coaf-recommend/coaf-recommend.style.scss',
          quite: true
        });
        if (render && render.css) {
          temp = '<style>' + render.css.toString('utf8') + '</style>';
        }
      }
      const writeStream = fs.createWriteStream(buildOutputFile(file));
      fs.createReadStream(file)
        .pipe(replaceStream('tempHtml;', '\`' + temp + htmlData + '\`;'))
        .pipe(writeStream);
    } else {
      const writeStream = fs.createWriteStream(buildOutputFile(file));
      fs.createReadStream(file)
        .pipe(writeStream);
    }
  });
}
init();
