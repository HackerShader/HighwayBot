const fs = require('node:fs')
/**
* 
* @param {Array} array 
*/
module.exports = (array) =>
    fs.readdirSync('./cmd/')
        .filter(file => file.endsWith('.js'))
        .map(file => file.replace('.js', ''))
        .forEach(async (file) => {
            const cmd = require(`../cmd/${file}`)
            if (!cmd.name) return
            if (!Array.isArray(cmd.aliases) || cmd.aliases.length == 0) cmd.aliases = null
            const command = await array.find(c => c.name == cmd.name)
                || await array.find(
                    c =>
                        c.aliases != null && Array.isArray(c.aliases)
                            ? c.aliases.includes(cmd.name)
                            : false
                )
            if (command != null) throw new Error(`Command [${cmd.name}] already exist`)
            else array.push({
                name: cmd.name,
                description: cmd.description,
                aliases: cmd.aliases,
                execute: cmd.execute
            })
        })
