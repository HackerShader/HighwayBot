const chalk = require('chalk')
const fs = require('fs-extra')
const string = require('./language/translate')
console.log(chalk.dim.bgGrey(string('cmd.welcome')));

let CMDLIST_ARRAY = []
fs.readdirSync('cli').forEach(files => {
    if (!files.endsWith('js') && !files.includes('util')) {
        fs.readdirSync('cli/' + files).forEach(files2 => {
            const comlist = ((files) + ' ' + (files2).replace('.js', ''))
            CMDLIST_ARRAY.push(comlist)
        })
    }
    if (files.endsWith('js')) {
        const cmdlist = files.replace('.js', '')
        CMDLIST_ARRAY.push(cmdlist)
    }
})

const autoComplete = function completer(line) {
    const completions = CMDLIST_ARRAY
    const hits = completions.filter((c) => c.startsWith(line)
    );
    return [hits.length ? hits : completions, line];
}

const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    completer: autoComplete
})

readline.setPrompt(string('cmd.command'))
let cmds = require('./cli/util/handler')();

prompt()
function prompt() {
    readline.prompt()
    readline.once('line', async function (stdin) {
        const input = stdin.trim()
        if (!input) return prompt()
        const args = input.split(' ');
        const cmd = args.shift().toLowerCase()
        const command = await cmds.find(index => index.name === cmd)
            || cmds.find(index =>
                index.aliases != null && Array.isArray(index.aliases)
                    ? index.aliases.includes(cmd)
                    : false)
        if (!command) {
            console.log(string('cmd.command_not_found', cmd))
            return prompt()
        } else
            Promise.resolve(command.execute)
                .then((func) => func(args, cmds))
                .catch((e) => { console.log(e) })
                .finally(() => prompt())
    });
}

const Event = require('node:events').EventEmitter
const emitter = new Event()
emitter.on('language', () => { cmds = require('./cli/util/handler')(); readline.setPrompt(string('cmd.command')) })

module.exports = { emitter, readline }
