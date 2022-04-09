const mineflayer = require('mineflayer')
const mineflayernavigate = require('mineflayer-navigate')(mineflayer)
const pathfinder = require('mineflayer-pathfinder').pathfinder
const scaffold = require('mineflayer-scaffold')(mineflayer)
const config = require('./config.json')
const fs = require('fs')
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const mineflayerViewer = require('prismarine-viewer').mineflayer
const { info } = require('console')
const Vec3 = require('vec3').Vec3;
const minecraft = require('minecraft-server-util')
const prefix = config.prefix
const inventoryViewer = require('mineflayer-web-inventory')

function HighwayBot() {

    const bot = mineflayer.createBot({
        username: "highwaybot",
        port: config.port,
        host: "localhost",
        version: '1.12.2'
    })

    bot.loadPlugin(pathfinder)
    bot.loadPlugin(tpsPlugin)
    mineflayernavigate(bot)
    scaffold(bot)
    inventoryViewer(bot, { port: 4000})
    
    commandfiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
    let commands = []
    for (const val of commandfiles) {
        commands.push(val.replace('.js', ''))
    }
    
    bot.on('chat', async (username, message) => {
        if(!message.startsWith(config.prefix)) return
        const args = message.slice(prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        if (!require(`./commands/${cmd}.js`)) return;
        const command = require(`./commands/${cmd}.js`)
        try {
            command.execute(bot, message, args, username)
        } catch (err) {
            console.log(err)
        }
    })
    bot.on('kicked', kick => {
        console.log('Bot đã ngắt kết nối bới server. Lý do ' + kick.toString())
    })
    bot.on('end', (reason) => {
        console.log('Bot đã ngắt kết nối bới server. Lý do ' + reason)
        setTimeout(() => HighwayBot(), 1000)
    })
    bot.on('spawn', spawn => {
        console.log('Bot spawn !')
    })
    bot.on('spawn', () => {
        mineflayerViewer(bot, { port: 3000, firstPerson: true })
    })
}

HighwayBot()  
