const fs = require('fs-extra')

module.exports = async (args) => {
    if (!args) return console.log(`[Config | Delete] Usage: config delete <filename>`)
    if (!fs.existsSync(`./config/${args}.json`)) return console.log(`[Config | Delete | Error] Config [${args}] does not exist`)
    fs.removeSync(`./config/${args}.json`)
    return console.log(`[Config | Delete | Done] Config [${args}] deleted`);
} 