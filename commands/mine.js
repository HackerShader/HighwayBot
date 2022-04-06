let stop = Boolean
const config = require('./../config.json')
const mineflayer = require('mineflayer');
const Vec3 = require('vec3').Vec3;


module.exports = {
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {*} message 
     * @param {*} args 
     * @param {*} username 
     */
    async execute(bot, message, args, username) {
        const checkInFront = require('./util/checkInFront')(bot);
        const CheckLava = require('./util/checkLavaBlocks')(bot);
        const checkc = require('./util/check')(bot);
        const x = bot.entity.position.x
        const y = bot.entity.position.y
        const z = bot.entity.position.z
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
            const check2 = await checkInFront
            if (check2 === false) {
                setTimeout(async () => {
                    await dig()
                    bot.navigate.to(bot.entity.position.offset(-1, 0, 0))
                }, 500)
            } else {
                const check1 = await checkc
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
        if (args[0] == `stop`) {
            stop = true
            bot.chat('🛑 | Sẽ dừng lại tại vòng lặp tiếp theo')
        } else {
            stop = false
            //await bot.navigate.to(bot.entity.position.offset(-1, 0, 0)) i removed this for stable movenment, can you check again your checkinfront function?
            bot.chat('⛏ | Bắt đầu đào')
            dig()
        }
    }
}


