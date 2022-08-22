const consolelog = require('./util/translate');

module.exports = {
    name: "reload",
    description: "Reload command",
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
                console.log(`\x1b[33m%s\x1b[0m`, `Reloading ${dir}/${file}`);
                if (!file.toLowerCase().endsWith('.js') && !fs.lstatSync(`${dir}/${file}`).isDirectory()) try {
                    require(`../${dir}/${file}`);
                }
                catch {
                    return;
                }
                if (fs.lstatSync(`${dir}/${file}`).isDirectory()) reloadDir(`${dir}/${file}`);
                else {
                    delete require.cache[require.resolve(`../${dir}/${file}`)];
                    console.log(`\x1b[32m%s\x1b[0m`, `Reloaded ${dir}/${file}`);
                }
            });
        if (!args[1]) reloadDir('./cmd');
        else if (args[1].toLowerCase() === 'all') reloadDir('.');
        else {
            if (args[1] !== 'dir' || 'file') reloadDir(args[1]);
            else if (args[1] === 'dir') reloadDir(args[2]);
            else if (args[1] === 'file') {
                delete require.cache[require.resolve(`../${args[2]}`)];
                console.log(`\x1b[32m%s\x1b[0m`, `Reloaded ${args[2]}`);
            }
        }
        console.log('\x1b[32m%s\x1b[0m', '[Reload] Done');
    }
};