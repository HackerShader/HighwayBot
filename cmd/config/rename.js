const fs = require('fs-extra');

module.exports = (args, args2) => {
    if (!args || !args2) return console.log(`[Config | Rename] Usage: config rename <filename> <newname>`);
    if (!fs.existsSync(`./config/${args}.json`)) return console.log(`\x1b[31m[Config | Rename | Error] Config [${args}] does not exist\x1b[0m`);
    if (fs.existsSync(`./config/${args2}.json`)) return console.log(`\x1b[31m[Config | Rename | Error] Config [${args2}] already existed\x1b[0m`);
    fs.renameSync(`./config/${args}.json`, `./config/${args2}.json`);
    return console.log(`\x1b[32m[Config | Rename | Done] Config [${args}] renamed to [${args2}]\x1b[0m`);
};