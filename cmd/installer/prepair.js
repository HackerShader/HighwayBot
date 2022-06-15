const prompt = require('prompt');

console.log(`Welcome to HighwayBot installer!\nThis installer will help you to install HighwayBot on your computer. We will need some information to proceed.`);
prompt.start();
console.log('This HighwayBot still in development. There\'re 2 ways to install HighwayBot:\n1. Install HighwayBot from the official GitHub repository (Only for developers) (Require \'git\')\n2. Install HighwayBot from the release installer (Recommended for users)\n\nPlease choose the way you want to install HighwayBot:');
function Input() {
    prompt.get(['method'], (err, result) => {
        if (err) return;
        if (result.method === '1') {
            console.log('You choose to install HighwayBot from the official GitHub repository.\nPlease wait while we are downloading the repository...');
            return require('./../update/update');
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
