const fs = require('fs');
const consolelog = require('./util/translate');

module.exports = {
    name: "runbot",
    description: "Execute HighwayBot main file",
    aliases: ['start'],
    async execute() {
        if (!fs.existsSync('./index.js')) return console.log('\x1b[31m[X] HighwayBot not installed!\x1b[0m');
        await require('../index');
    }
};