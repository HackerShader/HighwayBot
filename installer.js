const yarn = (() => {
    const child_process = require('child_process')
    const list = child_process.execSync('npm list -g yarn').toString('utf8').split('\n').slice(1, -2)[0]
    return /^(└──|`--) (.+)@(.+)$/.test(list)
})()

function install() {
    const child_process = require('child_process')
    const list = ['axios', 'unzipper', 'fs-extra']
    process.stdout.write(`[-] Downloading ${list.length} package(s)`)
    child_process.execSync(`${yarn == true ? 'yarn add' : 'npm install'} ${list.join(' ')}`)
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log('[#] Downloaded package(s)')
    download()
}

async function download() {
    process.stdout.write('[-] Downloading zip file')
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
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        console.log('[#] Downloaded zip file')
        unzip()
    })
}

async function unzip() {
    process.stdout.write('[-] Unzipping file')
    const fs = require('node:fs')
    const unzipper = require('unzipper')
    fs.createReadStream('./Highway-Bot.zip')
        .pipe(unzipper.Extract({ path: './' }))
        .once('close', () => {
            fs.rmSync('./Highway-Bot.zip')
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            console.log('[#] Unzipped file')
            move()
        })
}

async function move() {
    process.stdout.write('[-] Moving files')
    const fs = require('fs-extra')
    const reg = /^HackerShader-HighwayBot-(.+)$/
    let stop = false;
    fs.readdirSync('./')
        .filter(dir => fs.lstatSync(`./${dir}`).isDirectory())
        .forEach((file) => {
            if (stop == true) return
            if (reg.test(file)) {
                stop = true
                const dir = reg.exec(file)[0]
                fs.copySync(`./${dir}`, './', { overwrite: true })
                fs.removeSync(`./${dir}`)
                process.stdout.clearLine()
                process.stdout.cursorTo(0)
                console.log('[#] Moved files')
                reinstall()
            }
        })
}

async function reinstall() {
    const packages = Object.keys(require('./package.json').dependencies)
    process.stdout.write(`[-] Downloading ${packages.length} package(s)`)
    const child_process = require('child_process')
    const exce = child_process.exec(yarn == true ? 'yarn' : 'npm install')
    exce.on('exit', () => {
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        console.log('[#] Downloaded package(s)')
        delete_temp()
    })
}

async function delete_temp () {
    const fs = require('node:fs')
    if (fs.existsSync('./installer.js')) fs.unlinkSync('./installer.js')
    if (fs.existsSync('./installer.bat')) fs.unlinkSync('./installer.bat')
    if (fs.existsSync('./installer.sh')) fs.unlinkSync('./installer.sh')
    console.log('[#] Removed temporary file.')
    restart()
}

async function restart() {
    process.stdout.write('[-] Shutt down after 5s')
    setTimeout(() => {
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        console.log('[#] Shutting down...')
        process.exit(0)
    })
}

const dns = require('node:dns')
dns.resolve('www.google.com', (err) => {
    if (err) return console.log('[!] You are not connected to the internet.\n[#] Please connect to the internet and try again.')
    else {
        const version = {
            current: /^(.+).(.+).(.+)$/.exec(process.version),
            recommended: ['16', '18']
        }
        if (!version.recommended.includes(version.current)) console.log('[!] Please use NodeJS version 18 for best experience.')
        install()
    }
})
