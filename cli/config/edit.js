const fs = require('fs-extra');
const color = require('../util/colorcode');

module.exports = (args) => {
    if (!args[2])
        if (!fs.existsSync(`./config/${args[2]}.json`)) {
            console.log(color.code.red, `[Config | Edit | Error] Config [${args[2]}] don't exists.`);
            console.log(color.code.blue, `[Config | Edit | Note] Use the 'config list' command to find out what the key is.`);
        }
    const file = require('edit-json-file')(`./config/${args[2]}.json`);
    let configName = args[2];
    let success = [];
    //Improve Object editing
    args.slice(3).forEach((args) => {
        let key, value, i = 0;
        args.split('').forEach((c) => {
            if (c === ':') {
                key = args.split('').slice(0, i).join('').toLowerCase();
                value = args.split('').splice(i + 1).join('');
            } else i++;
        });
        if (!Object.keys(require(`../../config/${configName}.json`)).includes(key))
            return console.log(color.code.red, `[Config | Edit | Error] Key [${key}] don't exist.`);
        let number = [
            'port',
            'pin',
            'key',
            'invport',
        ];
        if (number.indexOf(key) > -1) {
            if (isNaN(value)) return console.log(color.code.red, `[Config | Edit | Error] [${key}] key must be a number`);
            value = Number(value);
        }
        if (key === 'password' && value.toLowerCase() === 'null') value = null;
        if (key === 'version' && !require('../../Core/Game/Versions/versions.json').includes(value))
            return console.log(color.code.red, `[Config | Edit | Error] Invalid version (1.8 -> 1.18 only)`);
        file.set(key, value);
        file.save();
        success.push(key);
    });
    if (success.length !== 0) {
        console.log(color.code.green, `[Config | Edit | Done] Edited [${args[2]}] config.`);
        console.log(color.code.blue, `Edited things:\n>  ${success.join('\n>  ')}`);
    }
};