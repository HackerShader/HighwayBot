const fs = require('fs-extra');
const exec = require('child_process').exec;
const editJsonFile = require('edit-json-file');
const info = require('./../../package.json');

module.exports = async () => {
    if (!info.version && !info.build) return console.log('\x1b[31m[X] HighwayBot not installed, Please launch the bot again [node ./cmd.js | ./start.bat]\x1b[0m');
    await console.log('\x1b[33m[Update | Pending] Starting update...\x1b[0m');
    await exec('git clone https://github.com/HackerShader/HighwayBot', async (err) => {
        if (err) return console.log(err);
        await console.log('\x1b[32m[Update | Done] Cloned the HighwayBot repository\x1b[0m');
        await console.log('\x1b[33m[Update | Pending] Applying all changes from the repository...\x1b[0m');
        await fs.copy('./HighwayBot', './');
        await fs.removeSync('./HighwayBot');
        await console.log('\x1b[32m[Update | Done] Replaced the files\x1b[0m');
        await exec('git rev-parse HEAD', async (err, stdout) => {
            if (err) return console.log(err);
            await console.log(`\x1b[32m[Update | Done] HighwayBot updated to build ${stdout.substring(0, 7)}\x1b[0m`);
            await console.log('\x1b[33m[Notification] Please launch the bot again to apply the changes [node ./cmd.js | ./start.bat]\x1b[0m');
            const edit = editJsonFile('./package.json');
            edit.set('build', `${stdout.substring(0, 7)}`);
            edit.save();
        });
    });
}
