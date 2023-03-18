const string = require('./language/translate')
console.log(string('cmd.welcome'));

const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
readline.setPrompt('\n' + string('cmd.command'))

let cmds = require('./cli/util/handler')();

callback()
function callback() {
    readline.prompt()
    readline.once('line', async function (input) {
        if (!input) return callback()
        const args = input.split(' ');
        const cmd = args.shift().toLowerCase()
        const command = await cmds.find(index => index.name === cmd)
            || cmds.find(index =>
                index.aliases != null && Array.isArray(index.aliases)
                    ? index.aliases.includes(cmd)
                    : false)
        if (!command) {
            console.log(string('cmd.command_not_found', cmd))
            return callback()
        } else
            Promise.resolve(command.execute)
                .then((func) => func(args, cmds))
                .catch((e) => { })
                .finally(() => callback())
    });
}

const Event = require('node:events').EventEmitter
const emitter = new Event()
emitter.on('language', () => { cmds = require('./cli/util/handler')(); readline.setPrompt(string('cmd.command')) })
module.exports = emitter