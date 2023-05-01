const fs = require('fs-extra');
const color = require('../util/colorcode');
const string = require('../../language/translate')

module.exports = () => {
    fs.readdirSync('./config').forEach(file => {
        delete require.cache[require.resolve(`./../../config/${file}`)];
    });
    delete require.cache[require.resolve(`../../path.json`)];
    console.log(string('cli._config.reload.done'));
    const path = require('../../path.json').config;
    if (!fs.existsSync(`../../config/${path}`)) {
        console.log(string('cli._config.reload.not_exist', ));
        const commandconfig = require('edit-json-file')('./path.json');
        let config = 'default.json';
        if (!fs.readdirSync('./config/').includes(config)) config = fs.readdirSync('./config/')[0];
        commandconfig.set('config', config);
        commandconfig.save();
        delete require.cache[require.resolve(`../../path.json`)];
        console.log(string('cli._config.reload.done',config.replace('.json', '')));
    }
};