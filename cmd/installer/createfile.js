const fs = require('fs-extra');
const exec = require('child_process').exec;

console.log('\n------[Installation log]------');
console.log('\x1b[33m[Pending] Creating directory...\x1b[0m');

function createDir() {
    fs.mkdirSync('commands', {recursive: true});
    fs.mkdirSync('Core', {recursive: true});
    fs.mkdirSync('Core/console', {recursive: true});
    fs.mkdirSync('Core/HighwayTunnel', {recursive: true});
    fs.mkdirSync('Core/HighwayTunnel/break', {recursive: true});
    fs.mkdirSync('Core/HighwayTunnel/check', {recursive: true});
    fs.mkdirSync('Core/HighwayTunnel/inventory', {recursive: true});
    fs.mkdirSync('Core/HighwayTunnel/place', {recursive: true});
}

try {
    createDir();
} catch (err) {
    console.log(err);
}
console.log('\x1b[32m[Done] Directory created\x1b[0m');
console.log('\x1b[33m[Pending] Creating files...\x1b[0m');
fs.readdirSync('./cmd/installer/files').forEach(file => {
    require(`./files/${file}`);
    console.log(`\x1b[32m[File] [${file}] created\x1b[0m`);
});


async function CreatePackage() {
    console.log('\x1b[33m[Pending] Creating package.json...\x1b[0m');
    fs.writeFileSync('./package.json.new', '{\n' +
        '  "name": "highwaybot",\n' +
        '  "version": "Pre-build Development",\n' +
        '  "build": "",\n' +
        '  "description": "A different way to digging and building Highway Nether in every Anarchy server!",\n' +
        '  "main": "index.js",\n' +
        '  "scripts": {\n' +
        '    "test": "echo \\"Error: no test specified\\" && exit 1",\n' +
        '    "start": "node index.js",\n' +
        '    "nodemon": "nodemon index.js"\n' +
        '  },\n' +
        '  "author": "HackerShader#5959",\n' +
        '  "license": "ISC",\n' +
        '  "dependencies": {\n' +
        '    "ascii-table": "^0.0.9",\n' +
        '    "child_process": "^1.0.2",\n' +
        '    "edit-json-file": "^1.7.0",\n' +
        '    "fs-extra": "^10.1.0",\n' +
        '    "linebyline": "^1.3.0",\n' +
        '    "mathjs": "^10.4.3",\n' +
        '    "minecraft-data": "^3.5.1",\n' +
        '    "minecraft-protocol": "^1.34.0",\n' +
        '    "mineflayer": "^4.3.0",\n' +
        '    "mineflayer-auto-eat": "^2.3.3",\n' +
        '    "mineflayer-navigate": "0.0.10",\n' +
        '    "mineflayer-pathfinder": "^2.2.0",\n' +
        '    "mineflayer-tps": "^1.0.1",\n' +
        '    "mineflayer-web-inventory": "^1.7.1",\n' +
        '    "prismarine-viewer": "^1.22.0",\n' +
        '    "prompt": "^1.3.0",\n' +
        '    "vec3": "^0.1.7"\n' +
        '  }\n' +
        '}\n', 'utf8', (err) => {
        if (err) return console.log(err);
    });
    await console.log('\x1b[32m[Done] Installed default package.json\x1b[0m');
    await fs.unlinkSync('./package.json');
    await fs.renameSync('./package.json.new', './package.json');
    await console.log('\x1b[33m[Pending] Installing main dependencies...\x1b[0m');
    await exec('npm install', async (err, stdout) => {
        if (err) return console.log(err);
        console.log(stdout);
        await console.log('\x1b[32m[Done] HighwayBot installed. Please execute again controller to start the bot [node ./cmd.js]\x1b[0m');
    });
}

CreatePackage();