const fs = require('fs');
const child_process = require('child_process');
const string = require('./language/translate')
const chalk = require('chalk')
const prompt = require('prompt')
let cmds = []

console.log(string('cmd.welcome'));

/**
 * @param {prompt} prompt 
 */
function callback(prompt) {
    prompt.get(string('cmd.command'), async function (err, result) {
        if (!result[string('cmd.command')]) return callback(prompt)
        const args = result[string('cmd.command')].split(' ');
        const cmd = args.shift().toLowerCase()
        const command = cmds.find(index => index.name === cmd)
            || cmds.find(index =>
                index.aliases != null && Array.isArray(index.aliases)
                    ? index.aliases.includes(cmd)
                    : false)
        if (!command) {
            console.log(string('cmd.command_not_found', cmd))
            return callback(prompt)
        } else try {
            await command.execute(args, cmds)
            return callback(prompt)
        } catch (e) {
            callback(prompt);
        }
    });
}

function handler() {
    require('./cli/util/handler')(cmds);
}

async function main() {
    if (fs.existsSync('./node_modules')) {
        console.log(string('cmd.commands'));
        const prompt = require('prompt')
        prompt.start()
        handler()
        callback(prompt);
    } else {
        fs.writeFileSync('./settings.json', JSON.stringify({
            lang: 'en'
        }));
        console.log(string('cmd.first_time_msg'));
        console.log(string('cmd.downloading'))
        let packages = [
            'prompt', 'edit-json-file', 'fs-extra', 'unzipper', 'superagent', '@vitalets/google-translate-api'
        ]
        child_process.exec(`npm install ${packages.join(' ')}`)
            .on('error', (err) => {
                console.log(string('cmd.download_err', err))
            })
            .once('close', () => {
                console.log(string('cmd.download_done'));
                console.log(string('cmd.first_time_guide'))
                const prompt = require('prompt')
                prompt.start()
                handler();
                callback(prompt);
            })
    }
}

main();