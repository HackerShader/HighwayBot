const string = require('../language/translate')
const info = require('./../package.json')

module.exports = {
    name: "update",
    description: string('cli.update.description'),
    aliases: ['up'],
    async execute(args) {
        if(!args[0]) return console.log (
            `[Updater] Client: ${info.version} ${info.build}` + 
            `\n| Available update:` + 
            `\n| 1. Get release stream from github page (command: update release)` +
            `\n| 2. Clone the repository (command: update git)` +
            `'setting autoupdate enable' to enable auto update tasks`
        )
        if (args[0] === 'release') await require('./update/update_release')
    }
};