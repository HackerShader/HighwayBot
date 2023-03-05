const notifier = require('node-notifier');
//const consolelog = require('./cli/util/translate')
const package_json = require('./package.json');
const dependencies_array = [
    "mineflayer",
    "minecraft-data",
    "mineflayer-navigate",
    "mineflayer-pathfinder",
    "mineflayer-tps",
    "mineflayer-web-inventory",
    "vec3"
];

let miss = false;
const color = require('./cli/util/colorcode');
dependencies_array.forEach(str => {
    if (!Object.keys(package_json.dependencies).includes(str)) {
        console.log(color.code.red, `[MC-Bot | Error] Missing dependencies '${str}'`);
        miss = true;
    }
});
if (miss === true) console.log(color.code.yellow, '[MC-Bot | Install] Please type \'install\' for full bot installation');

const fs = require('fs-extra');
if (!fs.existsSync('./data/status.json')) {
    fs.mkdirSync('./data');
    fs.writeFileSync('./data/status.json', JSON.stringify({
        stop: 'true',
        mine: Number(0),
        place: Number(0),
        timer: "0",
        "place-err": Number(0)
    }));
}

if (!fs.existsSync('./settings.json')) console.log(color.code.red, `[MC-Bot | Error] Can't find file [settings.json]`);

if (!fs.existsSync(`./config/${require('./settings.json').config}`)) console.log(color.code.red,`[MC-Bot | Error] Can\'t find config files [config/${require('./settings.json').config}]`);

delete require.cache[require.resolve(`./config/${require('./settings.json').config}`)];
const mineflayer = require('mineflayer');
const mineflayernavigate = require('mineflayer-navigate')(mineflayer);
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const config = require(`./config/${require('./settings.json').config}`);
const tpsPlugin = require('mineflayer-tps')(mineflayer);
const prefix = config.general.ingameprefix;
const inventoryViewer = require('mineflayer-web-inventory');

function notifierbox(title, description) {
    notifier.notify({
        title: title,
        icon: __dirname + './cli/util/logo.png',
        message: description,
        wait: true,
        appIcon: __dirname + './cli/util/logo.png',
        appID: "HighwayBot"
    });
}

console.log(`[HighwayBot] Launching...` +
    `\n             Version: ${require('./package.json').version}` +
    `\n             Prefix: ${prefix}` +
    `\n             Server: ${config.hostinfo.hostname}:${config.hostinfo.port}` +
    `\n             Owner: ${config.general.owner}` +
    `\n             Bot username: highwaybot` +
    `\n             Inventory: http://localhost:${config.hostinfo.inventoryviewerport}`
);

function HighwayBot() {
    const bot = mineflayer.createBot({
        username: config.general.botusername,
        host: config.hostinfo.hostname,
        port: config.hostinfo.port,
        version: '1.12.2',
    });

    //Plugins loader
    bot.loadPlugin(pathfinder);
    bot.loadPlugin(tpsPlugin);
    mineflayernavigate(bot);
    inventoryViewer(bot, {port: config.invport});

    bot.on('chat', (username, message) => {
        if (!message.startsWith(config.general.ingameprefix)) return;
        const args = message.slice(prefix.length).trim().split(' ');
        const cmd = args[0].toLowerCase();
        if (username !== config.general.owner) return;

        //execute commands
        try {
            const command = require(`./commands/${cmd}.js`);
            command.execute(bot, message, args, username);
        } catch (err) {
            console.log(err)
        }
    });
    bot.on('kicked', kick => {
        notifierbox('Disconnected by server', `${kick}`)
        console.log(`Disconnected. Reason: ${kick}`);
    });

    bot.on('end', (reason) => {
        notifierbox('Disconnected', `${reason}`)
        console.log(`Disconnected. Reason: ${reason}`);
        setTimeout(() => HighwayBot(), 10000);
    });

    //module loader
    bot.on('spawn', () => {
        notifierbox('Connected', `${config.hostinfo.hostname}`)
        console.log('Bot spawn !');
        console.log('Position of bot:' + Math.round(bot.entity.position.x), Math.round(bot.entity.position.y), Math.round(bot.entity.position.z));
        fs.readdirSync('./Core/Player').forEach(folder => {
            fs.readdirSync(`./Core/Player/${folder}`).forEach(file => {
                if (!file.endsWith('.js')) return;
                require(`./Core/Player/${folder}/${file}`)(bot);
            });
        });
    });

    bot.on('message', msg => {
        console.log(msg.toString());
    });

}

HighwayBot();
