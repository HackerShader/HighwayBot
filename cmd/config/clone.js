const fs = require('fs-extra')

module.exports = (args, args2) => {
    if (!args || !args2) return console.log(`[Config | Clone] Usage: config clone <filename> <clonefilename>`)
    if (!fs.existsSync(`./config/${args}.json`)) return console.log(`[Config | Clone | Error] Config [${args}] does not exist`)
    if (fs.existsSync(`./config/${args2}.json`)) return console.log(`[Config | Clone | Error] Config [${args2}] already exists`)
    fs.copySync(`./config/${args}.json`, `./config/${args2}.json`)
    return console.log(`[Config | Clone | Done] Config [${args}] cloned to [${args2}]`)
} 