const mineflayer = require('mineflayer')
const mineflayernavigate = require('mineflayer-navigate')(mineflayer)
const pathfinder = require('mineflayer-pathfinder').pathfinder
const scaffold = require('mineflayer-scaffold')(mineflayer)
const tool = require('mineflayer-tool')
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals
const config = require('./config.json')
const fs = require('fs')
const Discord = require('discord.js')
const { info } = require('console')
const client = new Discord.Client()
const Vec3 = require('vec3').Vec3;
client.commands = new Discord.Collection()
let stop = Boolean
const prefix = config.prefix

function HighwayBot() {

    const bot = mineflayer.createBot({
        username: "highwaybot",
        port: config.port,
        host: "localhost",
        version: '1.12.2'
    })

    bot.loadPlugin(pathfinder)
    mineflayernavigate(bot)
    scaffold(bot)

    commandfiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
    let commands = []
    bot.on('spawn', spawn => {
        console.log('Bot spawn !')
    })
    for (const val of commandfiles) {
        commands.push(val.replace('.js', ''))
    }
    bot.on('chat', async function (username, message) {
        const args = message.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (!commands.includes(command)) return;
        const torun = require(__dirname + '/commands/' + command + '.js')
        torun.execute(bot, message, args, username)













        /*
        if (message === `${config.prefix}baritone`) {
            const mcData = require('minecraft-data')(bot.version)
            const defaultMove = new Movements(bot, mcData)
            if (username === bot.username) return
            const target = bot.players[username] ? bot.players[username].entity : null
            function pathfinder() {
                const p = target.position
                bot.chat(`/msg ${username} I see you, Coord: ${(p.x).toFixed(0)}, ${(p.y).toFixed(0)}, ${(p.z).toFixed(0)}`)
                bot.pathfinder.setMovements(defaultMove)
                bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))
                const positionrolate = new Vec3(p.x, p.y, p.z)
                bot.lookAt(positionrolate)
            }
            if (!target) {
                bot.chat('I don\'t see you !')
                return
            } else pathfinder()

            */


        if (message == `${config.prefix}stopmine`) {
            stop = true
            bot.chat('🛑 | Sẽ dừng lại tại vòng lặp tiếp theo')
        } else if (message === `${config.prefix}check`) {
            console.log(bot.blockAt(bot.entity.position.offset(2, -1, 0)))
        } else if (message === `${config.prefix}inv`) {
            bot.inventory.slots.forEach((d) => console.log(d))
        }
    })
    bot.on('kicked', kick => {
        console.log(`I got kicked, reason: ${kick.toString()}`)
    })
    bot.on('end', (reason) => {
        console.log('Bot đã ngắt kết nối bới server. Lý do ' + reason)
        setTimeout(() => HighwayBot, 1000)
    })
}

HighwayBot()