const fs = require('fs-extra');
const child_process = require('child_process');
const consolelog = require('../util/translate')
const color = require('../util/colorcode')

function filter(array, query) {
    return array.filter(c => c.includes(query));
}


new Promise(async (resolve, reject) => {
    await consolelog(color.code.yellow, '[Notification] Installing...');
    const downloaded_folder = filter(fs.readdirSync('./'), 'HackerShader-HighwayBot').toString();
    await fs.copy(`./${downloaded_folder}`, './', { overwrite: true });
    await fs.removeSync(downloaded_folder);
    await fs.removeSync('./HighwayBotResource.zip');
    await child_process.exec('npm install', async (err) => {
        if (err) {
            reject(err);
            return console.log(err);
        }
        await consolelog(color.code.green, "[Notification] HighwayBot Installed.\n" +
            "[Notification] Please relaunch the cli [node ./cmd] [./start.bat]");
        setTimeout(() => {
            resolve();
            process.exit(0);
        }, 5000);
    });
});
