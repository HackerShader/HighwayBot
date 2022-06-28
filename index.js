const mineflayer = require('mineflayer')
const mineflayernavigate = require('mineflayer-navigate')(mineflayer)
const pathfinder = require('mineflayer-pathfinder').pathfinder
const config = require('./config.json')
const tpsPlugin = require('mineflayer-tps')(mineflayer)
//const mineflayerViewer = require('prismarine-viewer').mineflayer
const prefix = config.prefix
const inventoryViewer = require('mineflayer-web-inventory')



function HighwayBot() {
    const bot = mineflayer.createBot({
        username: "highwaybot",
        host: config.host,
        port: config.port,
        version: '1.12.2',
    })

    //Plugins loader
    bot.loadPlugin(pathfinder)
    bot.loadPlugin(tpsPlugin)
    mineflayernavigate(bot)

    inventoryViewer(bot, { port: config.invport })
    bot.on('windowOpen', async (window) => {
        const pin = config.pin
        window.requiresConfirmation = false;
        await bot.clickWindow(pin[0], 0, 0);
        await bot.clickWindow(pin[1], 0, 0);
        await bot.clickWindow(pin[2], 0, 0);
        await bot.clickWindow(pin[3], 0, 0);

        setTimeout(() => { bot.chat('/5s5m') }, 10*1000);

        setTimeout(() => { bot.clickWindow(13,0,0) }, 13*1000);
    })

    bot.on('chat', (username, message) => {
        if (!message.startsWith(config.prefix)) return;
        const args = message.slice(prefix.length).trim().split(' ');
        const cmd = args[0].toLowerCase();
        if(username !== config.username) return;

        //execute commands
        try {
            const command = require(`./commands/${cmd}.js`)
            command.execute(bot, message, args, username)
        } catch (err) {
            console.log(err)
        }
    })
    bot.on('kicked', kick => {
        console.log(`Disconnected. Reason: ${kick}`)
    })

    bot.on('end', (reason) => {
        console.log(`Disconnected. Reason: ${reason}`)
        setTimeout(() => HighwayBot(), 10000)
    })

    bot.on('spawn', () => {
        console.log('Bot spawn !')
        console.log(Math.round(bot.entity.position.x), Math.round(bot.entity.position.y), Math.round(bot.entity.position.z))
        // mineflayerViewer(bot, { port: config.localport, firstPerson: true })
    })

    bot.on('message', msg => {
        console.log(msg.toString());
    });


}
HighwayBot()
// require('./cmd')()