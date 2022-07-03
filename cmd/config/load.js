const editJsonFile = require('edit-json-file');
const fs = require('fs-extra');

module.exports = (args) => {
    if (!args) return console.log(`[Config | Load] Usage: config load <filename>`);
    if (!fs.existsSync(`./config/${args}.json`)) return console.log(`\x1b[31m[Config | Load | Error] Config [${args}] does not exist\x1b[0m`);
    const commandconfig = editJsonFile(`./path.json`);
    commandconfig.set('config', `./config/${args}.json`);
    commandconfig.save();
    return console.log(`\x1b[32m[Config | Load | Done] Config [${args}] loaded\x1b[0m`);
};