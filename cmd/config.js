const fs = require('fs-extra');

module.exports = {
    name: "config",
    description: "Configure the HighwayBot config",
    execute(args) {
        const info = require("../package.json");
        if (info.build === undefined) return console.log('\x1b[31m[X] HighwayBot not installed!\x1b[0m');
        if (!fs.existsSync('./config')) fs.mkdirSync('./config');
        if (!fs.existsSync('./config/default.json')) fs.writeFileSync('./config/default.json', '{\n}');
        if (!args[1]) {
            return console.log(
                `[Config] Usage: config <config> <key>` +
                `\n\tAvailable key:` +
                `\n\t| create: Create a config file` +
                `\n\t| list: List all config files` +
                `\n\t| delete: Delete a config file` +
                `\n\t| set: Set a value in a config file` +
                `\n\t| clone: Duplicate a config file` +
                `\n\t| rename: Rename a config file` +
                `\n\t| reload: Reload every config files` +
                `\n\t| load: Load a config file`
            );
        }
        try {
            require(`./config/${args[1]}`)(args[2], args[3]);
        } catch {
            console.log(`\x1b[31m[Config | Error] ${args[1]} is not a available key\x1b[0m`);
        }
    }
};
