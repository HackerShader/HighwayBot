const fs = require('fs-extra')

module.exports = (args) => {
    if (!args) return console.log(`[Config | Create] Usage: config create <filename>`)
    if (fs.existsSync(`./config/${args},json`)) return console.log(`\x1b[31m[Config | Create | Error] Config [${args}] already exists\x1b[0m`)
    fs.writeFileSync(`./config/${args}.json`, '{\n}')
    console.log(`\x1b[32m[Config | Create | Done] Config [${args}] created\x1b[0m`)
} 