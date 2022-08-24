const fs = require('fs-extra');
const unzipper = require('unzipper');
const consolelog = require('./../util/translate')
const color = require('./../util/colorcode')

async function unzip(file, path) {
    return new Promise(async (resolve, reject) => {
        await fs.createReadStream(file)
            .pipe(unzipper.Extract({path}))
            .on('close', () => resolve())
            .on('error', (err) => reject(err));
    });
}

async function main() {
    await consolelog(color.code.yellow,'[Notification] Extracting HighwayBot archive...');
    await unzip('./HighwayBotResource.zip', './');
    await consolelog(color.code.green,'[Done] Extracted');
    await require('./install');
}

main();

