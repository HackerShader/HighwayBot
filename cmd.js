const prompt = require('prompt')
const fs = require('fs')
const package = require('./package.json')
const child_process = require('child_process').exec

console.log(`Welcome to HighwayBot controller\nHighwayBot version: ${package.version}\nType \'help\' to see a list of commands\n`)

function promptcallback() {
    prompt.start()
    prompt.get('commands', function (err, result) {
        if (err) return;
        if (result.commands === `help`) {
            console.log('List of commands:' +
                '\nCategory' +
                '\n\t| Miscellaneous:' +
                '\n\t| | clear - Clear console' +
                '\n\t| | help - Displays this help message' +
                '\n\t| | changelog - development log in this version' +
                '\n\t| | exit - Exit the program' +
                '\n\t| Setup:' +
                '\n\t| | install - Execute HighwayBot installer' +
                '\n\t| | repair - Repair the source code' +
                '\nSupport/Bugs Report ' +
                '\n\t| [Discord] https://discord.gg/YSZPRkKNzh' +
                '\n\t| [Github] https://github.com/HackerShader/HighwayBot/issues' +

                '')
            return promptcallback();
        }
        if (result.commands === `repair`) {
            console.log('Repairing HighwayBot...')
            return promptcallback();
        }
        if (result.commands === `changelog`) {
            console.log('Nothing to see here yet...')
            return promptcallback();
        }
        if (result.commands === `exit`) {
            console.log('Closed HighwayBot controller')
            return process.exit()
        }
        if (result.commands === `clear`) {
            console.clear()
            console.log('Cleared console')
            return promptcallback();
        }
        if (result.commands === `install`) {
            //console.log('Installing HighwayBot...')

            child_process('ls', (err, stdout, stderr) => {
                if (err) return;
                console.log(stdout + '\nPress "Enter" to continue...')
            });
            promptcallback();
        } else {
            return promptcallback();
        }
    })
}
promptcallback()