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
    async function check() {
        let check = Boolean
        for (var y = 3; y >= 0; y--) {
            if (y != 0) {
                for (var z = -2; z <= 2; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                    if (target.name != `air`) {
                        check = false
                    }
                }
            } else if (y == 0) {
                for (var z = -1; z <= 1; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                    if (target.name != `air`) {
                        check = false
                    }
                }
            }
        }
        return check;
    }
    async function checkInFront() {
        let check = Boolean
        for (var y = 3; y >= 0; y--) {
            if (y != 0) {
                for (var z = -2; z <= 2; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(1, y, z))
                    if (target.name != `air`) check = false
                }
            } else if (y == 0) {
                for (var z = -1; z <= 1; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(1, y, z))
                    if (target.name != `air`) check = false
                }
            }
        }
        return check;
    }
    async function checkLava(y, z) {
        let check = Boolean
        const target1 = bot.blockAt(bot.entity.position.offset(2, y, z - 1))
        const target2 = bot.blockAt(bot.entity.position.offset(2, y + 1, z))
        const target3 = bot.blockAt(bot.entity.position.offset(2, y, z + 1))
        const target4 = bot.blockAt(bot.entity.position.offset(2, y - 1, z))
        if (!target1 && !target2 && !target3 && !target4) {
            return check = false
        } else {
            if (target1.name === 'lava' || target2.name === 'lava' || target3.name === 'lava' || target4.name === 'lava') {
                check = true
            } else if (target1.name !== 'lava' && target2.name !== 'lava' && target3.name !== 'lava' && target4.name !== 'lava') {
                check = false
            }

        }
        return check
    }
    async function dig(look) {
        if (stop === true) return
        bot.equip(278, 'hand')
        if (look === 'x+') await bot.look(270)
        else if (look === 'x-') await bot.look(90)
        else if (look === 'z+') await bot.look(0)
        else if (look === 'z-') await bot.look(180)
        const check4 = await checkInFront()
        if (check4 == false) {
            await bot.navigate.to(bot.entity.position.offset(-1, 0, 0))
            return dig()
        }
        for (var y = 3; y >= 0; y--) {
            if (y != 0) {
                for (var z = -2; z <= 2; z++) {
                    const lavachecker = await checkLava(y, z)
                    console.log(lavachecker)
                    if (lavachecker === true) continue;
                    const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                    if (target && bot.canDigBlock(target)) {
                        const posblock = target.position
                        console.log(`⌛ | Starting to dig ${target.name} | ${posblock.x}, ${posblock.y}, ${posblock.z}`)
                        try {
                            await bot.dig(target)
                            console.log(`✔  | Finished digging ${target.name}| ${posblock.x}, ${posblock.y}, ${posblock.z}`)
                        } catch (err) {
                            console.log(err.stack)
                        }
                    } else {
                        console.log('✖ | Can\'t dig')
                    }
                }
            } else if (y == 0) {
                for (var z = -1; z <= 1; z++) {
                    const lavachecker = await checkLava(y, z)
                    console.log(lavachecker)
                    if (lavachecker === true) continue;
                    const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                    if (target && bot.canDigBlock(target)) {
                        const posblock = target.position
                        console.log(`⌛ | Starting to dig ${target.name} | ${posblock.x}, ${posblock.y}, ${posblock.z}`)
                        try {
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
        }
        const check2 = await checkInFront()
        if (check2 === false) {
            setTimeout(async () => {
                await dig()
                bot.navigate.to(bot.entity.position.offset(-1, 0, 0))
            }, 500)
        } else {
            const check1 = await check()
            if (check1 === false) {
                setTimeout(() => dig(), 500)
            } else {
                console.clear()
                console.log('✔  | Đã đào xong bức tường trước mặt.')
                setTimeout(async () => {
                    await dig()
                    bot.navigate.to(bot.entity.position.offset(1, 0, 0))
                }, 500)
            }

        }
    }

    bot.on('spawn', spawn => {
        console.log('Bot spawn !')
    })
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
        } else if (message.split(' ')[0] === `${config.prefix}mine`) {
            await bot.navigate.to(bot.entity.position.offset(-1, 0, 0))
            bot.chat('⛏ | Bắt đầu đào')
            await dig(message.split(' ')[1])
        } else if (message == `${config.prefix}stopmine`) {
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