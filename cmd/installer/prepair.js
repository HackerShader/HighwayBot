const prompt = require('prompt');
const exec = require('child_process').exec;
const editJsonFile = require('edit-json-file')
const fs = require('fs-extra')

console.log(`Welcome to HighwayBot installer!\nThis installer will help you to install HighwayBot on your computer. We will need some information to proceed.`);
prompt.start();
console.log('This HighwayBot still in development. There\'re 2 ways to install HighwayBot:\n1. Install HighwayBot from the official GitHub repository (Only for developers) (Require \'git\')\n2. Install HighwayBot from the release installer (Recommended for users)\n\nPlease choose the way you want to install HighwayBot:');
function Input() {
    prompt.get(['method'], (err, result) => {
        if (err) return;
        if (result.method === '1') {
            console.log('You choose to install HighwayBot from the official GitHub repository.\nPlease wait while we are downloading the repository...');
            async function clonerepo() {
                await console.log('[Pending] Cloning the repository...');
                await exec('git clone https://github.com/HackerShader/HighwayBot', async (err, stdout, stderr) => {
                    if (err) return console.log(err);
                    await console.log("[Done] Cloned the HighwayBot repository")  
                    await fs.copy('./HighwayBot', './')
                    await fs.removeSync('./HighwayBot')
                    await exec('git rev-parse HEAD', async (err, stdout, stderr) => {
                        if (err) return console.log(err);
                        await console.log('[Notification] Please launch the bot again to apply the changes [node ./cmd.js]')
                        const edit = editJsonFile('./package.json')
                        edit.set('build', `${stdout.substring(0, 7)}`)
                        edit.save()            
                    })
                })
            }
            return clonerepo();
        }
        if (result.method === '2') {
            console.log('You choose to install HighwayBot from the release installer.');
            return privacyandtermcondition();
        } else {
            console.log('Please choose the way you want to install HighwayBot.');
            return Input();
        }

    })
    function privacyandtermcondition() {
        console.log('This installer has been created by HighwayBot team.\nWe are not responsible for any damage caused by this installer in pre-build development.\nDo you want to continue? (Y/N)');
        prompt.get(['confirm'], (err, result) => {
            if (err) return;
            if (result.confirm.toLowerCase() === 'y' || result.confirm.toLowerCase() === 'yes') {
                console.log('Thank you for your cooperation.\nPlease wait for the installation process...');
                setTimeout(() => {
                    require('./createfile')
                }, 3000)
            } else {
                console.log('[X] Installer has been terminated. Reason: You did not agree to the terms and conditions.');
                process.exit()
            }
        })
    }
}
Input();
