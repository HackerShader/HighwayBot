const fs = require('fs-extra');
const child_process = require('child_process');

function filter(array, query) {
    return array.filter(c => c.includes(query));
}

console.log('\x1b[33m[Notification] Installing...\x1b[0m');

return new Promise(async (resolve, reject) => {
    const downloaded_folder = filter(fs.readdirSync('./'), 'HackerShader-HighwayBot').toString();
    await fs.copy(`./${downloaded_folder}`, './', {overwrite: true});
    await fs.removeSync(downloaded_folder);
    await fs.removeSync('./HighwayBotResource.zip');
    await child_process.exec('npm install', (err) => {
        if (err) {
            reject(err);
            return console.log(err);
        }
        console.log(`\x1b[32m[Done] HighwayBot Installed. Please relauch the cli [node ./cmd] [./start.bat]\x1b[0m`);
        setTimeout(() => {
            resolve();
            process.exit(0);
        }, 5000);
    });
});
