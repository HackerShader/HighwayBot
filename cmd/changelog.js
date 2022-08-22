const info = require('./../package.json');
const exec = require('child_process').exec;

module.exports = {
    name: "changelog",
    description: "See the changelog of HighwayBot",
    aliases: ['updateinfo'],
    async execute() {
        if (info.version === undefined && info.build === undefined) return console.log('\x1b[0m[X] HighwayBot not installed!\x1b[0m');
        await exec('git log --format="%B" -n 1', async (err, stdout) => {
            if (err) return console.log(err);
            await console.log(`Commit messages log: ${stdout}\nPress enter to continue...`);
        });
    }
};