const fs = require('fs');
const exec = require('child_process').exec;
const color = require('./cli/util/colorcode')
let cmds = []

console.log(`----- Welcome to HighwayBot controller -----\n`);

async function callback() {
    const consolelog = require('./cli/util/translate');
    return new Promise(async (resolve, reject) => {
        const prompt = require('prompt');
        await prompt.start();
        await prompt.get('commands', async function (err, result) {
            if (!result) return;
            const toLowerCase = result.commands.trim().toLowerCase();
            const args = toLowerCase.split(' ');
            const noLowerArgs = result.commands.split(' ');
            const command = await cmds.find(cmd => cmd.name === args[0])
                || await cmds.find(
                    cmd =>
                        cmd.aliases != null && Array.isArray(cmd.aliases)
                            ? cmd.aliases.includes(args[0])
                            : false
                )
            try {
                if (!toLowerCase) return callback();
                if (toLowerCase === `install`
                    || toLowerCase === `update`) return require(`./cli/${toLowerCase}.js`).execute();
                else if (command.name === 'config' && args[1] === 'edit'
                    || command.name === 'err') await command.execute(noLowerArgs).then(() => callback());
                else if (command.name === 'help') await resolve(command.execute(args, cmds).then(() => callback()));
                else await resolve(command.execute(args).then(() => callback()));
            }
            catch (e) {
                if (!command) await consolelog(color.code.red, `[CMD | Error] [${args[0]}] is not a available command`);
                else await console.log(e.name + ': ' + e.message);
                await callback();
            }
        });
    });
}



async function handler() {
    await require('./cli/util/handler')(cmds);
}

async function main() {
    if (fs.existsSync('./node_modules')) {
        const consolelog = require('./cli/util/translate');
        await consolelog('', 'Type \'help\' to see a list of commands\n' +
            'Type \'language <your language symbol (like: vi, pl, en, ...)>\' to use');
        await handler()
        await callback();
    } else {
        fs.writeFileSync('./settings.json', JSON.stringify({
            lang: 'en'
        }));
        await console.log(color.code.yellow, '[Notification] This is the first time you run this program');
        await console.log(color.code.yellow, '[Notification] Please wait while installing dependencies...');
        //process.stdout.write(color.code.blue, '[Notification] [] [0%]')
        let dependencies = [
            'prompt', 'edit-json-file', 'fs-extra', 'unzipper', 'superagent', '@vitalets/google-translate-api'
        ]
        let i = -1
        let install = (package) => {
            exec(`npm install ${package}`, async (err) => {
                if (err) {
                    process.stdout.clearLine(0);
                    process.stdout.cursorTo(0);
                    await console.log(color.code.red, `[Notification] ${err}`);
                    log();
                } else log()
            })
        }
        let log = async () => {
            i++
            if (i <= dependencies.length) {
                let str = ''
                for (let y = 0; y < i + 1 / dependencies.length * 20; y++) str += '■';
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
                process.stdout.write(`${color.code.blue, `[Notification] [${Math.floor(i / (dependencies.length + 1) * 100)}%]`} Installing ${dependencies[i - 1]}`);
                install(dependencies[i])
            } else {
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
                await console.log(color.code.green, '[Notification] [100%] Dependencies installed');
                await console.log(
                    "To start using the bot, please do the following:\n" +
                    "> Run 'config create' command to create empty 'deafult' config\n" +
                    "> Run 'config edit' to edit the newly created empty 'default' config.\n" +
                    "> Run 'config load default' and config reload' to load config\n" +
                    "> Run 'runbot' to let the bot into the server if you have done all the steps above\n" +
                    "Type 'help' to see a list of commands\n" +
                    "Type 'language <your language symbol (like: vi, pl, en, ...)>' to use"
                )
                await handler()
                await callback();
            }
        }
        log()
    }
}

main();
