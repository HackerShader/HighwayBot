const fs = require('fs-extra');
const string = require('../../language/translate');

module.exports = (args) => {
    if (!args[1])
        return console.log(string('cli._config.delete.usage'));
    if (!fs.existsSync(`./config/${args[1]}.json`))
        return console.log(string('cli._config.delete.not_exist', args[1]));
    fs.removeSync(`./config/${args[1]}.json`);
    const config = require('../../settings.json')
    if (config.config == args[1] + '.json') {
        const edit = require('edit-json-file')('./settings.json')
        edit.unset('config');
        edit.save()
    }
    return console.log(string('cli._config.delete.done', args[1]));
};