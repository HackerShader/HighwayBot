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
        port: config.port,
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
        async function dig() {
            for (var i = -2; i <= 2; i++) {
                for (var y = 2; y >= 0; y--) {
                    const target = bot.blockAt(bot.entity.position.offset(2, y, i))
                    if (target && bot.canDigBlock(target)) {    
                        bot.equip(278, 'hand')
                        const posblock = target.position
                        console.log(`> | Starting to dig ${target.name} | ${posblock.x}, ${posblock.y}, ${posblock.z}`)
                        try {
                            await bot.dig(target)
                            console.log(`< | Finished digging ${target.name}| ${posblock.x}, ${posblock.y}, ${posblock.z}`)
                        } catch (err) {
                            console.log(err.stack)
                        }
                    } else {
                        bot.chat('cannot dig')
                    }

                }
            }
        }
        async function move() {
            const botpos = bot.entity.position
            bot.pathfinder.setMovements(defaultMove)
            bot.pathfinder.setGoal(new GoalNear(botpos.x + 1, botpos.y, botpos.z))
        }
        bot.on('health', health => {
            console.log(`${bot.health} | ${bot.food}`)
            if(bot.health <= 10) {
                bot.end()
                HighwayBot()
            }
        })
        bot.on('chat', function (username, message) {
            if (message === `${config.prefix}baritone`) {
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
            }
            if (message === `${config.prefix}mine`) {
                setInterval(() => {
                    dig()
                    setTimeout(() => {
                        move()
                    }, 3000);
                    //bot.navigate.to(bot.entity.position.offset(1,0,0))
                }, 6000);   
                    
                
                if (message == `${config.prefix}stopmine`) {
                    return
                }
                
            }
        })
    })  
    bot.on('kicked', kick => {
        console.log(`i got kicked, reason: ${kick}`)
    })
}

HighwayBot()
