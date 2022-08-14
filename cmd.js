const fs = require('fs');
const exec = require('child_process').exec;
let cmds = []

console.log(`----- Welcome to HighwayBot controller -----\n`);

async function callback() {
    const prompt = require('prompt');
    prompt.start();
    prompt.get('commands', async function (err, result) {
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
                || toLowerCase === `update`) return require(`./cmd/${toLowerCase}.js`).execute();
            else if (command.name === 'config' && args[1] === 'edit'
                || command.name === 'err') await command.execute(noLowerArgs);
            else if (command.name === 'help') await command.execute(args, cmds)
            else await command.execute(args);
            callback();
        } catch (e) {
            if (!command) console.log(`\x1b[31m%s\x1b[0m`, `[CMD | Error] [${args[0]}] is not a available command`);
            else console.log(e.name + ': ' + e.message);
            callback();
        }
    });
}

async function main() {
    if (fs.existsSync('./node_modules')) {
        console.log('Type \'help\' to see a list of commands\n');
        require('./cmd/util/handler')(cmds);
        await callback();
    } else {
        fs.writeFileSync('./path.json', '{\n}');
        console.log('\x1b[33m[Notification] This is the first time you run this program, please wait while installing dependencies...\x1b[0m');
        exec(`npm install prompt edit-json-file fs-extra unzipper superagent`, async (err) => {
            if (err) return  console.log(`${err}`);
            console.log('\x1b[32m[Notification] Dependencies installed!\x1b[0m');
            console.log('Type \'help\' to see a list of commands\n');
            await callback();
        });
    }
}

main();
