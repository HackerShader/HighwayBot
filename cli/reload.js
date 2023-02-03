const consolelog = require('./util/translate');
const string = require('../language/translate')

module.exports = {
    name: "reload",
    description: string('cli.reload.description'),
    /**
     *
     * @param {String[]} args
     */
    execute(args) {
        const fs = require('node:fs');
        const reloadDir = (dir) =>
            fs.readdirSync(dir).forEach(async (file) => {
                if ([
                    '.github',
                    '.idea',
                    '.git',
                    'node_modules'
                ].includes(file)) return;
                console.log(string('cli.reload.reloading', `${dir}/${file}`));
                if (!file.toLowerCase().endsWith('.js') && !fs.lstatSync(`${dir}/${file}`).isDirectory()) try {
                    require(`../${dir}/${file}`);
                } catch {
                    return;
                }
                if (fs.lstatSync(`${dir}/${file}`).isDirectory()) reloadDir(`${dir}/${file}`);
                else {
                    delete require.cache[require.resolve(`../${dir}/${file}`)];
                    console.log(string('cli.reload.reloaded', `${dir}/${file}`));
                }
            });
        if (!args[1]) reloadDir('./cli');
        else if (args[1].toLowerCase() === 'all') reloadDir('.');
        else {
            switch (args[1].toLowerCase()) {
                case 'dir': reloadDir(args[2]); break
                case 'file':
                    delete require.cache[require.resolve(`../${args[2]}`)];
                    console.log(string('cli.reload.reloaded',`${args[2]}`));
                    break
                default: reloadDir(args[1])
            }
        }
        console.log(string('cli.reload.done', '[Reload] Done'));
    }
};