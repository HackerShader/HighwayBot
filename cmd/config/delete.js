const fs = require('fs-extra')

module.exports = (args) => {
    if (!args) return console.log(`[Config | Delete] Usage: config delete <filename>`)
    if (!fs.existsSync(`./config/${args}.json`)) return console.log(`\x1b[31m[Config | Delete | Error] Config [${args}] does not exist\x1b[0m`)
    fs.removeSync(`./config/${args}.json`)
    return console.log(`\x1b[32m[Config | Delete | Done] Config [${args}] deleted\x1b[0m`);
} 