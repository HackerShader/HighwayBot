const fs = require('fs-extra');
const unzipper = require('unzipper');
const consolelog = require('./../util/translate')
const color = require('./../util/colorcode')
const string = require('../../language/translate')

async function unzip(file, path) {
    return new Promise(async (resolve, reject) => {
        fs.createReadStream(file)
            .pipe(unzipper.Extract({path}))
            .on('close', () => resolve())
            .on('error', (err) => reject(err));
    });
}

async function main() {
    console.log(string('cli.installer.unzip.unzipping'));
    await unzip('./HighwayBotResource.zip', './');
    console.log(string('cli.installer.unzip.unzipp_done'));
    require('./install');
}

main();

