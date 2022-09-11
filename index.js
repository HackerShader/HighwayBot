const consolelog = require('./cli/util/translate')
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
if (miss == true) consolelog(color.code.yellow, '[MC-Bot | Install] Please type \'install\' for full bot installation');

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

if (!fs.existsSync('./settings.json')) consolelog(color.code.red, `[MC-Bot | Error] Can't find file [path.json]`);

if (!fs.existsSync(`./config/${require('./settings.json').config}`)) consolelog(color.code.red,`[MC-Bot | Error] Can\'t find config files [config/${require('./settings.json').config}]`);

delete require.cache[require.resolve(`./config/${require('./settings.json').config}`)];
const mineflayer = require('mineflayer');
const mineflayernavigate = require('mineflayer-navigate')(mineflayer);
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const config = require(`./config/${require('./settings.json').config}`);
const tpsPlugin = require('mineflayer-tps')(mineflayer);
const prefix = config.prefix;
const inventoryViewer = require('mineflayer-web-inventory');


console.log(`   Launching...` +
    `\n             Version: ${require('./package.json').version}` +
    `\n             Prefix: ${prefix}` +
    `\n             Server: ${config.ip}:${config.port}` +
    `\n             Owner: ${config.username}` +
    `\n             Bot username: highwaybot` +
    `\n             Inventory: http://localhost:${config.invport}`
);

function HighwayBot() {
    const bot = mineflayer.createBot({
        username: "highwaybot",
        host: config.ip,
        port: config.port,
        version: '1.16.5',
    });

    //Plugins loader
    bot.loadPlugin(pathfinder);
    bot.loadPlugin(tpsPlugin);
    mineflayernavigate(bot);
    inventoryViewer(bot, {port: config.invport});

    //advanced login
    bot.on('windowOpen', async (window) => {
        const pin = config.pin;
        window.requiresConfirmation = false;
        await bot.clickWindow(pin[0], 0, 0);
        await bot.clickWindow(pin[1], 0, 0);
        await bot.clickWindow(pin[2], 0, 0);
        await bot.clickWindow(pin[3], 0, 0);

        setTimeout(() => {
            bot.chat('/cli');
        }, 5 * 1000);

        setTimeout(() => {
            bot.clickWindow(0, 0, 0);
        }, 6 * 1000);
    });

    bot.on('chat', (username, message) => {
        if (!message.startsWith(config.prefix)) return;
        const args = message.slice(prefix.length).trim().split(' ');
        const cmd = args[0].toLowerCase();
        if (username !== config.username) return;

        //execute commands
        try {
            const command = require(`./commands/${cmd}.js`);
            command.execute(bot, message, args, username);
        } catch (err) {
            console.log(err);
        }
    });
    bot.on('kicked', kick => {
        console.log(`Disconnected. Reason: ${kick}`);
    });

    bot.on('end', (reason) => {
        console.log(`Disconnected. Reason: ${reason}`);
        setTimeout(() => HighwayBot(), 10000);
    });

    bot.on('spawn', () => {
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
