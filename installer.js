console.log(
    `[!] Welcome to HighwayBot Installer` + '\n' +
    `[!] Installing on: ${__dirname}\n`
);

run()

/**
 * @param {String} host 
 * @returns {Promise<true|NodeJS.ErrnoException>}
 */
async function resolve(host) {
    const dns = require('node:dns');
    return new Promise((resolve) => dns.resolve(host, (err) => {
        if (err) resolve(err) 
        else resolve(true)
    }))
}

/**
 * @param {String} text 
 * @param {Boolean} clear
 * @returns {void}
 */
function stdout(text, clear) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    return clear ? process.stdout.write(text) : console.log(text);
}

async function run() {
    if (await resolve('www.google.com') !== true && await resolve('www.nodejs.org') !== true) {
        console.log(
            '[!] You are not connected to the internet.' + '\n' +
            '[#] Please connect to the internet and try again.\n' +
            '[!] Exit after 10s'
        )
        await require('timers/promises').setTimeout(10 * 1000)
    } else countdown()
}

function countdown() {
    let i = 15;
    const countdownTimer = setInterval(function () {
        stdout(`[-] After ${i} seconds, the installer would run. If you don\'t want, just close this window or press Ctrl+C`, true)
        i = i - 1;
        if (i <= 0) {
            clearInterval(countdownTimer);
            install();
        }
    }, 1000);
}


function install() {
    const child_process = require('child_process');
    const list = ['axios', 'unzipper', 'fs-extra'];
    stdout(`[-] Preparing ${list.length} package(s)`, true);
    child_process.execSync(`npm install ${list.join(' ')}`);
    stdout(`[#] Installed ${list.length} package(s)`);
    download();
}

async function download() {
    stdout('[-] Downloading zip file', true)
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
    stdout('[-] Unzipping file', true);
    const fs = require('node:fs');
    const unzipper = require('unzipper');
    fs.createReadStream('./Highway-Bot.zip')
        .pipe(unzipper.Extract({ path: './' }))
        .once('close', () => {
            fs.rmSync('./Highway-Bot.zip');
            stdout('[#] Unzipped file');
            move();
        });
}

function move() {
    stdout('[-] Moving files', true);
    const fs = require('fs-extra');
    const reg = /^HackerShader-HighwayBot-(.+)$/;
    const dir = (fs.readdirSync('./')
        .filter(dir => fs.lstatSync(`./${dir}`).isDirectory() && reg.test(dir)))[0]
    fs.copySync(`./${dir}`, './', { overwrite: true });
    fs.removeSync(`./${dir}`);
    stdout('[#] Moved files');
    reinstall();
}

function reinstall() {
    const packages = Object.keys(require('./package.json').dependencies);
    stdout(`[-] Downloading ${packages.length} package(s)`, true);
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
    stdout('[-] Shut down after 10s', true);
    setTimeout(() => {
        stdout('[#] Shutting down...');
    }, 10000);
}