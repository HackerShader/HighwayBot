const fs = require('fs-extra');
const color = require('../util/colorcode');

module.exports = () => {
    const path = require('../../settings.json').config;
    return console.log(`[Config | List] List of config files:\n` +
        `>  ${(fs.readdirSync('./config')).map(name => {
            let n = name.replace('.json', '');
            if (n + '.json' === path) n = color.color.blue + `${n} (current)` + color.color.reset;
            return n;
        }).join('\n>  ')}`);
};