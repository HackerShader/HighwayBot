let stop = Boolean
const config = require('./../config.json')
const mineflayer = require('mineflayer')
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
        async function check() {
            let check = Boolean
            for (var y = 3; y >= 0; y--) {
                if (y != 0) {
                    for (var z = -2; z <= 2; z++) {
                        const lavachecker = await checkLava(y, z)
                        if (lavachecker === true) continue;
                        const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                        if (target.name != `air`) {
                            check = false
                        }
                    }
                } else if (y == 0) {
                    const lavachecker = await checkLava(y, z)
                    if (lavachecker === true) continue;
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
                        const lavachecker = await checkLava(y, z)
                        if (lavachecker === true) continue;
                        const target = bot.blockAt(bot.entity.position.offset(1, y, z))
                        if (target.name != `air`) check = false
                    }
                } else if (y == 0) {
                    for (var z = -1; z <= 1; z++) {
                        const lavachecker = await checkLava(y, z)
                        if (lavachecker === true) continue;
                        const target = bot.blockAt(bot.entity.position.offset(1, y, z))
                        if (target.name != `air`) check = false
                    }
                }
            }
            return check;
        }
        async function placeNetherrack(y, z) {
            const target = bot.blockAt(bot.entity.position.offset(3, y, z))
            //  bot.inventory.slots.forEach(async (slot) => {
            //console.log(slot.name)
            //if (!slot || slot.name !== 'netherrack') return
            await bot.equip(87, 'hand')
            // console.log(target.position.plus(new Vec3(0, 1, 0)))
            try {
                bot.placeBlock(target, new Vec3(0, 1, 0))
            } catch (error) {
                console.log(error.stack)
            }
            // })
        }
        async function check3wall() {
            let array = []
            for (var x = 2; x <= 5; x++) {
                for (var y = 4; y >= -1; y--) {
                    if (y != 0 && y != -1) {
                        for (var z = -3; y <= 3; y++) {
                            const target = bot.blockAt(bot.entity.position.offset(x, y ,z))
                            if (target.name === 'lava') array.push(
                                `${target.position.x} ${target.position.y} ${target.position.z}`
                            )
                        }
                    } else if (y == 0 || y == -1) {
                        for (var z = -1; y <= 1; y++) {
                            const target = bot.blockAt(bot.entity.position.offset(x, y ,z))
                            if (target.name === 'lava') array.push(
                                `${target.position.x} ${target.position.y} ${target.position.z}`
                            )
                        }
                    }
                }
            }
            return array
        }
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
            /*
            const check4 = await checkInFront()
            if (check4 == false) {
                await bot.navigate.to(bot.entity.position.offset(-1, 0, 0))
                return dig()
            }
            */
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
                        const lavachecker = await checkLava(y, z)
                        if (lavachecker === true) {
                            placeNetherrack(y, z)
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
                        const lavachecker = await checkLava(y, z)
                        if (lavachecker === true) {
                            placeNetherrack(y, z)
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


