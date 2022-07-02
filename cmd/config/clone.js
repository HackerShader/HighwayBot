const fs = require('fs-extra');

module.exports = (args, args2) => {
    if (!args || !args2) return console.log(`[Config | Clone] Usage: config clone <filename> <clonefilename>`);
    if (!fs.existsSync(`./config/${args}.json`)) return console.log(`\x1b[31m[Config | Clone | Error] Config [${args}] does not exist\x1b[0m`);
    if (fs.existsSync(`./config/${args2}.json`)) return console.log(`\x1b[31m[Config | Clone | Error] Config [${args2}] already exists\x1b[0m`);
    fs.copySync(`./config/${args}.json`, `./config/${args2}.json`);
    return console.log(`\x1b[32m[Config | Clone | Done] Config [${args}] cloned to [${args2}]\x1b[0m`);
};