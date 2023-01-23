const prompt = require('prompt');
const exec = require('child_process').exec;
const editJsonFile = require('edit-json-file');
const fs = require('fs-extra');
const consolelog = require('./../util/translate')
const color = require('./../util/colorcode')


console.clear();
async function start() {
    await consolelog('',
        `Welcome to HighwayBot installer!\n` +
        `This installer will help you to install HighwayBot on your computer.\n` +
        `We will need some information to proceed.\n` +
        '\n' +
        'This HighwayBot still in development. There\'ll 2 choices to install HighwayBot:\n' +
        '\n')
    await consolelog(color.code.yellow, "1. Install HighwayBot from the official GitHub repository (Only for developers) (Require 'git')\n")
    await consolelog(color.code.blue, "2. Install HighwayBot from the release page (Recommended for users)\n")
    await consolelog(color.code.red, "3. Cancel the installation\n")
    await consolelog('', 'Please choose the way you want to install HighwayBot.');
    await prompt.start();
    await Input()
}

async function Input() {
     prompt.get(['method'], async (err, result) => {
        if (err) return;
        switch (result.method) {
            case '1':
                console.log(
                    'You choose to install HighwayBot from the official GitHub repository.\n' +
                    'Please wait while we are downloading the repository...');

                console.log('\x1b[33m[Pending] Cloning the repository...\x1b[0m');
                async function cloner() {
                    exec('git clone https://github.com/HackerShader/HighwayBot', async (err) => {
                        if (err) return console.log(err);
                        console.log("\x1b[32m[Done] Cloned the HighwayBot repository\x1b[0m");
                        fs.copy('./HighwayBot', './');
                        fs.removeSync('./HighwayBot');
                        exec('git rev-parse HEAD', async (err, stdout) => {
                            if (err) return console.log(err);
                            console.log(color.code.yellow, '[Notification] Please launch the bot again to apply the changes [node ./cli.js]');
                            const edit = editJsonFile('./package.json');
                            edit.set('build', `${stdout.substring(0, 7)}`);
                            edit.save();
                        });
                    });
                }
                cloner();
                break;
            case '2':
                await consolelog('', 'You choose to install HighwayBot from the release installer.');
                confirm();
                break
            case '3':
                await consolelog(color.code.red, '[X] Exited the Installation');
                process.exit(0);
                break
            default:
                if (!result.method) return Input();
                await consolelog(color.code.red, '[X] Bad choice, Please choose the way you want to install HighwayBot.').then(() => Input());
        }
    });
}

async function confirm() {
    await consolelog('', 'This installer has been created by HighwayBot team.' +
        '\nWe are not responsible for any damage caused by this installer in Pre-release Build' +
        '\nDo you want to continue? (Y / N)');
    let get = () => prompt.get(['confirm'], async (err, result) => {
        if (err) return;
        if (result.confirm.toLowerCase() === 'n' || result.confirm.toLowerCase() === 'no') {
            await consolelog('', '[X] Installer has been terminated.\n' +
                'Reason: You did not agree to the terms and conditions');
            await process.exit();
        } else if (result.confirm.toLowerCase() === 'y' || result.confirm.toLowerCase() === 'yes') {
            await consolelog('', 'Thank you for your cooperation.\n' +
                'Please wait for the installation process...');
            setTimeout(() => {
                require('./download');
            }, 5 * 1000);
        } else {
            await consolelog(color.code.red, '[X] Bad choice, Please confirm to install HighwayBot.').then(() => get());
        }
    });
    await get()
}

start()