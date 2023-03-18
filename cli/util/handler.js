const fs = require('node:fs')
/**
 * @return {Array}
 */
module.exports = () => {
    let array = []
    const files = fs.readdirSync('./cli')
        .filter(file => file.endsWith('.js'))
        .map(file => file.replace('.js', ''))
    for (let i in files) {
            delete require.cache[require.resolve(`../../cli/${files[i]}`)]
            const cmd = require(`../../cli/${files[i]}`);
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
        };
    return array
}
