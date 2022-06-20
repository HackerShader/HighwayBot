const fs = require('fs-extra')

module.exports = async (args, args2) => {
    if (!args || !args2) return console.log(`[Config | Rename] Usage: config rename <filename> <newname>`)
    if (!fs.existsSync(`./config/${args}.json`)) return console.log(`[Config | Rename | Error] Config [${args}] does not exist`)
    fs.renameSync(`./config/${args}.json`, `./config/${args2}.json`)
    return console.log(`[Config | Rename | Done] Config [${args}] renamed to [${args2}]`)

} 