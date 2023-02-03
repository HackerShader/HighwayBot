const editJsonFile = require('edit-json-file');
const fs = require('fs-extra');
const color = require('../util/colorcode');
const string = require('../../language/translate')

module.exports = (args) => {
    if (!args[1]) return console.log(string('cli._config.load.usage'));
    if (!fs.existsSync(`./config/${args[1]}.json`)) return console.log(string('cli._config.load.not_exist', args[1]));
    const commandconfig = editJsonFile(`./settings.json`);
    commandconfig.set('config', `${args[1]}.json`);
    commandconfig.save();
    delete require.cache[require.resolve('../../settings.json')];
    console.log(string('cli._config.load.done', args[1]));
};