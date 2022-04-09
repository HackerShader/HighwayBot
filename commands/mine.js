let stop = Boolean
const config = require('./../config.json')
const mineflayer = require('mineflayer');
const Vec3 = require('vec3').Vec3;


module.exports = {
    name: 'mine',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {*} message 
     * @param {*} args 
     * @param {*} username 
     */
    async execute(bot, message, args, username) {
        /**
         * 
         * @param {Vec3} vec3 
         */

        async function dig(look) {
            if (stop === true) return
            bot.equip(278, 'hand')
            if (look === 'x+') await bot.look(270)
            else if (look === 'x-') await bot.look(90)
            else if (look === 'z+') await bot.look(0)
            else if (look === 'z-') await bot.look(180)
            for (var y = 3; y >= 0; y--) {
                if (y != 0) {
                    for (var z = -2; z <= 2; z++) {
                        const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                        if (target.name === 'air') continue
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
                        const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                        if (target.name === 'air') continue
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
            const checkinfront = await require('../util/checkInFront')(bot)
            const scaffoldcheck = await require('../util/scaffoldcheck')(bot)
            const lavacheck = await require('../util/CheckLavaBLock')(bot)
            if (scaffoldcheck === true) {
                bot.equip(87, 'hand')
                await require('../util/scaffoldhighway')(bot)
                dig()
            } else if (scaffoldcheck === false) {
                if (lavacheck.check === true) {
                    bot.equip(87, 'hand')
                    await require('../util/placelavablock')(bot)
                    dig()
                } else if (lavacheck.check === false) {
                    if (checkinfront === false) {
                        setTimeout(async () => {
                            await dig()
                            bot.navigate.to(bot.entity.position.offset(-1, 0, 0))
                        }, 500)
                    } else {
                        const checkwall = await require('../util/check')(bot)
                        if (checkwall === false) {
                            setTimeout(() => dig(), 500)
                        } else {
                            //console.clear()
                            console.log('✔  | Đã đào xong bức tường trước mặt.')
                            setTimeout(async () => {
                                await dig()
                                bot.navigate.to(bot.entity.position.offset(1, 0, 0))
                            }, 500)
                        }
                    }
                }
            }
        }
        if (args[0] == `stop`) {
            stop = true
            bot.chat('🛑 | Sẽ dừng lại tại vòng lặp tiếp theo')
        } else {
            stop = false
            bot.chat('⛏ | Bắt đầu đào')
            dig()
        }
    }
}


