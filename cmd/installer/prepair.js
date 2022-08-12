const prompt = require('prompt');
const exec = require('child_process').exec;
const editJsonFile = require('edit-json-file');
const fs = require('fs-extra');

console.clear();
console.log(`Welcome to HighwayBot installer!` +
    `\nThis installer will help you to install HighwayBot on your computer. We will need some information to proceed.`);

prompt.start();
console.log('This HighwayBot still in development. There\'ll 2 ways to install HighwayBot:\n' +
    '\x1b[33m' + '\n1. Install HighwayBot from the official GitHub repository (Only for developers) (Require \'git\')' + '\x1b[0m' +
    '\x1b[34m' + '\n2. Install HighwayBot from the release page (Recommended for users)' + '\x1b[0m' +
    '\x1b[31m' + '\n3. Cancel the installation\n' + '\x1b[0m' +
    '\nPlease choose the way you want to install HighwayBot.');

async function Input() {
    prompt.get(['method'], async (err, result) => {
        if (err) return;
        if (result.method === '1') {
            await console.log('You choose to install HighwayBot from the official GitHub repository.\nPlease wait while we are downloading the repository...');

            async function cloner() {
                await exec('git clone https://github.com/HackerShader/HighwayBot', async (err) => {
                    await console.log('\x1b[33m[Pending] Cloning the repository...\x1b[0m');
                    if (err) return console.log(err);
                    await console.log("\x1b[32m[Done] Cloned the HighwayBot repository\x1b[0m");
                    await fs.copy('./HighwayBot', './');
                    await fs.removeSync('./HighwayBot');
                    await exec('git rev-parse HEAD', async (err, stdout) => {
                        if (err) return console.log(err);
                        await console.log('\x1b[33m' + '[Notification] Please launch the bot again to apply the changes [node ./cmd.js]' + '\x1b[0m');
                        const edit = editJsonFile('./package.json');
                        edit.set('build', `${stdout.substring(0, 7)}`);
                        edit.save();
                    });
                });
            }

            return cloner();
        }
        if (result.method === '2') {
            console.log('You choose to install HighwayBot from the release installer.');
            return confirm();
        }
        if (result.method === '3') {
            console.log('\x1b[31m' + '[X] Exited the Installation' + '\x1b[0m');
            process.exit(0);
        } else {
            if (!result.method) return Input();
            console.log('\x1b[31m' + '[X] Bad choice, Please choose the way you want to install HighwayBot.' + '\x1b[0m');
            return Input();
        }
    });

    function confirm() {
        console.log('This installer has been created by HighwayBot team.' +
            '\nWe are not responsible for any damage caused by this installer in Pre-release Build' +
            '\nDo you want to continue? (Y / N)');
        prompt.get(['confirm'], (err, result) => {
            if (err) return;
            if (result.confirm.toLowerCase() === 'n' || result.confirm.toLowerCase() === 'no') {
                console.log('\x1b[31m[X] Installer has been terminated.\x1b[33m\nReason: You did not agree to the terms and conditions.\x1b[0m');
                process.exit();
            } else {
                console.log('Thank you for your cooperation.\nPlease wait for the installation process...');
                setTimeout(() => {
                    require('./download');
                }, 5 * 1000);
            }
        });
    }
}

Input();
