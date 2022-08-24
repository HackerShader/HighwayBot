const fs = require('fs-extra');
const consolelog = require('./util/translate')
const color = require('./util/colorcode')

module.exports = {
    name: "config",
    description: "Configure the HighwayBot config",
    aliases: ['cfg'],
    async execute(args) {
        const info = require("../package.json");
        if (info.build === undefined) return console.log('\x1b[31m[X] HighwayBot not installed!\x1b[0m');
        if (!fs.existsSync('./config')) fs.mkdirSync('./config');
        if (!args[1]) {
            return await consolelog('',
                `[Config] Usage: config <config> <key>` +
                `\nAvailable key:` +
                `\n>  clone: Clone a config file` +
                `\n>  create: Create a config file` +
                `\n>  delete: Delete a config file` +
                `\n>  edit: Edit a config file with every value` +
                `\n>  list: List all config files` +
                `\n>  load: Load a config file` +
                `\n>  reload: Reload all config file` +
                `\n>  renane: rename a config file` +
                `\n>  show: Show a config file` 
            );
        }
        try {
            await require(`./config/${args[1]}`)(args);
        }
        catch (e) {
            const file = fs.readdirSync('./cli/config/');
            if (!file.includes(`${args[1]}.js`)) console.log(`\x1b[31m[Config | Error] [${args[1]}] is not a available key\x1b[0m`);
            else console.log(e.name + ': ' + e.message);
        }
    }
};
