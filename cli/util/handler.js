const fs = require('node:fs')

/**
 *
 * @param {Array} array
 */
module.exports = (array) =>
    fs.readdirSync('./cli')
        .filter(file => file.endsWith('.js'))
        .map(file => file.replace('.js', ''))
        .forEach(async (file) => {
            const cmd = require(`../../cli/${file}`);
            if (!cmd.name) throw new Error(`Command [${cmd.name}] miss name`);;
            const command = array.find(c => c.name === cmd.name)
                || array.find(
                    c =>
                        c.aliases != null && Array.isArray(c.aliases)
                            ? c.aliases.includes(cmd.name)
                            : false
                );
            if (command != undefined) throw new Error(`Command [${cmd.name}] already exist`);
            else array.push({
                name: cmd.name,
                description: cmd.description,
                aliases: cmd.aliases,
                execute: cmd.execute
            });
        });
