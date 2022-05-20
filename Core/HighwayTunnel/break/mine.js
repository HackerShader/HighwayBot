let stop = Boolean
const Vec3 = require('vec3').Vec3
    , log = require('../../console/console.js')
    , edit = require('../../console/edit')
    , mineflayer = require('mineflayer')
    , status = require('../../console/status.json')

/**
 * 
 * @param {mineflayer.Bot} bot 
 */
module.exports = async (bot) => {
    async function dig() {
        if (stop === true) return
        for (let y = 3; y >= 0; y--) {
            if (y !== 0) {
                for (let z = -2; z <= 2; z++) {
                    const target = bot.blockAt(bot.entity.position.offset(2, y, z))
                        , pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`
                        , pos2 = `${target.position.x} ${target.position.y} ${target.position.z}`
                    if (target.name === 'air') continue;
                    if (target && bot.canDigBlock(target)) {
                        try {
                            log(pos, pos2, '⛏ | Digging', true)
                            await bot.dig(target, false, new Vec3(-1, 0, 0))
                            log(pos, pos2, '✅ | Done', true)
                            edit('mine', Number(status.mine) + 1)
                        } catch (err) {
                            log(pos, pos2, '🛑 | Error: ' + err, true)
                            edit('mine-err', Number(status['mine-err']) + 1)
                            edit('error', status.error.push(err))
                        }
                        continue;
                    } else {
                        log(pos, pos2, '🛑 | Error: Can\t dig block!', true)
                        edit('mine-err', Number(status['mine-err']) + 1)
                        edit('error', status.error.push(`${pos} | Can't dig!`))
                    }
                }
                continue;
            }
            if (y === 0) {
                for (let z = -1; z <= 1; z++) {
                    const targetdown = bot.blockAt(bot.entity.position.offset(2, y, z))
                        , pos = `${Math.round(bot.entity.position.x)} ${Math.round(bot.entity.position.y)} ${Math.round(bot.entity.position.z)}`
                        , pos2 = `${targetdown.position.x} ${targetdown.position.y} ${targetdown.position.z}`
                    if (targetdown.name === 'air') continue;
                    if (targetdown && bot.canDigBlock(targetdown)) {
                        try {
                            log(pos, pos2, '⛏ | Digging', true)
                            await bot.dig(targetdown, false, new Vec3(-1, 0, 0))
                            log(pos, pos2, '✅ | Done', true)
                            edit('mine', Number(status.mine) + 1)
                        } catch (err) {
                            log(pos, pos2, '🛑 | Error: ' + err, true)
                            edit('mine-err', Number(status['mine-err']) + 1)
                            edit('error', status.error.push(err))
                        }
                        continue;
                    } else {
                        log(pos, pos2, '🛑 | Error: Can\t dig block!', true)
                        edit('mine-err', Number(status['mine-err']) + 1)
                        edit('error', status.error.push(`${pos} | Can't dig!`))
                    }
                }
            }
        }
        const checkinfront = await require('../check/checkInFront')(bot);
        const scaffoldcheck = await require('../check/scaffoldcheck')(bot);
        const lavacheck = await require('../check/CheckLavaBLock')(bot);
        const checkwall = await require('../check/check')(bot);
        if (scaffoldcheck === true) {
            await require('./scaffoldhighway')(bot)
            await dig()
            return;
        }
        if (lavacheck.check === true) {
            await require('./placelavablock')(bot);
            await dig();
            return;
        }
        if (checkinfront === false) {
            setTimeout(async () => {
                await dig();
                bot.navigate.to(bot.entity.position.offset(-1, 0, 0));
            }, 500);
            return;
        }
        if (checkwall === false) {
            setTimeout(() => dig(), 500)
            return;
        }

        setTimeout(async () => {
            bot.equip(278, 'hand')
            await dig();
            bot.navigate.to(bot.entity.position.offset(1, 0, 0));
        }, 500);
    }
    stop = false
    bot.chat('⛏ | Bắt đầu đào')
    await dig()
}


