const fs = require('fs-extra');
const color = require('../util/colorcode');
let objects;

function isObject(object) {
    return (typeof object === 'object');
}

function isNumber(input) {
    if(isNaN(input) === true) return false
    else return true;
}

function FindObject(obj, path, value) {
    path = path.split('.')

    for (let i = 0; i < path.length; ++i) {
        if (obj[path[i]] === undefined) return false;
        obj = obj[path[i]];
    }
    objects = obj
    if (isObject(obj) === true) return false;
    if (isNumber(value) === true) return 1;
    if (isNumber(value) === false) return 2;
    return obj
}

module.exports = async (args) => {
    if (!args[2] || !args[3]) return console.log(color.code.blue, `[Config | Edit] Usage: config edit <filename> <key_1>:<value_1> <key_2>:<value_2> ...`);
    else if (!fs.existsSync(`./config/${args[2]}.json`)) return console.log(color.code.red, `[Config | Edit | Error] Config [${args[2]}] don't exists.`);
    if (!args[2] || !fs.existsSync(`./config/${args[2]}.json`)) return console.log(color.code.blue, `[Config | Edit | Note] Use the 'config list' command to find out what the key is.`);
    const configure = require(`./../../config/${args[2]}.json`)
    const file = require('edit-json-file')(`./config/${args[2]}.json`);
    args.slice(3).forEach(data => {
        const datasplit = data.split(':')
        const key = datasplit[0].toLowerCase()
        let value = datasplit[1];
        if(!key || !value) return console.log(color.code.red, `[Config | Edit | Error] Missing key/value`)
        const ObjectChecker = FindObject(configure, key, value)
        if (ObjectChecker === 1) {
            if(typeof objects === 'string') return console.log(color.code.red, `[Config | Edit | Error] [Value: ${value}] must be a Number`)
            value = Number(value)
        }
        if (ObjectChecker === 2) {
            if(typeof objects === 'number') return console.log(color.code.red, `[Config | Edit | Error] [Value: ${value}] must be a String`)
        }
        if (ObjectChecker === false) return console.log(color.code.red, `[Config | Edit | Error] [${key}] doesn't exists or have multiple option`)
        file.set(key, value)
        file.save()
        console.log(color.code.green, `[Config | Edit | Done] Edited [${args[2]}] config file`)
    });
}