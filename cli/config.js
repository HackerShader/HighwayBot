const fs = require('fs-extra');
const string = require('../language/translate')

module.exports = {
    name: "config",
    description: string('cli.config.description'),
    aliases: ['cfg'],
    async execute(args) {
        console.log(args)
        const info = require("../package.json");
        if (info.build === undefined) return console.log(string('cli.not_installer'));
        if (!fs.existsSync('./config')) fs.mkdirSync('./config');
        if (!args[0]) {
            return console.log(string('cli.config.miss_key'));
        }
        const file = fs.readdirSync('./cli/config/').filter(file => file.endsWith('.js'));
        if (!file.includes(`${args[0]}.js`)) return console.log(string(`cli.config.key_not_found`) + `: ${args[0]}`);
        try {
            await require(`./config/${args[0]}`)(args);
        }
        catch (e) {
            console.error(e)
            console.error(string('cli.config.error', e.name + ': ' + e.message));
        }
    }
};
