const prompt = require('prompt');

console.log(`Welcome to HighwayBot installer!\nThis installer will help you to install HighwayBot on your computer. We will need some information to proceed.`);
prompt.start();
console.log('This HighwayBot still in development. Please using the key access to install.');
function Input() {
    prompt.get(['key'], (err, result) => {
        if (err) return;
        if (result.key !== `0`) {
            console.log(`X | Key Access: Invalid key. please try again.`);
            Input()
        } else privacyandtermcondition()
    })
    function privacyandtermcondition() {
        console.log('This installer has been created by HighwayBot team.\nWe are not responsible for any damage caused by this installer in pre-build develoment.\nDo you want to continue? (Y/N)');
        prompt.get(['confirm'], (err, result) => {
            if (err) return;
            if (result.confirm.toLowerCase() === 'y' || result.confirm.toLowerCase() === 'yes') {
                console.log('Thank you for your cooperation.\nPlease wait for the installation process...');
                require('./createfile')
            } else {
                console.log('X | Installer has been terminated. Reason: You did not agree to the terms and conditions.');
                process.exit()
            }
        })
    }
}
Input();
