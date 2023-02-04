const fs = require('fs-extra');
const child_process = require('child_process');
const editJsonFile = require('edit-json-file');
const info = require('../../package.json');
const string = require('../../language/translate')

console.log(string('cli._update.update_git.cloning'));
child_process.exec('git clone https://github.com/HackerShader/HighwayBot')
    .on('error', console.error)
    .on('close', () => {
        console.log(string('cli._update.update_git.cloned'));
        console.log(string('cli._update.update_git.applying_change'));
        fs.copy('./HighwayBot', './');
        fs.removeSync('./HighwayBot');
        console.log(string('cli._update.update_git.replace'));
        child_process.exec('git rev-parse HEAD', async (err, stdout) => {
            if (err) return console.error(err);
            console.log(string('cli._update.update_git.apply_done', stdout.substring(0, 7)));
            console.log(string('cli._update.update_git.relaunch'));
            const edit = editJsonFile('./package.json');
            edit.set('build', `${stdout.substring(0, 7)}`);
            edit.save();
        });
    })

