const mineflayer = require('mineflayer')
const mineflayernavigate = require('mineflayer-navigate')(mineflayer)
const pathfinder = require('mineflayer-pathfinder').pathfinder
const scaffold = require('mineflayer-scaffold')(mineflayer)
const config = require('./config.json')
const fs = require('fs')
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const mineflayerViewer = require('prismarine-viewer').mineflayer
const Discord = require('discord.js')
const { info } = require('console')
const client = new Discord.Client()
const Vec3 = require('vec3').Vec3;
client.commands = new Discord.Collection()
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
    inventoryViewer(bot, { port: config.invport})
    commandfiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
    let commands = []
    for (const val of commandfiles) {
        commands.push(val.replace('.js', ''))
    }
    bot.on('chat', async function (username, message) {
        const args = message.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (!commands.includes(command)) return;
        const torun = require(__dirname + '/commands/' + command + '.js')
        try {
            if (torun.run && !torun.execute) {
                torun.run(bot, message, args, username)
            } else {
                torun.execute(bot, message, args, username)
            }
        } catch (err) {
            console.log(err)
        }
        if (message === `${config.prefix}check`) {
            console.log(bot.blockAt(bot.entity.position.offset(2, -1, 0)))
        }
    })
    bot.on('kicked', kick => {
        console.log('Bot đã ngắt kết nối bới server. Lý do ' + kick.toString())
    })
    bot.on('end', (reason) => {
        console.log('Bot đã ngắt kết nối bới server. Lý do ' + reason)
        setTimeout(() => HighwayBot, 1000)
    })
    bot.on('spawn', spawn => {
        console.log('Bot spawn !')
    })
    bot.on('spawn', () => {
        mineflayerViewer(bot, { port: config.localport, firstPerson: true })
        
    })
}

HighwayBot()    