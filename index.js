//Package Collection
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
const client = new Discord.Client()
const Vec3 = require('vec3').Vec3;
client.commands = new Discord.Collection()
let interval

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
    mineflayernavigate(bot)
    scaffold(bot)
    /*
    const check = () => {
        let check
        for (var y = 3; y >= 0; y--) {
            for (var z = -2; z <= 2; z++) {
                const target = bot.blockAt(bot.entity.position.offset(1, y, z))
                if (target.name != `air`) {
                    check = false
                }
            }
        }
        return check;
    }
    */
    async function dig() {
        for (var z = -2; z <= 2; z++) {
            for (var y = 3; y >= 0; y--) {
                const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                if (target && bot.canDigBlock(target)) {
                    const posblock = target.position
                    console.log(`⌛ | Starting to dig ${target.name} | ${posblock.x}, ${posblock.y}, ${posblock.z}`)
                    try {
                        bot.equip(278, 'hand')
                        await bot.dig(target)
                        console.log(`✔  | Finished digging ${target.name}| ${posblock.x}, ${posblock.y}, ${posblock.z}`)
                    } catch (err) {
                        console.log(err.stack)
                    }
                } else {
                    console.log('✖ | Can\'t dig')
                }
            }
        }
        //check (beta)
        /*
        const check1 = await check()
        console.log(check1)
        if (check1 === false) {
            setTimeout(() => dig(), 1000)
        } else {
            bot.navigate.to(bot.entity.position.offset(1, 0, 0))
            setTimeout(() => {
                dig()
            }, 1000)
        }
        */
    }
    function checkrewrite() {
        let check 
        for (var z = -2; z <= 2; z++) {
            for (var y = 3; y >= 0; y--) {
                const target = bot.blockAt(bot.entity.position.offset(1, y, z))
                console.log(target.name.length)
                if(target.name == `netherrack`) {
                    bot.navigate.to(bot.entity.position.offset(-1, 0, 0))
                }
            }
        }   
        return check
    }
    bot.on('spawn', spawn => {
        console.log('Bot spawn !')
    })
    /*
        bot.on('health', health => {
            console.log(`${bot.health} | ${bot.food}`)
            if (bot.health <= 10) {
                bot.end()
                HighwayBot()
            }
        })*/
    bot.on('chat', async function (username, message) {
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
            //checking here
        } else if (message === `${config.prefix}mine`) {
            // bot.navigate.to(bot.entity.position.offset(-1, 0, 0)) 
            async function mine() {
                await checkrewrite() 
            }
            mine()
        } else if (message == `${config.prefix}stopmine`) {
            clearInterval(interval)
            bot.chat('🛑 | Đã dừng mine')
        } else if (message === `${config.prefix}check`) {
            await checkrewrite()
        }
    })
    bot.on('kicked', kick => {
        console.log(`i got kicked, reason: ${kick.toString()}`)
    })
}

HighwayBot()
