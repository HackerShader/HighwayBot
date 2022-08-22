const fs = require('fs-extra');
const color = require('../../Core/Console/colorcode');

module.exports = (args) => {
    if (!args[2])
        return console.log(color.code.blue, `[Config | Edit] Usage: config edit <filename> <key1>:<value1> <key2>:<value2>...`);
    if (!fs.existsSync(`./config/${args[2]}.json`))
        return console.log(color.code.red, `[Config | Edit | Error] Config [${args[2]}] don't exists.`);
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