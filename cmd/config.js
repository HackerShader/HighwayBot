const editJsonFile = require('edit-json-file')
const fs = require('fs-extra')

module.exports = {
    name: "config",
    description: "Configure the HighwayBot config",
    async execute(args) {
        const package = require('./../package.json')
        //if (package.build === undefined) return console.log('[X] HighwayBot not installed]')
        if (!fs.existsSync('./config')) fs.mkdirSync('./config')
        if (!fs.existsSync('./config/default.json')) fs.writeFileSync('./config/default.json', '{\n}')
        if (!args[1]) {
            return console.log(
                `[Config] Usage: config <config> <key>`+
                `\n\tAvailable key:` +
                `\n\t| create: Create a config file` +
                `\n\t| list: List all config files` +
                `\n\t| delete: Delete a config file` +
                `\n\t| set: Set a value in a config file` +
                `\n\t| clone: Duplicate a config file` +
                `\n\t| rename: Rename a config file` +
                `\n\t| reload: Reload every config files` +
                `\n\t| load: Load a config file` 
            )
        }
        try {
            require(`./config/${args[1]}`)(args[2], args[3])
        } catch (err) {
            console.log(`[Config | Error] ${args[1]} is not a available key`)
        }
    }
}