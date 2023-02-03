const fs = require('fs');
const consolelog = require('./util/translate');
const string = require('../language/translate')

module.exports = {
    name: "runbot",
    description: string('cli.runbot.description'),
    aliases: ['start'],
    async execute() {
        if (!fs.existsSync('./index.js')) return console.log(string('cli.runbot_not_install'));
        await require('../index');
    }
};