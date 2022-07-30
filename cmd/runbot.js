const fs = require('fs');
module.exports = {
    name: "runbot",
    description: "Execute HighwayBot main file",
    aliases: ['start'],
    execute() {
        if (!fs.existsSync('./index.js')) return console.log('\x1b[31m[X] HighwayBot not installed!\x1b[0m');
        require('../index');
    }
};