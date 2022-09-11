const fs = require('fs-extra');
const color = require('../util/colorcode');

function isObject(object) {
    return (typeof object === 'object');
}

function FindObject(obj, path) {
    path = path.split('.')

    for (var i = 0; i < path.length; ++i) {
        if (obj[path[i]] == undefined) return false;
        obj = obj[path[i]];
    }
    if (isObject(obj) === true) return false;
    return obj;
}

module.exports = async (args) => {
    if (!args[2] || !args[3]) return console.log(color.code.blue, `[Config | Edit] Usage: config edit <filename> <key_1>:<value_1> <key_2>:<value_2> ...`);
    else if (!fs.existsSync(`./config/${args[2]}.json`)) return console.log(color.code.red, `[Config | Edit | Error] Config [${args[2]}] don't exists.`);
    if (!args[2] || !fs.existsSync(`./config/${args[2]}.json`)) return console.log(color.code.blue, `[Config | Edit | Note] Use the 'config list' command to find out what the key is.`);
    const configfile = require(`./../../config/${args[2]}.json`)
    const file = require('edit-json-file')(`./config/${args[2]}.json`);
    args.slice(3).forEach(data => {
        const datasplit = data.split(':')
        const key = datasplit[0]
              value = datasplit[1]
        if(!key || !value) return console.log(color.code.red, `[Config | Edit | Error] Missing key/value`)
        const ObjectChecker = FindObject(configfile, key)
        if (ObjectChecker === false) return console.log(color.code.red, `[Config | Edit | Error] [${key}] doesn't exists or have multiple option`)
        file.set(key, value)
        file.save()
        console.log(color.code.green, `[Config | Edit | Done] Edited [${args[2]}] config file`)
    });
}


