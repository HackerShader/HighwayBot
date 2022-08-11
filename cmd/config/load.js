const editJsonFile = require('edit-json-file');
const fs = require('fs-extra');
const color = require('../../Core/Console/colorcode');

module.exports = (args) => {
    if (!args[2]) return console.log(color.code.blue, `[Config | Load] Usage: config load <filename>`);
    if (!fs.existsSync(`./config/${args[2]}.json`)) return console.log(color.code.red, `[Config | Load | Error] Config [${args[2]}] does not exist`);
    const commandconfig = editJsonFile(`./path.json`);
    commandconfig.set('config', `${args[2]}.json`);
    commandconfig.save();
    delete require.cache[require.resolve('../../path.json')];
    console.log(color.code.green, `[Config | Load | Done] Config [${args[2]}] loaded`);
};