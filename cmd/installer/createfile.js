const fs = require('fs-extra')
const exec = require('child_process').exec

console.log('\n------[Installation log]------')
console.log('[Pending] Creating directory...')

function createDir() {
    fs.mkdirSync('commands', {recursive: true})
    fs.mkdirSync('util', {recursive: true})
    fs.mkdirSync('util/HighwayTunnel', {recursive: true})
    fs.mkdirSync('util/HighwayTunnel/break', {recursive: true})
    fs.mkdirSync('util/console', {recursive: true})
}

try {
    createDir()
} catch (err) {
    console.log(err)
}
console.log('[Done] Directory created')
console.log('[Pending] Creating files...')
fs.readdirSync('./cmd/installer/files').forEach(file => {
    require(`./files/${file}`)
    console.log(`[File] [${file}] created`)
})



async function CreatePackage() {
    console.log('[Pending] Creating package.json...')
    fs.writeFileSync('./package.json.new', '{\n' +
        '  "name": "highwaybot",\n' +
        '  "version": "pre-build develoment",\n' +
        '  "build": "",\n' +
        '  "description": "HighwayBot for 2y2c.org",\n' +
        '  "main": "index.js",\n' +
        '  "scripts": {\n' +
        '    "test": "echo \\"Error: no test specified\\" && exit 1",\n' +
        '    "start": "node index.js",\n' +
        '    "nodemon": "nodemon index.js"\n' +
        '  },\n' +
        '  "author": "HackerShader#5959",\n' +
        '  "license": "ISC",\n' +
        '  "dependencies": {\n' +
        '    "child_process": "^1.0.2",\n' +
        '    "discord.js": "^12.5.3",\n' +
        '    "edit-json-file": "^1.7.0",\n' +
        '    "fs": "^0.0.1-security",\n' +
        '    "linebyline": "^1.3.0",\n' +
        '    "mathjs": "^10.4.3",\n' +
        '    "minecraft-data": "^2.86.0",\n' +
        '    "minecraft-protocol": "^1.34.0",\n' +
        '    "minecraft-server-util": "^5.2.9",\n' +
        '    "mineflayer": "^4.2.0",\n' +
        '    "mineflayer-autocrystal": "^0.7.0",\n' +
        '    "mineflayer-navigate": "0.0.10",\n' +
        '    "mineflayer-pathfinder": "^1.9.1",\n' +
        '    "mineflayer-tool": "^1.1.0",\n' +
        '    "mineflayer-tps": "^1.0.1",\n' +
        '    "mineflayer-web-inventory": "^1.7.1",\n' +
        '    "prismarine-viewer": "^1.22.0",\n' +
        '    "prompt": "^1.3.0",\n' +
        '    "vec3": "^0.1.7"\n' +
        '  }\n' +
        '}', 'utf8', async (err) => {
        if (err) return console.log(err);
    })
    await console.log('[Done] Installed default package.json')
    await fs.unlinkSync('./package.json')
    await fs.renameSync('./package.json.new', './package.json')
    await console.log('[Pending] Installing main dependencies...')
    await exec('npm install package.json', async (err, stdout, stderr) => {
        if (err) return console.log(err);
        console.log(stdout)
        await console.log('[Done] HighwayBot installed. Please execute again controller to start the bot')

    })
}

CreatePackage()


