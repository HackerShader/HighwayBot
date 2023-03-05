const string = require('../language/translate');
const info = require('./../package.json');
const axios = require('axios').default;
const fs = require('fs-extra');
const unzipper = require('unzipper');

module.exports = {
    name: "update",
    description: string('cli.update.description'),
    aliases: ['up'],
    async execute() {
        async function stdout(text) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(text);
        }


        async function download(res) {
            const zip = await axios({
                url: res.data.zipball_url,
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
                },
                responseType: 'stream'
            });
            await stdout(string('cli._update.update_release.downloading'));
            zip.data.pipe(fs.createWriteStream('./Highway-Bot.zip'));
            zip.data.once('end', () => {
                stdout(string('cli._update.update_release.download_done'));
                unzip();
            });
        }

        function unzip() {
            stdout(string('cli._update.update_release.unzipping'));
            fs.createReadStream('./Highway-Bot.zip')
                .pipe(unzipper.Extract({path: './'}))
                .once('close', () => {
                    fs.rmSync('./Highway-Bot.zip');
                    stdout(string('cli._update.update_release.unzip_done'));
                    move();
                });
        }

        function move() {
            stdout(string('cli._update.update_release.moving'));
            const reg = /^HackerShader-HighwayBot-(.+)$/;
            let stop = false;
            fs.readdirSync('./')
                .filter(dir => fs.lstatSync(`./${dir}`).isDirectory())
                .forEach((file) => {
                    if (stop === true) return;
                    if (reg.test(file)) {
                        stop = true;
                        const dir = reg.exec(file)[0];
                        fs.copySync(`./${dir}`, './', {overwrite: true});
                        fs.removeSync(`./${dir}`);
                        const package_json = require('edit-json-file')('./package.json', {autosave: true});
                        package_json.set('tag', process.env.tag);
                        stdout(string('cli._update.update_release.move_done'));
                        reinstall();
                    }
                });
        }

        function reinstall() {
            const packages = Object.keys(require('./package.json').dependencies);
            stdout(string('cli._update.update_release.downloading_package', packages.length));
            const child_process = require('child_process');
            const exec = child_process.exec('npm install');
            exec.on('exit', () => {
                stdout(string('cli._update.update_release.download_package_done'));
                remove_temp();
            });

            function remove_temp() {
                const fs = require('node:fs');
                if (fs.existsSync('./installer.js')) fs.unlinkSync('./installer.js');
                if (fs.existsSync('./installer.bat')) fs.unlinkSync('./installer.bat');
                if (fs.existsSync('./installer.sh')) fs.unlinkSync('./installer.sh');
                stdout(string('cli._update.update_release.remove_temp'));
                restart();
            }

            function restart() {
                stdout(string('cli._update.update_release.restart_timer'));
                setTimeout(() => {
                    stdout(string('cli._update.update_release.shut_down'));
                    process.exit(0);
                }, 10000);
            }


            if (!info.build) return console.log('HighwayBot not installed');
            stdout('[Updater] Checking for update');
            const res = await axios({
                url: 'https://api.github.com/repos/HackerShader/HighwayBot/releases/latest',
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
                }
            });

            const tag_name = res.data.tag_name;
            if (tag_name === info.build) return stdout('Already latest version');
            await stdout(`Found new update ${tag_name}\n`);
            await download(res);
        }
    }
};