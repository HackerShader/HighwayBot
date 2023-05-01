const fs = require('fs-extra');
const color = require('../util/colorcode');
const string = require('../../language/translate');
let objects;

function isBoolean(object) {
    return (typeof object === 'boolean');
}

function isObject(object) {
    return (typeof object === 'object');
}
function isNumber(input) {
    return isNaN(input) !== true;
}

function FindObject(obj, path, value) {
    path = path.split('.')

    for (let i = 0; i < path.length; ++i) {
        if (obj[path[i]] === undefined) return false;
        obj = obj[path[i]];
    }
    objects = obj
    if (isBoolean(obj) === true) return 'boolean';
    if (isBoolean(obj) === false) return;
    if (isObject(obj) === true) return false;
    if (isNumber(value) === true) return 1;
    if (isNumber(value) === false) return 2;
    return obj
}

/**
 * @param {String[]} args 
 */
module.exports = async (args) => {
    if (!args[1] || !args[2]) return console.log(string('cli._config.edit.usage'));
    if (!fs.existsSync(`./config/${args[1]}.json`)) return console.log(string('cli._config.edit.not_exist', args[1]));
    if (!args[2]) return console.log(string('cli._config.edit.note', args[1]));
    const configure = require(`./../../config/${args[1]}.json`)
    const file = require('edit-json-file')(`./config/${args[1]}.json`);
    args.slice(2).forEach(data => {
        const datasplit = data.split(':')
        const key = datasplit[0].toLowerCase()
        let value = datasplit[1];
        console.log(key, value)
        //if(!key || !value) return console.log(color.code.red, `[Config | Edit | Error] Missing key/value`)
        const ObjectChecker = FindObject(configure, key, value)
        console.log(ObjectChecker)
        if (ObjectChecker === 1) {
            if (typeof objects === 'string') return console.log(color.code.red, string('cli._config.edit.invalid_number', key))
            value = Number(value)
        }
        if (ObjectChecker === 2) {
            if (typeof objects === 'number') return console.log(color.code.red, string('cli._config.edit.invalid_string', key))
        }
        if (ObjectChecker === 'boolean') {
            console.log(typeof value, value)
            if (typeof value === 'number') return console.log('need a boolean')
            if (value === 'true') value = true
            if (value === 'false') value = false
        }
        if (ObjectChecker === false) return console.log(color.code.red, string('cli._config.edit.invalid_key', key))
        file.set(key, value)
        file.save()
        return console.log(string('cli._config.edit.done', args[1]))
    });
}
