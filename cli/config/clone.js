const fs = require('fs-extra');
const color = require('../util/colorcode');
const string = require('../../language/translate')

module.exports = (args) => {
    if (!args[1] || !args[2])
        return console.log(string('cli._config.clone.usage'));
    if (!fs.existsSync(`./config/${args[1]}.json`))
        return console.log(string('cli._config.clone.not_exist', args[1]));
    if (fs.existsSync(`./config/${args[2]}.json`))
        return console.log(string('cli._config.clone.already_exist', args[2]));
    fs.copySync(`./config/${args[1]}.json`, `./config/${args[2]}.json`);
    return console.log(string('cli._config.clone.done', args[1], args[2]));
};