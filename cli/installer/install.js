const fs = require('fs-extra');
const child_process = require('child_process')
const color = require('../util/colorcode')
const string = require('../../language/translate')

function filter(array, query) {
    return array.filter(c => c.includes(query));
}


new Promise(async (resolve, reject) => {
    console.log(string('cli.installer.install.installing'));
    const downloaded_folder = filter(fs.readdirSync('./'), 'HackerShader-HighwayBot').toString();
    fs.copy(`./${downloaded_folder}`, './', { overwrite: true });
    fs.removeSync(downloaded_folder);
    fs.removeSync('./HighwayBotResource.zip');
    child_process.exec('npm install', async (err) => {
        if (err) {
            reject(err);
            return console.log(err);
        }
        console.log(string('cli.installer.installer.install_done'));
        setTimeout(() => {
            resolve();
            process.exit(0);
        }, 5000);
    });
});
