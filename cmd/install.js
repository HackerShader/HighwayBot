const exec = require('child_process').exec;
module.exports = {
    name: "install",
    description: "Executes the installaion file for the bot",
    exec() {
        exec('node ./cmd/installer/createfile.js', (err, stdout, stderr) => {
            if (err) return;
            console.log(stdout);
        });
    }
}