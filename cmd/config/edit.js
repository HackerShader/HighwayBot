const fs = require('fs-extra');

/**
 * @param {String[]} args
 */
module.exports = (args) => {
    if (!args[2]) return console.log(`[Config | Edit] Usage: config edit <filename> <key1>:<value1> <key2>:<value2>...`);
    if (!fs.existsSync(`./config/${args[2]}.json`)) 
        return console.log(`\x1b[31m[Config | Edit | Error] Config [${args[2]}] don't exists\x1b[0m`);
    const file = require('edit-json-file')(`./config/${args[2]}.json`);
    args.slice(3).forEach((args) => {
        let key, value, i = 0;
        args.split('').forEach((c) => {
            if (c == ':') {
                key = args.split('').slice(0, i).join('');
                value = args.split('').splice(i + 1).join('');
            } else i++;
        })
        if (!Object.keys(require('../../config/default.json')).includes(key)) 
            console.log(`\x1b[31m[Config | Edit | Error] Key [${key}] don't exists\x1b[0m`);
        file.set(key, value);
    });
    file.save()
    console.log(`\x1b[32m[Config | Edit | Done] Edited [${args[2]}] config.\x1b[0m`);
};