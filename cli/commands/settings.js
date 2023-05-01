const string = require('../language/translate')
const fs = require('fs-extra')

module.exports = {
    name: "settings",
    description: "All option about HighwayBot",
    aliases: ['setting', 'set', 'options', 'options'],
    async execute(args) {
        console.log(args)
        const VALUE = args
        if (!VALUE[0]) return console.log('d')
        const file = fs.readdirSync('cli/settings').filter(file => file.endsWith('js'))
        const functions = require(`./settings/${VALUE}.js`)
        console.log(functions.execute())
    }
};
