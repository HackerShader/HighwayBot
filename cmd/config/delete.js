const fs = require('fs-extra');
const color = require('../util/colorcode');

module.exports = (args) => {
    if (!args[2])
        return console.log(color.code.blue, `[Config | Delete] Usage: config delete <filename>`);
    if (!fs.existsSync(`./config/${args[2]}.json`))
        return console.log(color.code.red, `[Config | Delete | Error] Config [${args[2]}] does not exist.`);
    fs.removeSync(`./config/${args[2]}.json`);
    return console.log(color.code.green, `[Config | Delete | Done] Config [${args[2]}] deleted`);
};