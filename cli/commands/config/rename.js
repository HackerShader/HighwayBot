const fs = require('fs-extra');
const string = require('../../language/translate')

module.exports = (args) => {
    if (!args[1] || !args[2])
        return console.log(string('cli._config.rename.usage'));
    if (!fs.existsSync(`./config/${args[1]}.json`))
        return console.log(string('cli._config.rename.not_exist', args[1]));
    if (fs.existsSync(`./config/${args[2]}.json`))
        return console.log(string('cli._config.rename.already_exist', args[2]));
    fs.renameSync(`./config/${args[1]}.json`, `./config/${args[2]}.json`);
    return console.log(string('cli._config.rename.done', args[1], args[2]));
};