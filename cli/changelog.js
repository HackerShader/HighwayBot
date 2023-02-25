const info = require('./../package.json');
const exec = require('child_process').exec;
const string = require('../language/translate')

module.exports = {
    name: "changelog",
    aliases: ['updateinfo'],
    description: string('cli.changelog.description'),
    async execute() {
        if (info.version === undefined && info.build === undefined) return console.log(string('cli.not_install'));
        exec('git log --format="%B" -n 1', async (err, stdout) => {
            if (err) return console.log(err);
            console.log(string('cli.changelog.changelog', stdout));
        });
    }
};