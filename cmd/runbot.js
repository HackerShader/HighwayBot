const fs = require('fs')
const exec = require('child_process').exec
module.exports = {
    name: "runbot",
    description: "Execute HighwayBot main file",
    execute() {
        if (!fs.existsSync('./index.js')) return console.log('[X] HighwayBot not installed')
        exec('node index.js', (err, stdout, stderr) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log(stdout)
        })
    }
}