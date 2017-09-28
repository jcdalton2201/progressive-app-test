const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const mkdirp = require('mkdirp');
const fs = require('fs');
class createComponent {
  constructor() {
    if(argv.name){
      console.log(chalk.green(`we are going to build component ${argv.name}`));
      this._buildDir(argv.name);
      this._buildJS(argv.name);
      this._buildHTML(argv.name);
      this._buildSASS(argv.name);
      this._buildTest(argv.name);
    } else {
      console.log(chalk.red('Please add the argument --name=<<name>>'));
    }
  }
  _slug(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  _buildDir(name){
    mkdirp.sync(`src/weather-${name}`);
    console.log(chalk.green(`we have created a file at src/weather-${name}`));
  }
  _buildJS(name){
    const file = `src/weather-${name}/weather-${name}.js`;
    const writeStream = fs.createWriteStream(file);
    writeStream.write(`
class weather${this._slug(name)} extends HTMLElement {
  constructor(){
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
  }
  connectedCallback(){
    this._shadowRoot.innerHTML = tempHtml;
  }
  disconnectedCallback(){

  }
  attributeChangedCallback(){

  }
  adoptedCallback(){

  }

}
if(!customElements.get('weather-${name}')){
  customElements.define('weather-${name}', weather${this._slug(name)});
}
`);
    writeStream.end();
    fs.createReadStream(file)
      .pipe(writeStream);
    console.log(chalk.green(`we have created javascript file weather-${name}.js`));
  }
  _buildHTML(name){
    const file = `src/weather-${name}/weather-${name}.html`;
    const writeStream = fs.createWriteStream(file);
    writeStream.write(`<div>${name}</div>`);
    writeStream.end();
    fs.createReadStream(file)
      .pipe(writeStream);
    console.log(chalk.green(`we have created html file weather-${name}.html`));
  }
  _buildTest(name){
    const file = `test/weather-${name}-test.js`;
    const writeStream = fs.createWriteStream(file);
    writeStream.write(`
describe('Test of ${this._slug(name)}', ()=>{
  it('Test we can test', ()=>{
    let ${this._slug(name)} = document.createElement('div');
    ${this._slug(name)}.innerHTML = '<weather-${name}>We have a tooltip now.</weather-${name}>';
    document.body.appendChild(${this._slug(name)});
    let top${this._slug(name)} = document.querySelector('weather-${name}');
  });

});
`);
    writeStream.end();
    fs.createReadStream(file)
      .pipe(writeStream);
    console.log(chalk.green(`we have created test file weather-${name}.js`));
  }
  _buildSASS(name){
    const file = `src/weather-${name}/weather-${name}.scss`;
    const writeStream = fs.createWriteStream(file);
    fs.createReadStream(file)
      .pipe(writeStream);
    console.log(chalk.green(`we have created sass file weather-${name}.scss`));
  }
}
new createComponent();
