const fs = require('fs');
const string = require('../language/translate')

module.exports = {
    name: "runbot",
    description: string('cli.runbot.description'),
    aliases: ['start'],
    async execute() {
        if (!fs.existsSync('./index.js')) return console.log(string('cli.not_install'));
        await require('../index');
    }
};