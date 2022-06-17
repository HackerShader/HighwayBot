const fs = require('fs-extra')

module.exports = async (args) => {
    if (!args) return console.log(`[Config | Create] Usage: config create <filename>`)
    if (fs.existsSync(`./config/${args},json`)) return console.log(`[Config | Create | Error] Config [${args}] already exists`)
    fs.writeFileSync(`./config/${args}.json`, '{\n}')
    console.log(`[Config | Create | Done] Config [${args}] created`)
} 