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
        async function dig(look) {
        async function check() {
            let check = Boolean
            let x 
            for (var y = 3; y >= 0; y--) {
                if (y != 0) {
                    for (var z = -2; z <= 2; z++) {
                        const lavachecker = await CheckLavaBLocks(x, y, z)
                        if (lavachecker === true) continue;
                        const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                        if (target.name != `air`) {
                            check = false
                        }
                    }
                } else if (y == 0) {
                    let x 
                    const lavachecker = await CheckLavaBLocks(x, y, z)
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
            let x 
            for (var y = 3; y >= 0; y--) {
                if (y != 0) {
                    for (var z = -2; z <= 2; z++) {
                        const lavachecker = await CheckLavaBLocks(x, y, z)
                        if (lavachecker === true) continue;
                        const target = bot.blockAt(bot.entity.position.offset(1, y, z))
                        if (target.name != `air`) check = false

                    }
                } else if (y == 0) {
                    for (var z = -1; z <= 1; z++) {
                        const lavachecker = await CheckLavaBLocks(x, y, z)
                        if (lavachecker === true) continue;
                        const target = bot.blockAt(bot.entity.position.offset(1, y, z))
                        if (target.name != `air`) check = false
                    }
                }
            }
            return check;
        }

        async function placeNetherrack(x, y, z) {
            let target
            if (x > 10 || y > 10 || z > 10) {
                target = bot.blockAt(new Vec3(x, y ,z))
            } else if (x < 10 && y < 10 && z < 10) {
                target = bot.blockAt(bot.entity.position.offset(x, y, z))
            }
            console.log(target.position)
            //  bot.inventory.slots.forEach(async (slot) => {
            //console.log(slot.name)
            //if (!slot || slot.name !== 'netherrack') return
            await bot.equip(87, 'hand')

            try {
                bot.placeBlock(target, new Vec3(0, y, z))
                await bot.equip(278, 'hand')
            } catch (error) {
                console.log(error.stack)
            }
        }
        async function lavaPlacer(x, y, z) {
            let target1
            let target2
            let target3
            let target4
            if (x > 10 || y > 10 || z >     10) {
                target1 = bot.blockAt(new Vec3(x, y, z - 1))
                target2 = bot.blockAt(new Vec3(x, y + 1, z))
                target3 = bot.blockAt(new Vec3(x, y, z + 1))
                target4 = bot.blockAt(new Vec3(x, y - 1, z))
            } else if (x < 10 && y < 10 && z < 10) {
                target1 = bot.blockAt(bot.entity.position.offset(2, y, z - 1))
                target2 = bot.blockAt(bot.entity.position.offset(2, y + 1, z))
                target3 = bot.blockAt(bot.entity.position.offset(2, y, z + 1))
                target4 = bot.blockAt(bot.entity.position.offset(2, y - 1, z))
            } else 
            if (!target1 && !target2 && !target3 && !target4) {
               // stop = true
            } else {
                     if (target1.name === 'lava') placeNetherrack(target1.position.x, target1.position.y, target1.position.z)
                else if (target2.name === 'lava') placeNetherrack(target2.position.x, target2.position.y, target2.position.z)
                else if (target3.name === 'lava') placeNetherrack(target3.position.x, target3.position.y, target3.position.z)
                else if (target4.name === 'lava') placeNetherrack(target4.position.x, target4.position.y, target4.position.z)
            }
        }
        async function CheckLavaBLocks(x, y, z) {
            for(var x = 0; x <= 3; x++) {
                for(var y = 0; y <= 3; y++) {
                    for(var z = -3; z <= 3; z++) {
                        const target = bot.blockAt(bot.entity.position.offset(x, y, z))
                        
                    }
                }
            }













            
            let check = Boolean
            let target1
            let target2
            let target3
            let target4
            if (x > 10 || y > 10 || z > 10) {
                target1 = bot.blockAt(new Vec3(x, y, z - 1))
                target2 = bot.blockAt(new Vec3(x, y + 1, z))
                target3 = bot.blockAt(new Vec3(x, y, z + 1))
                target4 = bot.blockAt(new Vec3(x, y - 1, z))
            } else if (x < 10 && y < 10 && z < 10) {
                target1 = bot.blockAt(bot.entity.position.offset(2, y, z - 1))
                target2 = bot.blockAt(bot.entity.position.offset(2, y + 1, z))
                target3 = bot.blockAt(bot.entity.position.offset(2, y, z + 1))
                target4 = bot.blockAt(bot.entity.position.offset(2, y - 1, z))
            } 
            if (!target1 && !target2 && !target3 && !target4) {
                check = false
               // stop = true
            } else {
                if (target1.name === 'lava' ||
                    target2.name === 'lava' ||
                    target3.name === 'lava' ||
                    target4.name === 'lava') {
                    check = true
                } else
                    if (target1.name !== 'lava' &&
                        target2.name !== 'lava' &&
                        target3.name !== 'lava' &&
                        target4.name !== 'lava') {
                        check = false
                    }
            }
            
            return check

        }
        /**
         * 
         * @param {Vec3} vec3 
         */
        async function check1() {
            const check2 = await checkInFront()
            if (check2 === false) {
                setTimeout(async () => {
                    await dig()
                    if (stop === true) return
                    bot.navigate.to(bot.entity.position.offset(-1, 0, 0))
                }, 500)
            } else {
                const check1 = await check()
                if (check1 === false) {
                    setTimeout(() => dig(), 500)
                } else {
                    //console.clear()
                    console.log('✔  | Đã đào xong bức tường trước mặt.')
                    setTimeout(async () => {
                        await dig()
                        if (stop === true) return
                        bot.navigate.to(bot.entity.position.offset(1, 0, 0))
                    }, 500)
                }
            }
        }
      //  async function dig(look) {
            if (stop === true) return
            await bot.equip(278, 'hand')
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
            let x 
           const lavachecker = CheckLavaBLocks(x, y, z)
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
                                //if(lavachecker == true) break;
                                //await lavaPlacer(posblock.x, posblock.y, posblock.z)
                                // break;

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
                        const posblock = target.position
                        if (target.name === 'air') continue
                        if (target && bot.canDigBlock(target)) {
                            console.log(`⌛ | Starting to dig ${target.name} | ${posblock.x}, ${posblock.y}, ${posblock.z}`)
                            try {
                                await bot.dig(target)
                                console.log(`✔  | Finished digging ${target.name}| ${posblock.x}, ${posblock.y}, ${posblock.z}`)
                                //if(lavachecker == true) break;
                                //await lavaPlacer(posblock.x, posblock.y, posblock.z)
                            } catch (err) {
                                console.log(err.stack)
                            }
                        } else {
                            console.log('✖ | Can\'t dig')
                        }
                    }
                }
            }
            check1()
        }
        if (args[0] == `stop`) {
            stop = true
            bot.chat('🛑 | Sẽ dừng lại tại vòng lặp tiếp theo')
        } else {
            stop = false
            //await bot.navigate.to(bot.entity.position.offset(-1, 0, 0)) i removed this for stable movenment, can you check again your checkinfront function?
            bot.chat('⛏ | Bắt đầu đào')
            dig()
            await bot.equip(278, 'hand')
        }
    }
}


