const prompt = require('prompt');
const exec = require('child_process').exec;
const editJsonFile = require('edit-json-file');
const fs = require('fs-extra');
//const consolelog = require('./../util/translate')
const color = require('./../util/colorcode')
const string = require('../../language/translate')

console.clear();
async function start() {
    console.log(string('cli.installer.prepair.choices'))
    console.log(string('cli.installer.prepair.choice_1'))
    console.log(string('cli.installer.prepair.choice_2'))
    console.log(string('cli.installer.prepair.choice_3'))
    console.log(string('cli.installer.prepair.choose'));
    prompt.start();
    await Input()
}

async function Input() {
    prompt.get(['method'], async (err, result) => {
        if (err) return;
        switch (result.method) {
            case '1':
                console.log(string('cli.installer.prepair.method_1.notification'));
                console.log(string('cli.installer.prepair.method_1.cloning'));
                async function cloner() {
                    exec('git clone https://github.com/HackerShader/HighwayBot', async (err) => {
                        if (err) return console.log(err);
                        console.log(string('cli.config.prepair.method_1.done'));
                        fs.copy('./HighwayBot', './');
                        fs.removeSync('./HighwayBot');
                        exec('git rev-parse HEAD', async (err, stdout) => {
                            if (err) return console.log(err);
                            const edit = editJsonFile('./package.json');
                            edit.set('build', `${stdout.substring(0, 7)}`);
                            edit.save();
                            console.log(string('cli.installer.prepair.method_1.relaunch'));
                            process.exit(0)
                        });
                    });
                }
                cloner();
                break;
            case '2':
                console.log(string('cli.installer.prepair.method_2.notification'));
                confirm();
                break
            case '3':
                console.log(string('cli.installer.prepair.method_3.exit'));
                process.exit(0);
                break
            default:
                if (!result.method) return Input();
                console.log(string('cli.installer.prepair.bad_choice'))
                Input()
                break;
        }
    });
}

async function confirm() {
    console.log(string('cli.installer.prepair.confirm.confirm'));
    let get = () => prompt.get(['confirm'], async (err, result) => {
        if (err) return;
        switch (result.confirm.toLowerCase()) {
            case 'n':
            case 'no':
                console.log(string('cli.installer.prepar.confirm.deny'));
                process.exit(0);
                break;
            case 'y':
            case 'yes':
                console.log(string('cli.installer.prepar.confirm.accept'));
                setTimeout(() => {
                    require('./download');
                }, 5 * 1000);
                break
            default:
                console.log(string('cli.installer.prepar.confirm.bad_choice'));
                get()
                break
        }
    });
    get()
}

start()