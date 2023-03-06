const string = require('./language/translate')
const prompt = require('prompt')
let cmds = []
console.log(string('cmd.welcome'));

/**
 * @param {prompt} prompt 
 */
async function callback(prompt) {
    prompt.get(string('cmd.command'), async function (err, result) {
        if (!result[string('cmd.command')]) return await callback(prompt)
        const args = result[string('cmd.command')].split(' ');
        const cmd = args.shift().toLowerCase()
        const command = await cmds.find(index => index.name === cmd)
            || cmds.find(index =>
                index.aliases != null && Array.isArray(index.aliases)
                    ? index.aliases.includes(cmd)
                    : false)
        if (!command) {
            console.log(string('cmd.command_not_found', cmd))
            return await callback(prompt)
        } else
             Promise.resolve(command.execute)
                .then((func) => func(args, cmds))
                .catch((e) => console.log(e))
                .finally(() => callback(prompt))
    });
}
require('./cli/util/handler')(cmds);
prompt.start()
callback(prompt)

const Event = require('node:events').EventEmitter
const emitter = new Event()
emitter.on('language', () => { cmds = []; require('./cli/util/handler')(cmds) })
module.exports = emitter