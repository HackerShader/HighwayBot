const fs = require('fs-extra');
const unzipper = require('unzipper');

console.log('\x1b[33m[Notification] Extracting HighwayBot archive...\x1b[0m');

async function unzip(file, path) {
    return new Promise(async (resolve, reject) => {
        await fs.createReadStream(file)
            .pipe(unzipper.Extract({path}))
            .on('close', () => resolve())
            .on('error', (err) => reject(err));
    });
}

async function main() {
    await unzip('./HighwayBotResource.zip', './');
    await console.log('\x1b[32m[Done] Extracted\x1b[0m');
    await require('./install');
}

main();

