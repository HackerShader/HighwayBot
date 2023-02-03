const fs = require('fs-extra');
const color = require('../util/colorcode');
const string = require('../../language/translate')

module.exports = () => {
    const path = require('../../settings.json').config;
    return console.log(string('cli._config.list.list', fs.readdirSync('./config/'), path));
};