function stdout(text) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(text);
}
function install() {
    const child_process = require('child_process');
    const list = ['axios', 'unzipper', 'fs-extra'];
    stdout(`[-] Preparing ${list.length} package(s)`)
    child_process.execSync(`npm install ${list.join(' ')}`);
    download();
}


async function download() {
    stdout('[-] Downloading zip file')
    const axios = require('axios').default
    const fs = require('node:fs')
    const res = await axios({
        url: 'https://api.github.com/repos/HackerShader/HighwayBot/releases/latest',
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
        }
    })
    const zip = await axios({
        url: res.data.zipball_url,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
        },
        responseType: 'stream'
    })
    zip.data.pipe(fs.createWriteStream('./Highway-Bot.zip'));
    zip.data.once('end', () => {
        stdout('[#] Downloaded zip file')
        unzip()
    })
}

function unzip() {
    stdout('[-] Unzipping file');
    const fs = require('node:fs');
    const unzipper = require('unzipper');
    fs.createReadStream('./Highway-Bot.zip')
        .pipe(unzipper.Extract({path: './'}))
        .once('close', () => {
            fs.rmSync('./Highway-Bot.zip');
            stdout('[#] Unzipped file');
            move();
        });
}

function move() {
    stdout('[-] Moving files');
    const fs = require('fs-extra');
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
                stdout('[#] Moved files');
                reinstall();
            }
        });
}

function reinstall() {
    const packages = Object.keys(require('./package.json').dependencies);
    stdout(`[-] Downloading ${packages.length} package(s)`);
    const child_process = require('child_process');
    const exec = child_process.exec('npm install');
    exec.on('exit', () => {
        stdout('[#] Downloaded package(s)');
        delete_temp();
    });
}

function delete_temp() {
    const fs = require('node:fs');
    if (fs.existsSync('./installer.js')) fs.unlinkSync('./installer.js');
    if (fs.existsSync('./installer.bat')) fs.unlinkSync('./installer.bat');
    if (fs.existsSync('./installer.sh')) fs.unlinkSync('./installer.sh');
    stdout('[#] Removed temporary file.');
    restart();
}

function restart() {
    stdout('[-] Shut down after 10s');
    setTimeout(() => {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log('[#] Shutting down...');
        process.exit(0);
    }, 10000);
}

function countdown() {
    let i = 15;
    console.log('[!] Welcome to HighwayBot Installer\n');
    const countdownTimer = setInterval(async function () {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`[-] After ${i} seconds, the installer would run. If you don\'t want, just close this window or press Ctrl+C`);
        i = i - 1;
        if (i <= 0) {
            clearInterval(countdownTimer);
            await install();
        }
    }, 1000);
}

const dns = require('node:dns');
dns.resolve('www.google.com', (err) => {
    if (err) return console.log('[!] You are not connected to the internet.\n[#] Please connect to the internet and try again.');
    else {
        const version = {
            current: /^(.+).(.+).(.+)$/.exec(process.version),
            recommended: ['v16', 'v18', 'v19']
        };

        if (!version.recommended.includes(version.current[1])) console.log('\n[!] Please use the latest version of NodeJS for best experience.\n');
        countdown();
    }
});

