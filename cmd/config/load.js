const editJsonFile = require('edit-json-file')
const fs = require('fs-extra')

module.exports = async(args, args2) => {    
    const commandconfig = editJsonFile(`./../../commandconfig.json`)
    if (!args) return console.log(`[Config | Load] Usage: config load <filename>`)
    if (!fs.existsSync(`./config/${args}.json`)) return console.log(`[Config | Load | Error] Config [${args}] does not exist`)
    commandconfig.set(`config`, `./config/${args}.json`)
    commandconfig.save()
    return console.log(`[Config | Load | Done] Config [${args}] loaded`)

}