const fs = require('fs-extra');

module.exports = (args) => {
    if (!args[2]) return console.log(`[Config | Edit] Usage: config edit <filename> <key1>:<value1> <key2>:<value2>...`);
    if (!fs.existsSync(`./config/${args[2]}.json`)) return console.log(`\x1b[31m[Config | Edit | Error] Config [${args[2]}] don't exists\x1b[0m`);
    const file = require('edit-json-file')(`./config/${args[2]}.json`);
    let configName = args[2];
    let success = false;
    args.slice(3).forEach((args) => {
        let key, value, i = 0;
        args.split('').forEach((c) => {
            if (c === ':') {
                key = args.split('').slice(0, i).join('').toLowerCase();
                value = args.split('').splice(i + 1).join('');
            } else i++;
        });
        if (!Object.keys(require(`../../config/${configName}.json`)).includes(key))
            return console.log(`\x1b[31m[Config | Edit | Error] Key [${key}] don't exists\x1b[0m`);
        let number = [
            'port',
            'pin',
            'key',
        ];
        if (number.indexOf(key) > -1) {
            if (isNaN(value))
                return console.log(`\x1b[31m[Config | Edit | Error] [${key}] key must be a number\x1b[0m`);
        }
        if (key === 'password' && value.toLowerCase() === 'null') value = null;
        if (key === 'version' && !require('../../Core/Game/version.json').includes(value))
            return console.log(`\x1b[31m[Config | Edit | Error] Invalid version (1.8 -> 1.18 only)\x1b[0m`);
        let value2 = parseInt(value);
        if (!value2) value2 = value;
        file.set(key, value2);
        file.save();
        success = true;
    });
    if (success) console.log(`\x1b[32m[Config | Edit | Done] Edited [${args[2]}] config.\x1b[0m`);
};
