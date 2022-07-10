//Packages
const mineflayer = require('mineflayer');
const mineflayernavigate = require('mineflayer-navigate')(mineflayer);
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const config = require(`./config/${require('./path.json').config}`);
const tpsPlugin = require('mineflayer-tps')(mineflayer);
const prefix = config.prefix;
const inventoryViewer = require('mineflayer-web-inventory');
const autoeat = require("mineflayer-auto-eat");
const fs = require('fs-extra');

console.log(`HighwayBot is starting, please wait...` +
    `\nPrefix: ${prefix}` +
    `\nAvailable commands: ${prefix}mine, ${prefix}infoserver, ${prefix}inventory, ${prefix}reload`);
function HighwayBot() {
    const bot = mineflayer.createBot({
        username: 'highwaybot',
        host: config.host,
        port: config.port,
        version: config.version,
    });

    //Plugins loader
    bot.loadPlugin(pathfinder);
    bot.loadPlugin(tpsPlugin);
    bot.loadPlugin(autoeat);
    mineflayernavigate(bot);
    inventoryViewer(bot, { port: config.invport });

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

    bot.once('spawn', () => {
        console.log('Bot spawn !');
        fs.readdirSync('./Core/Player').forEach(folder => {
            fs.readdirSync(`./Core/Player/${folder}`).forEach(file => {
                if (!file.endsWith('.js')) return;
                require(`./Core/Player/${folder}/${file}`)(bot);
            });
        });
        console.log('Position of bot: ' + Math.round(bot.entity.position.x), Math.round(bot.entity.position.y), Math.round(bot.entity.position.z));
    });

    bot.on('message', msg => {
        console.log(msg.toString());
    });
}

HighwayBot();
