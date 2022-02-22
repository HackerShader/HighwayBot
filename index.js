//Package Collection
const mineflayer = require('mineflayer')
const mineflayernavigate = require('mineflayer-navigate')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const scaffold = require('mineflayer-scaffold')
const tool = require('mineflayer-tool')
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals
const config = require('./config.json')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const Vec3 = require('vec3').Vec3;
client.commands = new Discord.Collection()

function HighwayBot() {

    const bot = mineflayer.createBot({
        username: "highwaybot",
        port: 60721,
        host: "localhost",
        version: '1.12.2'
    })
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once) {
            bot.once(event.name, (...args) => event.execute(...args));
        } else {
            bot.on(event.name, (...args) => event.execute(...args));
        }
    }
    bot.loadPlugin(pathfinder)
    
    bot.on('spawn', spawn => {
        
        const mcData = require('minecraft-data')(bot.version)

        const defaultMove = new Movements(bot, mcData)

        bot.on('chat', function (username, message) {

            if (username === bot.username) return

            const target = bot.players[username] ? bot.players[username].entity : null
            if (message === `${config.prefix}come`) {

                function move() {
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
                } else move()

            }
            

            if (message === `${config.prefix}highway`) {
                const p = bot.entity.position
                const digrolate = new Vec3(p.x + 2, p.y + 3, p.z - 2.5)
                for (var i = 0; i <= 5; i++) {
                    bot.lookAt(digrolate)
                }
            }
            

       })
    })
    bot.on('kicked', kick => {
        console.log(`i got kicked, reason: ${kick}`)
    })
}

HighwayBot()
